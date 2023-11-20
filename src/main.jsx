import { ConfigProvider } from "antd";
import locale from "antd/locale/id_ID";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "react-query";
import Prerequest from "./components/Prerequest.jsx";

dayjs().format();
dayjs.locale("id");

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Prerequest>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={locale}
          theme={{
            token: {
              colorPrimary: "#31AAE0",
              colorError: "#EA4735",
            },
            components: {
              Form: {
                labelFontSize: 17,
                labelColor: "#14445D",
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </Prerequest>
  </React.StrictMode>
);
