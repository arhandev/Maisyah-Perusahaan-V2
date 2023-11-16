import Cookies from "js-cookie";

const isAuthenticated = () => {
  if (Cookies.get("user_pencaker") && Cookies.get("token_pencaker")) {
    return true;
  } else {
    return false;
  }
};

export default isAuthenticated;
