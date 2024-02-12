import { useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getTimeJob } from "../../../utils/getTimeJob";

function KandidatCard({ lamaran, selected, setSelected }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  useEffect(() => {
    if (id === lamaran.id) {
      setSelected(lamaran);
    }
  }, []);

  const selectCard = () => {
    setSelected(lamaran);
    navigate({
      pathname: "/dashboard/kandidat",
      search: createSearchParams({ id: lamaran.id }).toString(),
    });
  };

  

  return (
    <div
      onClick={selectCard}
      className={`flex flex-col gap-6 border-solid border-2 rounded-xl px-10 py-6 ${
        lamaran.status === "sent" &&
        "border-secondary bg-secondary bg-opacity-20 border-opacity-60"
      } ${
        selected
          ? "border-secondary bg-secondary bg-opacity-5 border-opacity-30"
          : "cursor-pointer"
      }`}
    >
      <div className="flex gap-3 items-center">
        <div className="w-1/12">
          <img src="/images/profile-blue.svg" className="w-full" alt="" />
        </div>
        <div className="font-bold text-xl w-11/12">
          {lamaran.user.name} melamar posisi{" "}
          <span className="text-primary">{lamaran.job.posisi_pekerjaan}</span>
        </div>
      </div>
      <div className="text-lg">
        Klik untuk melihat Resume dan Data Diri dari pelamar.
      </div>
      <div className="self-end text-lg text-gray-400">
        {getTimeJob(lamaran.created_at)}
      </div>
    </div>
  );
}

export default KandidatCard;
