import { useEffect, useState } from "react";

const ThumbnailTitle = () => {
  const [editTextType, setEditTextType] = useState(null);
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
        onClick={() => setEditTextType("title")}
        className={`text-${title.fontSize}xl cursor-pointer`}
      >
        {title.text}
      </h1>
      <p
        onClick={() => setEditTextType("subtitle")}
        className={`text-${subtitle.fontSize}xl font-bold cursor-pointer`}
      >
        {subtitle.text}
      </p>
      {editTextType && (
        <>
          <input
            type="text"
            autoFocus
            onBlur={() => setEditTextType(null)}
            onChange={updateText}
            onKeyDown={handleKeyDown}
            defaultValue={texts[editTextType].text}
            className="w-full bg-[#0f0f0f] text-white text-lg px-4 py-2 rounded-lg border border-[#9C2426] outline-none focus:ring-2 focus:ring-[#9C2426] placeholder-gray-400"
          />
          <p className="text-gray-500 text-sm italic">
            Press Enter to save
          </p>
        </>
      )}
    </div>
  );
};

export default ThumbnailTitle;
