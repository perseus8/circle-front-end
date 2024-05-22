import axios from "axios";

export const getNotifications = async ( userId: string ) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/notification/getNotifications",
    { userId },
  );
  return data.data;
}

export const readNotification = async ( notificationId: string ) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/notification/readNotification",
    { notificationId },
  );
  return data.data;
}