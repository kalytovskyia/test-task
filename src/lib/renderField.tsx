import { Controller, Control, FieldValues } from "react-hook-form";

export interface FormField {
  default_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: string;
  min_value?: number;
  max_value?: number;
  options?: string[] | number[];
  type: "text" | "longtext" | "dropdown" | "number" | "boolean";
}

const classNameForField =
  "w-full p-2 border border-gray-300 rounded-md text-black";

export const renderField = (
  field: FormField,
  index: number,
  control: Control<FieldValues, any>
) => {
  const commonProps = {
    defaultValue: field.default_value ?? field.value ?? "",
    rules: {
      required: !!field.validation,
      pattern: field.validation ? new RegExp(field.validation) : undefined,
      min: field.min_value,
      max: field.max_value,
    },
  };

  switch (field.type) {
    case "text":
      return (
        <Controller
          key={index}
          name={`field-${index}`}
          control={control}
          {...commonProps}
          render={({ field }) => (
            <input {...field} type="text" className={classNameForField} />
          )}
        />
      );
    case "longtext":
      return (
        <Controller
          key={index}
          name={`field-${index}`}
          control={control}
          {...commonProps}
          render={({ field }) => (
            <textarea {...field} className={classNameForField} />
          )}
        />
      );
    case "dropdown":
      return (
        <Controller
          key={index}
          name={`field-${index}`}
          control={control}
          {...commonProps}
          render={({ field: fieldProps }) => (
            <select {...fieldProps} className={classNameForField}>
              {field.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />
      );
    case "number":
      return (
        <Controller
          key={index}
          name={`field-${index}`}
          control={control}
          {...commonProps}
          render={({ field }) => (
            <input {...field} type="number" className={classNameForField} />
          )}
        />
      );
    case "boolean":
      return (
        <Controller
          key={index}
          name={`field-${index}`}
          control={control}
          {...commonProps}
          render={({ field: { onChange, value, ...rest } }) => (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                {...rest}
                className={`${classNameForField} h-5 w-5 cursor-pointer`}
              />
              <span>Checkbox label</span>
            </label>
          )}
        />
      );
    default:
      return null;
  }
};
