import React from 'react';
import { Input } from 'reactstrap';

const CustomInput = ({
  id,
  name,
  type,
  onChange,
  placeholder,
  value,
  invalid,
  valid,
}) => (
  <>
    <Input
      className="form-group"
      placeholder={placeholder}
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      defaultValue={value}
      valid={valid}
      invalid={invalid}
    />
  </>
);

export default CustomInput;
