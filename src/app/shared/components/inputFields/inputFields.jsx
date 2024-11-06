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

export function InputFieldSecondary({ title = "", placeholder, name, type, register, inputRules = {}, defaultValue, hidden = false, customInputClasses = '' }) {
  return (
    <div className={`flex items-center justify-between space-x-1 ${hidden ? 'hidden' : null}`}>
      <div>{title}</div>
      <input
        type={type || "text"}
        className={`${customInputClasses} bg-inputfield_color px-4 py-2 shadow-md focus:outline-none border-[1px] border-green-700`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, inputRules)}
      />
    </div>
  );
}

export function InputFieldVertical({ title = "", placeholder, name, type, register, inputRules = {}, defaultValue, hidden = false, customInputClasses = '' }) {
  return (
    <div className={`flex flex-col items-center justify-between space-x-1 ${hidden ? 'hidden' : null}`}>
      <div>{title}</div>
      <input
        type={type || "text"}
        className={`${customInputClasses} bg-inputfield_color px-4 py-2 shadow-md focus:outline-none border-[1px] border-green-700`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, inputRules)}
      />
    </div>
  );
}
