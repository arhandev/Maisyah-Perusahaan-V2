import { request } from "@/utils/request";
import { useQuery } from "react-query";

const fetchCompanyProfile = ({ queryKey }) => {
  const params = queryKey[1];
  return request({
    url: "/perusahaan/company-profile",
    method: "get",
    params,
  });
};

export const useGetCompanyProfile = ({
  onSuccess = () => {},
  onError = () => {},
  params,
  id,
  extract = true,
}) => {
  return useQuery([id, params], fetchCompanyProfile, {
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
