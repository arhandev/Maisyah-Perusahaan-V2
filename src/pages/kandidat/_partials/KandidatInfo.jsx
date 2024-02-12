import { useEditLamaran } from "@/query/dashboard/useEditLamaran";
import { useCandidateStore } from "@/store/candidateStore";
import { Modal, Timeline, message } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useState } from "react";
import CandidateTag from "./CandidateTag";
import SettingModal from "./SettingModal";

function KandidatInfo() {
  const { candidateData, setCandidate, deleteCandidate } = useCandidateStore();
  const [messageApi, contextHolder] = message.useMessage();
  const [settingModal, setSettingModal] = useState(false);

  //   const query = useQuery();

  const sendMessage = () => {
    let notel = candidateData.user.notel;
    if (notel.substring(0, 2) === "62") {
      window.open(`https://wa.me/${candidateData.user.notel}`);
    } else if (notel.substring(0, 1) === "0") {
      notel = notel.substring(1);
      window.open(`https://wa.me/62${candidateData.user.notel}`);
    } else if (notel.substring(0, 1) === "8") {
      window.open(`https://wa.me/62${candidateData.user.notel}`);
    } else {
      Modal.error({
        title: "Nomor Handphone Tidak Valid",
      });
    }
  };

  const onSuccessEditLamaran = (response) => {
    messageApi.success(response.data.info);
    setCandidate(response.data.data.lamaran);
    // refetch();
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { mutate: editLamaran, isEditLoading } = useEditLamaran({
    onError,
    onSuccess: onSuccessEditLamaran,
  });

  const markAsRead = () => {
    editLamaran({ value: { status: "review" }, id: candidateData.id });
  };

  const acceptLamaran = () => {
    editLamaran({ value: { status: "qualify" }, id: candidateData.id });
  };

  const rejectLamaran = () => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menolak lowongan ini?",
      content:
        "Dengan menolak lamaran ini, maka pencari kerja akan masuk ke dalam status gagal sehingga tidak bisa lanjut ke tahap berikutnya.",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
      onOk() {
        editLamaran({ value: { status: "failed" }, id: candidateData.id });
      },
      okText: "Tolak",
      cancelText: "Batal",
    });
  };

  const onClickResume = () => {
    window.open(candidateData.user.user_meta.resume);
  };

  const openModalSetting = () => {
    setSettingModal(true);
  };

  if (window.innerWidth < 1000) {
    <Modal
      title={
        <div className="flex gap-4">
          <h1 className="font-bold text-2xl text-gray-custom">
            Lihat Detail Kandidat
          </h1>
        </div>
      }
      footer={<span />}
      width={"100%"}
      open={!isEmpty(candidateData)}
      onCancel={deleteCandidate}
      closeIcon={false}
    >
      <div className="flex flex-col gap-2 my-8 text-xl">
        <CandidateTag status={candidateData.status} />

        <div className="">
          <h1 className="text-xl font-bold text-gray-custom tracking-wide">
            Biodata
          </h1>
          <div className="flex flex-col gap-4 mx-2 my-4 text-lg">
            <div className="w-full flex justify-between">
              <p className="font-bold">Nama </p>
              <p>{candidateData.user.name}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">Resume </p>
              <div>
                {candidateData.user.user_meta.resume ? (
                  <div
                    onClick={onClickResume}
                    className="text-primary cursor-pointer underline hover:text-opacity-70"
                  >
                    <p>Klik Untuk Melihat Resume</p>
                  </div>
                ) : (
                  <p>Resume tidak tersedia</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">No. Handphone </p>
              <p>{candidateData.user.notel}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">Email </p>
              <p>{candidateData.user.email}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">Tanggal Lahir </p>
              <p>{candidateData.user.user_meta.tgl_lahir ?? "-"}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">Domisili </p>
              <p>{candidateData.user.user_meta.domisili ?? "-"}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold">Deskripsi </p>
              <p>{candidateData.user.user_meta.deskripsi ?? "-"}</p>
            </div>
            <div className="w-full flex flex-col">
              <p className="font-bold">Deskripsi </p>
              <p className="mt-3">
                {candidateData.user.user_meta.deskripsi ?? "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
            Surat Lamaran
          </h1>
          <div className="flex flex-col gap-4 my-4">
            {candidateData.pesan_lamaran ? (
              <div className="border border-gray-custom rounded-xl p-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: candidateData.pesan_lamaran,
                  }}
                ></span>
              </div>
            ) : (
              <div className="text-xl text-center my-4">
                Tidak ada Pesan Lamaran
              </div>
            )}
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
            {" "}
            Pengalaman Kerja
          </h1>
          <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
            <Timeline>
              {isEmpty(candidateData.user.user_pekerjaan) ? (
                <div className="text-xl text-center my-4">
                  Tidak ada pengalaman kerja
                </div>
              ) : (
                candidateData.user.user_pekerjaan.map((item, index) => (
                  <Timeline.Item
                    key={index}
                    color={item.tgl_akhir ? "gray" : "blue"}
                  >
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl font-bold text-gray-custom">
                        {item.posisi}
                      </h1>
                      <h2 className="text-lg text-gray-custom">
                        {item.perusahaan}
                      </h2>
                      <h2 className="text-lg text-gray-custom">
                        {dayjs(item.tgl_mulai, "YYYY-MM").format("MMMM YYYY")} -{" "}
                        {item.tgl_akhir
                          ? dayjs(item.tgl_akhir, "YYYY-MM").format("MMMM YYYY")
                          : "present"}
                      </h2>
                      <p className="text-base">{item.bio}</p>
                    </div>
                  </Timeline.Item>
                ))
              )}
            </Timeline>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
            {" "}
            Pendidikan
          </h1>
          <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
            <Timeline>
              {isEmpty(candidateData.user.user_pendidikan) ? (
                <div className="text-xl text-center my-4">
                  Tidak ada pendidikan
                </div>
              ) : (
                candidateData.user.user_pendidikan.map((item, index) => (
                  <Timeline.Item
                    key={index}
                    color={item.tgl_akhir ? "gray" : "blue"}
                  >
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl font-bold text-gray-custom">
                        {item.institusi}
                      </h1>
                      <h2 className="text-lg text-gray-custom">
                        {item.bidang_studi}
                      </h2>
                      <h2 className="text-lg text-gray-custom">{item.gelar}</h2>
                      <h2 className="text-lg text-gray-custom">
                        {dayjs(item.tgl_mulai, "YYYY-MM").format("MMMM YYYY")} -{" "}
                        {item.tgl_akhir
                          ? dayjs(item.tgl_akhir, "YYYY-MM").format("MMMM YYYY")
                          : "present"}
                      </h2>
                      <p className="text-base">{item.bio}</p>
                    </div>
                  </Timeline.Item>
                ))
              )}
            </Timeline>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
            {" "}
            Skills
          </h1>
          {isEmpty(candidateData.user.skills) ? (
            <div className="text-xl text-center my-4">Tidak ada skill</div>
          ) : (
            <div className="flex flex-wrap gap-4 my-3">
              {candidateData.user.skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-primary font-bold px-4 py-2 bg-primary bg-opacity-20 rounded-xl"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {(candidateData.status === "sent" ||
          candidateData.status === "review") && (
          <div className="my-6 flex flex-col gap-4">
            {candidateData.status === "sent" && (
              <button
                onClick={markAsRead}
                className="w-full border-2 border-primary bg-primary text-white rounded-lg py-3 font-bold"
              >
                Tandai Sudah Dibaca
              </button>
            )}
            <button
              onClick={acceptLamaran}
              className="w-full border-2 border-primary bg-red text-primary rounded-lg py-3 font-bold"
            >
              Terima Lamaran
            </button>
            <button
              onClick={rejectLamaran}
              className="w-full border-2 border-red-custom text-red-custom rounded-lg py-3 font-bold"
            >
              Tolak Lamaran
            </button>
          </div>
        )}
        {candidateData.status === "qualify" && (
          <div className="my-6 flex flex-col gap-4">
            <button
              onClick={sendMessage}
              className="w-full border-2 border-green-custom bg-green-custom text-white rounded-lg py-3 font-bold"
            >
              Hubungi Pelamar
            </button>
          </div>
        )}
      </div>
    </Modal>;
  }

  return (
    <>
      {!isEmpty(candidateData) && (
        <SettingModal
          settingModal={settingModal}
          setSettingModal={setSettingModal}
          selected={candidateData}
          setSelected={setCandidate}
          messageApi={messageApi}
        />
      )}
      <div className="hidden lg:block flex-grow px-6 mb-4 mt-10">
        <div>
          <h1 className="text-3xl font-bold my-3">Detail Kandidat</h1>
          <div className="text-left mt-3 text-lg text-gray-custom text-opacity-50">
            Berikut Merupakan Detail Kandidat yang dilihat
          </div>
          <div className="flex flex-col gap-2 my-8 text-xl">
            {contextHolder}
            <CandidateTag status={candidateData.status} />
            {/* Biodata */}
            <div>
              <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                Biodata
              </h1>
              <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
                <div className="w-full flex justify-between">
                  <p className="font-bold">Nama </p>
                  <p>{candidateData.user.name}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-bold">Resume </p>
                  <div>
                    {candidateData.user.user_meta.resume ? (
                      <div
                        onClick={onClickResume}
                        className="text-primary cursor-pointer underline hover:text-opacity-70"
                      >
                        <p>Klik Untuk Melihat Resume</p>
                      </div>
                    ) : (
                      <p>Resume tidak tersedia</p>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-bold">No. Handphone </p>
                  <p>{candidateData.user.notel}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-bold">Email </p>
                  <p>{candidateData.user.email}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-bold">Tanggal Lahir </p>
                  <p>{candidateData.user.user_meta.tgl_lahir ?? "-"}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-bold">Domisili </p>
                  <p>{candidateData.user.user_meta.domisili ?? "-"}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-bold">Deskripsi </p>
                  <p>{candidateData.user.user_meta.deskripsi ?? "-"}</p>
                </div>
              </div>
            </div>
            {/* Surat Lamaran */}
            <div className="">
              <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                Surat Lamaran
              </h1>
              <div className="flex flex-col gap-4 my-4">
                {candidateData.pesan_lamaran ? (
                  <div className="border-solid border border-gray-custom rounded-xl p-4">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: candidateData.pesan_lamaran,
                      }}
                    ></span>
                  </div>
                ) : (
                  <div className="text-xl text-center my-4">
                    Tidak ada Pesan Lamaran
                  </div>
                )}
              </div>
            </div>
            {/* Pengalaman Kerja */}
            <div className="">
              <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                {" "}
                Pengalaman Kerja
              </h1>
              <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
                <Timeline>
                  {isEmpty(candidateData.user.user_pekerjaan) ? (
                    <div className="text-xl text-center my-4">
                      Tidak ada pengalaman kerja
                    </div>
                  ) : (
                    candidateData.user.user_pekerjaan.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        color={item.tgl_akhir ? "gray" : "blue"}
                      >
                        <div className="flex flex-col gap-1">
                          <h1 className="text-xl font-bold text-gray-custom">
                            {item.posisi}
                          </h1>
                          <h2 className="text-lg text-gray-custom">
                            {item.perusahaan}
                          </h2>
                          <h2 className="text-lg text-gray-custom">
                            {dayjs(item.tgl_mulai, "YYYY-MM").format(
                              "MMMM YYYY"
                            )}{" "}
                            -{" "}
                            {item.tgl_akhir
                              ? dayjs(item.tgl_akhir, "YYYY-MM").format(
                                  "MMMM YYYY"
                                )
                              : "present"}
                          </h2>
                          <p className="text-base">{item.bio}</p>
                        </div>
                      </Timeline.Item>
                    ))
                  )}
                </Timeline>
              </div>
            </div>
            {/* Pendidikan */}
            <div className="">
              <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                {" "}
                Pendidikan
              </h1>
              <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
                <Timeline>
                  {isEmpty(candidateData.user.user_pendidikan) ? (
                    <div className="text-xl text-center my-4">
                      Tidak ada pendidikan
                    </div>
                  ) : (
                    candidateData.user.user_pendidikan.map((item, index) => (
                      <Timeline.Item
                        key={index}
                        color={item.tgl_akhir ? "gray" : "blue"}
                      >
                        <div className="flex flex-col gap-1">
                          <h1 className="text-xl font-bold text-gray-custom">
                            {item.institusi}
                          </h1>
                          <h2 className="text-lg text-gray-custom">
                            {item.bidang_studi}
                          </h2>
                          <h2 className="text-lg text-gray-custom">
                            {item.gelar}
                          </h2>
                          <h2 className="text-lg text-gray-custom">
                            {dayjs(item.tgl_mulai, "YYYY-MM").format(
                              "MMMM YYYY"
                            )}{" "}
                            -{" "}
                            {item.tgl_akhir
                              ? dayjs(item.tgl_akhir, "YYYY-MM").format(
                                  "MMMM YYYY"
                                )
                              : "present"}
                          </h2>
                          <p className="text-base">{item.bio}</p>
                        </div>
                      </Timeline.Item>
                    ))
                  )}
                </Timeline>
              </div>
            </div>
            {/* Skill */}
            <div className="">
              <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                {" "}
                Skills
              </h1>
              {isEmpty(candidateData.user.skills) ? (
                <div className="text-xl text-center my-4">Tidak ada skill</div>
              ) : (
                <div className="flex flex-wrap gap-4 my-3">
                  {candidateData.user.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="text-primary font-bold px-4 py-2 bg-primary bg-opacity-20 rounded-xl"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Aksi */}
            {(candidateData.status === "sent" ||
              candidateData.status === "review") && (
              <div className="my-2 flex flex-col gap-4">
                {candidateData.status === "sent" && (
                  <button
                    onClick={markAsRead}
                    className="w-full border-2 border-primary bg-primary text-white rounded-lg py-3 font-bold"
                  >
                    Tandai Sudah Dibaca
                  </button>
                )}
                <button
                  onClick={acceptLamaran}
                  className="w-full border-2 border-primary bg-red text-primary rounded-lg py-3 font-bold"
                >
                  Terima Lamaran
                </button>
                <button
                  onClick={rejectLamaran}
                  className="w-full border-2 border-red-custom text-red-custom rounded-lg py-3 font-bold"
                >
                  Tolak Lamaran
                </button>
              </div>
            )}
            {candidateData.status === "qualify" && (
              <div className="my-2 flex flex-col gap-4">
                <button
                  onClick={sendMessage}
                  className="w-full border-2 border-green-custom bg-green-custom text-white rounded-lg py-3 font-bold"
                >
                  Hubungi Pelamar
                </button>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <button
                onClick={openModalSetting}
                className="w-full border-2 border-gray-custom bg-gray-custom text-white rounded-lg py-3 font-bold"
              >
                Pengaturan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KandidatInfo;
