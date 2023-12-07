import { request } from "@/utils/request";
import { useMutation } from "react-query";

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
  return useMutation(postTransactionToken, {
    onSuccess,
    onError,
    onSettled,
  });
};
