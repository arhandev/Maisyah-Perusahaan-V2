import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const fetchDashboard = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/dashboard",
    method: "get",
    params,
  });
};

export const useGetDashboard = ({ params, id, extract = true }) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: fetchDashboard,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
