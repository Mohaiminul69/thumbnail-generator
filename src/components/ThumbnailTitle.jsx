import { useEffect, useState } from "react";
import fontSizeMap from "../utils/font-sizes";
import TextControls from "./TextControls";

const ThumbnailTitle = () => {
  const [editTextType, setEditTextType] = useState(null);
  const [showControlFor, setShowControlFor] = useState(null);
  const [texts, setTexts] = useState(() => {
    const saved = localStorage.getItem("thumbnail-texts");
    return saved
      ? JSON.parse(saved)
      : {
          title: { text: "Click here to add title", fontSize: 5 },
          subtitle: { text: "Leetcode problem #36", fontSize: 4 },
        };
  });

  const { title, subtitle } = texts;

  useEffect(() => {
    localStorage.setItem("thumbnail-texts", JSON.stringify(texts));
  }, [texts]);

  const updateText = (event) => {
    const { value } = event.target;
    if (value === "Enter") setEditTextType(null);
    setTexts((prev) => ({
      ...prev,
      [editTextType]: { ...prev[editTextType], text: value },
    }));
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey) return;
    if (event.key === "Enter") setEditTextType(null);
  };

  return (
    <div className="space-y-5">
      <h1
        onMouseOver={() => setShowControlFor("title")}
        onMouseLeave={() => setShowControlFor(null)}
        onClick={() => setEditTextType("title")}
        className={`${fontSizeMap[title.fontSize]} cursor-pointer relative`}
      >
        {title.text}
        {showControlFor == "title" && (
          <TextControls textType="title" setTexts={setTexts} />
        )}
      </h1>
      <p
        onMouseOver={() => setShowControlFor("subtitle")}
        onMouseLeave={() => setShowControlFor(null)}
        onClick={() => setEditTextType("subtitle")}
        className={`${fontSizeMap[subtitle.fontSize]} font-bold cursor-pointer relative`}
      >
        {subtitle.text}
        {showControlFor == "subtitle" && (
          <TextControls textType="subtitle" setTexts={setTexts} />
        )}
      </p>
      {editTextType && (
        <div className="space-y-1">
          <input
            type="text"
            autoFocus
            onBlur={() => setEditTextType(null)}
            onChange={updateText}
            onKeyDown={handleKeyDown}
            defaultValue={texts[editTextType].text}
            className="w-full bg-[#0f0f0f] text-white text-lg px-4 py-2 rounded-lg border border-(--primary) outline-none focus:ring-2 focus:ring-(--primary) placeholder-gray-400"
          />
          <p className="text-gray-500 text-sm italic">Press Enter to save</p>
        </div>
      )}
    </div>
  );
};

export default ThumbnailTitle;
