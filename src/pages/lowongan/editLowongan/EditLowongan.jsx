import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import { useGetJobDetail } from "../../../query/dashboard/useGetJobDetail";
import Loading from "../../../reusable/Loading";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { debounce, isEmpty } from "lodash";
import dayjs from "dayjs";
import { Formik } from "formik";
import { IconBookmarkFilled, IconEdit } from "@tabler/icons-react";
import FormItem from "antd/es/form/FormItem";
import { getErrorValue } from "../../../utils/getErrors";
import {
  lokasiKerjaData,
  pengalamanKerjaData,
  tipePekerjaanData,
} from "../../../utils/selectData";
import numeral from "../../../utils/numeralLocale";
import { useSearchDistrict } from "../../../query/dashboard/useSearchDistrict";
import JobFieldArray from "../../../reusable/JobFieldArray";
import { useEditLowongan } from "../../../query/dashboard/useEditLowongan";

const loadingIcon = <Loading style={{ fontSize: 24 }} spin />;
const { Option } = Select;
const validationSchema = Yup.object().shape({});

const initialState = {
  posisi_pekerjaan: "",
  tipe_pekerjaan: "",
  layanan_iklan: "",
  gender: "",
  lokasi: "",
  district_id: "",
  pengalaman: "",
  job_desc: "",
  catatan: "",
  jam_kerja: "",
  jam_kerja_awal: "",
  jam_kerja_akhir: "",
  jenis: "",
  batas_bawah_gaji: "",
  batas_atas_gaji: "",
  job_responsibilities: [],
  job_requirements: [],
  job_skills: [],
  job_benefits: [],
  islamic_env: false,
  is_display_salary: false,
};

function EditLowongan() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState({});
  const [input, setInput] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");

  const onSearchDistrict = debounce(async (value) => {
    setSearch(value);
  }, 500);

  const onSubmit = (value) => {
    editLowongan({ value, id: id });
  };

  const onEditSuccess = (response) => {
    setEdit(false);
    setSearch(response.data.data.job.district.name);
    messageApi.success("Lowongan berhasil di update");
  };

  const onError = (error) => {
    messageApi.open({
      type: "error",
      content: error.response?.data?.info ?? "Terjadi Sesuatu Error",
    });
  };

  const {
    isLoading: isFetchLoading,
    data,
    error,
    isError,
    isFetching,
    refetch,
  } = useGetJobDetail({
    id: id,
    onError,
  });

  const {
    isLoading: isDistrictLoading,
    data: district,
    refetch: districtRefetch,
  } = useSearchDistrict({
    id: "district",
    params: { search: search },
    enabled: !isEmpty(search),
    keepPreviousData: true,
    onError,
  });

  const { mutate: editLowongan, isEditLoading } = useEditLowongan({
    onError,
    onSuccess: onEditSuccess,
  });

  const parseJamKerja = (time) => {
    const arrJamKerja = time.split(" - ");
    return [dayjs(arrJamKerja[0], "HH:mm"), dayjs(arrJamKerja[1], "HH:mm")];
  };

  const setJamKerja = (time, setFieldValue) => {
    let jamMasuk = time[0].format("HH:mm");
    let jamPulang = time[1].format("HH:mm");
    setFieldValue("jam_kerja", `${jamMasuk} - ${jamPulang}`);
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      const arrJamKerja = parseJamKerja(data.job.jam_kerja);
      setInput({
        posisi_pekerjaan: data.job.posisi_pekerjaan,
        tipe_pekerjaan: data.job.tipe_pekerjaan,
        gender: data.job.gender,
        lokasi: data.job.lokasi,
        district_id: data.job.district_id ?? "",
        pengalaman: data.job.pengalaman,
        job_desc: data.job.job_desc,
        catatan: data.job.catatan,
        jam_kerja: data.job.jam_kerja,
        jam_kerja_awal: arrJamKerja[0],
        jam_kerja_akhir: arrJamKerja[1],
        batas_bawah_gaji: data.job.batas_bawah_gaji,
        batas_atas_gaji: data.job.batas_atas_gaji,
        job_responsibilities: data.job.job_responsibilities?.map(
          (item) => item.name
        ),
        job_requirements: data.job.job_requirements?.map((item) => item.name),
        job_skills: data.job.job_skills?.map((item) => item.name),
        job_benefits: data.job.job_benefits?.map((item) => item.name),
        expired_at: dayjs(data.job.expired_at, "YYYY-MM-DD HH:mm:ss").format(
          "YYYY-MM-DD HH:mm"
        ),
        islamic_env: data.job.islamic_env,
        is_display_salary: data.job.is_display_salary,
      });
      setSearch(data.job.district.name);
    }
  }, [data]);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 text-gray-custom">
      {contextHolder}
      {isFetchLoading ? (
        <Loading />
      ) : (
        <div className="grow flex flex-col mx-auto lg:w-full lg:mx-0 lg:mx-14 mb-4 mt-10">
          <div className="flex gap-4">
            <div>
              <img src="/images/file-upload.svg" alt="Upload File" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-gray-custom">
                Lihat Loker
              </h1>
              <div className="text-left text-lg text-gray-custom text-opacity-50">
                Klik Tombol Edit untuk mengubah data lowongan pekerjaan
              </div>
            </div>
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
                id="edit-lowongan"
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 18,
                }}
                labelAlign="left"
                className="mb-12"
                onFinish={handleSubmit}
              >
                <div className="w-full flex justify-end mb-6">
                  {edit ? (
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
                          Edit Lowongan
                        </p>
                      </Button>
                    </ConfigProvider>
                  )}
                </div>
                <div className="ml-6">
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
                    error={getErrorValue(
                      errors.jam_kerja,
                      errorMessage?.jam_kerja
                    )}
                    touched={touched.jam_kerja}
                    className="mb-4 font-bold"
                    wrapperCol={{ span: 8 }}
                  >
                    <TimePicker.RangePicker
                      format={"HH:mm"}
                      onBlur={() => setFieldTouched("jam_kerja")}
                      onChange={(time) => setJamKerja(time, setFieldValue)}
                      className="py-2"
                      defaultValue={parseJamKerja(data.job.jam_kerja)}
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
                        loading={isDistrictLoading}
                        notFoundContent={
                          <div className="flex justify-center items-center">
                            Kecamatan Tidak ditemukan
                          </div>
                        }
                        filterOption={false}
                        disabled={!edit}
                      >
                        {isEmpty(district) ? (
                          <Option value="" disabled>
                            Pilih Kecamatan tempat kerja
                          </Option>
                        ) : (
                          district.districts.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.name}{" "}
                              {item.city.name ? ` - ${item.city.name}` : ""}
                              {item.city.province?.name
                                ? ` - ${item.city.province?.name}`
                                : ""}
                            </Option>
                          ))
                        )}
                        {!isEmpty(district) && (
                          <Option value="" disabled>
                            Pilih Kecamatan tempat kerja
                          </Option>
                        )}
                      </Select>
                    </FormItem>
                  )}
                  {/* DESKRIPSI PEKERJAAN */}
                  <FormItem
                    label="Deskripsi Pekerjaan"
                    error={getErrorValue(
                      errors.job_desc,
                      errorMessage?.job_desc
                    )}
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
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default EditLowongan;
