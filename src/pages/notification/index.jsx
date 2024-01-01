import { useEffect } from "react";
import { useNotification } from "../../store/notification";
import ErrorPage from "../ErrorPage";
import Loading from "../../reusable/Loading";
import { Empty } from "antd";
import NotificationCard from "./_partials/NotificationCard";

function Notification() {
  const { isLoading, status, data, getNotification } = useNotification();

  useEffect(() => {
    getNotification();
  }, [getNotification]);

  if (!isLoading && status.error) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
          <div>
            <h1 className="text-3xl font-bold my-3">Notifikasi</h1>
            <div className="text-left mt-3 text-lg text-gray-custom text-opacity-50">
              Pemberitahuan perkembangan iklan loker
            </div>
          </div>
          <div className="flex flex-col gap-4 my-8">
            {data.notifications?.length === 0 ? (
              <Empty className="mt-6" description="Tidak ada data" />
            ) : (
              data.notifications?.map((notif, index) => (
                <NotificationCard notif={notif} key={index} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;
