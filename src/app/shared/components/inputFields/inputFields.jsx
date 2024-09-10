// import "./inputFields.scss";

export function InputField({ placeholder, name, type, register, inputRules = {} }) {
  return (
    <input
      type={type || "text"}
      className="base-input shadow-md"
      placeholder={placeholder}
      {...register(name, inputRules)}
    />
  );
}

export function InputFieldSecondary({ placeholder, name, type, register, inputRules = {}, defaultValue }) {
  return (
    <input
      type={type || "text"}
      className="bg-inputfield_color px-4 py-2 shadow-md focus:outline-none border-[2px] border-green-700"
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name, inputRules)}
    />
  );
}
