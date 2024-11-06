

export function DropDown({ name, id, options, rounded = true, selected, disabled = false, register = () => { }, value_key = "value", title_key = "title", title, hidden = false, customInputClasses = '' }) {
  return (
    <div className={`flex items-center justify-between space-x-1 ${hidden ? 'hidden' : null}`}>
      <label className="text-left">{title}</label>
      <select {...register(name)}
        disabled={disabled}
        name={name}
        id={id}
        defaultValue={selected}
        className={`${customInputClasses} bg-inputfield_color px-4 py-2 focus:outline-none border-[1px] border-green-700 ${rounded && "rounded-full"}`}>
        <option value={""} disabled selected>{options?.length === 0 ? `No Available ${title}` : title}</option>
        {options?.map(option => (
          <option value={option[value_key]} key={option[value_key]}>{option[title_key]}</option>
        ))}
      </select>
    </div>
  )
}

export function DropDownVertical({ name, id, options, rounded = true, selected, disabled = false, register = () => { }, inputRules, value_key = "value", title_key = "title", title, hidden = false, customInputClasses = '' }) {
  return (
    <div className={`flex flex-col w-full ${hidden ? 'hidden' : null}`}>
      <label className="text-left">{title}</label>
      <select {...register(name, inputRules)}
        disabled={disabled}
        name={name}
        id={id}
        defaultValue={selected}
        className={`${customInputClasses} bg-inputfield_color px-4 py-2 focus:outline-none border-[1px] border-green-700 ${rounded && "rounded-full"}`}>
        <option value={""} disabled selected>{title}</option>
        {options?.map(option => (
          <option value={option[value_key]} key={option[value_key]}>{option[title_key]}</option>
        ))}
      </select>
    </div>
  )
}

