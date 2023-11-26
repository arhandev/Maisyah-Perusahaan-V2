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
import { useRegisterVerification } from "@/query/auth/useRegisterVerification";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  posisi_perusahaan: Yup.string().required("Posisi wajib diisi"),
  notel: Yup.number()
    .typeError("Pastikan anda memasukan angka")
    .required("No Handphone wajib di isi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
  password_confirmation: Yup.string().required(
    "Konfirmasi Password wajib diisi"
  ),
});

const initialState = {
  name: "",
  posisi_perusahaan: "",
  email: "",
  password: "",
  password_confirmation: "",
  notel: "",
};

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useUserStore((state) => state);
  const [errorMessage, setErrorMessage] = useState({});

  const onSubmit = async (values) => {
    register(values);
  };

  const onSuccess = (response) => {
    messageApi.success(response.data.info);
    sessionStorage.setItem("register", JSON.stringify(values));
    navigate({ pathname: "/register/2" });
  };

  const onError = (error) => {
    setErrorMessage(error.response?.data?.data?.errors);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const onSettled = () => {
    setSubmitting(false);
  };

  const { mutate: register, isLoading } = useRegisterVerification({
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
          <h3 className="text-primary text-center my-6">Step 1/2</h3>
          <Form onFinish={handleSubmit} layout="vertical">
            {/* NAMA LENGKAP */}
            <FormItem
              label="Nama Lengkap"
              error={getErrorValue(errors.name, errorMessage?.name)}
              touched={touched.name}
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
                placeholder="Masukkan nama lengkap anda"
                prefix={
                  <IconUser size={28} className="text-font-dark mr-1 w-5" />
                }
                size="large"
              />
            </FormItem>
            {/* POSISI */}
            <FormItem
              label="Posisi di Perusahaan"
              error={getErrorValue(
                errors.posisi_perusahaan,
                errorMessage?.posisi_perusahaan
              )}
              touched={touched.posisi_perusahaan}
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.posisi_perusahaan}
                name="posisi_perusahaan"
                placeholder="Posisi anda di perusahaan"
                prefix={
                  <IconBriefcase
                    size={28}
                    className="text-font-dark mr-1 w-5"
                  />
                }
                size="large"
              />
            </FormItem>
            {/* EMAIL */}
            <FormItem
              label="Email"
              error={getErrorValue(errors.email, errorMessage?.email)}
              touched={touched.email}
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                placeholder="Masukkan email anda"
                size="large"
                prefix={
                  <IconMail size={28} className="text-font-dark mr-1 w-5" />
                }
              />
            </FormItem>
            {/* Password */}
            <FormItem
              label="Password"
              error={getErrorValue(errors.password, errorMessage?.password)}
              touched={touched.password}
            >
              <Input.Password
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                placeholder="Masukkan password anda"
                image={"/images/password.png"}
                size="large"
                prefix={
                  <IconLock size={28} className="text-font-dark mr-1 w-5" />
                }
              />
            </FormItem>
            {/* Confirmation Password */}
            <FormItem
              label="Ulangi Password"
              error={getErrorValue(
                errors.password_confirmation,
                errorMessage?.password_confirmation
              )}
              touched={touched.password_confirmation}
            >
              <Input.Password
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password_confirmation}
                name="password_confirmation"
                placeholder="Ketik Ulang password anda"
                type="password"
                size="large"
                prefix={
                  <IconLock size={28} className="text-font-dark mr-1 w-5" />
                }
              />
            </FormItem>
            {/* NOTEL */}
            <FormItem
              label="Nomor HP"
              error={getErrorValue(errors.notel, errorMessage?.notel)}
              touched={touched.notel}
            >
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.notel}
                name="notel"
                placeholder="Masukkan no. HP anda"
                size="large"
                prefix={
                  <IconPhone size={28} className="text-font-dark mr-1 w-5" />
                }
              />
            </FormItem>
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

export default Register;
