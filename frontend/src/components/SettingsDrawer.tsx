import { CONDITION, GENDER, OCCULT } from "@configs/appData";
import { Button, Collapse, type CollapseProps, Drawer, Typography } from "antd";
import { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import InformationForm from "./InformationForm";
import RelationshipForm from "./RelationshipForm";
import { AiOutlinePlus } from "react-icons/ai";

export interface FormValues {
  avatar: string;
  firstName: string;
  lastName: string;
  skills: string;
  gender: GENDER;
  condition: CONDITION;
  occult: OCCULT;
  relationships: { sim?: string; relationship?: number }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: FormValues;
  onSubmit: (formValues: FormValues) => void;
}

const SettingsFormDrawer = ({
  open,
  onClose,
  initialData,
  onSubmit,
}: Props) => {
  const [activeKey, setActiveKey] = useState<string[]>(["1"]);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: initialData,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "relationships",
  });

  const items: CollapseProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: <Typography.Title level={5}>Information</Typography.Title>,
        children: <InformationForm control={control} />,
      },
      {
        key: "2",
        label: <Typography.Title level={5}>Relationships</Typography.Title>,
        children: (
          <RelationshipForm control={control} fields={fields} remove={remove} />
        ),
        extra: (
          <AiOutlinePlus
            style={{ height: 22 }}
            onClick={(event) => {
              event.stopPropagation();
              append({});
              setActiveKey((prev) =>
                prev.includes("2") ? prev : [...prev, "2"]
              );
            }}
          />
        ),
      },
    ],
    [control, fields, remove, append]
  );

  const onChange = (key: string[]) => {
    setActiveKey(key);
  };

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values);
    onClose();
    reset();
  };

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
