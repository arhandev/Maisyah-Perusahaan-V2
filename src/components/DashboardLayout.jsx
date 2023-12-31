import { useUserStore } from "@/store/userStore";
import {
  IconBell,
  IconBriefcase,
  IconBuilding,
  IconChevronLeft,
  IconChevronRight,
  IconCoin,
  IconLayoutDashboard,
  IconLogout,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../query/auth/useLogout";

const { Sider, Content } = Layout;

function DashboardLayout({ children }) {
  const { deleteUser, userData } = useUserStore((state) => state);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    logout();
  };

  const onSettled = () => {
    deleteUser();
    navigate("/login");
  };

  const { mutate: logout } = useLogout({
    onSettled,
  });

  const items = [
    {
      key: "/dashboard",
      icon: <IconLayoutDashboard size={24} className="-mb-1" />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/dashboard/company-profile",
      icon: <IconBuilding size={24} className="-mb-1" />,
      label: <Link to="/dashboard/company-profile">Company Profile</Link>,
    },
    {
      key: "/dashboard/notification",
      icon: <IconBell size={24} className="-mb-1" />,
      label: <Link to="/dashboard/notification">Notifikasi</Link>,
    },
    {
      key: "/dashboard/lowongan",
      icon: <IconBriefcase size={24} className="-mb-1" />,
      label: <Link to="/dashboard/lowongan">Lowongan</Link>,
    },
    {
      key: "/dashboard/kandidat",
      icon: <IconUserSquareRounded size={24} className="-mb-1" />,
      label: <Link to="/dashboard/kandidat">Kandidat</Link>,
    },
    {
      key: "/dashboard/transaction",
      icon: <IconCoin size={24} className="-mb-1" />,
      label: <Link to="/dashboard/transaction">Transaksi</Link>,
    },
    {
      key: "logout",
      icon: <IconLogout size={24} className="-mb-1" />,
      label: <Link onClick={onLogout}>Logout</Link>,
      danger: true,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        collapsible
        collapsed={open}
        onCollapse={(value) => setOpen(value)}
        width={220}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          zIndex: 20,
        }}
        trigger={
          <Button className="w-full" type="text">
            {open ? (
              <IconChevronRight size={24} />
            ) : (
              <IconChevronLeft size={24} />
            )}
          </Button>
        }
      >
        {open ? (
          <div className="w-full cursor-pointer my-8 flex justify-center">
            <img className="w-8" src="/images/maisyah-logo-small.png" alt="" />
          </div>
        ) : (
          <div className="w-40 cursor-pointer m-6">
            <img className="w-full" src="/images/maisyah.svg" alt="" />
          </div>
        )}
        <Menu
          defaultSelectedKeys={["1"]}
          mode="vertical"
          items={items}
          style={{
            borderRight: 0,
          }}
        />
        {!open && (
          <div className="flex flex-col items-center justify-center px-4 gap-2 mt-10">
            <div>
              <img
                src={"/images/bxs_user-circle.svg"}
                className="w-20"
                alt=""
              />
            </div>
            <div className="font-bold text-lg">{userData.name}</div>
            <div className="text-center text-sm">
              {userData.user_company?.posisi_perusahaan} di{" "}
              {userData.user_company?.company.nama_perusahaan}
            </div>
          </div>
        )}
      </Sider>
      <Layout style={{ marginLeft: open ? 80 : 220 }} className="bg-white">
        <Content className="border-0 border-l border-gray-300 border-solid">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
