import { isEmpty } from "lodash";
import React from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import numeral from "../../../utils/numeralLocale";
function JobCard({ company, job }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const onClickJob = () => {
    navigate({
      pathname: "/dashboard/lowongan",
      search: createSearchParams({
        id: job.id,
        ...Object.fromEntries([...searchParams]),
      }).toString(),
    });
  };

  const checkColor = () => {
    if (job.status === "validate") {
      return "primary";
    } else if (job.status === "unpaid") {
      return "secondary";
    } else if (job.status === "confirmed") {
      return "[#17AFE3]";
    } else if (job.status === "paid") {
      return "green-custom";
    } else if (job.status === "failed") {
      return "red-custom";
    } else if (job.status === "expired") {
      return "gray-custom";
    }
  };

  const Tag = () => {
    return (
      <div className={`self-end font-bold`}>
        <div
          className={`text-${checkColor()} bg-${checkColor()} bg-opacity-20 text-center rounded-full w-32 max-w-xs py-2`}
        >
          {job.status}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col shadow-md rounded-lg border-solid border-2 border-r-8 border-r-${checkColor()} border-gray-300 text-xl p-6`}
    >
      <Tag />
      <div className="grid grid-cols-7 items-center gap-4">
        <div className="col-span-2">
          <img
            src={
              company.profile_picture ?? "/images/profile-default-company.png"
            }
            className="w-full rounded-full"
            alt=""
          />
        </div>
        <div onClick={onClickJob} className="col-span-4 cursor-pointer">
          <div className="text-lg font-bold hover:underline">
            {job.posisi_pekerjaan.length > 30
              ? `${job.posisi_pekerjaan.slice(0, 30)} ...`
              : job.posisi_pekerjaan}
          </div>
          <div className="text-primary">{company.nama_perusahaan}</div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 text-base">
        <div className="flex gap-4 items-center">
          <div>
            <img src="/images/lowongan/building.png" className="w-5" alt="" />
          </div>
          <h3 className="capitalize">
            {isEmpty(job.district) ? (
              <>{job.lokasi}</>
            ) : (
              <>
                {job.district.name.toLowerCase()} -{" "}
                {job.district.city.name.toLowerCase()}
              </>
            )}
          </h3>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <img
              src="/images/lowongan/zondicons_currency-dollar.png"
              className="w-5"
              alt=""
            />
          </div>
          {job.is_display_salary ? (
            <div>
              Rp {numeral(job.batas_bawah_gaji).format("0,0")} - Rp{" "}
              {numeral(job.batas_atas_gaji).format("0,0")} / bulan
            </div>
          ) : (
            <div>Perusahaan tidak menampilkan gaji</div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <img src="/images/lowongan/job.png" className="w-5" alt="" />
          </div>
          <div>Pengalaman {job.pengalaman}</div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
