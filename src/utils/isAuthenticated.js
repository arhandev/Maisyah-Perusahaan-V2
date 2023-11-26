import Cookies from "js-cookie";

const isAuthenticated = () => {
  if (Cookies.get("user_perusahaan") && Cookies.get("token_perusahaan")) {
    return true;
  } else {
    return false;
  }
};

export default isAuthenticated;
