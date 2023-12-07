import { Table, message } from "antd";
import { useGetTransactions } from "../../query/dashboard/useGetTransactions";
import numeral from "../../utils/numeralLocale";
import { useState } from "react";
import { isEmpty } from "lodash";
import { subscriptionList } from "../../utils/subscriptionList";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Loading from "../../reusable/Loading";

const Tag = ({ status }) => {
  if (status === "validate") {
    return (
      <div className="flex items-center justify-start">
        <div className="bg-primary bg-opacity-5 text-primary border-primary border border-solid px-4 py-2 rounded-xl capitalize">
          {status}
        </div>
      </div>
    );
  } else if (status === "unpaid") {
    return (
      <div className="flex items-center justify-start">
        <div className="bg-secondary bg-opacity-5 text-secondary border-secondary border border-solid px-4 py-2 rounded-xl capitalize">
          {status}
        </div>
      </div>
    );
  } else if (status === "confirmed") {
    return (
      <div className="flex items-center justify-start">
        <div className="bg-[#17AFE3] bg-opacity-5 text-[#17AFE3] border-[#17AFE3] border border-solid px-4 py-2 rounded-xl capitalize">
          {status}
        </div>
      </div>
    );
  } else if (status === "paid") {
    return (
      <div className="flex items-center justify-start">
        <div className="bg-green-custom bg-opacity-5 text-green-custom border-green-custom border border-solid px-4 py-2 rounded-xl capitalize">
          {status}
        </div>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className="flex items-center justify-start">
        <div className="bg-red-custom bg-opacity-5 text-red-custom border-red-custom border border-solid px-4 py-2 rounded-xl capitalize">
          {status}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-start">
        <div className="bg-gray-custom bg-opacity-5 text-gray-custom border-gray-custom border border-solid px-4 py-2 rounded-xl">
          {status}
        </div>
      </div>
    );
  }
};

function Transaction() {
  const columns = [
    {
      title: "Nama",
      dataIndex: "nama_pembeli",
      key: "nama",
    },
    {
      title: "Handphone",
      dataIndex: "notel",
      key: "notel",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, { total }) => <>Rp. {numeral(total).format("0,0")}</>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => <Tag status={status} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <img
            onClick={() => setDetailModal(record)}
            src="/images/company-profile/pencil-company-profile.svg"
            className="w-6"
            alt=""
          />
        </div>
      ),
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [detailModal, setDetailModal] = useState({});

  const activateTrial = async () => {};

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useGetTransactions({
      id: "transactions",
      onError,
    });

  const dateDifferences = (date) => {
    const momentDate = dayjs(date, "YYYY-MM-DD HH:mm:ss");
    const currentDate = dayjs();
    const diffDays = momentDate.diff(currentDate, "days");
    const diffHours =
      momentDate.diff(currentDate, "hours") - parseInt(diffDays * 24);
    return (
      <>
        {diffDays} Hari {diffHours} Jam <br /> ({" "}
        {momentDate.format("DD-MM-YYYY HH:mm")} )
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
          <h1 className="text-3xl font-bold my-3">Transaksi</h1>
          {data.company?.active_subscription ? (
            <header className="border-solid border-2 border-green-custom shadow-lg p-8 flex flex-col lg:flex-row justify-between lg:items-center rounded-xl gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-green-custom text-xl lg:text-3xl font-bold">
                  Langganan Paket {data.company.subscription_display} Sudah
                  Aktif
                </h1>
                <h2 className="text-green-custom text-lg lg:text-xl font-bold">
                  Benefit:
                </h2>
                <ul className="list-disc ml-8 lg:text-lg">
                  {data.company?.subscription_type &&
                    subscriptionList[data.company.subscription_type].map(
                      (benefit, index) => <li key={index}>{benefit}</li>
                    )}
                </ul>
              </div>
              <div className="">
                <h1 className="text-lg lg:text-2xl text-primary lg:text-right">
                  Akun aktif selama <br />{" "}
                  <span className="font-bold">
                    {dateDifferences(data.company.expired_at)}
                  </span>
                </h1>
                <h1 className="lg:text-xl text-green-custom lg:text-right mt-4">
                  Kuota lowongan <br />{" "}
                  <span className="font-bold">
                    {data.company.job_quota} tersisa
                  </span>
                </h1>
              </div>
            </header>
          ) : data.company?.can_buy ? (
            <header className="border-solid border-2 border-red-custom shadow-lg p-8 flex flex-col gap-6 lg:flex-row  lg:justify-between lg:items-center rounded-xl">
              <div className="flex flex-col gap-2">
                <h1 className="text-red-custom text-2xl lg:text-3xl font-bold">
                  Kamu Belum Berlangganan
                </h1>
                <p className="text-red-custom lg:text-lg font-bold">
                  Silahkan Klik tombol langganan untuk memulai langganan
                </p>
              </div>
              <Link to={"/dashboard/transaction/create"}>
                <button className="py-4 px-6 w-full rounded-xl bg-primary text-white font-bold shadow-md text-xl">
                  Langganan
                </button>
              </Link>
            </header>
          ) : (
            <header className="border-solid border-2 border-gray-custom shadow-lg p-8 flex justify-between items-center rounded-xl">
              <div className="flex flex-col gap-2">
                <h1 className="text-gray-custom text-3xl font-bold">
                  Harap Selesaikan Transaksi
                </h1>
                <p className="text-gray-custom text-lg font-bold">
                  Anda hanya bisa membeli transaksi dalam satu waktu
                </p>
              </div>
            </header>
          )}
          {data.company?.active_subscription &&
            data.company?.subscription_type !== "trial" && (
              <header className="border-solid border-2 border-gray-custom shadow-lg p-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 rounded-xl mt-6">
                <div>
                  <h1 className="text-gray-custom text-xl lg:text-2xl font-bold">
                    Add Ons
                  </h1>
                  <p className="text-gray-custom lg:text-xl mt-2">
                    Beli Tambahan Kuota Lowongan
                  </p>
                </div>
                <Link to={"/dashboard/transaction/addons"}>
                  <button className="py-4 px-6 rounded-xl w-full bg-gray-custom text-white font-bold shadow-md lg:text-xl">
                    Add On
                  </button>
                </Link>
              </header>
            )}
          {data.company?.active_subscription === false &&
            data.company?.free_trial > 0 && (
              <header className="border-solid border-2 border-green-custom shadow-lg px-8 py-6 flex justify-between items-center gap-8 rounded-xl mt-6">
                <h1 className="text-green-custom text-2xl font-bold">
                  Coba Trial Gratis Selama 14 Hari
                </h1>
                <button
                  onClick={activateTrial}
                  className="py-2 px-6 rounded-xl bg-green-custom text-white font-bold shadow-md text-lg"
                >
                  Aktikan Trial
                </button>
              </header>
            )}
          <div className="my-8 overflow-auto">
            <h1 className="my-4 text-gray-custom text-xl font-bold ">
              Riwayat Transaksi
            </h1>
            <Table
              rowKey={(obj) => obj.id}
              columns={columns}
              dataSource={data.transactions}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Transaction;
