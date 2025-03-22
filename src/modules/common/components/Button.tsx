import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
  variant?: "BASE" | "LARGE";
  children: ReactNode;
}
function Button({ href, children, onClick, ...rest }: ButtonProps) {
  let buttonStyle =
    "cursor-pointer flex justify-center items-center  border-none bg-primary text-white rounded-lg hover:opacity-90   px-16 py-5";

  if (href) {
    return (
      <a href={href} className={buttonStyle}>
        {children}
      </a>
    );
  }

  return (
    <button {...rest} className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
