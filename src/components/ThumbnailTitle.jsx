import { useState } from "react";

const ThumbnailTitle = () => {
  const [texts, setTexts] = useState({
    title: "Product of array except self",
    subtitle: "Leetcode problem #238",
  });
  const [editTextType, setEditTextType] = useState(null);

  const updateText = (event) => {
    const { value } = event.target;
    if (value === "Enter") setEditTextType(null);
    setTexts((prev) => ({ ...prev, [editTextType]: value }));
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey) return;
    if (event.key === "Enter") setEditTextType(null);
  };

  return (
    <div className="space-y-5">
      <h1
        onClick={() => setEditTextType("title")}
        className="text-5xl cursor-pointer"
      >
        {texts.title}
      </h1>
      <p
        onClick={() => setEditTextType("subtitle")}
        className="text-4xl font-bold cursor-pointer"
      >
        {texts.subtitle}
      </p>
      {editTextType && (
        <input
          type="text"
          autoFocus
          onBlur={() => setEditTextType(null)}
          onChange={updateText}
          onKeyDown={handleKeyDown}
          defaultValue={texts[editTextType]}
          className="w-full bg-[#0f0f0f] text-white text-lg px-4 py-2 rounded-lg border border-[#9C2426] outline-none focus:ring-2 focus:ring-[#9C2426] placeholder-gray-400"
        />
      )}
    </div>
  );
};

export default ThumbnailTitle;
