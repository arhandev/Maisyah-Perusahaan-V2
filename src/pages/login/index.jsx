import FormItem from "@/reusable/FormItem";
import { useUserStore } from "@/store/userStore";
import { getErrorValue } from "@/utils/getErrors";
import { IconLock, IconMail } from "@tabler/icons-react";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLogin } from "../../query/auth/useLogin";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useUserStore((state) => state);
  const [errorMessage, setErrorMessage] = useState({});

  const onSubmit = async (values) => {
    login(values);
  };

  const onSuccess = (response) => {
    messageApi.success(response.data.info);

    setUser(response.data.data.user);
    setIsLoggedIn(true);
    Cookies.set("token_perusahaan", response.data.data.token, {
      expires: 1,
    });
    Cookies.set("user_perusahaan", JSON.stringify(response.data.data.user), {
      expires: 1,
    });
    navigate({ pathname: "/dashboard" });
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

  const { mutate: login, isLoading } = useLogin({
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
    <div className="antialiased min-h-screen flex flex-col justify-between lg:justify-start text-gray-custom  bg-contain bg-no-repeat bg-bottom lg:bg-wave-small">
      {contextHolder}
      {/* HEADER  */}
      <nav className="hidden lg:flex items-center justify-between flex-wrap bg-teal w-11/12 mx-auto py-6 ">
        <Link to="/">
          <div className="w-40 cursor-pointer">
            <img width={180} height={55} src="/images/maisyah.svg" alt="" />
          </div>
        </Link>
        <div className="flex gap-6 items-center text-xl">
          <div className="">Belum Punya Akun Perusahaan?</div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FA8A00",
              },
            }}
          >
            <Link to="/register">
              <Button
                type="primary"
                ghost
                size="large"
                className="font-bold w-auto"
              >
                Daftar Sebagai Perusahaan
              </Button>
            </Link>
          </ConfigProvider>
        </div>
      </nav>
      <nav className="flex flex-col gap-2 w-10/12 mx-auto mt-24 mb-6 lg:hidden">
        <div className="text-3xl font-bold">Masuk</div>
        <div className="text-xl">
          Belum punya akun?{" "}
          <Link to="/register">
            <span className="text-secondary">Daftar.</span>
          </Link>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="bg-white rounded-lg lg:drop-shadow-xl lg:p-12 w-10/12 lg:w-144 mx-auto text-lg mb-20 lg:my-20">
          <h1 className="font-bold text-center mb-8 text-3xl hidden lg:block">
            Masuk Sebagai Perusahaan
          </h1>
          <Form onFinish={handleSubmit} layout="vertical">
            {/* EMAIL */}
            <FormItem
              label="Email"
              error={getErrorValue(errors.email, errorMessage?.email)}
              touched={touched.email}
            >
              <Input
                prefix={
                  <IconMail size={28} className="text-font-dark mr-1 w-5" />
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                placeholder="Masukkan email anda"
                size="large"
              />
            </FormItem>
            {/* Password */}
            <FormItem
              label="Password"
              error={getErrorValue(errors.password, errorMessage?.password)}
              touched={touched.password}
            >
              <Input.Password
                prefix={
                  <IconLock size={28} className="text-font-dark mr-1 w-5" />
                }
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                placeholder="Masukkan password anda"
                type="password"
              />
            </FormItem>
            <div className="mb-6 flex justify-between">
              <div className="flex items-center justify-center gap-2"></div>
              <Link to="/forgot-password" className="">
                <div className="text-secondary hover:text-orange-500 cursor-pointer">
                  Lupa Password?
                </div>
              </Link>
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
                className="w-full"
                size="large"
                disabled={!dirty || !isValid || isSubmitting}
                loading={isLoading}
              >
                <span className=" text-lg font-bold">Login</span>
              </Button>
            </ConfigProvider>
          </Form>
        </div>
      </div>
      <div className="h-48 w-full bg-wave-small bg-cover bg-top lg:hidden"></div>
    </div>
  );
}

export default Login;
