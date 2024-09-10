// import "./buttons.scss";

export function PrimaryButton({ handleOnClick, buttonText, bgColorClass = null }) {
  return (
    <button onClick={handleOnClick} className={`base-input text-white shadow-md w-full ${bgColorClass || 'bg-background_color' }`}>
      {buttonText}
    </button>
  );
}

export function SecondaryButton({ handleOnClick, buttonText, classNames }) {
  return (
    <button onClick={handleOnClick} className={`${classNames} bg-secondary px-4 py-2 text-white rounded-full shadow-md`}>
      {buttonText}
    </button>
  );
}
