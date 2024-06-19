/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@/providers/WalletContext";
import { setSelectedMessageUser } from "@/store/appSlice";
// import { numberWithCommas } from "@/utils/number";
// import Decimal from "decimal.js";
import React, { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Followers from "./Followers";
import Notifications from "./Notifications";
import "@dexhunterio/swaps/lib/assets/style.css";
import dynamic from "next/dynamic";

const LazyWalletConnectButton = lazy(
  () => import("@/components/button/ConnectWalletButton")
);
const Swap = dynamic(() => import("@dexhunterio/swaps"), { ssr: false });

interface RightSideBarProps {
  menu: any;
}

const RightSideBar = ({ menu }: RightSideBarProps) => {
  const { isConnected, connectedWalletKey } = useWallet();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { allUsers, selectedMessageUser, isNotification } = useSelector(
    (state: any) => state.app
  );
  const dispatch = useDispatch();

  const handleClickUser = (user: any) => {
    dispatch(setSelectedMessageUser(user));
  };

  return (
    <div className="h-full md:w-[330px] w-full bg-gradient-to-b from-black via-back3 to-black py-6 overflow-auto">
      <img alt="circle" src="/img/logo.png" className="w-full px-6" />
      {menu !== "Messages" ? (
        <div className="w-full px-6">
          <LazyWalletConnectButton />
          {isConnected && connectedWalletKey && (
            <div className="py-2">
              {/* <div className="my-2">
                Balance:{" "}
                {"" +
                  numberWithCommas(
                    new Decimal(adaBalance)
                      .dividedBy(Math.pow(10, 6))
                      .toNumber()
                      .toFixed(2)
                  )}
                &nbsp;₳
              </div> */}
              <Swap
                orderTypes={["SWAP", "LIMIT"]}
                colors={{
                  background: "#151427",
                  containers: "#3E3E4F",
                  subText: "#D9E3F0",
                  mainText: "#FFFFFF",
                  buttonText: "#FFFFFF",
                  accent: "#5705FD",
                }}
                selectedWallet={connectedWalletKey}
                theme="dark"
                width="280px"
                partnerCode="bork616464723171783730397173353838327a396765793837633871743370346b347767717932687a7261656365776e77666c77733539757965306c346a7637797039706668306a79733479716c7867687434707733736d61796b6872787464656473336c77793366da39a3ee5e6b4b0d3255bfef95601890afd80709"
                partnerName="BORK"
                displayType="DEFAULT"
              />
            </div>
          )}
          <div className="flex justify-center"></div>
          {isNotification ? <Notifications /> : <Followers />}
        </div>
      ) : (
        <div className="">
          {userInfo.contacts &&
            userInfo.contacts.map((id: string) => {
              const userIndex = allUsers.findIndex((u: any) => u._id == id);
              if (userIndex == -1) {
                return;
              }
              const user = allUsers[userIndex];
              return (
                <div key={id}>
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:bg-primary p-2 mx-4"
                    onClick={() => handleClickUser(user)}
                  >
                    <img
                      src={
                        user.avatarUrl
                          ? user.avatarUrl
                          : "/img/avatar/default.png"
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full border-front border-2 object-cover"
                    />
                    <div
                      className={`${
                        selectedMessageUser &&
                        selectedMessageUser._id == user._id &&
                        "text-primary"
                      }`}
                    >
                      {user.username}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
