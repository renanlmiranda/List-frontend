import React from 'react';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel';

const CustomForm = ({
  type, name, id, placeholder, onChange, value, label, valid, invalid,
}) => (
  <>
    <CustomLabel title={label} />
    <CustomInput
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      valid={valid}
      invalid={invalid}
    />
  </>
);

export default CustomForm;
