import { Empty, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetDashboard } from "../../query/dashboard/useGetDashboard";
import Loading from "../../reusable/Loading";
import ErrorPage from "../ErrorPage";
import JobCard from "./_partials/JobCard";
import LamaranCard from "./_partials/LamaranCard";

function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useGetDashboard({
      id: "dashboard",
      onError,
    });

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row w-11/12 mx-auto lg:w-full  lg:mx-0 lg:ml-14 mb-4">
          <div className="lg:w-2/3 lg:pr-6 lg:border-r-2">
            <div className="mt-10">
              <h1 className="text-left mb-4 ml-5 font-bold text-3xl">Status</h1>
              <div className="text-left mt-3 ml-5 text-xl text-gray">
                Status postingan sejauh ini
              </div>
            </div>
            <div className="w-full flex gap-4 lg:gap-8 my-10 ">
              <div className="font-semibold shadow-md rounded-lg box-border border-gray-600 text-base text-secondary focus:bg-orange-200 bg-orange-100 px-4 py-8 ">
                <div className="flex gap-4 text-lg justify-around">
                  {/* <!-- LOWONGAN DIIKLANKAN --> */}
                  <div className="flex flex-col items-center">
                    <div className="mb-3">
                      <img src="/images/lowongan-diiklankan.png" alt="" />
                    </div>
                    <div className="text-xs lg:text-base text-center">
                      Lowongan Diiklankan
                    </div>
                    <div className="text-center text-black mt-4 text-3xl">
                      {data.job_active_count}
                    </div>
                  </div>

                  {/* <!-- KANDIDAT MASUK --> */}
                  <div className="flex flex-col items-center">
                    <div className="mb-3">
                      <img src="/images/kandidat-masuk.png" alt="" />
                    </div>
                    <div className="text-xs lg:text-base text-center">
                      Kandidat Masuk
                    </div>
                    <div className="text-center text-black mt-4 text-3xl">
                      {data.lamaran_count}
                    </div>
                  </div>

                  {/* <!-- LOWONGAN DIARSIPKAN --> */}
                  <div className="flex flex-col items-center">
                    <div className="mb-3">
                      <img src="/images/lowongan-diarsipkan.png" alt="" />
                    </div>
                    <div className="text-xs lg:text-base text-center">
                      Lowongan Diarsipkan
                    </div>
                    <div className="text-center text-black mt-4 text-3xl">
                      {data.job_archive_count}
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- UPLOAD POSTER LOWONGAN --> */}
              <div
                onClick={() => navigate("/dashboard/lowongan/create")}
                className="flex rounded-xl border-dashed border-2 border-primary text-primary p-2 focus:bg-orange-200 bg-sky-100 font-bold items-center justify-center"
              >
                <div className="flex items-center justify-center text-center">
                  <div className="flex flex-col text-lg font-bold font-sans items-center justify-center text-center">
                    <div className="">
                      <img
                        src="/images/upload-poster-lowongan.png"
                        alt=""
                        className="w-10 mb-3"
                      />
                    </div>
                    <div className="text-sm lg:text-xl">
                      Buat Lowongan Sekarang
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-10 lg:hidden">
              <h1 className="text-3xl font-bold ">Kandidat</h1>
              <div className="text-xl text-gray">Lamaran yang masuk</div>
            </div>
            <div className="my-10 overflow-x-auto flex lg:hidden gap-6">
              {data.lamarans?.length === 0 ? (
                <div className="w-full flex justify-center items-center">
                  <Empty className="mt-6" description="Tidak ada data" />
                </div>
              ) : (
                data.lamarans?.map((lamaran, index) => (
                  <LamaranCard key={index} lamaran={lamaran} />
                ))
              )}
            </div>
            <div className="my-10">
              <h1 className="text-left mb-4 mt-10 ml-5 text-2xl font-bold">
                Lowongan Diiklankan
              </h1>
              <div className="text-left text-xl ml-5 mt-3 mb-10 text-gray">
                Lowongan yang sedang anda iklankan
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              {data.jobs?.length === 0 ? (
                <div className="w-full flex justify-center items-center col-span-2">
                  <Empty className="mt-6" description="Tidak ada data" />
                </div>
              ) : (
                data.jobs?.map((job, index) => (
                  <JobCard key={index} company={data.company} job={job} />
                ))
              )}
            </div>
          </div>
          <div className="border-0 border-r-2 border-solid border-gray-custom border-opacity-30 hidden lg:block"></div>

          <div className="hidden lg:block w-1/3 px-6">
            <div className="my-10">
              <h1 className="text-3xl font-bold ">Kandidat</h1>
              <div className="text-xl text-gray">Lamaran yang masuk</div>
            </div>
            <div className="my-10 flex flex-col gap-6">
              {data.lamarans?.length === 0 ? (
                <div className="w-full flex justify-center items-center">
                  <Empty className="mt-6" description="Tidak ada data" />
                </div>
              ) : (
                data.lamarans?.map((lamaran, index) => (
                  <LamaranCard key={index} lamaran={lamaran} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
