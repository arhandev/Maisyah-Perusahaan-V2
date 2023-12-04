import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { Formik } from "formik";
import { debounce, isEmpty } from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getErrorValue } from "../../../utils/getErrors";
import {
  lokasiKerjaData,
  pengalamanKerjaData,
  tipePekerjaanData,
} from "../../../utils/selectData";
import { useSearchDistrict } from "../../../query/dashboard/useSearchDistrict";
import JobFieldArray from "../../../reusable/JobFieldArray";
import numeral from "../../../utils/numeralLocale";
import { usePostLowongan } from "../../../query/dashboard/usePostLowongan";

const { Option } = Select;
const validationSchema = Yup.object().shape({});

function CreateLowongan() {
  const initialState = {
    posisi_pekerjaan: "",
    tipe_pekerjaan: "",
    gender: "",
    lokasi: "",
    district_id: "",
    pengalaman: "",
    job_desc: "",
    catatan: "",
    jam_kerja: "",
    batas_bawah_gaji: "",
    batas_atas_gaji: "",
    job_responsibilities: [],
    job_requirements: [],
    job_skills: [],
    job_benefits: [],
    persetujuan: false,
    islamic_env: false,
    is_display_salary: false,
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState(initialState);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const onSearchDistrict = debounce(async (value) => {
    setSearch(value);
  }, 500);

  const setJamKerja = (time, setFieldValue) => {
    let jamMasuk = time[0].format("HH:mm");
    let jamPulang = time[1].format("HH:mm");
    setFieldValue("jam_kerja", `${jamMasuk} - ${jamPulang}`);
  };

  const onSubmit = (value) => {
    mutate(value);
  };

  const onSuccess = (response) => {
    setEdit(false);
    messageApi.success("Profile berhasil di update");
    navigate("/dashboard/lowongan");
  };

  const onError = (error) => {
    console.log(error);
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const {
    isLoading,
    data: district,
    refetch: districtRefetch,
  } = useSearchDistrict({
    id: "district",
    params: { search: search },
    enabled: search != "",
    keepPreviousData: true,
    onError,
  });

  const { mutate, isPostLoading } = usePostLowongan({
    onError,
    onSuccess,
  });

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
        <div className="flex gap-4">
          <div>
            <img src="/images/file-upload.svg" alt="Upload File" />
          </div>
          <div>
            <h1 className="font-bold text-2xl text-gray-custom">
              Posting Loker
            </h1>
            <div className="text-left text-lg text-gray-custom text-opacity-50">
              Isi form berikut untuk mengiklankan lowongan pekerjaan
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl border-[0] border-b-2 border-solid border-slate-200 my-6 pb-2">
          <Breadcrumb
            className=""
            items={[
              {
                title: <Link to={"/dashboard/lowongan"}>Lowongan</Link>,
              },
              {
                title: "Posting Loker",
              },
            ]}
          />
        </div>
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
            <Form
              id="post-lowongan"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 18,
              }}
              onFinish={handleSubmit}
              labelAlign="left"
              className="lg:ml-4 mb-12"
            >
              {/* POSISI PEKERJAAN */}
              <FormItem
                label="Posisi Pekerjaan"
                error={getErrorValue(
                  errors.posisi_pekerjaan,
                  errorMessage?.posisi_pekerjaan
                )}
                touched={touched.posisi_pekerjaan}
                className="mb-4 font-bold"
                wrapperCol={{ span: 8 }}
              >
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.posisi_pekerjaan}
                  name="posisi_pekerjaan"
                  placeholder="Posisi Pekerjaan yang dibutuhkan"
                  disabled={!edit}
                  size="large"
                />
              </FormItem>
              {/* JAM PEKERJAAN */}
              <FormItem
                label="Jam Kerja"
                error={getErrorValue(errors.jam_kerja, errorMessage?.jam_kerja)}
                touched={touched.jam_kerja}
                className="mb-4 font-bold"
                wrapperCol={{ span: 8 }}
              >
                <TimePicker.RangePicker
                  format={"HH:mm"}
                  onBlur={() => setFieldTouched("jam_kerja")}
                  onChange={(time) => setJamKerja(time, setFieldValue)}
                  className="py-2"
                  disabled={!edit}
                  size="large"
                />
              </FormItem>
              {/* TIPE PEKERJAAN */}
              <FormItem
                label="Tipe"
                error={getErrorValue(
                  errors.tipe_pekerjaan,
                  errorMessage?.tipe_pekerjaan
                )}
                touched={touched.tipe_pekerjaan}
                className="mb-4 font-bold"
                wrapperCol={{ span: 8 }}
              >
                <Select
                  name="tipe_pekerjaan"
                  value={values.tipe_pekerjaan}
                  defaultValue={values.tipe_pekerjaan}
                  style={{ width: "100%" }}
                  onBlur={() => setFieldTouched("tipe_pekerjaan")}
                  onChange={(value) => {
                    setFieldValue("tipe_pekerjaan", value);
                  }}
                  size="large"
                  disabled={!edit}
                >
                  <Option value="" disabled>
                    Pilih Tipe Pekerjaan
                  </Option>
                  {tipePekerjaanData.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              {/* GENDER PEKERJAAN */}
              <FormItem
                label="Jenis Kelamin"
                error={getErrorValue(errors.gender, errorMessage?.gender)}
                touched={touched.gender}
                className="mb-4 font-bold"
                wrapperCol={{ span: 8 }}
              >
                <Select
                  name="gender"
                  value={values.gender}
                  defaultValue={values.gender}
                  style={{ width: "100%" }}
                  onBlur={() => setFieldTouched("gender")}
                  onChange={(value) => {
                    setFieldValue("gender", value);
                  }}
                  size="large"
                  disabled={!edit}
                >
                  <Option value="" disabled>
                    Pilih Jenis Kelamin
                  </Option>
                  <Option value="L">Laki-laki</Option>
                  <Option value="P">Perempuan</Option>
                  <Option value="LP">Laki-laki & Perempuan</Option>
                </Select>
              </FormItem>
              {/* PENGALAMAN */}
              <FormItem
                label="Pengalaman"
                error={getErrorValue(
                  errors.pengalaman,
                  errorMessage?.pengalaman
                )}
                touched={touched.pengalaman}
                className="mb-4 font-bold"
                wrapperCol={{ span: 8 }}
              >
                <Select
                  name="pengalaman"
                  value={values.pengalaman}
                  defaultValue={values.pengalaman}
                  style={{ width: "100%" }}
                  onBlur={() => setFieldTouched("pengalaman")}
                  onChange={(value) => {
                    setFieldValue("pengalaman", value);
                  }}
                  size="large"
                  disabled={!edit}
                >
                  <Option value="" disabled>
                    Pilih Pengalaman
                  </Option>
                  {pengalamanKerjaData.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              {/* LOKASI PEKERJAAN */}
              <FormItem
                label="Lokasi Kerja"
                error={getErrorValue(errors.lokasi, errorMessage?.lokasi)}
                touched={touched.lokasi}
                className="mb-4 font-bold"
              >
                <Select
                  name="lokasi"
                  value={values.lokasi}
                  defaultValue={values.lokasi}
                  style={{ width: "100%" }}
                  onBlur={() => setFieldTouched("lokasi")}
                  onChange={(value) => {
                    setFieldValue("lokasi", value);
                  }}
                  size="large"
                  disabled={!edit}
                >
                  <Option value="" disabled>
                    Darimana Karyawan Bekerja
                  </Option>
                  {lokasiKerjaData.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              {/* KECAMATAN PEKERJAAN */}
              {values.lokasi !== "remote" && (
                <FormItem
                  label="Tempat Bekerja"
                  error={getErrorValue(
                    errors.district_id,
                    errorMessage?.district_id
                  )}
                  touched={touched.district_id}
                  className="mb-4 font-bold"
                >
                  <Select
                    name="district_id"
                    value={values.district_id}
                    defaultValue={values.district_id}
                    style={{ width: "100%" }}
                    onBlur={() => setFieldTouched("district_id")}
                    onChange={(value) => {
                      setFieldValue("district_id", value);
                    }}
                    size="large"
                    showSearch
                    onSearch={onSearchDistrict}
                    loading={isLoading}
                    notFoundContent={
                      <div className="flex justify-center items-center">
                        Kecamatan Tidak ditemukan
                      </div>
                    }
                    filterOption={false}
                    disabled={!edit}
                  >
                    {district == undefined && (
                      <Option value="" disabled>
                        Pilih Kecamatan tempat kerja
                      </Option>
                    )}
                    {district != undefined &&
                      district.districts.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}{" "}
                          {item.city.name ? ` - ${item.city.name}` : ""}
                          {item.city.province?.name
                            ? ` - ${item.city.province?.name}`
                            : ""}
                        </Option>
                      ))}
                  </Select>
                </FormItem>
              )}
              {/* DESKRIPSI PEKERJAAN */}
              <FormItem
                label="Deskripsi Pekerjaan"
                error={getErrorValue(errors.job_desc, errorMessage?.job_desc)}
                touched={touched.job_desc}
                className="mb-4 font-bold"
                wrapperCol={{ span: 18 }}
              >
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.job_desc}
                  name="job_desc"
                  placeholder="Deskripsi Pekerjaan yang dibutuhkan"
                  type="textarea"
                  disabled={!edit}
                  size="large"
                />
              </FormItem>
              {/* RENTANG GAJI */}
              <FormItem
                label="Rentang Gaji"
                error={getErrorValue(
                  errors.is_display_salary,
                  errorMessage?.is_display_salary
                )}
                touched={touched.is_display_salary}
                className="mb-4 font-bold"
              >
                <Checkbox
                  onChange={(e) =>
                    setFieldValue("is_display_salary", e.target.checked)
                  }
                  onBlur={() => setFieldTouched("is_display_salary")}
                  checked={values.is_display_salary}
                  name="is_display_salary"
                  disabled={!edit}
                  className="font-light"
                  size="large"
                >
                  <div className="text-lg">
                    Apakah ingin Menampilkan range gaji?
                  </div>
                </Checkbox>
              </FormItem>
              {values.is_display_salary && (
                <FormItem
                  label=""
                  wrapperCol={{ lg: { span: 18, offset: 5 } }}
                  className="mb-4"
                >
                  <div className="flex items-center justify-between w-full">
                    <FormItem
                      error={getErrorValue(
                        errors.batas_bawah_gaji,
                        errorMessage?.batas_bawah_gaji
                      )}
                      touched={touched.batas_bawah_gaji}
                      className="mb-0"
                      style={{ width: "40%" }}
                    >
                      <InputNumber
                        onChange={(value) =>
                          setFieldValue("batas_bawah_gaji", value)
                        }
                        parser={(value) => value.replace(/\./g, "")}
                        formatter={(value) => numeral(value).format("0,0")}
                        onBlur={handleBlur}
                        name="batas_bawah_gaji"
                        className="w-full"
                        size="large"
                        placeholder="1.000.000"
                        disabled={!edit}
                        value={values.batas_bawah_gaji}
                      />
                    </FormItem>
                    <p className="text-gray-bright text-lg">sampai</p>
                    <FormItem
                      error={getErrorValue(
                        errors.batas_atas_gaji,
                        errorMessage?.batas_atas_gaji
                      )}
                      touched={touched.batas_atas_gaji}
                      style={{ width: "40%" }}
                      className="mb-0"
                    >
                      <InputNumber
                        onChange={(value) =>
                          setFieldValue("batas_atas_gaji", value)
                        }
                        parser={(value) => value.replace(/\./g, "")}
                        formatter={(value) => numeral(value).format("0,0")}
                        onBlur={handleBlur}
                        name="batas_atas_gaji"
                        className="w-full"
                        size="large"
                        placeholder="3.000.000"
                        value={values.batas_atas_gaji}
                        disabled={!edit}
                      />
                    </FormItem>
                  </div>
                </FormItem>
              )}
              {/* RESPONSIBILITIES */}
              <JobFieldArray
                value={values.job_responsibilities}
                error={errors.job_responsibilities}
                touched={touched.job_responsibilities}
                errorMessage={errorMessage?.job_responsibilities}
                handleBlur={handleBlur}
                edit={edit}
                handleChange={handleChange}
                name="job_responsibilities"
                label="Responsibilities"
              />
              {/* REQUIREMENTS */}
              <JobFieldArray
                value={values.job_requirements}
                error={errors.job_requirements}
                touched={touched.job_requirements}
                errorMessage={errorMessage?.job_requirements}
                handleBlur={handleBlur}
                edit={edit}
                handleChange={handleChange}
                name="job_requirements"
                label="Requirements"
              />
              {/* SKILLS */}
              <JobFieldArray
                value={values.job_skills}
                error={errors.job_skills}
                touched={touched.job_skills}
                errorMessage={errorMessage?.job_skills}
                handleBlur={handleBlur}
                edit={edit}
                handleChange={handleChange}
                name="job_skills"
                label="Skill yang Dibutuhkan"
              />
              {/* BENEFITS */}
              <JobFieldArray
                value={values.job_benefits}
                error={errors.job_benefits}
                touched={touched.job_benefits}
                errorMessage={errorMessage?.job_benefits}
                handleBlur={handleBlur}
                edit={edit}
                handleChange={handleChange}
                name="job_benefits"
                label="Benefit / Keuntungan"
              />
              {/* CATATAN PEKERJAAN */}
              <FormItem
                label="Catatan Tambahan"
                error={getErrorValue(errors.catatan, errorMessage?.catatan)}
                touched={touched.catatan}
                className="mb-4 font-bold"
                wrapperCol={{ span: 18 }}
              >
                <Input
                  onChange={handleChange}
                  disabled={!edit}
                  onBlur={handleBlur}
                  value={values.catatan}
                  name="catatan"
                  placeholder="Tulis Catatan Tambahan"
                  type="textarea"
                  size="large"
                />
              </FormItem>
              {/* ISLAMIC ENVIRONMENT */}
              <FormItem
                label=""
                error={getErrorValue(
                  errors.islamic_env,
                  errorMessage?.islamic_env
                )}
                touched={touched.islamic_env}
                className="mb-4"
                wrapperCol={{ lg: { span: 18, offset: 5 } }}
              >
                <Checkbox
                  onChange={(e) =>
                    setFieldValue("islamic_env", e.target.checked)
                  }
                  onBlur={() => setFieldTouched("islamic_env")}
                  checked={values.islamic_env}
                  name="islamic_env"
                  disabled={!edit}
                >
                  <div className="text-lg">
                    Diperbolehkan menerapkan prinsip islam ketika bekerja?
                  </div>
                </Checkbox>
              </FormItem>
              {/* PERSETUJUAN */}
              <FormItem
                label=""
                error={getErrorValue(
                  errors.persetujuan,
                  errorMessage?.persetujuan
                )}
                touched={touched.persetujuan}
                className="mb-4"
                wrapperCol={{ lg: { span: 18, offset: 5 } }}
              >
                <Checkbox
                  onChange={(e) =>
                    setFieldValue("persetujuan", e.target.checked)
                  }
                  onBlur={() => setFieldTouched("persetujuan")}
                  checked={values.persetujuan}
                  name="persetujuan"
                  disabled={!edit}
                >
                  <div className="text-lg">
                    Dengan mendaftar, saya telah membaca dan menyetujui
                    <span className="text-secondary font-bold">
                      {" "}
                      <a to="https://maisyah.id/syarat-ketentuan">
                        Ketentuan Penggunaan dan Kebijakan Privasi
                      </a>{" "}
                    </span>
                    Maisyah.id.
                  </div>
                </Checkbox>
              </FormItem>

              <Row className="mt-10">
                <Col span={23} lg={{ span: 18, offset: 5 }}>
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
                      <span className=" text-lg font-bold">Lanjutkan</span>
                    </Button>
                  </ConfigProvider>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateLowongan;
