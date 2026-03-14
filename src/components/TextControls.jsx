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
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: `inset 0 0 0 10px var(--primary), 0 0 40px rgba(var(--primary-rgb), 0.6)`,
        }}
        className="flex items-center justify-center absolute font-[caveat] -top-3.75 right-0 text-[24px] size-7 rounded-md"
      >
        <span className="mb-1 mr-1">+</span>
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          handleFontSizeDecrease();
        }}
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: `inset 0 0 0 10px var(--primary), 0 0 40px rgba(var(--primary-rgb), 0.6)`,
        }}
        className="flex items-center justify-center absolute font-[caveat] top-7.5 right-0 text-[24px] size-7 rounded-md"
      >
        <span className="mb-1 mr-1">-</span>
      </div>
    </>
  );
};

export default TextControls;
