import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const fetchTransactions = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/transactions",
    method: "get",
    params,
  });
};

export const useGetTransactions = ({ params, id, extract = true }) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: fetchTransactions,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
