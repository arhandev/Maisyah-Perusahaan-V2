import { request } from "@/utils/request";
import { useQuery } from "react-query";

const searchVillage = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/wilayah/village",
    method: "get",
    params,
  });
};

export const useSearchVillage = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
  enabled,
  keepPreviousData,
}) => {
  return useQuery([id, params], searchVillage, {
    onError,
    onSuccess,
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
