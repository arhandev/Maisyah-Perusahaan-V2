import { request } from "@/utils/request";
import { useMutation } from "react-query";

const postRegister = (input) => {
  return request({
    url: "/perusahaan/register",
    method: "post",
    data: input,
  });
};

export const useRegister = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation(postRegister, {
    onSuccess,
    onError,
    onSettled,
  });
};
