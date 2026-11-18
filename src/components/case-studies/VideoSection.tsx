import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyVideosSection, YouTubeVideo } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";
import { VideoFilePlayer } from "./VideoFilePlayer";
import { VideoPlayer } from "./VideoPlayer";

type Props = Omit<CaseStudyVideosSection, "type"> & { tone: SectionTone };

// The client's videos. One uploaded video and no YouTube links: the heading beside it, like a
// phone held next to the text. Otherwise: a centred heading, the uploaded videos in a row (framed
// like phones), then the YouTube videos, the first one large and the others three per row.
export function VideoSection({ id, tone, eyebrow, title, intro, files, videos }: Props) {
  const headingId = `section-${id}-title`;

  if (files.length === 1 && videos.length === 0) {
    return (
      <CaseStudySectionFrame
        headingId={headingId}
        tone={tone}
        className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[clamp(2rem,5vw,7rem)]"
      >
        <Reveal>
          <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
        </Reveal>
        <Reveal y={40} delay={0.1} className="mx-auto w-full max-w-[22rem]">
          <VideoFilePlayer file={files[0]} />
        </Reveal>
      </CaseStudySectionFrame>
    );
  }

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
      </Reveal>
      {files.length > 0 && (
        <Reveal y={40} delay={0.1}>
          <ul className="mt-[clamp(2.5rem,3.5vw,4.5rem)] flex flex-wrap justify-center gap-[clamp(1rem,2vw,2.5rem)]">
            {files.map((file) => (
              <li key={file.url} data-reveal className="w-[min(20rem,80vw)]">
                <VideoFilePlayer file={file} />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
      {videos.length > 0 && <YouTubeVideos tone={tone} videos={videos} />}
    </CaseStudySectionFrame>
  );
}

// The first YouTube video large, the others three per row (two on tablets, one on phones), each
// with its title from YouTube.
function YouTubeVideos({ tone, videos }: { tone: SectionTone; videos: YouTubeVideo[] }) {
  const [lead, ...rest] = videos;
  const titleClass = `font-display leading-snug font-semibold ${tone === "dark" ? "text-white" : "text-primary"}`;
  const labelClass = `font-mono text-[11px] tracking-[0.18em] uppercase ${tone === "dark" ? "text-light/55" : "text-primary/50"}`;

  return (
    <Reveal y={40} delay={0.1}>
      <figure data-reveal className="mx-auto mt-[clamp(2.5rem,3.5vw,4.5rem)] max-w-[68rem]">
        <VideoPlayer video={lead} large sizes="(min-width: 1200px) 68rem, 92vw" />
        {lead.title && (
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className={`${titleClass} text-[clamp(1.0625rem,1.3vw,1.5rem)]`}>{lead.title}</span>
            <span className={labelClass}>YouTube</span>
          </figcaption>
        )}
      </figure>

      {rest.length > 0 && (
        <ul className="mx-auto mt-[clamp(2rem,2.8vw,3.5rem)] grid max-w-[68rem] grid-cols-[minmax(0,1fr)] gap-x-[clamp(1rem,1.6vw,2rem)] gap-y-[clamp(1.75rem,2.4vw,2.75rem)] sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video) => (
            <li key={video.id} data-reveal>
              <VideoPlayer video={video} sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw" />
              {video.title && <p className={`mt-3 line-clamp-2 text-[clamp(0.9375rem,1vw,1.125rem)] ${titleClass}`}>{video.title}</p>}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}
