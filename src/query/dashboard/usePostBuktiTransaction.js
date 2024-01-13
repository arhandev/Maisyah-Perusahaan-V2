import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postBuktiTransaction = ({ value, id }) => {
  return request({
    url: `/perusahaan/transactions/${id}/upload-bukti`,
    method: "post",
    data: value,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useBuktiTransaction = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postBuktiTransaction,
    onSuccess,
    onError,
    onSettled,
  });
};
