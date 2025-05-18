import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Menu from "./menu";
import React from "react";
import { IoMdSettings } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAuthState, setUserInfo } from "@/store/authSlice";
import { useRouter } from "next/navigation";

interface LeftSideBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  menu: string;
}

const LeftSideBar = ({ isMenuOpen, setIsMenuOpen, menu }: LeftSideBarProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(setAuthState(false));
    dispatch(
      setUserInfo({
        username: "",
        email: "",
        token: "",
      })
    );
    router.push("/");
  };
  
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
        className={`flex flex-col p-6 h-full justify-between min-w-[330px] bg-back`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <ProfileCard />
          <Menu selectedMenu={menu} />
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-4">
            <Link className="text-center cursor-pointer" href="/profile">
              <IoMdSettings className="w-5 h-5" />
            </Link>
            <Link
              className="text-center cursor-pointer"
              href="/"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              className="text-center cursor-pointer"
              href="/"
            >
              <FaDiscord className="w-5 h-5" />
            </Link>
          </div>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
