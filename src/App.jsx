import Thumbnail from "./components/Thumbnail";
import { useRef, useCallback, useState } from "react";
import { toJpeg } from "html-to-image";
import ColorControls from "./components/ColorControls";
import { getAIColorSuggestions } from "./utils/gemini";
import ColorSuggestions from "./components/ColorSuggestions";
import suggestions from "./utils/dummy.data";
import "./App.css";

const App = () => {
  // Initial color: #9C2426 (R:156, G:36, B:38)
  const [rgba, setRgba] = useState({ r: 156, g: 36, b: 38, a: 1 });
  const [image, setImage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [colorSuggestions, setColorSuggestions] = useState(suggestions);
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

  const handleGetColorSuggestions = async () => {
    if (!image) return;
    setIsFetching(true);

    try {
      const colors = await getAIColorSuggestions(image);
      setColorSuggestions(colors);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      console.log(colorSuggestions, "Color suggestions process completed.");
      setIsFetching(false);
    }
  };

  return (
    <div className="h-screen bg-[#0b090a] flex gap-x-8 items-center justify-center">
      <div ref={thumbnailRef} className="w-fit">
        <Thumbnail rgba={rgba} image={image} setImage={setImage} />
      </div>
      <div className="grid grid-cols-2 gap-4">
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
        <button
          style={{
            "--primary": fullColor,
            "--primary-hover": hoverColor,
          }}
          onClick={handleGetColorSuggestions}
          className={`${isFetching && "animate-pulse"} bg-(--primary) hover:bg-(--primary-hover) cursor-pointer text-white font-bold py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out`}
        >
          {isFetching ? "Analyzing..." : "Get AI Color Suggestions"}
        </button>
        <ColorControls rgba={rgba} setRgba={setRgba} />
        <ColorSuggestions
          colorSuggestions={colorSuggestions}
          rgba={rgba}
          setRgba={setRgba}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default App;
