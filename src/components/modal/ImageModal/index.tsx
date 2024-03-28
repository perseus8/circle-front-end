/* eslint-disable @next/next/no-img-element */
import PrimaryButton from "@/components/button/PrimaryButton";
import PostView from "@/components/view/PostView/PostView";
import { setImageModalState } from "@/store/modalSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ImageModal = () => {
  const { imageModalState } = useSelector((state: any) => state.modal);
  const { imageModalData } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setImageModalState(false));
  };

  return imageModalState ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90"
      onMouseDown={() => {
        onClose();
      }}
    >
      <img
        className={`rounded-3xl object-contain max-h-[90vh] max-w-[90vw] scale-in`}
        src={imageModalData}
        alt="image-preview"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      />

      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default ImageModal;