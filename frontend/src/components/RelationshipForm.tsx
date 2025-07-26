import { relationship } from "@configs/appData";
import { renderSimNodeOption } from "@utils/index";
import { useReactFlow } from "@xyflow/react";
import { Button, Col, Row } from "antd";
import { SelectField } from "./form/SelectField";
import { AiFillDelete } from "react-icons/ai";

const RelationshipForm = ({ control, fields, remove }) => {
  const { getNodes } = useReactFlow();
  const nodes = getNodes();
  return (
    <>
      {fields.map((field, index) => (
        <Row key={field.id} gutter={8} align="bottom">
          <Col span={8}>
            <SelectField
              control={control}
              name={`relationships.${index}.sim`}
              label="Sim"
              options={renderSimNodeOption(nodes)}
            />
          </Col>
          <Col span={14}>
            <SelectField
              control={control}
              name={`relationships.${index}.relationship`}
              label="Relationship"
              props={{ placeholder: "Select relationship" }}
              options={relationship.map((rel) => ({
                value: rel.value,
                label: (
                  <div className="flex items-center gap-2">
                    {rel.icon}
                    <span>{rel.label}</span>
                  </div>
                ),
              }))}
            />
          </Col>
          <Col span={2}>
            <Button
              type="text"
              danger
              icon={<AiFillDelete />}
              onClick={() => remove(index)}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export default RelationshipForm;
