import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHand} from '@fortawesome/free-solid-svg-icons'
import useAuth from "../hooks/useAuth";

const UploadImg= ({setGetImg,getImg}) => {
  const [selectedImages, setSelectedImages] = useState(
    [getImg]
    );
  const { theme } = useAuth();

  const onSelectFile = (event) => {
    setSelectedImages([]);
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(imagesArray)
    setGetImg({url:imagesArray[0],file:selectedFiles[0]})
    event.target.value = "";
  };
  
  return (
    <section className=" relative">

      <label  className={`  mx-auto  my-0 flex  flex-col justify-center items-center rounded-md cursor-pointer text-lg     overflow-hidden font-[SF-Pro-Text-Medium]`}>
        <input
          type="file"
          name="images"
          className="imgupload w-full h-full absolute opacity-0"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
        <div className="h-full flex justify-center w-full">
        {selectedImages == "" ? (
        <div className=" py-4 px-4 rounded-md">
          <h1 className={`text-xl font-[700] text-mainTextColor`} >Drap and drop or click</h1>
          <div className="text-center mt-2">
            <FontAwesomeIcon icon={faHand} className={`text-6xl ${theme=='light'?'text-[#82b012]':'text-white'}`}/>
          </div>
        </div>
        ) : (
          selectedImages[0] && (
            <div className="w-full min-h-[120px]  max-h-[200px] p-2 image  flex justify-center">
              <img src={selectedImages[0] ||getImg}   style={{maxWidth:'100%',height:'auto'}}  alt="upload" />
              <div className="w-full h-full   absolute left-[0%] flex justify-center items-center top-0  ">
             <div className="bg-gray rounded-full  p-2 w-12 h-12 flex justify-center items-center">
             {/* <Cloud/> */}
             </div>
              </div>
            </div>
          )
        )}
        </div>
      </label>
    </section>
  );
};

export default UploadImg;
