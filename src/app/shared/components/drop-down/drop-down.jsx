

export function DropDown({ name, id, options, rounded = true, selected, register = () => { } }) {
  return (
    <select {...register(name)}
      name={name}
      id={id}
      defaultValue={selected}
      className={`bg-inputfield_color px-4 py-2 focus:outline-none border-[2px] border-green-700 ${rounded && "rounded-full"}`}>
      {options?.map(option => (
        <option value={option.value} key={option.value}>{option.title}</option>
      ))}
    </select>
  )
}

