import { useEffect, useState } from "react";
import { useGetLamaran } from "../../query/dashboard/useGetLamaran";
import { Modal, Timeline, message } from "antd";
import { isEmpty } from "lodash";
import SettingModal from "./_partials/SettingModal";
import Filter from "./_partials/Filter";
import KandidatCard from "./_partials/KandidatCard";
import Loading from "../../reusable/Loading";
import dayjs from "dayjs";
import { useEditLamaran } from "../../query/dashboard/useEditLamaran";

const checkColor = (status) => {
  if (status === "sent") {
    return "secondary";
  } else if (status === "review") {
    return "primary";
  } else if (status === "qualify") {
    return "green-custom";
  } else if (status === "failed") {
    return "red-custom";
  } else if (status === "expired") {
    return "gray-custom";
  }
};

const Tag = ({ status }) => {
  return (
    <div className={`self-end font-bold`}>
      <div
        className={`text-${checkColor(status)} bg-${checkColor(
          status
        )} bg-opacity-20 text-center rounded-full capitalize w-32 max-w-xs py-2`}
      >
        {status}
      </div>
    </div>
  );
};

const initialFilter = {
  search: "",
  status: "",
};

function Kandidat() {
  const [messageApi, contextHolder] = message.useMessage();
  const [selected, setSelected] = useState({});
  const [settingModal, setSettingModal] = useState(false);
  const [filterData, setFilterData] = useState(initialFilter);

  const markAsRead = () => {
    editLamaran({ value: { status: "review" }, id: selected.id });
  };

  const acceptLamaran = () => {
    editLamaran({ value: { status: "qualify" }, id: selected.id });
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
        editLamaran({ value: { status: "failed" }, id: selected.id });
      },
      okText: "Tolak",
      cancelText: "Batal",
    });
  };

  const onSuccessEditLamaran = (response) => {
    messageApi.success(response.data.info);
    setSelected(response.data.data.lamaran);
    refetch();
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useGetLamaran({
      id: "lamaran",
      onError,
      params: filterData,
    });

  const { mutate: editLamaran, isEditLoading } = useEditLamaran({
    onError,
    onSuccess: onSuccessEditLamaran,
  });

  useEffect(() => {
    refetch();
    if (document.body.getClientWidth > 1000) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [filterData]);

  const onClickResume = () => {
    window.open(selected.user.user_meta.resume);
  };

  const sendMessage = () => {
    let notel = selected.user.notel;
    if (notel.substring(0, 2) === "62") {
      window.open(`https://wa.me/${selected.user.notel}`);
    } else if (notel.substring(0, 1) === "0") {
      notel = notel.substring(1);
      window.open(`https://wa.me/62${selected.user.notel}`);
    } else if (notel.substring(0, 1) === "8") {
      window.open(`https://wa.me/62${selected.user.notel}`);
    } else {
      Modal.error({
        title: "Nomor Handphone Tidak Valid",
      });
    }
  };

  const onClose = () => {
    setSelected({});
  };

  const openModalSetting = () => {
    setSettingModal(true);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      <div className="flex flex-col lg:flex-row w-11/12 mx-auto lg:w-full lg:mx-0 lg:mx-14">
        {!isEmpty(selected) && (
          <SettingModal
            settingModal={settingModal}
            setSettingModal={setSettingModal}
            selected={selected}
            setSelected={setSelected}
            fetchJobs={refetch}
            messageApi={messageApi}
          />
        )}
        <div className="lg:w-7/12 lg:pr-6 lg:border-r-2 mb-4 mt-10">
          <div>
            <h1 className="text-3xl font-bold my-3">Kandidat Masuk</h1>
            <div className="text-left mt-3 text-lg text-gray-custom text-opacity-50">
              Daftar kandidat loker yang diiklankan
            </div>
            <Filter
              initialFilter={initialFilter}
              filterData={filterData}
              setFilterData={setFilterData}
              fetchJobs={refetch}
            />
            <div className="flex flex-col gap-6 my-8 ">
              {contextHolder}
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {data.lamaran?.map((item, index) => (
                    <KandidatCard
                      lamaran={item}
                      selected={item.id === selected.id}
                      setSelected={setSelected}
                      key={index}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="border-0 border-r-2 border-solid border-gray-custom border-opacity-30 hidden h-full lg:block"></div>

        <div className="hidden lg:block w-6/12 px-6 mb-4 mt-10">
          <div>
            <h1 className="text-3xl font-bold my-3">Detail Kandidat</h1>
            <div className="text-left mt-3 text-lg text-gray-custom text-opacity-50">
              Berikut Merupakan Detail Kandidat yang dilihat
            </div>
            {isEmpty(selected) ? (
              <div className="w-full my-72 flex items-center justify-center">
                <h3>Silahkan Pilih Kandidat untuk melihat detailnya</h3>
              </div>
            ) : (
              <div className="flex flex-col gap-2 my-8 text-xl">
                <Tag status={selected.status} />
                {/* Biodata */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                    Biodata
                  </h1>
                  <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
                    <div className="w-full flex justify-between">
                      <p className="font-bold">Nama </p>
                      <p>{selected.user.name}</p>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="font-bold">Resume </p>
                      <div>
                        {selected.user.user_meta.resume ? (
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
                      <p>{selected.user.notel}</p>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="font-bold">Email </p>
                      <p>{selected.user.email}</p>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="font-bold">Tanggal Lahir </p>
                      <p>{selected.user.user_meta.tgl_lahir ?? "-"}</p>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="font-bold">Domisili </p>
                      <p>{selected.user.user_meta.domisili ?? "-"}</p>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="font-bold">Deskripsi </p>
                      <p>{selected.user.user_meta.deskripsi ?? "-"}</p>
                    </div>
                  </div>
                </div>
                {/* Surat Lamaran */}
                <div className="">
                  <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                    Surat Lamaran
                  </h1>
                  <div className="flex flex-col gap-4 my-4">
                    {selected.pesan_lamaran ? (
                      <div className="border-solid border border-gray-custom rounded-xl p-4">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: selected.pesan_lamaran,
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
                      {isEmpty(selected.user.user_pekerjaan) ? (
                        <div className="text-xl text-center my-4">
                          Tidak ada pengalaman kerja
                        </div>
                      ) : (
                        selected.user.user_pekerjaan.map((item, index) => (
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
                      {isEmpty(selected.user.user_pendidikan) ? (
                        <div className="text-xl text-center my-4">
                          Tidak ada pendidikan
                        </div>
                      ) : (
                        selected.user.user_pendidikan.map((item, index) => (
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
                  {isEmpty(selected.user.skills) ? (
                    <div className="text-xl text-center my-4">
                      Tidak ada skill
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 my-3">
                      {selected.user.skills.map((skill, index) => (
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
                {(selected.status === "sent" ||
                  selected.status === "review") && (
                  <div className="my-2 flex flex-col gap-4">
                    {selected.status === "sent" && (
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
                {selected.status === "qualify" && (
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
            )}
          </div>
        </div>
        {!isEmpty(selected) && window && window.innerWidth < 1000 && (
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
            open={!isEmpty(selected)}
            onCancel={onClose}
            closeIcon={false}
          >
            <div className="flex flex-col gap-2 my-8 text-xl">
              <Tag status={selected.status} />

              <div className="">
                <h1 className="text-xl font-bold text-gray-custom tracking-wide">
                  Biodata
                </h1>
                <div className="flex flex-col gap-4 mx-2 my-4 text-lg">
                  <div className="w-full flex justify-between">
                    <p className="font-bold">Nama </p>
                    <p>{selected.user.name}</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-bold">Resume </p>
                    <div>
                      {selected.user.user_meta.resume ? (
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
                    <p>{selected.user.notel}</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-bold">Email </p>
                    <p>{selected.user.email}</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-bold">Tanggal Lahir </p>
                    <p>{selected.user.user_meta.tgl_lahir ?? "-"}</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-bold">Domisili </p>
                    <p>{selected.user.user_meta.domisili ?? "-"}</p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-bold">Deskripsi </p>
                    <p>{selected.user.user_meta.deskripsi ?? "-"}</p>
                  </div>
                  <div className="w-full flex flex-col">
                    <p className="font-bold">Deskripsi </p>
                    <p className="mt-3">
                      {selected.user.user_meta.deskripsi ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                  Surat Lamaran
                </h1>
                <div className="flex flex-col gap-4 my-4">
                  {selected.pesan_lamaran ? (
                    <div className="border border-gray-custom rounded-xl p-4">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: selected.pesan_lamaran,
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
                    {isEmpty(selected.user.user_pekerjaan) ? (
                      <div className="text-xl text-center my-4">
                        Tidak ada pengalaman kerja
                      </div>
                    ) : (
                      selected.user.user_pekerjaan.map((item, index) => (
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
              <div className="">
                <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                  {" "}
                  Pendidikan
                </h1>
                <div className="flex flex-col gap-4 mx-8 my-4 text-xl">
                  <Timeline>
                    {isEmpty(selected.user.user_pendidikan) ? (
                      <div className="text-xl text-center my-4">
                        Tidak ada pendidikan
                      </div>
                    ) : (
                      selected.user.user_pendidikan.map((item, index) => (
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
              <div className="">
                <h1 className="text-2xl font-bold text-gray-custom tracking-wide">
                  {" "}
                  Skills
                </h1>
                {isEmpty(selected.user.skills) ? (
                  <div className="text-xl text-center my-4">
                    Tidak ada skill
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 my-3">
                    {selected.user.skills.map((skill, index) => (
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
              {(selected.status === "sent" || selected.status === "review") && (
                <div className="my-6 flex flex-col gap-4">
                  {selected.status === "sent" && (
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
              {selected.status === "qualify" && (
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
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Kandidat;
