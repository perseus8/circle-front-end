import { IoIosNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import TransparentInput from "@/components/input/TransparentInput";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchValueState } from "@/store/appSlice";

interface TopBarProps {
  setMenu: any;
}

const TopBar = ({ setMenu }: TopBarProps) => {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchValueState(search));
  }

  const handleKeyPress = (e: any) => {
    if( e.key == "Enter" ) {
      handleSearch();
    }
  }
  
  return (
    <div className="flex gap-6 items-center">
      <div
        onClick={() => {
          setMenu(true);
        }}
      >
        Menu &gt; Timeline
      </div>
      <div className="flex-grow flex p-2 rounded-2xl bg-front bg-opacity-10 items-center px-4">
        <div className="flex-grow ">
          <TransparentInput
            placeholder="Search here..."
            value={search}
            setValue={setSearch}
            type="text"
            onKeyDown={handleKeyPress}
          />
        </div>
        <FaSearch size={18} className="cursor-pointer" onClick={handleSearch}/>
      </div>
      <div className="p-2 bg-front bg-opacity-10 rounded-2xl px-4 hover:scale-95  duration-500 cursor-pointer">
        <MdMessage size={20} />
      </div>
      <div className="p-2 bg-front bg-opacity-10 rounded-2xl px-4 hover:scale-95 duration-500 cursor-pointer">
        <IoIosNotifications size={20} />
      </div>
    </div>
  );
};

export default TopBar;
