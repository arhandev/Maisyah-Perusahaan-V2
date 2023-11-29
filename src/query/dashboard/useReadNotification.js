import { request } from "@/utils/request";
import { useMutation } from "react-query";

const readNotification = ({ notifId }) => {
  return request({
    url: `/perusahaan/get_notif/${notifId}/read`,
    method: "get",
  });
};

export const useReadNotification = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation(readNotification, {
    onSuccess,
    onError,
    onSettled,
  });
};
