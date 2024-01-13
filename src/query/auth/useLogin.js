import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postLogin = (input) => {
  return request({ url: "/perusahaan/login", method: "post", data: input });
};

export const useLogin = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess,
    onError,
    onSettled,
  });
};
