import { useRef, useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      className="relative group cursor-pointer bg-[#9C2426] size-100 rounded-full shrink-0 shadow-[inset_0_0_0_10px_#9C2426,0_0_40px_rgba(185,28,28,0.6)] mt-10 overflow-hidden flex items-center justify-center"
    >
      {image ? (
        <img
          src={image}
          alt="Uploaded content"
          className="size-full object-cover"
        />
      ) : (
        <p className="text-white/50 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Click to upload image
        </p>
      )}

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
