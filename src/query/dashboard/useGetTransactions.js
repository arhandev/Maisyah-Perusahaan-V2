import { request } from "@/utils/request";
import { useQuery } from "react-query";

const fetchTransactions = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/transactions",
    method: "get",
    params,
  });
};

export const useGetTransactions = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
}) => {
  return useQuery([id, params], fetchTransactions, {
    onError,
    onSuccess,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
