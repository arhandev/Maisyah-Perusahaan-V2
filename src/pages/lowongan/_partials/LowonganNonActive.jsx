import { Card, Empty, message } from "antd";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useGetJobs } from "../../../query/dashboard/useGetJobs";
import Loading from "../../../reusable/Loading";
import ModalEdit from "./ModalEdit";

function LowonganNonActive({ status }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [jobData, setJobData] = useState({});
  const [confirmData, setConfirmData] = useState({});

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
    params: { active: 0, status },
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
          <ModalEdit
            jobData={jobData}
            setJobData={setJobData}
            fetchJobs={refetch}
          />
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

export default LowonganNonActive;
