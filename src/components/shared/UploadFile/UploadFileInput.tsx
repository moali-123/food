import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";

function UploadFileInput({ uploadedFile, InputName }) {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//   };

  const handleFile = (e) => {
    console.log(e.target.files);
    uploadedFile(e.target.files[0]);
    // setFile(e.target.files[0])
  };

  return (
    <Form.Item onChange={handleFile}>
      <Form.Item
        name={InputName}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        noStyle
        rules={[
          {
            required: true,
            message: "Please enter price",
          },
        ]}
      >
        <Upload.Dragger name="files" action="" listType="picture" maxCount={1}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
  );
}

export default UploadFileInput;
