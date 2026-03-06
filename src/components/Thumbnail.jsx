import StackIcons from "./StackIcons";
import ImageUploader from "./ImageUploader";
import ThumbnailTitle from "./ThumbnailTitle";

const Thumbnail = () => (
  <div className="bg-[#161616] relative aspect-video w-225 overflow-hidden shadow-[inset_0_0_0_20px_#9C2426]">
    <div className="bg-[radial-gradient(circle_at_70%_55%,rgba(156,36,38,0.4)_20%,rgba(22,22,22,1)_85%)] border-10 border-[#9C2426] rounded-3xl p-8 flex justify-between items-center h-full">
      <div className="h-[75%] flex flex-col justify-between space-y-3 text-white overflow-visible z-10 shrink w-1/2">
        <ThumbnailTitle />
        <StackIcons />
      </div>
      <ImageUploader />
      <div className="bg-[#9C2426] size-30 rounded-full absolute left-87.5 -bottom-16 shadow-[inset_0_0_0_10px_#9C2426,0_0_40px_rgba(185,28,28,0.6)]" />
    </div>
  </div>
);

export default Thumbnail;
