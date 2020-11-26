import React from 'react';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel';
import SelectInput from '../SelectInput';

const CustomForm = ({
  type, name, id, placeholder, onChange, value, label,
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
    />
  </>
);

export default CustomForm;
