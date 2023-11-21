import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

function LamaranCard({ lamaran }) {
  const navigate = useNavigate();

  const onClickResume = () => {
    navigate({
      pathname: "/dashboard/kandidat",
      search: createSearchParams({ id: lamaran.id }).toString(),
    });
  };
  return (
    <div className="flex flex-col gap-2 shadow-md rounded-lg bg-white text-lg p-4 lg:p-8 border border-gray-300">
      <div className="font-bold">{lamaran.user.name}</div>
      <div className="grid lg:grid-cols-2 gap-4 text-primary ">
        <div className="">{lamaran.job.posisi_pekerjaan}</div>
        <div
          onClick={onClickResume}
          className="flex  text-secondary items-center gap-2 underline decoration-secondary text-base cursor-pointer"
        >
          <p className="">Lihat Resume</p>
          <img src="/images/arrow-orange.png" alt="" className="w-4" />
        </div>
      </div>
      <div className="">{lamaran.user.notel}</div>
    </div>
  );
}

export default LamaranCard;
