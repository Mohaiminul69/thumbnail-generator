import StackIcons from "./StackIcons";
import ImageUploader from "./ImageUploader";
import ThumbnailTitle from "./ThumbnailTitle";

const Thumbnail = ({ rgba }) => {
  const fullColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  const rgbOnly = `${rgba.r}, ${rgba.g}, ${rgba.b}`;

  return (
    <>
      <div
        style={{
          "--primary": fullColor,
          "--primary-rgb": rgbOnly,
          boxShadow: `inset 0 0 0 20px ${fullColor}`,
        }}
        className="bg-[#161616] relative aspect-video w-225 overflow-hidden"
      >
        <div
          style={{
            borderColor: "var(--primary)",
            background: `radial-gradient(circle at 70% 55%, rgba(var(--primary-rgb), 0.4) 20%, rgba(22,22,22,1) 85%)`,
          }}
          className="bg-[radial-gradient(circle_at_70%_55%,rgba(156,36,38,0.4)_20%,rgba(22,22,22,1)_85%)] border-10 rounded-3xl p-8 flex justify-between items-center h-full"
        >
          <div className="h-[75%] flex flex-col justify-between space-y-3 text-white overflow-visible z-10 shrink w-1/2">
            <ThumbnailTitle />
            <StackIcons />
          </div>
          <ImageUploader />
          <div
            style={{
              backgroundColor: "var(--primary)",
              boxShadow: `inset 0 0 0 10px var(--primary), 0 0 40px rgba(var(--primary-rgb), 0.6)`,
            }}
            className="size-30 rounded-full absolute left-87.5 -bottom-16"
          />
        </div>
      </div>
    </>
  );
};

export default Thumbnail;
