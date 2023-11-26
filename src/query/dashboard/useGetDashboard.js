import { request } from "@/utils/request";
import { useQuery } from "react-query";

const fetchDashboard = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/dashboard",
    method: "get",
    params,
  });
};

export const useGetDashboard = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
}) => {
  return useQuery([id, params], fetchDashboard, {
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
