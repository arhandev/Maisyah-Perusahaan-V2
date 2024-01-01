import { request } from "@/utils/request";
import { useMutation } from "react-query";

const postEditLowongan = ({ value, id }) => {
  return request({
    url: `/perusahaan/jobs/${id}`,
    method: "put",
    data: value,
  });
};

export const useEditLowongan = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation(postEditLowongan, {
    onSuccess,
    onError,
    onSettled,
  });
};
