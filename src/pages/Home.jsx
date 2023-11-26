import { Drawer } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import { IconSearch } from "@tabler/icons-react";

function Home() {
  const [mobileNav, setMobileNav] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const layananRef = useRef(null);
  const footerRef = useRef(null);
  useEffect(() => {
    if (searchParams.get("goto") === "layanan") {
      layananRef.current.scrollIntoView();
    } else if (searchParams.get("goto") === "contact") {
      footerRef.current.scrollIntoView();
    }
  }, [searchParams]);
  return (
    <div className="text-gray-custom">
      <header className="w-11/12 mx-auto grid grid-cols-12 items-center py-8 text-lg">
        <div className="col-span-10 lg:col-span-2 ">
          <div className="w-40 cursor-pointer">
            <img width={180} height={55} src="/images/maisyah.svg" alt="" />
          </div>
        </div>
        <div className="hidden lg:flex col-span-5 gap-8">
          <Link to={"/"}>
            <div>
              <p className={`text-secondary font-bold cursor-pointer`}>
                Beranda
              </p>
              <div className="mt-0.5 border-t-4 border-secondary w-6 mx-auto"></div>
            </div>
          </Link>
          <a href="https://maisyah.id?goto=layanan">
            <div>
              <p>Layanan</p>
              <div></div>
            </div>
          </a>
          <a href="https://maisyah.id/lowongan">
            <div className={`'text-secondary cursor-pointer`}>
              <p>Cari Lowongan</p>
            </div>
          </a>
          <a href="https://maisyah.id?goto=contact">
            <div>
              <p>Hubungi Kami</p>
              <div></div>
            </div>
          </a>
        </div>
        <div className="hidden lg:flex col-span-5 gap-6 justify-self-end items-center">
          <>
            <Link to="/login">
              <div className="font-bold cursor-pointer text-gray-custom">
                Login
              </div>
            </Link>
            <Link to="/register">
              <div className="bg-secondary text-white py-4 px-6 rounded-xl font-bold cursor-pointer">
                Daftar
              </div>
            </Link>
            <a href="https://maisyah.id/register">
              <div className="flex bg-primary px-4 py-4 items-center gap-4 font-bold text-white rounded-xl">
                <div>Daftar sebagai Pencari Kerja</div>
              </div>
            </a>
          </>
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
            <div className="w-32">
              <img src="/images/maisyah.svg" alt="" />
            </div>
            <div className="" onClick={() => setMobileNav(false)}>
              <img src="/images/landing/close.svg" className="w-6" alt="" />
            </div>
          </div>
          <div className="flex flex-col">
            <Link to={"/"}>
              <div
                className={`pl-6 py-4 text-lg font-bold bg-opacity-20 border-t-2 border-b-2 'bg-secondary`}
              >
                Beranda
              </div>
            </Link>
            <a href="https://maisyah.id?goto=layanan">
              <div
                className={`pl-6 py-4 text-lg text-gray-custom border-b-2 bg-opacity-20 `}
              >
                Layanan
              </div>
            </a>
            <a href="https://maisyah.id/lowongan">
              <div
                className={`pl-6 py-4 text-lg text-gray-custom border-b-2 bg-opacity-20`}
              >
                Cari Lowongan
              </div>
            </a>
            <a href="https://maisyah.id?goto=contact">
              <div
                className={`pl-6 py-4 text-lg text-gray-custom border-b-2 bg-opacity-20`}
              >
                Hubungi Kami
              </div>
            </a>
            <Link to={"/login"}>
              <div
                className={`pl-6 py-4 text-lg text-gray-custom font-bold border-b-2 bg-opacity-20 `}
              >
                Login
              </div>
            </Link>
            <Link to={"/register"}>
              <div
                className={`pl-6 py-4 text-lg text-secondary font-bold border-b-2 bg-opacity-20 `}
              >
                Daftar
              </div>
            </Link>
            <a href="https://maisyah.id/register">
              <div className="pl-6 py-4 text-lg text-primary font-bold border-b-2 bg-opacity-20">
                Daftar Sebagai Pencari Kerja
              </div>
            </a>
          </div>
        </Drawer>
      </header>
      <section
        className="hidden lg:block w-full bg-cover"
        style={{ backgroundImage: "url('/images/landing/bg-1.png')" }}
      >
        <div className="w-9/12 mx-auto h-screen pt-36 2xl:pt-48">
          <div className="w-6/12 flex flex-col gap-6">
            <h1 className="text-5xl font-bold">
              Temukan <span className="text-primary"> Pekerjaan Impian </span>{" "}
              Anda di sini.
            </h1>
            <h2 className="text-xl">
              Gabung dengan maisyah.id dan dapatkan pekerjaan terbaik untuk
              Anda!
            </h2>
            <div className="flex p-2 border border-gray-300 border-solid border-l-8 border-l-primary rounded-r-3xl rounded-l-lg w-5/6 bg-white max-w-lg">
              <div className="w-11/12">
                <input
                  type="text"
                  className="w-full h-full border-none outline-none pl-4 text-gray-500 text-xl"
                  placeholder="Cari pekerjaan, perusahaan, atau keyword"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link
                to={{
                  pathname: "/lowongan",
                  search: createSearchParams({ search }).toString(),
                }}
              >
                <div className="p-4 bg-secondary rounded-2xl">
                  <IconSearch size={32} className="text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-9/12 mx-auto flex justify-between gap-20 mb-20 leading-8">
          <div className="flex flex-col w-1/3 items-center text-center gap-4">
            <div>
              <img
                width={184}
                height={184}
                src="/images/landing/achieve-1.png"
                alt=""
              />
            </div>
            <div className="text-xl">Lowongan Kerja Terpercaya</div>
            <div className="font-light">
              Perusahaan yang tergabung di maisyah.id telah melewati proses
              pemeriksaan. Insya Allah terjamin valid.
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center text-center gap-4">
            <div>
              <img
                width={184}
                height={184}
                src="/images/landing/achieve-2.png"
                alt=""
              />
            </div>
            <div className="text-xl">Sesuai dengan Keahlian</div>
            <div className="font-light">
              Temukan ribuan lowongan pekerjaan sesuai dengan latar belakang
              anda kini lebih mudah.
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center text-center gap-4">
            <div>
              <img
                width={184}
                height={184}
                src="/images/landing/achieve-3.png"
                alt=""
              />
            </div>
            <div className="text-xl">Buat CV Mudah & Gratis</div>
            <div className="font-light">
              Dengan menggunakan maisyah.id Anda dapat lebih mudah dalam membuat
              CV.
            </div>
          </div>
        </div>
      </section>
      <section className="my-4 lg:hidden">
        <div className="w-11/12">
          <img src="/images/landing-img.png" className="w-full" alt="" />
        </div>
        <div className="w-10/12 mx-auto flex flex-col gap-6 my-6">
          <h1 className="text-3xl font-bold">
            Temukan <span className="text-primary"> Pekerjaan Impian </span>{" "}
            Anda di sini.
          </h1>
          <h2 className="text-lg">
            Gabung dengan maisyah.id dan dapatkan pekerjaan terbaik untuk Anda!
          </h2>
          <div className="">
            <input
              type="text"
              className="w-full text-gray-500 border border-gray-400 px-4 py-3 rounded-xl"
              placeholder="Cari pekerjaan, perusahaan, atau keyword"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link to={{ pathname: "/lowongan", query: { search } }}>
            <div className="py-2 bg-secondary rounded-lg self-start flex gap-3 px-6">
              <img
                width={22}
                height={12}
                src="/images/landing/search.png"
                alt=""
              />
              <p className="text-white text-xl">Cari</p>
            </div>
          </Link>
        </div>
        <div className="w-10/12 mx-auto flex flex-col mb-20 leading-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <img
                width={184}
                height={184}
                src="/images/landing/achieve-1.png"
                alt=""
              />
            </div>
            <div className="text-xl">Lowongan Kerja Terpercaya</div>
            <div className="font-light">
              Perusahaan yang tergabung di maisyah.id telah melewati proses
              pemeriksaan. Insya Allah terjamin valid.
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <img
                width={184}
                height={184}
                src="/images/landing/achieve-2.png"
                alt=""
              />
            </div>
            <div className="text-xl">Sesuai dengan Keahlian</div>
            <div className="font-light">
              Temukan ribuan lowongan pekerjaan sesuai dengan latar belakang
              anda kini lebih mudah.
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <img
                width={184}
                height={184}
                src="/images/landing/achieve-3.png"
                alt=""
              />
            </div>
            <div className="text-xl">Buat CV Mudah & Gratis</div>
            <div className="font-light">
              Dengan menggunakan maisyah.id Anda dapat lebih mudah dalam membuat
              CV.
            </div>
          </div>
        </div>
      </section>
      <section
        className="lg:h-88 py-8 lg:py-0 mx-4 lg:mx-10 bg-cover bg-right-bottom bg-no-repeat rounded-2xl my-20"
        style={{ backgroundImage: "url('/images/landing/bg-2.png')" }}
      >
        <div className="w-10/12 mx-auto h-full flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-5/12 flex flex-col gap-2 lg:gap-0 lg:block mb-4 lg:mb-0">
            <div className="hidden lg:block">
              <img
                width={96}
                height={96}
                src="/images/landing/logo-putih.png"
                alt=""
              />
            </div>
            <div className="block lg:hidden">
              <img
                width={48}
                height={48}
                src="/images/landing/logo-putih.png"
                alt=""
              />
            </div>
            <div className="text-white font-bold text-2xl lg:text-4xl">
              Apa itu Maisyah.id ?
            </div>
          </div>
          <div className="lg:w-7/12 text-white text-justify lg:text-2xl">
            Maisyah.id merupakan platform lowongan kerja muslim nomor 1 di
            Indonesia. Berdiri sejak tahun 2018 di Jakarta.
            <span className="font-bold">
              Berdedikasi penuh untuk muslimin agar mudah mendapatkan pekerjaan
              impian yang memudahkan diri dalam beribadah !
            </span>
          </div>
        </div>
      </section>
      <section
        className="h-136 bg-contain my-12 lg:my-20 bg-no-repeat ml-16 hidden lg:flex"
        style={{ backgroundImage: "url('/images/landing/bg-3.png')" }}
      >
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <div className="max-w-md flex flex-col gap-8 justify-center h-full">
            <div className="text-secondary tracking-widest font-bold">
              MAKNA MAISYAH
            </div>
            <div className="font-bold text-4xl">Apa arti “Maisyah” ?</div>
            <div className="leading-10">
              Maisyah secara etimilogi artinya adalah hidup. Secara terminologi
              merupakan usaha dalam mencari penghidupan yang halal dalam rangka
              mengharap ridho Allah subhanallah wa ta &apos; ala.
            </div>
          </div>
        </div>
      </section>
      <section className="w-10/12 mx-auto flex lg:hidden flex-col gap-4 items-center justify-center h-full my-12">
        <div className="text-secondary tracking-widest text-center font-bold">
          MAKNA MAISYAH
        </div>
        <div className="font-bold text-3xl text-center">
          Apa arti “Maisyah” ?
        </div>
        <div>
          <img src="/images/landing-img-2.png" alt="" />
        </div>
        <div className="leading-8 text-center">
          Maisyah secara etimilogi artinya adalah hidup. Secara terminologi
          merupakan usaha dalam mencari penghidupan yang halal dalam rangka
          mengharap ridho Allah subhanallah wa ta &apos; ala.
        </div>
      </section>
      <section
        className="bg-contain bg-no-repeat mx-12 lg:py-10 flex flex-col gap-4 md:gap-8 items-center"
        style={{ backgroundImage: "url('/images/landing/bg-4.png')" }}
        ref={layananRef}
      >
        <div className="text-secondary font-bold tracking-widest text-2xl lg:text-base">
          LAYANAN
        </div>
        <div className="text-2xl text-center lg:text-5xl font-bold">
          Pilih Layanan Sesuai Kebutuhan Anda
        </div>
        <div className="max-w-xl text-center tracking-wide leading-8 hidden lg:block">
          Sesuaikan layanan sesuai dengan kebutuhan bisnis yang Anda jalankan
          hubungi kami jika Anda memerlukan bantuan.
        </div>
      </section>
      <section className="px-10 flex flex-wrap justify-center lg:my-6 gap-x-8 gap-y-4">
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl">Trial</div>
          <div className="text-5xl font-bold tracking-wide mt-2">GRATIS</div>
          <div className="font-bold opacity-40">Aktif selama 7 hari </div>
          <div className="bg-gray-custom text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center">
            Pilih Trial
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">1 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 7 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl text-gray-500">Personal/ART</div>
          <div className="text-5xl font-bold tracking-wide mt-2 text-gray-500">
            <span className="text-base">IDR</span>75K
          </div>
          <div className="font-bold opacity-40">Aktif selama 30 hari</div>
          <div className="bg-gray-500 text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center">
            Pilih Personal
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">1 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 30 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl text-green-custom">
            Iklan Loker
          </div>
          <div className="text-5xl font-bold tracking-wide mt-2 text-green-custom">
            <span className="text-base">IDR</span>95K
          </div>
          <div className="font-bold opacity-40">Aktif selama 30 hari</div>
          <div className="bg-green-custom text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center">
            Pilih Iklan Loker
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">1 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 30 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl text-secondary">Basic</div>
          <div className="text-5xl font-bold tracking-wide mt-2 text-secondary">
            <span className="text-base">IDR</span>429K
          </div>
          <div className="font-bold opacity-40">Aktif selama 30 hari</div>
          <div className="bg-secondary text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center">
            Pilih Basic
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">5 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 30 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl text-blue-700">Standart</div>
          <div className="text-5xl font-bold tracking-wide mt-2 text-blue-700">
            <span className="text-base">IDR</span>749K
          </div>
          <div className="font-bold opacity-40">Aktif selama 3 bulan</div>
          <div className="text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center bg-blue-700">
            Pilih Standart
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">10 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 30 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl text-primary">Medium</div>
          <div className="text-5xl font-bold tracking-wide mt-2 text-primary">
            <span className="text-base">IDR</span>1.499K
          </div>
          <div className="font-bold opacity-40">Aktif selama 6 bulan</div>
          <div className="text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center bg-primary">
            Pilih Medium
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">20 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 30 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
        <div className="w-1/5 rounded-xl shadow-xl px-4 py-10 flex flex-col items-center gap-2">
          <div className="font-bold text-3xl text-purple-600">Professional</div>
          <div className="text-5xl font-bold tracking-wide mt-2 text-purple-600">
            <span className="text-base">IDR</span>3.249K
          </div>
          <div className="font-bold opacity-40">PER BULAN/POSISI</div>
          <div className="text-white font-bold py-3 w-full rounded-lg shadow-xl my-4 text-center bg-purple-600">
            Pilih Professional
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">50 Job posting</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Iklan aktif 30 hari</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Posting di instagram & fb</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div className="">
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8 text-justify">
              Iklan tayang di seluruh channel kami. (Website, LinkedIn,
              Facebook, Instagram, Telegram dan Twitter)
            </div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Notifikasi lamaran masuk</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Free design poster loker</div>
          </div>
          <div className="grid grid-cols-9 gap-2">
            <div>
              <img
                width={28}
                height={28}
                src="/images/landing/checkbox.png"
                alt=""
              />
            </div>
            <div className="col-span-8">Unlimitted job applications</div>
          </div>
        </div>
      </section>
      <section
        className="mt-20 mb-8 lg:mb-10 lg:py-12 flex flex-col bg-cover bg-no-repeat gap-6 items-center"
        style={{ backgroundImage: "url('/images/landing/bg-5.png')" }}
      >
        <div className="text-secondary font-bold text-lg tracking-wider">
          KLIEN
        </div>
        <div className="font-bold text-4xl lg:text-5xl">Klien Kami</div>
        <div className="max-w-2xl leading-8 text-center hidden lg:block">
          Daftar sebagian perusahaan yang telah mempercayakan layanan penayangan
          informasi lowongan kerja kepada maisyah.id
        </div>
      </section>
      <section className="grid grid-cols-4 lg:grid-cols-5 w-10/12 mx-auto justify-items-center items-center gap-y-8 gap-x-12 mb-20">
        <div>
          <img src="/images/landing/logo-perusahaan/sabana.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/dbesto.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/Daarul-qur'an.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/Laksmi_Kebaya.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/rafeeq.png" alt="" />
        </div>
        <div>
          <img
            src="/images/landing/logo-perusahaan/moslem-journey.png"
            alt=""
          />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/maghhfirah.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/bos-pengering.png" alt="" />
        </div>
        <div>
          <img
            src="/images/landing/logo-perusahaan/bintang-pelajar.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="/images/landing/logo-perusahaan/islamic-school.png"
            alt=""
          />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/muslim-pergi.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/aqu.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/dav.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/pondok-media.png" alt="" />
        </div>
        <div>
          <img src="/images/landing/logo-perusahaan/amanahcorp.png" alt="" />
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
