import { ImageResponse } from "next/og";

// The drop from the logo, as DropIcon draws it (src/components/ui/Button.tsx), on a 16 × 18 box.
export const dropPath =
  "M6.80096 0C7.63523 1.10846 9.66733 3.44118 11.2748 5.71259H11.7335V5.93642H12.0339V6.13106H11.4841V8.6808H14.1382V8.97275H13.6765V9.27541H12.7981V11.3366H13.9779V11.6782H14.3785V11.9565H12.4957V13.3871H13.6734V13.6723H13.1396C12.6429 14.9225 11.7753 16.0012 10.6468 16.7717C9.51832 17.5422 8.1798 17.9697 6.80096 18C5.76046 17.9759 4.73873 17.7257 3.81085 17.2675C2.88296 16.8094 2.0725 16.1551 1.43903 15.3527C0.805553 14.5502 0.365156 13.6201 0.150201 12.6306C-0.0647552 11.641 -0.0488075 10.6173 0.196872 9.63452C0.883921 6.88916 5.44188 1.81401 6.80696 0H6.80096ZM15.2418 5.68144H14.4937V6.40841H15.2418V5.68144ZM11.7455 6.37922V8.43069H13.8567V6.37922H11.7455ZM13.7836 13.2061V12.1356H12.6819V13.2061H13.7836ZM15.3961 11.7123H14.6479V12.4392H15.3961V11.7123ZM14.667 9.51968H13.0515V11.0943H14.667V9.51968ZM16 7.23854H14.7811V8.4229H16V7.23854ZM10.4335 6.08824V6.81228H11.1816V6.08824H10.4335ZM8.0769 7.8098H9.76849V6.16609H8.0769V7.8098ZM9.50208 11.5186V8.73529H6.63771V11.5186H9.50208ZM10.6038 10.7663H12.2793V9.13722H10.6128V10.7663H10.6038ZM11.1115 13.3842V12.0071H9.69938V13.3842H11.1115Z";

// The app icon (src/app/icon.tsx, apple-icon.tsx): the gradient drop centred on a navy square.
// The drop is 56% of the height, inside the centre 80% that Android may crop to a circle.
export function brandIcon(size: number) {
  const height = Math.round(size * 0.56);
  const width = Math.round((height * 16) / 18);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#151936",
        }}
      >
        <svg width={width} height={height} viewBox="0 0 16 18">
          <defs>
            <linearGradient id="drop" x1="0" y1="0" x2="16" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
          </defs>
          <path fillRule="evenodd" clipRule="evenodd" d={dropPath} fill="url(#drop)" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
