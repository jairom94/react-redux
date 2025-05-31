import { type ComponentProps, type ReactNode } from "react";

interface ButtonCustomProps extends ComponentProps<"button"> {
  children: ReactNode;
}
const ButtonCustom = ({ children, ...props }: ButtonCustomProps) => {
  return (
    <div className="flex flex-col">
      <button {...props}>{children}</button>
    </div>
  );
};

export default ButtonCustom;
