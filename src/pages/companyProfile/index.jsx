import { getErrorValue } from "@/utils/getErrors";
import { LoadingOutlined } from "@ant-design/icons";
import {
  IconBookmarkFilled,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { FieldArray, Formik, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ImgCrop from "antd-img-crop";
import Loading from "../../reusable/Loading";
import { jumlahKaryawanData } from "../../utils/selectData";
import ErrorPage from "../ErrorPage";
import { debounce, isEmpty } from "lodash";
import { useGetCompanyProfile } from "../../query/dashboard/useGetCompanyProfile";
import { useSearchVillage } from "../../query/dashboard/useSearchVillage";
import { useUpdateProfile } from "../../query/dashboard/usePostProfile";

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
  const [imageList, setImageList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(initialState);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  const onChange = ({ fileList: newFileList }) => {
    setImageList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleCancel = () => setPreviewVisible(false);

  const setFormInput = (data) => {
    let misi = data.misi.map((item) => item.text);
    setInput({
      jumlah_karyawan: data.jumlah_karyawan ?? "",
      deskripsi: data.deskripsi,
      village_id: data.village_id,
      website: data.website,
      tagline: data.tagline,
      alamat: data.alamat,
      bidang_perusahaan: data.bidang_perusahaan,
      profile_picture: data.profile_picture,
      visi: data.visi,
      misi: misi,
      isProfilePictureChange: false,
    });
  };

  const onSearchVillage = debounce(async (value) => {
    setSearch(value);
  }, 500);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("jumlah_karyawan", values.jumlah_karyawan ?? "");
    formData.append("deskripsi", values.deskripsi ?? "");
    formData.append("village_id", values.village_id ?? "");
    formData.append("tagline", values.tagline ?? "");
    formData.append("alamat", values.alamat ?? "");
    formData.append("bidang_perusahaan", values.bidang_perusahaan ?? "");
    formData.append("visi", values.visi ?? "");
    formData.append("website", values.website ?? "");

    if (values.isProfilePictureChange) {
      formData.append("profile_picture", values.profile_picture);
    }

    values.misi.forEach((item) => {
      formData.append("misi[]", item ?? "");
    });
    storeProfile(formData);
  };

  const onSuccessProfileFecth = (response) => {
    setSearch(response.village.name);
    setFormInput(response);
  };

  const onUpdateSuccess = (response) => {
    setEdit(false);
    console.log(response);
    setSearch(response.data.data.village.name);
    setFormInput(response.data.data);
    messageApi.success("Profile berhasil di update");
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useGetCompanyProfile({
      id: "company_profile",
      onError,
      onSuccess: onSuccessProfileFecth,
    });

  const {
    isLoading: isVillageLoading,
    data: village,
    refetch: refetchVillage,
  } = useSearchVillage({
    id: "village",
    params: { search: search },
    enabled: data != "",
    keepPreviousData: true,
    onError,
  });

  const { mutate: storeProfile, isUpdateLoading } = useUpdateProfile({
    onError,
    onSuccess: onUpdateSuccess,
  });

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={input}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
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
          }) => (
            <>
              <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
                <Form
                  colon={false}
                  labelAlign="left"
                  layout={
                    window.screen.width < 1200 ? "vertical" : "horizontal"
                  }
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
                  {/* Company Profile Picture */}
                  <div
                    className="w-full flex justify-center items-center mb-6"
                    id="profile-picture"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-xl font-bold mb-2 text-gray-custom">
                        Profile Picture{" "}
                      </h1>
                      <div className="">
                        {edit ? (
                          <ImgCrop
                            rotationSlider
                            zoomSlider
                            modalOk="Crop"
                            modalTitle="Edit Image"
                            quality={1}
                          >
                            <Upload
                              customRequest={({ onSuccess }) =>
                                setTimeout(() => {
                                  onSuccess("Uploaded", null);
                                }, 0)
                              }
                              maxCount={1}
                              listType="picture-card"
                              onChange={onChange}
                              onPreview={handlePreview}
                              fileList={imageList}
                              beforeUpload={(file) => {
                                setFieldValue("profile_picture", file);
                                setFieldValue("isProfilePictureChange", true);
                                return file;
                              }}
                            >
                              {imageList.length < 1 && "Upload Profile Picture"}
                            </Upload>
                          </ImgCrop>
                        ) : (
                          <div
                            onClick={() => setPreviewVisible(true)}
                            className="relative rounded-xl border-2 border-gray-600"
                          >
                            <div className="w-full h-full flex justify-center items-center absolute cursor-pointer text-xl font-bold text-transparent tracking-widest hover:text-white bg-transparent hover:bg-black hover:bg-opacity-30">
                              Preview
                            </div>
                            <img
                              style={{ width: 192 }}
                              src={values.profile_picture}
                              className=" rounded-xl"
                            />
                          </div>
                        )}
                        <Modal
                          visible={previewVisible}
                          title="Preview Image"
                          footer={null}
                          onCancel={handleCancel}
                        >
                          <img
                            alt="example"
                            style={{ width: 600 }}
                            src={edit ? previewImage : values.profile_picture}
                          />
                        </Modal>
                      </div>
                    </div>
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
                  <FormItem
                    label="Lokasi Kelurahan"
                    error={getErrorValue(
                      errors.village_id,
                      errorMessage?.village_id
                    )}
                    touched={touched.village_id}
                    className="font-bold"
                  >
                    <Select
                      name="village_id"
                      value={values.village_id}
                      defaultValue={values.village_id}
                      style={{ width: "100%" }}
                      onBlur={() => setFieldTouched("village_id")}
                      onChange={(value) => {
                        setFieldValue("village_id", value);
                      }}
                      size="large"
                      showSearch
                      onSearch={onSearchVillage}
                      loading={isLoading || isVillageLoading}
                      notFoundContent={
                        <div className="flex justify-center items-center">
                          Kelurahan Tidak ditemukan
                        </div>
                      }
                      filterOption={false}
                      placeholder="Kelurahan-Kecamatan-Kota-Provinsi"
                      disabled={!edit}
                    >
                      {!(isLoading || isVillageLoading) &&
                        !isEmpty(village) && (
                          <Option value="" disabled>
                            Pilih Kelurahan tempat kerja
                            (Kelurahan-Kecamatan-Kota-Provinsi)
                          </Option>
                        )}
                      {!(isLoading || isVillageLoading) &&
                        village.villages.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}{" "}
                            {item.district.name
                              ? ` - ${item.district.name}`
                              : ""}{" "}
                            {item.district.city.name
                              ? ` - ${item.district.city.name}`
                              : ""}
                            {item.district.city.province?.name
                              ? ` - ${item.district.city.province?.name}`
                              : ""}
                          </Option>
                        ))}
                    </Select>
                  </FormItem>
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
                    error={getErrorValue(
                      errors.deskripsi,
                      errorMessage?.deskripsi
                    )}
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
                  {/* Visi */}
                  <FormItem
                    label="Visi"
                    error={getErrorValue(errors.visi, errorMessage?.visi)}
                    touched={touched.visi}
                    className="font-bold"
                  >
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.visi}
                      name="visi"
                      placeholder="Masukkan Bidang Perusahaan anda"
                      size="large"
                      disabled={!edit}
                    />
                  </FormItem>
                  {/* MISI */}
                  <FieldArray name="misi">
                    {({ insert, remove, push }) => (
                      <>
                        {values.misi.map((misi, index) => (
                          <FormItem
                            label={index === 0 && "Misi"}
                            wrapperCol={
                              index !== 0 && { lg: { span: 20, offset: 6 } }
                            }
                            // Disini untuk mengecek apakah misi sudah berbentuk array atau tidak
                            error={getErrorValue(
                              errors.misi && errors.misi[index],
                              errorMessage?.misi && errorMessage?.misi[index]
                            )}
                            touched={touched.misi && touched.misi[index]}
                            key={index}
                            className="font-bold"
                          >
                            <Input
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={misi}
                              name={`misi[${index}]`}
                              placeholder="Masukkan Misi anda"
                              disabled={!edit}
                              size="large"
                              suffix={
                                edit ? (
                                  <IconTrash
                                    color="red"
                                    onClick={() => {
                                      remove(index);
                                    }}
                                  ></IconTrash>
                                ) : (
                                  <span />
                                )
                              }
                            />
                          </FormItem>
                        ))}
                        {edit && (
                          <FormItem
                            label={values.misi.length === 0 && "Misi"}
                            wrapperCol={{
                              lg: {
                                span: 20,
                                offset: values.misi.length === 0 ? 0 : 6,
                              },
                            }}
                            className="font-bold"
                          >
                            <div
                              onClick={() => push("")}
                              className="w-full flex gap-4 items-center border-2 border-dashed border-primary py-3 px-4 rounded-lg bg-primary bg-opacity-10"
                            >
                              <IconPlus />
                              <p className="text-lg text-gray-500">
                                Tambah misi lain
                              </p>
                            </div>
                          </FormItem>
                        )}
                      </>
                    )}
                  </FieldArray>
                </Form>
              </div>
            </>
          )}
        </Formik>
      )}
    </div>
  );
}

export default CompanyProfile;
