/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getNotifications, readNotification } from "@/apis/notification";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [notifications, setNotifications] = React.useState([]);
    const router = useRouter();

  const fetchData = async () => {
    const { data } = await getNotifications(userInfo._id);
    setNotifications(data);
  };

  const handleClick = async ( notification: any ) => {
    await readNotification(notification._id);

    switch(notification.type){
        case "FOLLOWED":
            router.push('/profile?id=' + notification.actionUser[0].username);
        break;
        case "LIKE":
            router.push('/timeline?blog=' + notification.blogId);
        break;
        default: 
            router.push('/timeline?blog=' + notification.blogId);
        break;
    }
    fetchData();
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {notifications.map((value: any, index) => (
        <div key={index} className="flex gap-2 items-center cursor-pointer hover:bg-primary p-2" onClick={() => handleClick(value)}>
          <img
            src={
              value.actionUser[0].avatarUrl
                ? value.actionUser[0].avatarUrl
                : "/img/avatar/default.png"
            }
            alt="avatar"
            className="w-10 h-10 rounded-full border-front border-2 object-cover"
          />
          <div className="flex-grow">
            <div>
              {value.actionUser[0].circlename}{" "}
              <span className="opacity-50">
                @{value.actionUser[0].username}
              </span>
            </div>
            <div className="">{value.content}</div>
          </div>
          {!value.markedAsRead && <div className="w-4 h-4 bg-primary2 rounded-full"></div>}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
