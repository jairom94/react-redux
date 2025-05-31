import { type ComponentProps } from "react";

interface FormFieldProps extends ComponentProps<"input"> {
  label: string;
}
const FormField = ({ label, className = "", ...props }: FormFieldProps) => {
  return (
    <div className="form-field flex flex-col gap-1">
      <label htmlFor={props.id}>{label}</label>
      <input
        className={`rounded-md border px-4 py-2 ${className}`}
        autoComplete="off"
        {...props}
      />
    </div>
  );
};

export default FormField;
