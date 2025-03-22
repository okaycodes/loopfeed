import { ReactNode, forwardRef } from "react";

interface InputProps {
  children: ReactNode;
  value?: string | number | readonly string[];
}

const Checkbox = forwardRef<HTMLInputElement, InputProps>(function Input(
  { children, value, ...rest }: InputProps,
  ref
) {
  return (
    <>
      <label className="text-base grid grid-cols-[1em_auto] gap-[.5em] cursor-pointer">
        <input
          type="checkbox"
          {...rest}
          ref={ref}
          value={value}
          className={`
          appearance-none bg-white m-0 h-4 w-4  rounded-xl translate-y-[0.075em] grid place-content-center border border-primary-light
          before:content-[''] before:w-2 before:h-2 before:scale-0 before:rounded-xl  before:shadow-[inset_1em_1em] before:shadow-primary before:opacity-80 before:clip-checkmark
          checked:before:scale-100 cursor-pointer
       `}
        />
        {children}
      </label>
    </>
  );
});

export default Checkbox;
