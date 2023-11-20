import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

function Prerequest({ children }) {
  const { userData, setUser } = useUserStore((state) => state);

  useEffect(() => {
    if (Cookies.get("token_perusahaan") && isEmpty(userData)) {
      const data = JSON.parse(Cookies.get("user_perusahaan"));
      setUser(data);
    }
  }, [Cookies.get("token_perusahaan")]);

  return children;
}

export default Prerequest;
