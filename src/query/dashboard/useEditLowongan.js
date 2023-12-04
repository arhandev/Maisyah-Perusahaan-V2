import { request } from "@/utils/request";
import { useMutation } from "react-query";

const postEditLowongan = ({ value, id }) => {
  console.log(value);
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
