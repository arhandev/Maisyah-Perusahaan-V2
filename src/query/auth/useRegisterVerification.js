import { request } from "@/utils/request";
import { useMutation } from "react-query";

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
  return useMutation(postRegisterVerification, {
    onSuccess,
    onError,
    onSettled,
  });
};
