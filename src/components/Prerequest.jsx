import { useUserStore } from "@/store/userStore";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { useEffect } from "react";

function Prerequest({ children }) {
  const { userData, setUser } = useUserStore((state) => state);

  useEffect(() => {
    if (Cookies.get("token_pencaker") && isEmpty(userData)) {
      const data = JSON.parse(Cookies.get("user_pencaker"));
      setUser(data);
    }
  }, [Cookies.get("token_pencaker")]);

  return children;
}

export default Prerequest;
