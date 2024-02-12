import { Empty, message } from "antd";
import { useState } from "react";
import { useGetJobs } from "../../../query/dashboard/useGetJobs";
import Loading from "../../../reusable/Loading";
import JobCard from "./JobCard";
import ModalEdit from "./ModalEdit";

function LowonganNonActive({ status }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [jobData, setJobData] = useState({});
  const [confirmData, setConfirmData] = useState({});

  const { isLoading, data, error, isError, isFetching, refetch } = useGetJobs({
    id: "jobs",
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
