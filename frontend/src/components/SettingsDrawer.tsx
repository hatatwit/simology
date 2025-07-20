import { CONDITION, GENDER, OCCULT } from "@configs/appData";
import { Button, Collapse, type CollapseProps, Drawer, Typography } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import InformationForm from "./InformationForm";

export interface FormValues {
  avatar: string;
  firstName: string;
  lastName: string;
  skills: string;
  gender: GENDER;
  condition: CONDITION;
  occult: OCCULT;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: FormValues;
  onSubmit: (formValues: FormValues) => void;
}

const genExtra = () => (
  <AiOutlinePlus
    style={{ height: 22 }}
    onClick={(event) => {
      event.stopPropagation();
    }}
  />
);

const SettingsFormDrawer = ({
  open,
  onClose,
  initialData,
  onSubmit,
}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: initialData,
  });
  const [activeKey, setActiveKey] = useState<string | string[]>("1");

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <Typography.Title level={5}>Information</Typography.Title>,
      children: <InformationForm control={control} />,
    },
    {
      key: "2",
      label: <Typography.Title level={5}>Parents</Typography.Title>,
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: "3",
      label: <Typography.Title level={5}>Friends</Typography.Title>,
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: "4",
      label: <Typography.Title level={5}>Pets</Typography.Title>,
      children: <div>Test</div>,
      extra: genExtra(),
    },
  ];

  const onChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values);
    onClose();
  };

  useEffect(() => {
    if (open) {
      reset({
        avatar: "",
        firstName: "",
        lastName: "",
        skills: [],
        gender: undefined,
        ...initialData,
      });
    }
  }, [initialData, open, reset]);

  return (
    <Drawer
      title="Sim Card"
      placement="right"
      width={500}
      open={open}
      onClose={onClose}
      bodyStyle={{ padding: 0 }}
      footer={
        <Button type="primary" htmlType="submit" form="settings-form" block>
          Save
        </Button>
      }
    >
      <form id="settings-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Collapse
          bordered={false}
          activeKey={activeKey}
          onChange={onChange}
          expandIconPosition="end"
          items={items}
          style={{ backgroundColor: "transparent" }}
        />
      </form>
    </Drawer>
  );
};

export default SettingsFormDrawer;
