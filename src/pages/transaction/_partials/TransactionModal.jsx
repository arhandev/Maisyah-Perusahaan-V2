import { DatePicker, Modal, Spin } from "antd";
import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import numeral from "../../../utils/numeralLocale";
import dayjs from "dayjs";
import { useBuktiTransaction } from "../../../query/dashboard/usePostBuktiTransaction";

const HeaderModal = () => (
  <div className="flex flex-col gap-1">
    <h1 className="font-bold text-2xl text-gray-custom">Lihat Transaksi</h1>
    <p className="text-gray-bright ">
      Berikut adalah catatan detail terkait transaksi
    </p>
  </div>
);

function TransactionModal({
  detailModal,
  setDetailModal,
  fetchTransactions,
  messageApi,
}) {
  const [loading, setLoading] = useState(0);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");

  const onClose = () => {
    setDetailModal({});
  };
  const inputFile = () => {
    setFile(fileInput.current.files[0]);
  };

  const handleClickButton = () => {
    fileInput.current.click();
  };
  const onCopy = () => {
    messageApi.success("Nomor rekening berhasil di copy");
  };

  const onDatePick = (value, dateString) => {
    setDate(value.format("DD-MM-YYYY HH:mm"));
  };

  const customFormat = (value) => value.format("DD MMMM YYYY, [pukul] HH:mm");

  const onSubmit = async () => {
    const formData = new FormData();
    formData.set("bukti_pembayaran", file);
    formData.set("waktu_konfirmasi_pembayaran", date);
    uploadBukti({ value: formData, id: detailModal.id });
  };

  const onSuccess = (response) => {
    messageApi.success("Bukti berhasil di upload");
    fetchTransactions();
    onClose();
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const productJenis = (text) => {
    if (text === "iklan_loker") {
      return "Iklan Loker";
    } else if (text === "trial") {
      return "Trial";
    } else if (text === "loker_art") {
      return "Loker ART";
    } else if (text === "basic") {
      return "Basic";
    } else if (text === "standart") {
      return "Standart";
    } else if (text === "medium") {
      return "Medium";
    } else if (text === "professional") {
      return "Professional";
    } else {
      return text;
    }
  };

  const { mutate: uploadBukti, isUpdateLoading } = useBuktiTransaction({
    onError,
    onSuccess,
  });

  return (
    <Modal
      title={<HeaderModal />}
      footer={<span />}
      width={"600px"}
      bodyStyle={{ padding: window.screen.width > 1024 ? "20px" : "5px" }}
      open={!isEmpty(detailModal)}
      onCancel={onClose}
    >
      {detailModal.status === "validate" && (
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xl lg:text-2xl text-center text-primary">
            Pesanan Kamu sedang diverifikasi oleh Tim Maisyah
          </h2>
        </div>
      )}
      {detailModal.status === "confirmed" && (
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xl lg:text-2xl text-center text-gray-custom">
            Bukti Pembayaran sedang diverifikasi oleh Tim Maisyah
          </h2>
        </div>
      )}

      {detailModal.status === "paid" && (
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xl lg:text-2xl text-center text-green-custom">
            Selamat, transaksi kamu sudah terverifikasi. Langgananmu sudah aktif
          </h2>
        </div>
      )}
      <div className="my-6 border-solid border-2 border-gray-300 rounded-xl">
        <div className="flex flex-col mx-4 my-6">
          <h4 className="text-lg text-gray-custom">Nomor Invoice</h4>
          <h4 className="text-lg font-bold text-gray-custom">
            INV-{detailModal.invoice}
          </h4>
        </div>
        <div className="border-solid border border-gray-300 w-full my-6"></div>
        <div className="flex flex-col mx-4 my-6">
          <h4 className="text-lg text-gray-custom">Nama Pembeli</h4>
          <h4 className="text-lg font-bold text-gray-custom">
            {detailModal.nama_pembeli}
          </h4>
        </div>
        <div className="border-solid border border-gray-300 w-full my-6"></div>
        <div className="flex flex-col mx-4 my-6">
          <h4 className="text-lg text-gray-custom">Handphone</h4>
          <h4 className="text-lg font-bold text-gray-custom">
            {detailModal.notel}
          </h4>
        </div>
        <div className="border-solid border border-gray-300 w-full my-6"></div>
        <div className="flex flex-col mx-4 my-6">
          <h4 className="text-lg text-gray-custom">Jenis Langganan</h4>
          <h4 className="text-lg font-bold text-gray-custom capitalize">
            {detailModal.products[0].tipe} -{" "}
            {productJenis(detailModal.products[0].jenis)}
          </h4>
        </div>
        {detailModal.status !== "validate" && !isEmpty(detailModal.payment) && (
          <>
            <div className="border-solid border border-gray-300 w-full my-6"></div>
            <div className="flex justify-between items-center gap-4 mx-4 my-6">
              <div>
                <h4 className="text-lg text-gray-custom mb-2">Transfer Bank</h4>
                <h4 className="text-lg font-bold text-gray-custom">
                  A/n {detailModal.payment.atas_nama}
                </h4>
              </div>
              <div>
                <img src={detailModal.payment.gambar} className="w-16" alt="" />
              </div>
            </div>
            <div className="border-solid border border-gray-300 w-full my-6"></div>
            <div className="flex justify-between items-center gap-4 mx-4 my-6">
              <div>
                <h4 className="text-lg text-gray-custom mb-2">
                  Nomor Rekening
                </h4>
                <h4 className="text-lg font-bold text-gray-custom">
                  {detailModal.payment.nomor}
                </h4>
              </div>
              <CopyToClipboard text={detailModal.payment.nomor} onCopy={onCopy}>
                <div className="font-bold text-secondary text-xl cursor-pointer">
                  Salin
                </div>
              </CopyToClipboard>
            </div>
          </>
        )}
        <div className="border-solid border border-gray-300 w-full my-6"></div>
        <div className="flex flex-col mx-4 my-6">
          <h4 className="text-lg text-gray-custom">Total</h4>
          <h4 className="text-lg font-bold text-gray-custom">
            Rp. {numeral(detailModal.total).format("0,0")}
          </h4>
        </div>
        {detailModal.status === "unpaid" && (
          <>
            <div className="border-solid border border-gray-300 w-full my-6"></div>
            <div className="mx-4 my-6">
              <h4 className="text-lg text-gray-custom mb-2">
                Bukti Pembayaran
              </h4>
              <div
                onClick={handleClickButton}
                className="flex gap-4 border-solid border-2 items-center border-primary border-dashed rounded-xl text-primary bg-primary bg-opacity-10 text-xl font-bold pl-4 py-8 cursor-pointer"
              >
                <div className="">
                  <img
                    src="/images/upload-poster-lowongan.png"
                    alt=""
                    className="w-12"
                  />
                </div>
                <div>Upload Bukti Pembayaran</div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileInput}
              onChange={inputFile}
              accept="image/*"
            />
            <div className="mx-4 my-6">
              <h4 className="text-lg text-gray-custom mb-2">
                Tanggal Transfer Pembayaran
              </h4>
              <DatePicker
                onChange={onDatePick}
                format={customFormat}
                showTime={{
                  defaultValue: dayjs("00:00", "HH:mm"),
                  format: "HH:mm",
                }}
                size="large"
                className="w-full"
              />
            </div>
            {console.log(file)};
            <div className="mx-4">
              <button
                onClick={onSubmit}
                disabled={!date && !file}
                className={`w-full border-solid border my-4 ${
                  date && file
                    ? "border-secondary bg-secondary cursor-pointer"
                    : "border-gray-300 bg-gray-300 cursor-not-allowed"
                } 
                     flex justify-center text-white font-bold text-xl py-3 rounded-xl hover:bg-opacity-90`}
              >
                {"Konfirmasi Pembayaran"}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default TransactionModal;
