// Importing a video from src/assets/videos/ gives its URL (the "*.mp4" asset rule in
// next.config.ts).
declare module "*.mp4" {
  const src: string;
  export default src;
}
