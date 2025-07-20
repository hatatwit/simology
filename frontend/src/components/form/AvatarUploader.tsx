import { Upload, message } from "antd";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

interface AvatarUploaderProps {
  value?: string;
  onChange?: (value: string) => void;
}

const AvatarUploader = ({ value, onChange }: AvatarUploaderProps) => {
  const [loading, setLoading] = useState(false);

  const getBase64 = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(file);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const file = info.file.originFileObj;
    if (!file) return;
    setLoading(true);
    getBase64(file, (url) => {
      setLoading(false);
      onChange?.(url);
    });
  };

  const uploadButton = (
    <button
      type="button"
      style={{
        border: 0,
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? <AiOutlineLoading /> : <AiOutlinePlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={({ onSuccess }) => onSuccess?.("ok")}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default AvatarUploader;
