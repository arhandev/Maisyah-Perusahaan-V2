import { FieldArray } from "formik";
import { isEmpty } from "lodash";
import React from "react";
import { getErrorValue } from "../utils/getErrors";
import FormItem from "antd/es/form/FormItem";
import { Input } from "antd";
import { IconPlus, IconTrash } from "@tabler/icons-react";

function JobFieldArray({
  value,
  error,
  touched,
  handleChange,
  edit,
  handleBlur,
  errorMessage,
  name,
  label,
}) {
  return (
    <FieldArray name={name}>
      {({ insert, remove, push }) => (
        <>
          {value?.map((items, index) => {
            return (
              <FormItem
                label={index === 0 && label}
                wrapperCol={index !== 0 && { lg: { span: 18, offset: 5 } }}
                // Disini untuk mengecek apakah item sudah berbentuk array atau tidak
                error={getErrorValue(
                  error && error[index],
                  errorMessage && errorMessage[index]
                )}
                touched={touched && touched[index]}
                key={index}
                className="font-bold"
              >
                <Input
                  onChange={handleChange}
                  disabled={!edit}
                  onBlur={handleBlur}
                  value={items}
                  name={`${name}[${index}]`}
                  placeholder={`Masukkan ${label}`}
                  size="large"
                  suffix={
                    edit && (
                      <IconTrash
                        color="red"
                        onClick={() => {
                          remove(index);
                        }}
                      ></IconTrash>
                    )
                  }
                />
              </FormItem>
            );
          })}
          {edit && (
            <FormItem
              label={isEmpty(value) && label}
              wrapperCol={{ span: 18, offset: isEmpty(value) ? 0 : 5 }}
            >
              <div
                onClick={() => push("")}
                className="w-full flex gap-4 items-center border-2 border-dashed border-primary py-3 px-4 rounded-lg bg-primary bg-opacity-10"
              >
                <IconPlus />
                <p className="text-lg text-gray-500">Tambah {label}</p>
              </div>
            </FormItem>
          )}
        </>
      )}
    </FieldArray>
  );
}

export default JobFieldArray;
