import "./buttons.scss";

export function PrimaryButton({ handleOnClick, buttonText }) {
  return (
    <button onClick={handleOnClick} className="primary-btn shadow-md">
      {buttonText}
    </button>
  );
}
