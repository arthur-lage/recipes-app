import { InputHTMLAttributes, ReactNode } from "react";

interface FormInputType extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
}

export function FormInput({ icon, ...rest }: FormInputType) {
  return (
    <div className="focus-within:-translate-y-1 focus-within:scale-[1.01] focus-within:border-white focus-within:border-2 shadow-md flex items-center relative rounded-md bg-gradient-to-r from-input-gradient-start to-input-gradient-end transition-all duration-150 w-[17rem] xsm:w-[25rem] md:w-[32.5rem] h-[3rem]">
      {icon}

      <input
        autoComplete="off"
        {...rest}
        className="outline-none font-bold font-nunito bg-transparent placeholder:text-main-blue text-main-blue pr-5 absolute top-0 left-0 bottom-0 right-0 pl-12"
      />
    </div>
  );
}
