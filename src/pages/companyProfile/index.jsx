import {
  Button,
  ConfigProvider,
  Empty,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getErrorValue } from "@/utils/getErrors";
import { useNavigate } from "react-router-dom";
import SideNav from "../../reusable/SideNav";
import ErrorPage from "../ErrorPage";
import { useGetDashboard } from "../../query/dashboard/useGetDashboard";
import Loading from "../../reusable/Loading";
import { jumlahKaryawanData } from "../../utils/selectData";
import { useState } from "react";
import { useFormik } from "formik";
import { IconBookmarkFilled, IconEdit } from "@tabler/icons-react";
import FormItem from "antd/es/form/FormItem";
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const validationSchema = Yup.object().shape({
  jumlah_karyawan: Yup.string("harus berupa angka").nullable(),
  deskripsi: Yup.string("harus berupa huruf atau angka").nullable(),
  village_id: Yup.string("harus berupa huruf atau angka").nullable(),
  website: Yup.string("harus berupa huruf atau angka").nullable(),
  tagline: Yup.string("harus berupa huruf atau angka").nullable(),
  bidang_perusahaan: Yup.string("harus berupa huruf atau angka").nullable(),
  alamat: Yup.string("harus berupa huruf dan angka").nullable(),
  visi: Yup.string("harus berupa huruf dan angka").nullable(),
  misi: Yup.array().of(
    Yup.string()
      .typeError("harus berupa angka")
      .required("Misi Wajib diisi jika ditambahkan")
  ),
});

const initialState = {
  jumlah_karyawan: "",
  deskripsi: "",
  village_id: "",
  website: "",
  tagline: "",
  bidang_perusahaan: "",
  alamat: "",
  visi: "",
  misi: [],
  profile_picture: null,
  isProfilePictureChange: false,
};

const { Option } = Select;

function CompanyProfile() {
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState({});
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(initialState);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const onSubmit = (value) => {};

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useGetDashboard({
      id: "dashboard",
      onError,
    });

  const {
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    isValid,
    dirty,
  } = useFormik({
    initialValues: input,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="bg-white flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      <SideNav />
      <div className="hidden lg:block w-72"></div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
          <Form
            colon={false}
            labelAlign="left"
            layout={window.screen.width < 1200 ? "vertical" : "horizontal"}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: window.screen.width < 1200 ? 24 : 20,
            }}
            onFinish={handleSubmit}
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold my-3">Profile</h1>
              </div>
              {edit ? (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#FA8A00",
                    },
                  }}
                >
                  <div className="flex gap-4">
                    <Button
                      type="text"
                      size="large"
                      className="font-bold flex gap-2 items-center justify-center"
                      onClick={() => setEdit(!edit)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      className="font-bold flex gap-2 items-center justify-center"
                      onClick={() => setEdit(!edit)}
                      disabled={isSubmitting}
                      htmlType="submit"
                    >
                      <IconBookmarkFilled />

                      <p className="font-bold text-lg text-white">
                        Simpan Perubahan
                      </p>
                    </Button>
                  </div>
                </ConfigProvider>
              ) : (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#FA8A00",
                    },
                  }}
                >
                  <Button
                    type="primary"
                    ghost
                    size="large"
                    className="font-bold w-48 flex gap-2 items-center justify-center"
                    onClick={() => setEdit(true)}
                  >
                    <IconEdit />
                    <p className="font-bold text-lg text-secondary">
                      Edit Profile
                    </p>
                  </Button>
                </ConfigProvider>
              )}
            </div>
            {/* NAMA PERUSAHAAN */}
            <FormItem label="Nama Perusahaan" className="font-bold">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={data.nama_perusahaan}
                name="nama_perusahaan"
                placeholder="Masukkan Nama Perusahaan anda"
                disabled
                size="large"
              />
            </FormItem>
            {/* LOKASI */}
            <p>Lokasi</p>
            {/* ALAMAT */}
            <FormItem
              label="Alamat"
              error={getErrorValue(errors.alamat, errorMessage?.alamat)}
              touched={touched.alamat}
              className="font-bold"
            >
              <Input
                name="alamat"
                placeholder="Masukkan Alamat Perusahaan"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.alamat}
                disabled={!edit}
                size="large"
              />
            </FormItem>
            {/* JUMLAH KARYAWAN */}
            <FormItem
              label="Jumlah Karyawan"
              error={getErrorValue(
                errors.jumlah_karyawan,
                errorMessage?.jumlah_karyawan
              )}
              touched={touched.jumlah_karyawan}
              className="font-bold"
            >
              <Select
                name="jumlah_karyawan"
                value={values.jumlah_karyawan}
                defaultValue={values.jumlah_karyawan}
                style={{ width: "100%" }}
                onBlur={() => setFieldTouched("jumlah_karyawan")}
                onChange={(value) => {
                  setFieldValue("jumlah_karyawan", value);
                }}
                size="large"
                disabled={!edit}
              >
                <Option value="" disabled>
                  Pilih Jumlah Karyawan
                </Option>
                {jumlahKaryawanData.map((item, index) => (
                  <Option key={index} value={item.value}>
                    {item.text}
                  </Option>
                ))}
              </Select>
            </FormItem>
            {/* TAGLINE */}
            <FormItem
              label="Tagline"
              error={getErrorValue(errors.tagline, errorMessage?.tagline)}
              touched={touched.tagline}
              className="font-bold"
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tagline}
                name="tagline"
                placeholder="Masukkan Tagline anda"
                size="large"
                disabled={!edit}
              />
            </FormItem>
            {/* WEBSITE */}
            <FormItem
              label="Website"
              error={getErrorValue(errors.website, errorMessage?.website)}
              touched={touched.website}
              className="font-bold"
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                name="website"
                placeholder="Masukkan Website anda"
                size="large"
                disabled={!edit}
              />
            </FormItem>
            {/* BIDANG PERUSAHAAN */}
            <FormItem
              label="Bidang Perusahaan"
              error={getErrorValue(
                errors.bidang_perusahaan,
                errorMessage?.bidang_perusahaan
              )}
              touched={touched.bidang_perusahaan}
              className="font-bold"
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bidang_perusahaan}
                name="bidang_perusahaan"
                placeholder="Masukkan Bidang Perusahaan anda"
                size="large"
                disabled={!edit}
              />
            </FormItem>
            {/* DESKRIPSI */}
            <FormItem
              label="Deskripsi Perusahaan"
              error={getErrorValue(errors.deskripsi, errorMessage?.deskripsi)}
              touched={touched.deskripsi}
              className="font-bold"
            >
              <TextArea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deskripsi}
                name="deskripsi"
                placeholder="Masukkan Deskripsi Perusahaan anda"
                size="large"
                autoSize={{ minRows: 3, maxRows: 7 }}
                disabled={!edit}
              />
            </FormItem>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CompanyProfile;
