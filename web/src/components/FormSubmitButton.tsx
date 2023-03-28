type FormSubmitButtonType = {
  buttonTitle: string;
  hoverTitle: string;
};

export function FormSubmitButton({
  buttonTitle,
  hoverTitle,
}: FormSubmitButtonType) {
  return (
    <button
      title={hoverTitle}
      className="transition-all duration-150 outline-none hover:scale-[1.01] shadow-md font-nunito mt-6 rounded-full py-3 text-base tracking-widest text-white font-bold uppercase bg-gradient-to-r from-submit-gradient-start to-submit-gradient-end"
      type="submit"
    >
      {buttonTitle}
    </button>
  );
}
