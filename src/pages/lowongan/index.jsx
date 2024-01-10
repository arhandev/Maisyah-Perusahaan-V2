import { Button, ConfigProvider, Select, Tabs } from "antd";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LowonganActive from "./_partials/LowonganActive";
import LowonganNonActive from "./_partials/LowonganNonActive";

const { TabPane } = Tabs;
const { Option } = Select;

function Lowongan() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");
  const [status, setStatus] = useState("");

  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const onChangeTab = (key) => {
    searchParams.set("tab", key);
    setSearchParams(searchParams);
  };

  const items = [
    {
      key: "aktif",
      label: "Aktif",
      children: <LowonganActive status={status} />,
    },
    {
      key: "tidak-aktif",
      label: "Tidak Aktif",
      children: <LowonganNonActive status={status} />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
        <div className="flex flex-col gap-6 lg:0 lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-3xl font-bold my-3">Lowongan Kerja</h1>
            <div className="text-left mt-3 text-lg text-gray-custom text-opacity-50">
              Lowongan Kerja yang Telah Dibuat
            </div>
          </div>
          <div>
            <Link to={"/dashboard/lowongan/create"} className="">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FA8A00",
                  },
                }}
              >
                <Button
                  type="primary"
                  ghost
                  size="large"
                  className="font-bold w-48 flex gap-2 items-center justify-center"
                  onClick={() => {}}
                >
                  <p className="font-bold text-lg text-secondary">
                    Buat Lowongan
                  </p>
                </Button>
              </ConfigProvider>
            </Link>
            <div className="w-full flex justify-end mt-8 mb-4 lg:mt-4 lg:mb-0">
              <Select
                style={{ color: "green" }}
                className="w-64"
                defaultValue={status}
                onChange={handleChangeStatus}
              >
                <Option value="">Semua Lowongan</Option>
                <Option value="validate">Menunggu Validasi</Option>
                <Option value="unpaid">Belum dibayar</Option>
                <Option value="confirmed">Terkonfirmasi</Option>
                <Option value="paid">Sudah dibayar</Option>
                <Option value="failed">Failed</Option>
                <Option value="expired">Expired</Option>
              </Select>
            </div>
          </div>
        </div>
        <Tabs
          className="mb-6 mt-10"
          defaultActiveKey={tab ?? "aktif"}
          items={items}
          onChange={onChangeTab}
          size="large"
        />
        <div className="flex flex-col gap-4 my-8"></div>
      </div>
    </div>
  );
}

export default Lowongan;
