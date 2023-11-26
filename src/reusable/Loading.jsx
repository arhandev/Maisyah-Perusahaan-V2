import { Spin } from "antd";

function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}

export default Loading;
