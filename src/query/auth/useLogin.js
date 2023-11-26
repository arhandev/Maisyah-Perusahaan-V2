import { request } from "@/utils/request";
import { useMutation } from "react-query";

const postLogin = (input) => {
  return request({ url: "/perusahaan/login", method: "post", data: input });
};

export const useLogin = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation(postLogin, {
    onSuccess,
    onError,
    onSettled,
  });
};
