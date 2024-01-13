import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: postUpdateProfile,
    onSuccess,
    onError,
    onSettled,
  });
};
