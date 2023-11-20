import { Form } from "antd";

function FormItem({ children, error, touched, ...other }) {
  return (
    <Form.Item
      validateStatus={error && touched && "error"}
      help={error && touched && error}
      {...other}
    >
      {children}
    </Form.Item>
  );
}

export default FormItem;
