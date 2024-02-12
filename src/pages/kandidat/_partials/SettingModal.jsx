import { Button, ConfigProvider, Form, Modal, Select } from "antd";
import { useState } from "react";
import { useEditLamaran } from "../../../query/dashboard/useEditLamaran";
import FormItem from "antd/es/form/FormItem";
import { IconBookmarkFilled } from "@tabler/icons-react";

const { Option } = Select;

const HeaderModal = () => (
  <div className="flex gap-4">
    <div>
      <img src="/images/file-upload.svg" alt="Upload File" />
    </div>
    <div>
      <h1 className="font-bold text-2xl text-gray-custom">
        Pengaturan Kandidat
      </h1>
      <h2 className="mt-1 text-gray-bright ">
        Klik Tombol Edit untuk mengubah pengaturan kandidat kerja
      </h2>
    </div>
  </div>
);

function SettingModal({
  settingModal,
  setSettingModal,
  selected,
  setSelected,
  fetchJobs,
  messageApi,
}) {
  const [status, setStatus] = useState(selected.status);

  const onClose = () => {
    setSettingModal(false);
  };

  const onSubmit = async () => {
    Modal.confirm({
      title: "Apakah anda yakin ingin mengganti status lowongan ini",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
      onOk() {
        editLamaran({ value: { status: status }, id: selected.id });
      },
      okText: "Simpan",
      cancelText: "Batal",
    });
  };

  const onSuccess = (response) => {
    messageApi.success("Status berhasil di update");
    setSelected(response.data.data.lamaran);
    fetchJobs();
    onClose();
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { mutate: editLamaran, isEditLoading } = useEditLamaran({
    onError,
    onSuccess,
  });

  const handleChangeStatus = (value) => {
    setStatus(value);
  };
  
  return (
    <Modal
      title={<HeaderModal />}
      footer={<span />}
      width={"40%"}
      open={settingModal}
      onOk={onSubmit}
      onCancel={onClose}
      closeIcon={false}
    >
      <Form layout="vertical" className="max-w-sm mx-auto">
        <FormItem label="Status">
          <Select
            className="w-64"
            defaultValue={status}
            onChange={handleChangeStatus}
          >
            <Option value="sent">Terkirim</Option>
            <Option value="review">Sedang Direview</Option>
            <Option value="failed">Belum Memenuhi Kriteria</Option>
            <Option value="qualify">Terkualifikasi</Option>
          </Select>
        </FormItem>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FA8A00",
            },
          }}
        >
          <div>
            <Button
              type="primary"
              size="large"
              className="font-bold flex gap-2 items-center justify-center"
              disabled={isEditLoading}
              onClick={onSubmit}
              htmlType="submit"
            >
              <IconBookmarkFilled />
              <p className="font-bold text-lg text-white">Simpan Perubahan</p>
            </Button>
          </div>
        </ConfigProvider>
      </Form>
    </Modal>
  );
}

export default SettingModal;
