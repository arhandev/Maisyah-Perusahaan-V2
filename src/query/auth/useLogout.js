import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postLogout = () => {
  return request({ url: "/perusahaan/logout", method: "post", data: {} });
};

export const useLogout = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postLogout,
    onSuccess,
    onError,
    onSettled,
  });
};
