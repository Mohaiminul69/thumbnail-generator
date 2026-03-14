const ColorControls = ({ rgba, setRgba }) => {
  const fullColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 0.1)`;

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setRgba((prev) => ({ ...prev, [name]: value }));
  };

  const colorLabel = (channel) => {
    switch (channel) {
      case "r":
        return "Red";
      case "g":
        return "Green";
      case "b":
        return "Blue";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        "--primary": fullColor,
        backgroundColor: "var(--primary)",
      }}
      className="flex flex-col gap-9 p-6 rounded-md text-white text-sm border border-white/10"
    >
      {["r", "g", "b"].map((channel) => (
        <div key={channel} className="flex flex-col gap-2">
          <label className="capitalize">{colorLabel(channel)}</label>
          <input
            type="range"
            min="0"
            max="255"
            name={channel}
            value={rgba[channel]}
            onChange={handleColorChange}
            style={{
              accentColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
            }}
            className="cursor-pointer"
          />
          <span className="text-center">{rgba[channel]}</span>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <label className="capitalize">Alpha</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          name="a"
          value={rgba.a}
          onChange={handleColorChange}
          style={{
            accentColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
          }}
          className="cursor-pointer"
        />
        <span className="text-center">{rgba.a}</span>
      </div>
    </div>
  );
};

export default ColorControls;
