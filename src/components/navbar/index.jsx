import { useUserStore } from "@/store/userStore";
import {
  IconBookmark,
  IconLogout,
  IconSend,
  IconUserCircle,
} from "@tabler/icons-react";
import { Button, ConfigProvider, Drawer, Dropdown, message } from "antd";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import MenuItem from "./_partials/MenuItem";
import MobileMenu from "./_partials/MobileMenu";
import { useLogout } from "../../query/auth/useLogout";

const menuItem = [
  {
    label: "Beranda",
    pathHighlight: "",
    to: "/",
  },
  {
    label: "Layanan",
    pathHighlight: null,
    to: {
      pathname: "/",
      search: createSearchParams({ goto: "layanan" }).toString(),
    },
  },
  {
    label: "Cari Lowongan",
    pathHighlight: "lowongan",
    to: "/lowongan",
  },
  {
    label: "Hubungi Kami",
    pathHighlight: null,
    to: {
      pathname: "/",
      search: createSearchParams({ goto: "contact" }).toString(),
    },
  },
];

const mobileMenuItem = [
  {
    label: "Beranda",
    pathHighlight: "",
    to: "/",
    isLogin: false,
  },
  {
    label: "Layanan",
    pathHighlight: null,
    to: {
      pathname: "/",
      search: createSearchParams({ goto: "layanan" }).toString(),
    },
    isLogin: false,
  },
  {
    label: "Cari Lowongan",
    pathHighlight: "lowongan",
    to: "/lowongan",
    isLogin: false,
  },
  {
    label: "Hubungi Kami",
    pathHighlight: null,
    to: { pathname: "/", query: { goto: "contact" } },
    isLogin: false,
  },
  {
    label: "Profile",
    pathHighlight: "profile",
    to: "/profile",
    isLogin: true,
  },
  {
    label: "Status Lamaran",
    pathHighlight: "status-lamaran",
    to: "/lowongan/status-lamaran",
    isLogin: true,
  },
  {
    label: "Bookmark",
    pathHighlight: "bookmark",
    to: "/lowongan/bookmark",
    isLogin: true,
  },
];

function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
  const { deleteUser, userData } = useUserStore((state) => state);

  const navigate = useNavigate();

  const onSettled = () => {
    message.success("Berhasil Melakukan Logout");
    deleteUser();
    navigate("/login");
  };

  const { mutate: logout } = useLogout({
    onSettled,
  });

  const profileDropdownMenu = [
    {
      key: "/profile",
      label: <Link to="/profile">Profile</Link>,
      icon: <IconUserCircle />,
    },
    {
      key: "/lowongan/status-lamaran",
      label: <Link to="/lowongan/status-lamaran">Status Lamaran</Link>,
      icon: <IconSend />,
    },
    {
      key: "/lowongan/bookmark",
      label: <Link to="/lowongan/bookmark">Bookmark</Link>,
      icon: <IconBookmark />,
    },
    {
      key: "Logout",
      label: (
        <div onClick={() => {}} role="button">
          Logout
        </div>
      ),
      icon: <IconLogout />,
      danger: true,
    },
  ];

  return (
    <div className="sticky top-0 bg-white z-10 shadow-sm lg:shadow-none">
      <header className="max-w-7xl px-12 mx-auto grid grid-cols-12 items-center py-4 gap-2 ">
        <div className="col-span-10 lg:col-span-2 ">
          <Link to={"/"}>
            <div className="w-40 cursor-pointer">
              <img width={180} height={55} src="/images/maisyah.svg" alt="" />
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex col-span-5 gap-8">
          {menuItem.map((item, index) => (
            <MenuItem
              key={index}
              label={item.label}
              pathHighlight={item.pathHighlight}
              to={item.to}
            />
          ))}
        </div>
        <div className="hidden lg:flex col-span-5 gap-4 justify-self-end items-center">
          {!isEmpty(userData) ? (
            <Dropdown menu={{ items: profileDropdownMenu }}>
              <div className="flex items-center gap-4 px-4 py-2 cursor-pointer rounded-full hover:bg-secondary hover:bg-opacity-20">
                <div className="w-12 border-4 rounded-full border-gray-400 overflow-hidden">
                  <img
                    src={
                      userData.profile_picture ??
                      "/images/profile/bxs_user-circle.svg"
                    }
                    alt=""
                    style={{ width: 50 }}
                  />
                </div>
                <div className="font-bold text-gray-custom">
                  {userData.name.split(" ")[0]}
                </div>
                <div>
                  <img
                    src="/images/lamaran-saya/arrow-down.svg"
                    alt=""
                    className="w-4"
                  />
                </div>
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">
                <Button size="large" type="text" className="font-bold">
                  Login
                </Button>
              </Link>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FA8A00",
                  },
                }}
              >
                <Link to="/register">
                  <Button type="primary" size="large" className="font-bold">
                    Daftar
                  </Button>
                </Link>
              </ConfigProvider>
              <Link to="https://perusahaan.maisyah.id/login">
                <Button type="primary" size="large" className="font-bold">
                  Masuk sebagai Perusahaan
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex lg:hidden col-span-1"></div>
        <div
          className="flex lg:hidden col-span-1"
          onClick={() => setMobileNav(true)}
        >
          <img src="/images/landing/menu.svg" className="w-6" alt="" />
        </div>
        <Drawer
          title=""
          onClose={() => setMobileNav(false)}
          open={mobileNav}
          width={"80%"}
          closeIcon={false}
          bodyStyle={{ padding: "0px" }}
        >
          <div className="w-11/12 mx-auto flex justify-between items-center my-6">
            <Link to={"/"}>
              <div className="w-32">
                <img src="/images/maisyah.svg" className="w-full" alt="" />
              </div>
            </Link>
            <div className="" onClick={() => setMobileNav(false)}>
              <img src="/images/landing/close.svg" className="w-6" alt="" />
            </div>
          </div>
          <div className="flex flex-col">
            {mobileMenuItem
              .filter((item) => item.isLogin == false)
              .map((item, index) => (
                <MobileMenu
                  key={index}
                  label={item.label}
                  pathHighlight={item.pathHighlight}
                  to={item.to}
                />
              ))}
            {!isEmpty(userData) &&
              mobileMenuItem
                .filter((item) => item.isLogin)
                .map((item, index) => (
                  <MobileMenu
                    key={index}
                    label={item.label}
                    pathHighlight={item.pathHighlight}
                    to={item.to}
                  />
                ))}

            {!isEmpty(userData) ? (
              <>
                <div
                  onClick={logout}
                  className={`pl-6 py-4 text-lg text-red-custom font-bold border-b-2 `}
                >
                  Logout
                </div>
                <div className="flex flex-col items-center justify-center px-4 gap-2 mt-10">
                  <div>
                    <img
                      src={
                        userData.profile_picture ??
                        "/images/profile/bxs_user-circle.svg"
                      }
                      className="w-20 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="font-bold text-lg mt-8">{userData.name}</div>
                </div>
              </>
            ) : (
              <>
                <MobileMenu to={"/login"} pathHighlight="login" label="Login" />
                <MobileMenu
                  to={"/register"}
                  pathHighlight="register"
                  label="Daftar"
                />
                <a href="https://perusahaan.maisyah.id/login" className="">
                  <div className="pl-6 py-4 text-lg text-primary font-bold border-b-2 bg-opacity-20">
                    Daftar Sebagai Perusahaan
                  </div>
                </a>
              </>
            )}
          </div>
        </Drawer>
      </header>
    </div>
  );
}

export default Navbar;
