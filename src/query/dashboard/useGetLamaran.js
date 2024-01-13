import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const fetchLamaran = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/lamaran",
    method: "get",
    params,
  });
};

export const useGetLamaran = ({ params, id, extract = true }) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: fetchLamaran,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
