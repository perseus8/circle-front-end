import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Menu from "./menu";
import React from "react";

interface LeftSideBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  menu: string;
}

const LeftSideBar = ({ isMenuOpen, setIsMenuOpen, menu }: LeftSideBarProps) => {
  return (
    <div
      className={` h-full lg:max-w-[330px] w-full flex fixed lg:relative z-50 lg:block ${
        !isMenuOpen ? "hidden" : ""
      }`}
      onClick={(e) => {
        setIsMenuOpen(false);
      }}
    >
      <div
        className={`flex flex-col p-6 h-full justify-between min-w-[330px] bg-back lg:block `}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <ProfileCard />
          <Menu selectedMenu={menu}/>
        </div>
        <Link className="text-center cursor-pointer" href="/settings">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
