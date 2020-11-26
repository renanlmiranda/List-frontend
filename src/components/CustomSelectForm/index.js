import React from 'react';
import CustomLabel from '../CustomLabel';
import SelectInput from '../SelectInput';

const CustomSelectForm = ({
  name, id, type, placeholder, selectArray, onChange, value, label,
}) => (
  <>
    <CustomLabel title={label} />
    <SelectInput
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      selectArray={selectArray}
    />
  </>
);

export default CustomSelectForm;
