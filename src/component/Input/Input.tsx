import { ChangeEvent } from "react";
import Styles from "./InputStyle.module.css";

type InputProp = {
  label: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProp) => {
  const { label, value, type = "text", onChange } = props;
  return (
    <div className={Styles.container}>
      <label htmlFor="Name">{label}</label>
      <div>
        <input
          type={type}
          value={value}
          className={Styles.input}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
