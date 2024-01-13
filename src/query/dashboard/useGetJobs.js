import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const fetchJobs = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/jobs",
    method: "get",
    params,
  });
};

export const useGetJobs = ({ params, id, extract = true }) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: fetchJobs,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
