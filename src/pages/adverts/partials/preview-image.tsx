import React from "react";


interface PreviewImageProps {
    imageFile:File;
    onClick:()=>void
}
const PreviewImage = ({imageFile,onClick}:PreviewImageProps) => {
    function handleClick(){
        onClick()
    }
    const src = URL.createObjectURL(imageFile)

  return (
    <>
      <picture>
        <img
          className="aspect-video w-full rounded-md object-cover"
          src={src}
          alt="Product selected image preview"
        />
        <button
          className={`absolute -top-1 -right-1 cursor-pointer rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-gray-50 transition-colors duration-300 hover:bg-red-500`}
          onClick={handleClick}
        >
          X
        </button>
      </picture>
    </>
  );
};

export default PreviewImage;
