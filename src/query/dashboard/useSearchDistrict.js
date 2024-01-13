import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const searchDistrict = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/wilayah/district",
    method: "get",
    params,
  });
};

export const useSearchDistrict = ({
  params,
  id,
  extract = true,
  enabled,
  keepPreviousData,
}) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: searchDistrict,
    enabled: enabled,
    keepPreviousData: keepPreviousData,
    refetchOnWindowFocus: false,
    select: (data) => {
      if (extract) {
        return data.data.data;
      } else {
        return data;
      }
    },
  });
};
