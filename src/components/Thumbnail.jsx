import { useState } from "react";
import StackIcons from "./StackIcons";

const Thumbnail = () => {
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
    <div className="bg-[#161616] relative aspect-video w-225 m-auto overflow-hidden shadow-[inset_0_0_0_12px_#9C2426]">
      <div className="bg-[radial-gradient(circle_at_70%_55%,rgba(156,36,38,0.4)_20%,rgba(22,22,22,1)_85%)] border-8 border-[#9C2426] rounded-3xl p-8 flex justify-between items-center h-full">
        <div className="h-[75%] flex flex-col justify-between space-y-3 text-white overflow-visible z-10 shrink w-1/2">
          <div className="space-y-4">
            <h1
              onClick={() => setEditTextType("title")}
              className="text-4xl whitespace-nowrap cursor-pointer"
            >
              {texts.title}
            </h1>
            <p
              onClick={() => setEditTextType("subtitle")}
              className="text-3xl cursor-pointer"
            >
              {texts.subtitle}
            </p>
            {editTextType && (
              <input
                type="text"
                autoFocus
                onChange={updateText}
                onKeyDown={handleKeyDown}
                defaultValue={texts[editTextType]}
                className="w-full bg-[#0f0f0f] text-white text-lg px-4 py-2 rounded-lg border border-[#9C2426] outline-none focus:ring-2 focus:ring-[#9C2426] placeholder-gray-400"
              />
            )}
          </div>
          <StackIcons />
        </div>
        <div className="bg-[#9C2426] size-100 rounded-full shrink-0 shadow-[inset_0_0_0_10px_#9C2426,0_0_40px_rgba(185,28,28,0.6)] mt-10" />
        <div className="bg-[#9C2426] size-30 rounded-full absolute left-87.5 -bottom-17.5 shadow-[inset_0_0_0_10px_#9C2426,0_0_40px_rgba(185,28,28,0.6)]" />
      </div>
    </div>
  );
};

export default Thumbnail;
