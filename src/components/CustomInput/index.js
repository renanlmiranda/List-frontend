import React from 'react';
import { Input } from 'reactstrap';

const CustomInput = ({
  id,
  name,
  type,
  onChange,
  placeholder,
  value,
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
    />
  </>
);

export default CustomInput;
