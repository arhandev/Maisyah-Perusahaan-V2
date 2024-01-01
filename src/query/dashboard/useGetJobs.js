import { request } from "@/utils/request";
import { useQuery } from "react-query";

const fetchJobs = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/jobs",
    method: "get",
    params,
  });
};

export const useGetJobs = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
}) => {
  return useQuery([id, params], fetchJobs, {
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
