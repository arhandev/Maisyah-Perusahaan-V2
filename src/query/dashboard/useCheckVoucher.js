import { request } from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

const postCheckVoucher = (input) => {
  return request({
    url: "/perusahaan/vouchers/check",
    method: "post",
    data: input,
  });
};

export const useCheckVoucher = ({
  onSuccess = () => {},
  onError = () => {},
  onSettled = () => {},
}) => {
  return useMutation({
    mutationFn: postCheckVoucher,
    onSuccess,
    onError,
    onSettled,
  });
};
