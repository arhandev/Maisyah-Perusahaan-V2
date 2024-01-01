import { request } from "@/utils/request";
import { useQuery } from "react-query";

const fetchLamaran = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/lamaran",
    method: "get",
    params,
  });
};

export const useGetLamaran = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
}) => {
  return useQuery([id, params], fetchLamaran, {
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
