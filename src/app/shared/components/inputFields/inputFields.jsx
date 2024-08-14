import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export function InputField({
  handleInput,
  placeholder,
  name,
  type,
  icon,
  className,
}) {
  return (
    <IconField iconPosition="left" className={className}>
      <InputIcon className={`pi ${icon} mr-4`}></InputIcon>
      <input
        onChange={handleInput}
        placeholder={placeholder}
        name={name}
        type={type}
        className="focus:outline-none bg-transparent"
      />
    </IconField>
  );
}
