import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: postEditLowongan,
    onSuccess,
    onError,
    onSettled,
  });
};
