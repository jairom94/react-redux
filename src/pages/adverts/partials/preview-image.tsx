import React from "react";


interface PreviewImageProps {
    imageFile:File | string;
    onClick:()=>void
}
const PreviewImage = ({imageFile,onClick}:PreviewImageProps) => {
    function handleClick(){
        onClick()
    }
    let src;
    if(imageFile instanceof File){
      src = URL.createObjectURL(imageFile)
    }else if(typeof imageFile === 'string'){
      src = imageFile
    }

  return (
    <>
      <picture>
        <img
          className="aspect-video w-full rounded-md object-cover"
          src={src as string}
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
