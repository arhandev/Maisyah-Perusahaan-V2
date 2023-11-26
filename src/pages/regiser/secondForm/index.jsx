import FormItem from "@/reusable/FormItem";
import { useUserStore } from "@/store/userStore";
import { getErrorValue } from "@/utils/getErrors";
import {
  IconBriefcase,
  IconInfoCircle,
  IconLock,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { Button, Checkbox, ConfigProvider, Form, Input, message } from "antd";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useRegister } from "@/query/auth/useRegister";
import TextArea from "antd/es/input/TextArea";

const validationSchema = Yup.object().shape({
  nama_perusahaan: Yup.string().required("Nama Perusahaan wajib diisi"),
  deskripsi_perusahaan: Yup.string().required(
    "Deskripsi Perusahaan wajib diisi"
  ),
  agree_terms: Yup.boolean().oneOf([true], "Wajib diisi"),
});

const initialState = {
  nama_perusahaan: "",
  deskripsi_perusahaan: "",
  agree_terms: false,
};

function SecondRegister() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useUserStore((state) => state);
  const [errorMessage, setErrorMessage] = useState({});

  const onSubmit = async (values) => {
    const data = JSON.parse(sessionStorage.getItem("register"));
    register({ ...values, ...data });
  };

  const onSuccess = (response) => {
    messageApi.success(response.data.info);
    sessionStorage.removeItem("register");
    // TODO
    // Hilangkan tanda '!' di bawah
    if (!response.data.data.is_verify) {
      navigate({
        pathname: "/verification",
        search: createSearchParams({
          id: response.data.data.user.id,
        }).toString(),
      });
    } else {
      Cookies.set("token_perusahaan", response.data.data.token, {
        expires: 1,
      });
      Cookies.set("user_perusahaan", JSON.stringify(response.data.data.user), {
        expires: 1,
      });
      setUser(response.data.data.user);
      setIsLoggedIn(true);
      navigate({ pathname: "/dashboard/company-profile" });
    }
  };

  const onError = (error) => {
    setErrorMessage(error.response?.data?.data?.errors);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
    if (error.response.status === 403) {
      navigate({
        pathname: "/verification",
        search: createSearchParams({
          id: error.response.data.data.user.id,
        }).toString(),
      });
    }
  };

  const onSettled = () => {
    setSubmitting(false);
  };

  const { mutate: register, isLoading } = useRegister({
    onError,
    onSuccess,
    onSettled,
  });

  const {
    errors,
    handleBlur,
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    touched,
    dirty,
    isSubmitting,
    isValid,
    setSubmitting,
  } = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="antialiased text-gray-custom flex flex-col text-gray">
      {contextHolder}
      <nav className="items-center justify-between flex-wrap bg-teal w-11/12 mx-auto py-6 hidden lg:flex">
        <Link to="/">
          <div className="w-40 cursor-pointer">
            <img width={180} height={55} src="/images/maisyah.svg" alt="" />
          </div>
        </Link>
        <div className="flex gap-6 items-center text-xl">
          <div className="">Sudah punya akun?</div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FA8A00",
              },
            }}
          >
            <Link to="/login">
              <Button
                type="primary"
                ghost
                size="large"
                className="font-bold w-32"
              >
                Login
              </Button>
            </Link>
          </ConfigProvider>
        </div>
      </nav>
      <nav className="flex flex-col gap-2 w-10/12 mx-auto mt-24 mb-6 lg:hidden">
        <div className="text-3xl font-bold">Daftar</div>
        <div className="text-lg">
          Sudah punya akun?{" "}
          <Link to="/login">
            <span className="text-secondary">Login.</span>
          </Link>
        </div>
      </nav>
      <div className="bg-cover bg-top bottom-0 w-full lg:bg-wave-big ">
        <div className="bg-white rounded-lg lg:drop-shadow-xl lg:p-12 w-10/12 lg:w-144 mx-auto text-lg mb-20 lg:my-20 ">
          <h1 className="font-bold text-center mb-8 text-3xl hidden lg:block">
            Daftar sebagai Perusahaan
          </h1>
          <h3 className="text-primary text-center my-6">Step 2/2</h3>
          <Form onFinish={handleSubmit} layout="vertical">
            {/* Nama Perusahaan */}
            <FormItem
              label="Nama Perusahaan"
              error={getErrorValue(
                errors.nama_perusahaan,
                errorMessage?.nama_perusahaan
              )}
              touched={touched.nama_perusahaan}
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_perusahaan}
                name="nama_perusahaan"
                placeholder="Masukkan nama perusahaan anda"
                prefix={
                  <IconUser size={28} className="text-font-dark mr-1 w-5" />
                }
                size="large"
              />
            </FormItem>
            {/* DESKRIPSI */}
            <FormItem
              label="Deskripsi Perusahaan"
              error={getErrorValue(
                errors.deskripsi_perusahaan,
                errorMessage?.deskripsi_perusahaan
              )}
              touched={touched.deskripsi_perusahaan}
            >
              <TextArea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deskripsi_perusahaan}
                name="deskripsi_perusahaan"
                placeholder="Masukkan Deskripsi Perusahaan anda"
                size="large"
                autoSize={{ minRows: 3, maxRows: 7 }}
              />
            </FormItem>

            <div className="my-8 flex gap-2">
              <div>
                <Checkbox
                  onChange={() =>
                    setFieldValue("agree_terms", !values.agree_terms)
                  }
                  onBlur={handleBlur}
                  value={values.agree_terms}
                  checked={values.agree_terms}
                  name="reseller"
                ></Checkbox>
              </div>
              <div className="">
                Dengan mendaftar, saya telah membaca dan menyetujui{" "}
                <Link
                  to={"/syarat-ketentuan"}
                  className="text-secondary font-bold"
                >
                  Ketentuan Penggunaan dan Kebijakan Privasi
                </Link>{" "}
                Maisyah.id.
              </div>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#FA8A00",
                },
              }}
            >
              <Button
                htmlType="submit"
                type="primary"
                className="w-full my-4"
                size="large"
                disabled={!dirty || !isValid || isSubmitting}
                loading={isLoading}
              >
                <span className=" text-lg font-bold">Submit</span>
              </Button>
            </ConfigProvider>
          </Form>
        </div>
      </div>
      <div className="h-48 w-full bg-wave-small bg-cover bg-top lg:hidden"></div>
    </div>
  );
}

export default SecondRegister;
