import Badge from "../ui/Badge";
import { VIDEO_DEMO } from "@/lib/constants";

export default function VideoDemo() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-8">
          <Badge variant="subtle">{VIDEO_DEMO.badge}</Badge>
          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {VIDEO_DEMO.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {VIDEO_DEMO.subtext}
          </p>
        </div>

        {/* Loom video embed */}
        <div className="mx-auto max-w-[800px]">
          <div
            className="relative w-full rounded-[8px] overflow-hidden"
            style={{ paddingBottom: "55.73%", height: 0 }}
          >
            <iframe
              src="https://www.loom.com/embed/53bf94d8b1814ef5b5546cbffcd4e581"
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              title="Workpal product demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
