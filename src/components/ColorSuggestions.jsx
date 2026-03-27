const ColorSuggestions = ({ colorSuggestions, rgba, setRgba, isFetching }) => {
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
      className={`${isFetching && "animate-pulse"} max-h-113.75 scrollbar-styles overflow-y-scroll flex flex-col gap-3.5 p-6 rounded-md text-white text-sm border border-white/10`}
    >
      <p>Color Suggestions</p>
      {isFetching && <p className="animate-pulse">Analyzing Image...</p>}
      {colorSuggestions.map(({ name, rgb = [], hex }) => (
        <div className="flex flex-col gap-2" key={name}>
          <button
            style={{
              "--primary": buttonfullColor,
              "--primary-hover": hoverColor,
            }}
            onClick={() => handleColorChange(rgb)}
            className="flex flex-col bg-(--primary) hover:bg-(--primary-hover) cursor-pointer text-white font-bold py-2 px-4 rounded shadow-lg transition duration-150 ease-in-out"
          >
            <span>{name}</span>
          </button>
          <span>rgb - {Array.isArray(rgb) ? rgb.join(", ") : rgb}</span>
          <span>hex - {hex}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorSuggestions;
