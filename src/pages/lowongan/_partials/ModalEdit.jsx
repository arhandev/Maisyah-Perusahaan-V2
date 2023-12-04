import { Button, Modal } from "antd";
import { Formik } from "formik";
import { isEmpty } from "lodash";
import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ModalContent from "./ModalContent";

const { confirm } = Modal;

function ModalEdit({ jobData, setJobData, fetchJobs, messageApi }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSuccess = (response) => {
    messageApi.success(response.data.info);
    fetchJobs();
    onClose();
  };

  const onError = (error) => {
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const onClose = () => {
    setJobData({});
    searchParams.delete("id");
    setSearchParams(searchParams);
  };

  const HeaderModal = () => (
    <div className="flex gap-4">
      <div>
        <img src="/images/file-upload.svg" alt="Upload File" />
      </div>
      <div>
        <h1 className="font-bold text-2xl text-gray-custom">Lihat Loker</h1>
        <div className="text-left text-lg text-gray-custom text-opacity-50">
          Klik Tombol Edit untuk mengubah data lowongan pekerjaan
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        open={!isEmpty(jobData)}
        style={{ top: 20 }}
        onCancel={onClose}
        onOk={onClose}
        width={"85%"}
        title={<HeaderModal />}
        closeIcon={true}
        footer={[]}
        destroyOnClose
      >
        <ModalContent
          jobData={jobData}
          messageApi={messageApi}
          fetchJobs={fetchJobs}
        />
      </Modal>
    </>
  );
}

export default ModalEdit;
