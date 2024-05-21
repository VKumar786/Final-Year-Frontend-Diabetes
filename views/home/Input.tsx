import React from "react";

const Input = ({
  label,
  name,
  placeholder,
  value,
  handleChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: number;
  handleChange: any;
}) => {
  return (
    <label className="form-control w-full max-w-xl">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="number"
        placeholder={placeholder}
        className="input input-bordered w-full full"
        value={value}
        name={name}
        onChange={handleChange}
      />
    </label>
  );
};

export default Input;
