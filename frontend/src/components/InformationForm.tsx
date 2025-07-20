import { Controller } from "react-hook-form";
import AvatarUploader from "./form/AvatarUploader";
import { InputField } from "./form/InputField";
import { SelectField } from "./form/SelectField";
import { renderEnumOption } from "@utils/index";
import { CONDITION, GENDER, OCCULT, skills } from "@configs/appData";

const InformationForm = ({ control }) => {
  return (
    <div className="flex flex-col flex-1 items-center ">
      <Controller
        name="avatar"
        control={control}
        render={({ field }) => <AvatarUploader {...field} />}
      />

      <InputField
        control={control}
        name="firstName"
        label="First Name"
        rules={{ required: "Required" }}
      />
      <InputField
        control={control}
        name="lastName"
        label="Last Name"
        rules={{ required: "Required" }}
      />
      <SelectField
        control={control}
        name="gender"
        label="Gender"
        options={renderEnumOption(GENDER)}
        rules={{ required: "Required" }}
      />
      <SelectField
        control={control}
        name="condition"
        label="Condition"
        options={renderEnumOption(CONDITION)}
        rules={{ required: "Required" }}
      />
      <SelectField
        control={control}
        name="occult"
        label="Occult"
        options={renderEnumOption(OCCULT)}
        rules={{ required: "Required" }}
      />

      <SelectField
        control={control}
        name="skills"
        label="Skills"
        props={{ mode: "multiple", placeholder: "Select skills" }}
        options={skills.map((skill) => ({
          value: skill.value,
          label: (
            <div className="flex items-center gap-2">
              <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
              <span>{skill.name}</span>
            </div>
          ),
        }))}
      />
    </div>
  );
};

export default InformationForm;
