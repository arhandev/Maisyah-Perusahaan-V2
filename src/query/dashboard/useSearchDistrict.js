import { request } from "@/utils/request";
import { useQuery } from "react-query";

const searchDistrict = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/wilayah/district",
    method: "get",
    params,
  });
};

export const useSearchDistrict = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
  enabled,
  keepPreviousData,
}) => {
  return useQuery([id, params], searchDistrict, {
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
