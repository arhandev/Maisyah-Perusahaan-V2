import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getTimeJob } from "../../../utils/getTimeJob";
import { useReadNotification } from "../../../query/dashboard/useReadNotification";
import { useNotification } from "../../../store/notification";

function NotificationCard({ notif }) {
  const navigate = useNavigate();
  const { isNotificationLoading, status, data, getNotification } =
    useNotification();

  const onClick = async () => {
    readNotification({ notifId: notif.id });
  };

  const onError = (error) => {
    console.log(error);
  };

  const onSuccess = async (response) => {
    await getNotification();
    if (notif.type === "lamaran") {
      navigate({
        pathname: "/dashboard/kandidat",
        search: createSearchParams({ id: notif.lamaran_id }).toString(),
      });
    } else if (notif.type === "lowongan") {
      navigate({
        pathname: "/dashboard/lowongan",
        search: createSearchParams({
          id: notif.job_id,
          tab: "aktif",
        }).toString(),
      });
    }
  };

  const { mutate: readNotification, isLoading } = useReadNotification({
    onError,
    onSuccess,
  });
  if (notif.type === "lamaran") {
    return (
      <div
        className={`py-6 px-8 border-solid border-r-8 border-gray-300 rounded-lg flex flex-col gap-2 cursor-pointer ${
          notif.is_read === 0 &&
          "bg-secondary border bg-opacity-10 border-secondary"
        } ${notif.is_read === 1 && "border-2"}`}
        onClick={onClick}
      >
        <div className="flex gap-4 items-center">
          <img src="/images/notification/people.svg" className="w-6" alt="" />
          <h3 className="font-bold text-lg">{notif.title}</h3>
        </div>
        <p className="max-w-xl leading-8">{notif.message}.</p>
        <p className="self-end text-gray-custom text-opacity-50">
          {notif.created_at}
          {/* {getTimeJob(notif.created_at)} */}
        </p>
      </div>
    );
  } else if (notif.type === "lowongan") {
    return (
      <div
        className={`py-6 px-8 border-solid border-r-8 border-gray-300 rounded-lg flex flex-col gap-2 cursor-pointer ${
          notif.is_read === 0 &&
          "bg-secondary border bg-opacity-10 border-secondary"
        } ${notif.is_read === 1 && "border-2"}`}
        onClick={onClick}
      >
        <div className="flex gap-4 items-center">
          <img
            src={
              notif.status === "success"
                ? "/images/notification/checklist.svg"
                : "/images/notification/cross.svg"
            }
            className="w-6"
            alt=""
          />
          <h3 className="font-bold text-lg"> {notif.title}</h3>
        </div>
        <p className="max-w-xl leading-8">{notif.message}.</p>
        <p className="self-end text-gray-custom text-opacity-50">
          {getTimeJob(notif.created_at)}
        </p>
      </div>
    );
  } else {
    <>Empty</>;
  }
}

export default NotificationCard;
