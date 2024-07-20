import { memo } from "react";
import classes from "./TextField.module.css";
interface TextFieldProps {
  value: string;
  name: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  customClass?: string;
  customBlockClass?: string;
}
const TextField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  customClass,
  customBlockClass,
}: TextFieldProps) => {
  console.log("Рендер TextField", name);

  // const handleChange = ({ target }: { target: HTMLInputElement }) => {
  //   onChange({ name: target.name, value: target.value });
  // };
  return (
    <div className={customBlockClass ? customBlockClass : classes.inputBlock}>
      <input
        type={type}
        className={customClass ? customClass : classes.Block__inp}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required
      />
      {error && <span className={classes.errorBlock}>{error}</span>}
    </div>
  );
};

export default memo(TextField);
