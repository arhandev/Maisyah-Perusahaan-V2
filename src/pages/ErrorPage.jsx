import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

function ErrorPage() {
  return (
    <div>
      <Navbar />
      <div className="lg:h-128 mt-8 flex flex-col-reverse lg:flex-row justify-center gap-6 items-center lg:mt-0 mb-16">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-4">
          <h2 className="text-primary text-center text-2xl lg:text-5xl font-bold">
            Afwan !
          </h2>
          <h2 className="text-secondary text-center text-3xl lg:text-6xl font-black">
            Something went wrong
          </h2>
          <h2 className="text-primary text-center text-lg lg:text-2xl lg:w-120">
            Sorry. We having some technical issues. Try to refresh the page,
            something works :)
          </h2>
          <Link to="/">
            <button className="mt-8 px-6 py-2 text-xl text-white bg-secondary font-bold rounded-full">
              BACK TO HOME
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <img src="/images/error-logo.png" className="w-64 lg:w-120" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
