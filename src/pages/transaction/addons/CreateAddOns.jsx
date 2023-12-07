import { useUserStore } from "@/store/userStore";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  message,
} from "antd";
import { useFormik } from "formik";
import { debounce, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { TOKEN_PRICE } from "../../../utils/constant";
import FormItem from "antd/es/form/FormItem";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { getErrorValue } from "../../../utils/getErrors";
import { usePayment } from "../../../store/payment";
import numeral from "../../../utils/numeralLocale";
import Loading from "../../../reusable/Loading";
import { useCheckVoucher } from "../../../query/dashboard/useCheckVoucher";
import { useTransactionToken } from "../../../query/dashboard/usePostTransactionToken";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      qty: Yup.number().required(),
    })
  ),
  voucher_code: Yup.string().nullable(),
  payment_method_id: Yup.string().nullable(),
});

function CreateAddOns() {
  const initialState = {
    payment_method_id: "",
    products: [{ qty: 1 }],
    voucher_code: "",
  };

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState(initialState);
  const [voucher, setVoucher] = useState({});
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherErrorInfo, setVoucherErrorInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const { userData } = useUserStore((state) => state);
  const { isLoading, status, data: payment, getPayment } = usePayment();

  useEffect(() => {
    getPayment();
  }, [getPayment]);

  const onSubmit = async (values) => {
    Modal.confirm({
      title: "Apakah anda yakin dengan layanan yang anda pilih?",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
      onOk() {
        postToken(values);
      },
      okText: "Yakin",
    });
  };

  const getPromo = debounce(async (value) => {
    checkVoucher({ voucher_code: value });
  }, 800);

  const onVoucherSuccess = (response) => {
    setVoucher(response.data.data.voucher);
  };

  const onTransactionSuccess = (response) => {
    messageApi.success(
      "Berhasil Membuat transaksi. Harap transfer dengan jumlah yang telah ditentukan"
    );
    navigate("/dashboard/transaction");
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { mutate: checkVoucher, isVoucherLoading } = useCheckVoucher({
    onError,
    onSuccess: onVoucherSuccess,
  });

  const { mutate: postToken, isTransactionLoading } = useTransactionToken({
    onError,
    onSuccess: onTransactionSuccess,
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
    enableReinitialize: true,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  const discountFormat = () => {
    if (voucher && voucher.type === "percentage") {
      return (values.products[0].qty * TOKEN_PRICE * voucher.discount) / 100;
    } else if (voucher && voucher.type === "fix") {
      return voucher.discount;
    }
    return 0;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
          <Form onFinish={handleSubmit} labelAlign="left" layout="vertical">
            <div className="mt-8 mb-4" id="create-transaction">
              <h1 className="text-3xl text-gray-custom font-bold mb-6">
                Form Pembelian Add On
              </h1>
              <div className="grid lg:grid-cols-2 lg:gap-12">
                <div>
                  {/* Nama Pembeli */}
                  <FormItem label="Nama Pembeli" className="mb-4 font-bold">
                    <Input value={userData.name} size="large" disabled />
                  </FormItem>
                  {/* NOTEL */}
                  <FormItem label="Handphone" className="mb-4 font-bold">
                    <Input value={userData.notel} size="large" disabled />
                  </FormItem>
                  {/* Email */}
                  <FormItem label="Email" className="mb-4 font-bold">
                    <Input value={userData.email} size="large" disabled />
                  </FormItem>
                  {/* JENIS ADDONS */}
                  <FormItem label="Jenis Add On" className="mb-4 font-bold">
                    <Select
                      defaultValue={""}
                      style={{ width: "100%" }}
                      disabled
                      size="large"
                    >
                      <Option value="">Kuota Lowongan</Option>
                    </Select>
                  </FormItem>
                  {/* Qty */}
                  <FormItem label="Qty" className="mb-4 font-bold">
                    <div className="flex gap-8 items-center justify-center lg:justify-start">
                      <button
                        onClick={() => {
                          if (values.products[0].qty > 1) {
                            setFieldValue(
                              "products.0.qty",
                              values.products[0].qty - 1
                            );
                          }
                        }}
                        type="button"
                        className="bg-transparent border-none"
                      >
                        <IconCircleMinus className="text-2xl" />
                      </button>
                      <p className="text-2xl font-bold">
                        {values.products[0].qty}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue(
                            "products.0.qty",
                            values.products[0].qty + 1
                          );
                        }}
                        className="bg-transparent border-none"
                      >
                        <IconCirclePlus className="text-2xl" />
                      </button>
                    </div>
                  </FormItem>
                  {/* Pembayaran */}
                  <FormItem
                    label="Pembayaran"
                    error={getErrorValue(
                      errors.payment_method_id,
                      errorMessage?.payment_method_id
                    )}
                    touched={touched.payment_method_id}
                    className="mb-4 font-bold"
                  >
                    <Select
                      name="payment_method_id"
                      value={values.payment_method_id}
                      defaultValue={""}
                      style={{ width: "100%" }}
                      onBlur={handleBlur}
                      onChange={(value) => {
                        setFieldValue("payment_method_id", value);
                      }}
                      size="large"
                    >
                      <Option value="" disabled>
                        Pilih Pembayaran
                      </Option>
                      {payment.payments?.map((payment, index) => (
                        <Option key={index} value={payment.id}>
                          <div className="flex gap-2 items-center">
                            <div>
                              <img
                                src={payment.gambar}
                                className="w-10"
                                alt=""
                              />
                            </div>
                            <div className="text-gray-custom">
                              {payment.akronim_nama} - {payment.nomor} A/n{" "}
                              {payment.atas_nama}
                            </div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                  {/* CODE PROMO */}
                  <FormItem
                    label="Kode Promo (Jika ada)"
                    error={voucherErrorInfo}
                    touched={true}
                    className="mb-2 font-bold"
                  >
                    <Input
                      onChange={(e) => {
                        handleChange(e);
                        getPromo(e.target.value);
                      }}
                      onBlur={handleBlur}
                      name="voucher_code"
                      value={values.voucher_code}
                      placeholder="Kode Promo"
                      suffix={voucherLoading && <Spin />}
                      size="large"
                      disabled={isEmpty(values.products)}
                    />
                  </FormItem>
                </div>
                <div>
                  <div className="border-solid border-2 border-gray-custom rounded-xl p-6 self-start mt-10 lg:mt-0">
                    <h2 className="text-2xl font-bold text-gray-custom">
                      Total Checkout
                    </h2>
                    <div className="flex justify-between items-center mt-6 text-lg">
                      <p>{values.products[0].qty} Token Lowongan</p>
                      <p>
                        {values.products[0].qty} x Rp.{" "}
                        {numeral(TOKEN_PRICE).format("0,0")}
                      </p>
                    </div>
                    {!isEmpty(voucher) && (
                      <div className="flex justify-between items-center mt-2 text-lg">
                        <p className="text-red-custom">Discount </p>
                        <p className="text-red-custom">
                          {" "}
                          - Rp. {numeral(discountFormat()).format("0,0")}
                        </p>
                      </div>
                    )}
                    <div className="border-solid border border-gray-400 my-3 mx-1"></div>
                    <div className="flex justify-between items-center text-xl">
                      <p>Biaya Layanan</p>
                      <p>Rp. {numeral(1000).format("0,0")}</p>
                    </div>
                    <div className="flex justify-between items-center mb-6 text-xl">
                      <p>Total</p>
                      <p>
                        Rp.{" "}
                        {numeral(
                          TOKEN_PRICE * values.products[0].qty -
                            discountFormat() +
                            1000
                        ).format("0,0")}
                      </p>
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
                        loading={isLoading || isSubmitting}
                      >
                        <span className="text-lg font-bold">Beli</span>
                      </Button>
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CreateAddOns;
