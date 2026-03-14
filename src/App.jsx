import Thumbnail from "./components/thumbnail";
import { useRef, useCallback, useState } from "react";
import { toJpeg } from "html-to-image";
import ColorControls from "./components/ColorControls";
import "./App.css";

const App = () => {
  // Initial color: #9C2426 (R:156, G:36, B:38)
  const [rgba, setRgba] = useState({ r: 156, g: 36, b: 38, a: 1 });
  const thumbnailRef = useRef(null);
  const fullColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1)`;
  const hoverColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0.8)`;

  const downloadThumbnail = useCallback(() => {
    if (thumbnailRef.current === null) return;

    toJpeg(thumbnailRef.current, {
      quality: 0.95,
      canvasWidth: 1376,
      canvasHeight: 768,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "thumbnail.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      });
  }, [thumbnailRef]);

  return (
    <div className="h-screen bg-[#0b090a] flex gap-x-8 items-center justify-center">
      <div ref={thumbnailRef} className="w-fit">
        <Thumbnail rgba={rgba} />
      </div>
      <div className="space-y-6">
        <button
          style={{
            "--primary": fullColor,
            "--primary-hover": hoverColor,
          }}
          onClick={downloadThumbnail}
          className="bg-(--primary) hover:bg-(--primary-hover) cursor-pointer text-white font-bold py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out"
        >
          Download Thumbnail
        </button>
        <ColorControls rgba={rgba} setRgba={setRgba} />
      </div>
    </div>
  );
};

export default App;
