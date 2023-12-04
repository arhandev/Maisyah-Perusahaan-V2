import { request } from "@/utils/request";
import { useMutation } from "react-query";

const postLowongan = (input) => {
  return request({
    url: `/perusahaan/jobs`,
    method: "post",
    data: input,
  });
};

export const usePostLowongan = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation(postLowongan, {
    onSuccess,
    onError,
    onSettled,
  });
};
