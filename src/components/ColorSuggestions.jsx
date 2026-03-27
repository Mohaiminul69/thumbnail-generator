const ColorSuggestions = ({ colorSuggestions, rgba, setRgba }) => {
  const fullColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0.1)`;
  const hoverColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0.8)`;
  const buttonfullColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 1)`;

  const handleColorChange = (color) => {
    const [r, g, b] = color;
    const newRgba = { r, g, b, a: rgba.a };
    setRgba(newRgba);
  };

  return (
    <div
      style={{
        "--primary": fullColor,
        backgroundColor: "var(--primary)",
      }}
      className="max-h-113.75 scrollbar-styles overflow-y-scroll flex flex-col gap-3.5 p-6 rounded-md text-white text-sm border border-white/10"
    >
      <p>Color Suggestions</p>
      {colorSuggestions.map((color) => (
        <>
          <button
            style={{
              "--primary": buttonfullColor,
              "--primary-hover": hoverColor,
            }}
            onClick={() => handleColorChange(color.rgb)}
            className="flex flex-col bg-(--primary) hover:bg-(--primary-hover) cursor-pointer text-white font-bold py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out"
          >
            <span>{color.name}</span>
          </button>
          <span>rgb - {color?.rgb.join(", ")}</span>
          <span>hex - {color.hex}</span>
        </>
      ))}
    </div>
  );
};

export default ColorSuggestions;
