import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export function InputField({ placeholder, name, type, icon, className }) {
  return (
    <IconField iconPosition="left" className={className}>
      <InputIcon className={`pi ${icon} mr-4`}></InputIcon>
      <InputText
        placeholder={placeholder}
        name={name}
        type={type}
        className="bg-transparent focus:outline-none"
      />
    </IconField>
  );
}
