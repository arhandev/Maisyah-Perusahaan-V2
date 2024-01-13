import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

const searchVillage = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/wilayah/village",
    method: "get",
    params,
  });
};

export const useSearchVillage = ({
  params,
  id,
  extract = true,
  enabled,
  keepPreviousData,
}) => {
  return useQuery({
    queryKey: [id, params],
    queryFn: searchVillage,
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
