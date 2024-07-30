import "./inputFields.scss";

export function InputField({ placeholder, name }) {
  return (
    <input
      type="text"
      className="primary-input shadow-md"
      placeholder={placeholder}
      name={name}
    />
  );
}
