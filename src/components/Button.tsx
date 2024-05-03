import {FC} from "react";

export interface ButtonProps {
    buttonText: string,
    className?: string,
    clickHandler?: () => void,
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({buttonText, className, clickHandler, disabled}) => {
    return (
        <button
            disabled={disabled}
            className={className}
            onClick={clickHandler}
        >
            { buttonText }
        </button>
    )
}

export default Button;
