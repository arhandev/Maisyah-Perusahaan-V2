import { useCandidateStore } from "@/store/candidateStore";
import { getTimeJob } from "@/utils/getTimeJob";
import { IconEye } from "@tabler/icons-react";
import { Table, Typography } from "antd";
import { useGetLamaran } from "../../query/dashboard/useGetLamaran";

// const initialFilter = {
//   search: "",
//   status: "",
// };

function Kandidat() {
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text, record, index) => (
        <>{(index.current - 1) * index.pageSize + index + 1}</>
      ),
    },
    {
      title: "Nama Kandidat",
      render: (text, record) => (
        <Typography.Text>{record.user.name}</Typography.Text>
      ),
    },
    {
      title: "Posisi",
      render: (text, record) => (
        <Typography.Text>{record.job.posisi_pekerjaan}</Typography.Text>
      ),
    },
    {
      title: "Pada",
      sorter: true,
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => <div>{getTimeJob(record.created_at)}</div>,
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="flex justify-center items-center">
          <IconEye
            size={40}
            className="text-yellow-500"
            onClick={() => setCandidate(record)}
          />
        </div>
      ),
    },
  ];

  const { candidateData, setCandidate, deleteCandidate } = useCandidateStore();

  const { isLoading, data, error, isError, isFetching, refetch } =
    useGetLamaran({
      id: "lamaran",
    });

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      <div className="flex flex-col lg:flex-row w-11/12 mx-auto lg:w-full lg:mx-0 lg:mx-14">
        <div className="flex-grow lg:pr-6 lg:border-r-2 mb-4 mt-10">
          <div>
            <h1 className="text-3xl font-bold my-3">Kandidat Masuk</h1>
            <div className="text-left mt-3 text-lg text-gray-custom text-opacity-50">
              Daftar kandidat loker yang diiklankan
            </div>
            {/* <Filter
              initialFilter={initialFilter}
              filterData={filterData}
              setFilterData={setFilterData}
              fetchJobs={refetch}
            /> */}
            <Table
              loading={isLoading}
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={data?.data?.lamaran.data}
            />
          </div>
        </div>
      </div>
      <div className="border-0 border-r-2 border-solid border-gray-custom border-opacity-30 hidden h-full lg:block"></div>
    </div>
  );
}

export default Kandidat;
