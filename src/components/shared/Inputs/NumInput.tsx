import React, { useState } from "react";
import { Input } from "antd";

interface NumericInputProps {
  value: string;
  onChange: (value: string) => void;
}

// const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  // const title = value ? (
  //   <span className="numeric-input-title">
  //     {value !== "-" ? formatNumber(Number(value)) : "-"}
  //   </span>
  // ) : (
  //   "Input a number"
  // );

  return (
    <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
      />
  );
};

const NumInput: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <NumericInput value={value} onChange={setValue} />
    </>
  );
};

export default NumInput;
