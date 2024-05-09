import { FC, ReactNode } from "react";

export interface ButtonProps {
  /* The task specified that the text, needs to be passed to the component as a children */
  children: ReactNode;
  className?: string;
  /* The task specified that the click event handler, should be a required prop */
  clickHandler: () => void;
  disabled?: boolean;
}

/* Alternative interface solution, where we can levarage the default HTML Button's interface.
   Since the click event handler is a required prop in our component, but in the defaults HTMLButton is an optional
   prop, we omit the onClick prop, and redefine it, in our own interface definition. 

    export interface ButtonProps extends Omit<HTMLButtonElement, 'onClick'> {
        onClick: () => void;
    } 

*/

const Button: FC<ButtonProps> = ({
  children,
  className,
  clickHandler,
  disabled,
}) => {
  return (
    <button disabled={disabled} className={className} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
