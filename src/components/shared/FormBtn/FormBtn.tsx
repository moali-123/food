import React from "react";
import type { FormInstance } from "antd";
import { Button, Form } from "antd";

interface Item {
  btnText: string;
  loading: boolean;
  form: FormInstance;  // Form instance should be passed from parent
  showCancel?: boolean;  // Optional prop to show or hide the cancel button
}

const FormBtn = ({ btnText, loading, form, showCancel = true }: Item) => {
  const SubmitButton: React.FC<React.PropsWithChildren<{ form: FormInstance; loading: boolean }>> = ({
    form,
    loading,
    children,
  }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values of the form
    const values = Form.useWatch([], form);

    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
      <Button
        className="submit_btn"
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        loading={loading}
      >
        {children}
      </Button>
    );
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {showCancel && (
        <Button onClick={onReset} style={{ marginRight: '8px' }}>
          Cancel
        </Button>
      )}
      <SubmitButton form={form} loading={loading}>
        {btnText}
      </SubmitButton>
    </>
  );
};

export default FormBtn;
