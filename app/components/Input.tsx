import { twMerge } from "tailwind-merge";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  disabled,
  onChange,
  label,
  className,
}) => {
  return (
    <>
      <label htmlFor={label} className="font-semibold text-md text-neutral-100">
        {label}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={twMerge(
          `
          px-5 py-2
          rounded-lg
          text-neutral-100
          font-semibold
          outline-none border-none
          focus:outline-green-500
          disabled:outline-red-600
          disabled:cursor-not-allowed
          transition
          `,
          className
        )}
      />
    </>
  );
};

export default Input;
