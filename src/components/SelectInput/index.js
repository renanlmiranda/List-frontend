import React from 'react';
import { Input } from 'reactstrap';

const SelectInput = ({
  name, id, type, placeholder, selectArray, onChange, value,
}) => (
  <>
    <Input
      className="form-group"
      placeholder={placeholder}
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      value={value}
    >
      {selectArray.map((item) => <option key={item.value}>{item.label}</option>)}

    </Input>
  </>
);

export default SelectInput;
