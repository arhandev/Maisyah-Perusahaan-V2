import { Card, Empty, message } from "antd";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useGetJobs } from "../../../query/dashboard/useGetJobs";
import Loading from "../../../reusable/Loading";
import { useSearchParams } from "react-router-dom";
import ModalEdit from "./ModalEdit";

function LowonganActive({ status }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [jobData, setJobData] = useState({});

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { isLoading, data, error, isError, isFetching, refetch } = useGetJobs({
    id: "jobs",
    onError,
    params: { active: 1, status },
  });

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : data.jobs?.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 mt-4 gap-6">
          {data.jobs?.map((item, index) => (
            <JobCard
              key={index}
              company={data.company}
              job={item}
              setJobData={setJobData}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default LowonganActive;
