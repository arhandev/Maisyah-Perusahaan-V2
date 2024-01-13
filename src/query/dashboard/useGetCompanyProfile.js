import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const fetchCompanyProfile = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/company-profile",
    method: "get",
    params,
  });
};

export const useGetCompanyProfile = ({ params, id, extract = true }) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: fetchCompanyProfile,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
