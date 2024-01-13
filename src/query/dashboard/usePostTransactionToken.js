import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postTransactionToken = (input) => {
  return request({
    url: "/perusahaan/transactions/token",
    method: "post",
    data: input,
  });
};

export const useTransactionToken = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postTransactionToken,
    onSuccess,
    onError,
    onSettled,
  });
};
