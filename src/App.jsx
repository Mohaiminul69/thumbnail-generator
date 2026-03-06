import Thumbnail from "./components/thumbnail";
import { useRef, useCallback } from "react";
import { toJpeg } from "html-to-image";
import "./App.css";

const App = () => {
  const thumbnailRef = useRef(null);

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
    <div className="h-screen bg-[#0b090a] flex flex-col gap-y-4 items-center justify-center">
      <button
        onClick={downloadThumbnail}
        className="bg-[#9C2426] hover:bg-[#7a1c1e] cursor-pointer text-white font-bold py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out"
      >
        Download Thumbnail
      </button>
      <div ref={thumbnailRef} className="w-fit">
        <Thumbnail />
      </div>
    </div>
  );
};

export default App;
