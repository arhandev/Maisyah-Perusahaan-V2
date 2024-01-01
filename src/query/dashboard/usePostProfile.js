import { request } from "@/utils/request";
import { useMutation } from "react-query";

const postUpdateProfile = (input) => {
  return request({
    url: "/perusahaan/company-profile",
    method: "post",
    data: input,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateProfile = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation(postUpdateProfile, {
    onSuccess,
    onError,
    onSettled,
  });
};
