import { Input } from "antd";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  rules?: object;
}

export function InputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
}: InputFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Input {...field} placeholder={placeholder} />
            {fieldState.error && (
              <span className="text-red-500 text-xs">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}
