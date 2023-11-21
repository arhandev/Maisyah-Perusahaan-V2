import { Badge, Drawer } from "antd";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";

function SideNav() {
  const { userData } = useUserStore((state) => state);
  const pathName = window.location.pathname.split("/")[2];
  const [mobileNav, setMobileNav] = useState(false);

  const onLogout = async () => {};
  return (
    <>
      <div className="w-72 border-r-2 py-10 min-w-min h-screen fixed overflow-y-scroll bg-white hidden lg:block">
        <div className="w-48 cursor-pointer mx-6">
          <img width={180} height={55} src="/images/maisyah.svg" alt="" />
        </div>

        <div className="flex flex-col border-b-2 py-6 lg:mx-4 text-clg">
          <Link to={"/dashboard"}>
            <div
              className={`px-4 py-3 cursor-pointer ${
                isEmpty(pathName)
                  ? "bg-secondary bg-opacity-20"
                  : "hover:bg-secondary hover:bg-opacity-10"
              }`}
            >
              <div
                className={`flex gap-2 items-center ${
                  isEmpty(pathName) && "border-r-6 border-secondary"
                }`}
              >
                <div>
                  <img
                    src={
                      isEmpty(pathName)
                        ? `/images/my-posts-active.svg`
                        : `/images/my-posts.svg`
                    }
                    className="w-6"
                    alt=""
                  />
                </div>
                <p
                  className={`font-bold ${
                    isEmpty(pathName) && "text-secondary"
                  }`}
                >
                  Dashboard
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/dashboard/company-profile"}>
            <div
              className={`px-4 py-3 cursor-pointer ${
                pathName === "company-profile"
                  ? "bg-secondary bg-opacity-20"
                  : "hover:bg-secondary hover:bg-opacity-10"
              }`}
            >
              <div
                className={`flex gap-2 items-center ${
                  pathName === "company-profile" &&
                  "border-r-6 border-secondary"
                }`}
              >
                <div>
                  <img
                    src={
                      pathName === "company-profile"
                        ? `/images/building-active.svg`
                        : `/images/building.svg`
                    }
                    className="w-6"
                    alt=""
                  />
                </div>
                <p
                  className={`font-bold ${
                    pathName === "company-profile" && "text-secondary"
                  }`}
                >
                  Company Profile
                </p>
              </div>
            </div>
          </Link>

          <Link to={"/dashboard/notification"}>
            <div
              className={`px-4 py-2 cursor-pointer ${
                pathName === "notification"
                  ? "bg-secondary bg-opacity-20"
                  : "hover:bg-secondary hover:bg-opacity-10"
              }`}
            >
              <div
                className={`flex gap-2 items-center ${
                  pathName === "notification" && "border-r-6 border-secondary"
                }`}
              >
                <div>
                  <Badge count={0}>
                    <img
                      src={
                        pathName === "notification"
                          ? `/images/notification-active.svg`
                          : `/images/notification.svg`
                      }
                      className="w-6"
                      alt=""
                    />
                  </Badge>
                </div>
                <p
                  className={`font-bold ${
                    pathName === "notification" && "text-secondary"
                  }`}
                >
                  Notifikasi
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/dashboard/lowongan"}>
            <div
              className={`px-4 py-3 cursor-pointer ${
                pathName === "lowongan"
                  ? "bg-secondary bg-opacity-20"
                  : "hover:bg-secondary hover:bg-opacity-10"
              }`}
            >
              <div
                className={`flex gap-2 items-center ${
                  pathName === "lowongan" && "border-r-6 border-secondary"
                }`}
              >
                <div>
                  <img
                    src={
                      pathName === "lowongan"
                        ? `/images/job-active.svg`
                        : `/images/job.svg`
                    }
                    className="w-6"
                    alt=""
                  />
                </div>
                <p
                  className={`font-bold ${
                    pathName === "lowongan" && "text-secondary"
                  }`}
                >
                  Lowongan
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/dashboard/kandidat"}>
            <div
              className={`px-4 py-3 cursor-pointer ${
                pathName === "kandidat"
                  ? "bg-secondary bg-opacity-20"
                  : "hover:bg-secondary hover:bg-opacity-10"
              }`}
            >
              <div
                className={`flex gap-2 items-center ${
                  pathName === "kandidat" && "border-r-6 border-secondary"
                }`}
              >
                <div>
                  <img
                    src={
                      pathName === "kandidat"
                        ? `/images/user-active.svg`
                        : `/images/user.svg`
                    }
                    className="w-6"
                    alt=""
                  />
                </div>
                <p
                  className={`font-bold ${
                    pathName === "kandidat" && "text-secondary"
                  }`}
                >
                  Kandidat
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/dashboard/transaction"}>
            <div
              className={`px-4 py-3 cursor-pointer ${
                pathName === "transaction"
                  ? "bg-secondary bg-opacity-20"
                  : "hover:bg-secondary hover:bg-opacity-10"
              }`}
            >
              <div
                className={`flex gap-2 items-center ${
                  pathName === "transaction" && "border-r-6 border-secondary"
                }`}
              >
                <div>
                  <img
                    src={
                      pathName === "transaction"
                        ? `/images/lowongan/zondicons_currency-dollar-active.svg`
                        : `/images/lowongan/zondicons_currency-dollar.png`
                    }
                    className="w-6"
                    alt=""
                  />
                </div>
                <p
                  className={`font-bold ${
                    pathName === "transaction" && "text-secondary"
                  }`}
                >
                  Transaksi
                </p>
              </div>
            </div>
          </Link>
          <div onClick={onLogout}>
            <div
              className={`px-4 py-3 cursor-pointer flex gap-2 items-center font-bold text-red-custom hover:bg-secondary hover:bg-opacity-10`}
            >
              Logout
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-4 gap-2 mt-10">
          <div>
            <img src={"/images/bxs_user-circle.svg"} className="w-20" alt="" />
          </div>
          <div className="font-bold text-lg">{userData.data?.name}</div>
          <div className="text-center text-sm">
            {userData.data?.user_company?.posisi_perusahaan} di{" "}
            {userData.data?.user_company?.company.nama_perusahaan}
          </div>
        </div>
      </div>
      <header className="w-11/12 mx-auto grid grid-cols-7 gap-6 items-center py-8 text-lg lg:hidden">
        <div className="col-span-4 lg:col-span-2 ">
          <div className="w-40 cursor-pointer">
            <img width={180} height={55} src="/images/maisyah.svg" alt="" />
          </div>
        </div>
        <div className="flex lg:hidden col-span-1"></div>
        <div className="flex lg:hidden col-span-1">
          <img src="/images/bxs_user-circle.svg" className="w-16" alt="" />
        </div>
        <div
          className="flex lg:hidden col-span-1"
          onClick={() => setMobileNav(true)}
        >
          <img src="/images/landing/menu.svg" className="w-6" alt="" />
        </div>
        <Drawer
          title=""
          onClose={() => setMobileNav(false)}
          visible={mobileNav}
          width={"250px"}
          closeIcon={false}
          bodyStyle={{ padding: "0px" }}
        >
          <div className="w-11/12 mx-auto flex justify-between items-center my-6">
            <div className="w-32">
              <img src="/images/maisyah.svg" alt="" />
            </div>
            <div className="" onClick={() => setMobileNav(false)}>
              <img src="/images/landing/close.svg" className="w-6" alt="" />
            </div>
          </div>
          <div className="flex flex-col">
            <Link to={"/dashboard"}>
              <div
                className={`px-4 py-3 cursor-pointer ${
                  isEmpty(pathName)
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                }`}
              >
                <div
                  className={`flex gap-2 items-center ${
                    isEmpty(pathName) && "border-r-6 border-secondary"
                  }`}
                >
                  <div>
                    <img
                      src={
                        isEmpty(pathName)
                          ? `/images/my-posts-active.svg`
                          : `/images/my-posts.svg`
                      }
                      className="w-8"
                      alt=""
                    />
                  </div>
                  <p
                    className={`font-bold ${
                      isEmpty(pathName) && "text-secondary"
                    }`}
                  >
                    Dashboard
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/dashboard/company-profile"}>
              <div
                className={`px-4 py-3 cursor-pointer ${
                  pathName === "company-profile"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                }`}
              >
                <div
                  className={`flex gap-2 items-center ${
                    pathName === "company-profile" &&
                    "border-r-6 border-secondary"
                  }`}
                >
                  <div>
                    <img
                      src={
                        pathName === "company-profile"
                          ? `/images/building-active.svg`
                          : `/images/building.svg`
                      }
                      className="w-8"
                      alt=""
                    />
                  </div>
                  <p
                    className={`font-bold ${
                      pathName === "company-profile" && "text-secondary"
                    }`}
                  >
                    Company Profile
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/dashboard/notification"}>
              <div
                className={`px-4 py-3 cursor-pointer ${
                  pathName === "notification"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                }`}
              >
                <div
                  className={`flex gap-2 items-center ${
                    pathName === "notification" && "border-r-6 border-secondary"
                  }`}
                >
                  <div>
                    <Badge count={0}>
                      <img
                        src={
                          pathName === "notification"
                            ? `/images/notification-active.svg`
                            : `/images/notification.svg`
                        }
                        className="w-8"
                        alt=""
                      />
                    </Badge>
                  </div>
                  <p
                    className={`font-bold ${
                      pathName === "notification" && "text-secondary"
                    }`}
                  >
                    Notifications
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/dashboard/lowongan"}>
              <div
                className={`px-4 py-3 cursor-pointer ${
                  pathName === "lowongan"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                }`}
              >
                <div
                  className={`flex gap-2 items-center ${
                    pathName === "lowongan" && "border-r-6 border-secondary"
                  }`}
                >
                  <div>
                    <img
                      src={
                        pathName === "lowongan"
                          ? `/images/job-active.svg`
                          : `/images/job.svg`
                      }
                      className="w-8"
                      alt=""
                    />
                  </div>
                  <p
                    className={`font-bold ${
                      pathName === "lowongan" && "text-secondary"
                    }`}
                  >
                    Lowongan
                  </p>
                </div>
              </div>
            </Link>

            <Link to={"/dashboard/kandidat"}>
              <div
                className={`px-4 py-3 cursor-pointer ${
                  pathName === "kandidat"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                }`}
              >
                <div
                  className={`flex gap-2 items-center ${
                    pathName === "kandidat" && "border-r-6 border-secondary"
                  }`}
                >
                  <div>
                    <img
                      src={
                        pathName === "kandidat"
                          ? `/images/user-active.svg`
                          : `/images/user.svg`
                      }
                      className="w-8"
                      alt=""
                    />
                  </div>
                  <p
                    className={`font-bold ${
                      pathName === "kandidat" && "text-secondary"
                    }`}
                  >
                    Kandidat
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/dashboard/transaction"}>
              <div
                className={`px-4 py-3 cursor-pointer ${
                  pathName === "transaction"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                }`}
              >
                <div
                  className={`flex gap-2 items-center ${
                    pathName === "transaction" && "border-r-6 border-secondary"
                  }`}
                >
                  <div>
                    <img
                      src={
                        pathName === "transaction"
                          ? `/images/lowongan/zondicons_currency-dollar-active.svg`
                          : `/images/lowongan/zondicons_currency-dollar.png`
                      }
                      className="w-8"
                      alt=""
                    />
                  </div>
                  <p
                    className={`font-bold ${
                      pathName === "transaction" && "text-secondary"
                    }`}
                  >
                    Transaksi
                  </p>
                </div>
              </div>
            </Link>
            <div onClick={onLogout}>
              <div
                className={`px-4 py-3 cursor-pointer flex gap-2 items-center font-bold text-red-custom hover:bg-secondary hover:bg-opacity-10`}
              >
                Logout
              </div>
            </div>
          </div>
        </Drawer>
      </header>
    </>
  );
}

export default SideNav;
