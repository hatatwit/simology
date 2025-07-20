import { Select } from "antd";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  label: string | React.ReactNode;
  value: unknown;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  rules?: object;
  props?: React.ComponentProps<typeof Select>;
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  props,
}: SelectFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const isMultiple = props?.mode === "multiple";

          return (
            <>
              <Select
                {...field}
                {...props}
                value={isMultiple ? field.value ?? [] : field.value}
                onChange={(val) => field.onChange(val)}
                options={options}
              />
              {fieldState.error && (
                <span className="text-red-500 text-xs">
                  {fieldState.error.message}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
