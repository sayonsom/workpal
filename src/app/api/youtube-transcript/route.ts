/**
 * GET /api/youtube-transcript?videoId=XXXXXXXXXXX
 *
 * Fetches a YouTube video transcript server-side (from Vercel edge, not AWS Lambda).
 * YouTube blocks AWS/cloud provider IPs from fetching transcripts, but Vercel's
 * edge network IPs are typically not blocked.
 *
 * Returns { transcript: string } or { error: string }.
 */
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
  }

  try {
    // Method 1: Use innertube player API to get caption track URLs
    const transcript = await fetchTranscriptInnertube(videoId);
    if (transcript) {
      return NextResponse.json({ transcript });
    }

    // Method 2: Fetch video page and extract captions
    const pageTranscript = await fetchTranscriptFromPage(videoId);
    if (pageTranscript) {
      return NextResponse.json({ transcript: pageTranscript });
    }

    return NextResponse.json(
      { error: "No transcript available for this video" },
      { status: 404 }
    );
  } catch (err) {
    console.error("YouTube transcript fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch transcript" },
      { status: 500 }
    );
  }
}

async function fetchTranscriptInnertube(videoId: string): Promise<string | null> {
  // Try multiple innertube client types — YouTube blocks some but not others
  const clients = [
    { clientName: "ANDROID", clientVersion: "19.09.37", apiKey: "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w" },
    { clientName: "IOS", clientVersion: "19.09.3", apiKey: "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc" },
    { clientName: "WEB", clientVersion: "2.20240101.00.00", apiKey: "" },
  ];

  for (const client of clients) {
    try {
      const url = client.apiKey
        ? `https://www.youtube.com/youtubei/v1/player?key=${client.apiKey}`
        : "https://www.youtube.com/youtubei/v1/player";

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: {
            client: {
              clientName: client.clientName,
              clientVersion: client.clientVersion,
              hl: "en",
              gl: "US",
            },
          },
          videoId,
        }),
      });

      if (!resp.ok) continue;

      const data = await resp.json();
      const tracks =
        data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (!tracks || tracks.length === 0) continue;

      // Prefer English track
      const enTrack =
        tracks.find((t: { languageCode: string }) =>
          t.languageCode.startsWith("en")
        ) || tracks[0];
      const baseUrl = enTrack?.baseUrl;
      if (!baseUrl) continue;

      const text = await fetchCaptionText(baseUrl);
      if (text) return text;
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchTranscriptFromPage(videoId: string): Promise<string | null> {
  try {
    const resp = await fetch(
      `https://www.youtube.com/watch?v=${videoId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie: "CONSENT=YES+cb",
        },
      }
    );

    if (!resp.ok) return null;
    const html = await resp.text();

    // Extract captionTracks from embedded player response
    const match = html.match(/"captionTracks":\s*(\[.*?\])/);
    if (!match) return null;

    const tracks = JSON.parse(match[1]);
    if (!tracks || tracks.length === 0) return null;

    const enTrack =
      tracks.find((t: { languageCode: string }) =>
        t.languageCode.startsWith("en")
      ) || tracks[0];
    const baseUrl = enTrack?.baseUrl;
    if (!baseUrl) return null;

    return fetchCaptionText(baseUrl);
  } catch {
    return null;
  }
}

async function fetchCaptionText(baseUrl: string): Promise<string | null> {
  try {
    // Try JSON3 format
    const resp = await fetch(baseUrl + "&fmt=json3");
    if (resp.ok) {
      const data = await resp.json();
      const events = data?.events || [];
      const segments: string[] = [];
      for (const event of events) {
        if (event.segs) {
          for (const seg of event.segs) {
            const text = (seg.utf8 || "").trim();
            if (text && text !== "\n") segments.push(text);
          }
        }
      }
      if (segments.length > 0) {
        return segments.join(" ").slice(0, 15000);
      }
    }

    // Fallback: XML format
    const xmlResp = await fetch(baseUrl);
    if (xmlResp.ok) {
      const xml = await xmlResp.text();
      const textMatches = xml.match(/<text[^>]*>[^<]*<\/text>/g) || [];
      const segments = textMatches
        .map((m) => {
          const content = m.replace(/<[^>]*>/g, "").trim();
          return decodeHTMLEntities(content);
        })
        .filter(Boolean);
      if (segments.length > 0) {
        return segments.join(" ").slice(0, 15000);
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}
