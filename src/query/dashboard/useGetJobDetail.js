import { request } from "@/utils/request";
import { useQuery } from "react-query";

const fetchJobDetail = ({ queryKey }) => {
  const params = queryKey[1];
  const jobId = queryKey[0];
  return request({
    url: `/perusahaan/jobs/${jobId}`,
    method: "get",
    params,
  });
};

export const useGetJobDetail = ({
  onSuccess = () => {},
  onError = () => {},
  params = {},
  id,
  extract = true,
}) => {
  return useQuery([id, params], fetchJobDetail, {
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
