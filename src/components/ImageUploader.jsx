import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

const ImageUploader = ({image, setImage}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const shouldRemove = window.confirm(
      "Would you like to remove the background?",
    );

    if (!shouldRemove) {
      setImage(URL.createObjectURL(file));
      return;
    }

    setIsProcessing(true);

    try {
      const blob = await removeBackground(file);
      const resultUrl = URL.createObjectURL(blob);
      setImage(resultUrl);
    } catch (error) {
      console.error("Background removal failed:", error);
      // Fallback: just show the original image if AI fails
      setImage(URL.createObjectURL(file));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      style={{
        backgroundColor: "var(--primary)",
        boxShadow: `inset 0 0 0 10px var(--primary), 0 0 40px rgba(var(--primary-rgb), 0.6)`,
      }}
      className="relative group cursor-pointer size-100 rounded-full shrink-0 mt-10 overflow-hidden flex items-center justify-center"
    >
      {isProcessing ? (
        <div className="text-white text-center">
          <p className="text-xs uppercase tracking-widest animate-bounce">
            Removing Background...
          </p>
        </div>
      ) : image ? (
        <img
          src={image}
          alt="Result"
          className="w-full h-full object-cover drop-shadow-2xl"
        />
      ) : (
        <span className="text-white/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Click to upload photo
        </span>
      )}

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
