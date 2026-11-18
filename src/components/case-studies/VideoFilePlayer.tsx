import type { VideoFile } from "@/contentful/queries/case-studies";

// An uploaded video (e.g. a vertical reel) with the browser's own player, framed like a phone.
// Only its first frame is fetched until someone presses play (preload="metadata", and the #t
// fragment makes browsers show that frame instead of a black box).
export function VideoFilePlayer({ file }: { file: VideoFile }) {
  return (
    <div className="rounded-[2.4rem] bg-[#0b0d1f] p-2.5 shadow-[0_50px_90px_-40px_rgb(0_0_0_/_0.75),inset_0_0_0_2px_#2a2d48]">
      <video
        controls
        playsInline
        preload="metadata"
        aria-label={file.caption ?? "Video"}
        className="aspect-[9/16] w-full rounded-[1.9rem] bg-black object-contain"
      >
        <source src={`${file.url}#t=0.1`} type={file.contentType} />
      </video>
    </div>
  );
}
