import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Footer() {
  const footerRef = useRef(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("goto") === "contact") {
      footerRef.current.scrollIntoView();
    }
  }, [searchParams]);

  return (
    <footer
      ref={footerRef}
      className="border-t-2 border-gray border-opacity-20"
    >
      <div className="w-10/12 mx-auto my-12 grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-12">
        <div className="flex flex-col gap-8 col-span-2">
          <div>
            <img width={240} height={75} src="/images/maisyah.svg" alt="" />
          </div>
          <div className="font-bold">PT MAISYAH TALENTA INDONESIA</div>
          <div>Jl. Gamprit V No. 29 Pondokgede, Kota Bekasi 17411</div>
          <div>
            <div className="font-bold">Berbadan PT dan terdaftar HAKI</div>
            <div className="mt-2">
              <img
                width={260}
                height={70}
                src="/images/landing/direktorat-logo.png"
                alt=""
                className="w-48"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 ">
          <h1 className="font-bold text-xl">Contact Us</h1>
          <div className="flex flex-col gap-8">
            <div>Kebijakan Privasi</div>
            <Link to={"/syarat-ketentuan"}>
              <div className="cursor-pointer hover:text-primary hover:underline">
                Syarat dan Ketentuan
              </div>
            </Link>
            <div>FAQ</div>
            <div>Insight</div>
            <a href={"/license.csv"}>
              <div className="cursor-pointer hover:text-primary hover:underline">
                Open Source Library
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-xl">Maisyah</h1>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <img
                width={20}
                height={20}
                src="/images/landing/email.png"
                alt=""
              />
              <div>support@maisyah.id</div>
            </div>
            <div className="flex gap-4">
              <img
                width={20}
                height={20}
                src="/images/akar-icons_whatsapp-fill.svg"
                alt=""
              />
              <div>085211110097</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* <div className="font-bold text-xl">Tersedia di</div>
						<div>
							<img width={220} height={80} src="/images/landing/playstore-logo.png" alt="" className="w-48" />
						</div> */}
          <div>
            <h1 className="font-bold text-xl">Ikuti Kami</h1>
            <div className="flex gap-5 mt-4">
              <a href="https://id-id.facebook.com/maisyah.id/">
                <img
                  src="/images/brandico_facebook-rect.svg"
                  className="w-7"
                  alt=""
                />
              </a>
              <a href="https://www.instagram.com/maisyahid/">
                <img
                  src="/images/akar-icons_instagram-fill.svg"
                  className="w-8"
                  alt=""
                />
              </a>
              <a href="https://www.youtube.com/channel/UCqfrt5qXE1sU8xoP6pr8WQg">
                <img src="/images/stream.svg" className="w-10" alt="" />
              </a>
              <a href="https://twitter.com/maisyah_id">
                <img src="/images/tw.svg" className="w-8" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-3 bg-gray-custom text-lg tracking-wider font-bold text-white text-center">
        Copyright Maisyah 2022
      </div>
    </footer>
  );
}

export default Footer;
