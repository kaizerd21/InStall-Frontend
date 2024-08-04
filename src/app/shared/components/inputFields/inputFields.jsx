import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export function InputField({ placeholder, name, type, icon }) {
  return (
    <IconField
      iconPosition="left"
      className="bg-inputfield_color text-secondary px-4 py-4 mb-5 rounded-full shadow-md"
    >
      <InputIcon className={`pi ${icon} mr-4`}></InputIcon>
      <InputText
        placeholder={placeholder}
        name={name}
        type={type}
        className="bg-transparent"
      />
    </IconField>
  );
}
