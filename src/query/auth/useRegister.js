import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: postRegister,
    onSuccess,
    onError,
    onSettled,
  });
};
