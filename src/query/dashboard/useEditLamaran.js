import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postEditLamaran = ({ value, id }) => {
  return request({
    url: `/perusahaan/lamaran/${id}`,
    method: "put",
    data: value,
  });
};

export const useEditLamaran = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postEditLamaran,
    onSuccess,
    onError,
    onSettled,
  });
};
