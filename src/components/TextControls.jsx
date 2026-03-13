const TextControls = ({ setTexts, textType }) => {
  const handleFontSizeIncrease = () => {
    setTexts((prev) => ({
      ...prev,
      [textType]: {
        ...prev[textType],
        fontSize: Math.min(7, prev[textType].fontSize + 1),
      },
    }));
  };

  const handleFontSizeDecrease = () => {
    setTexts((prev) => ({
      ...prev,
      [textType]: {
        ...prev[textType],
        fontSize: Math.max(1, prev[textType].fontSize - 1),
      },
    }));
  };

  return (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation();
          handleFontSizeIncrease();
        }}
        className="flex items-center justify-center absolute font-[caveat] -top-3.75 right-0 bg-[#9C2426] text-[24px] size-7 rounded-md shadow-[inset_0_0_0_2px_#9C2426,0_0_20px_rgba(156,36,38,0.6)]"
      >
        <span className="mb-1 mr-1">+</span>
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          handleFontSizeDecrease();
        }}
        className="flex items-center justify-center absolute font-[caveat] top-7.5 right-0 bg-[#9C2426] text-[24px] size-7 rounded-md shadow-[inset_0_0_0_2px_#9C2426,0_0_20px_rgba(156,36,38,0.6)]"
      >
        <span className="mb-1 mr-1">-</span>
      </div>
    </>
  );
};

export default TextControls;
