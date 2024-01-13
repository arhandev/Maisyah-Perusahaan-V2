import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postRegisterVerification = (input) => {
  return request({
    url: "/perusahaan/register/verification-data",
    method: "post",
    data: input,
  });
};

export const useRegisterVerification = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postRegisterVerification,
    onSuccess,
    onError,
    onSettled,
  });
};
