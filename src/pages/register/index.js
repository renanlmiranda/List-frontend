import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import {
  Button, Form, FormGroup, ToastHeader, Toast,
} from 'reactstrap';
import CustomInput from '../../components/CustomInput';
import CustomLabel from '../../components/CustomLabel';
import SelectInput from '../../components/SelectInput';

const Register = () => {
  const history = useHistory();
  const [entry, setEntry] = useState({
    maritalStatus: 'Solteiro(a)',
    age: '',
    name: '',
    cpf: '',
    city: '',
    state: '',
  });

  const {
    name, age, maritalStatus, cpf, city, state,
  } = entry;

  const selectOptions = [
    { label: 'Solteiro(a)', value: 'single' },
    { label: 'Casado(a)', value: 'married' },
    { label: 'Divorciado(a)', value: 'widow/widower' },
    { label: 'Separado(a)', value: 'divorced' },
    { label: 'Viúvo(a)', value: 'separated' },
  ];

  const handleNameChange = (e) => {
    setEntry({ ...entry, name: e.target.value });
  };

  const handleAgeChange = (e) => {
    setEntry({ ...entry, age: e.target.value });
  };

  const handleMaritalStatusChange = (e) => {
    setEntry({ ...entry, maritalStatus: e.target.value });
  };

  const handleCpfChange = (e) => {
    setEntry({ ...entry, cpf: e.target.value });
  };

  const handleCityChange = (e) => {
    setEntry({ ...entry, city: e.target.value });
  };

  const handleStateChange = (e) => {
    setEntry({ ...entry, state: e.target.value });
  };

  const prepareData = () => {
    const result = selectOptions.find((option) => option.label === entry.maritalStatus);

    const data = entry;
    data.maritalStatus = result.value;

    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = prepareData();
    axios.post(`${process.env.REACT_APP_API_URL}/users`, data)
      .then((res) => {
        history.push('/');
      })
      .catch((err) => { console.log(err); });
  };

  return (
    <div className="container-fluid">
      <Form>
        <CustomLabel title="Name" />
        <CustomInput
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          onChange={handleNameChange}
          value={name}
        />

        <CustomLabel title="Idade" />
        <CustomInput
          type="number"
          name="age"
          id="age"
          placeholder="Idade"
          onChange={handleAgeChange}
          value={age}
        />

        <CustomLabel title="Estado Civil" />
        <SelectInput
          type="select"
          name="maritalStatus"
          id="maritalStatus"
          selectArray={selectOptions}
          onChange={handleMaritalStatusChange}
          value={maritalStatus}
        />

        <CustomLabel title="CPF" />
        <CustomInput
          type="text"
          name="cpf"
          id="cpf"
          placeholder="CPF"
          onChange={handleCpfChange}
          value={cpf}
        />

        <CustomLabel title="Cidade" />
        <CustomInput
          type="text"
          name="city"
          id="city"
          placeholder="Cidade"
          onChange={handleCityChange}
          value={city}
        />

        <CustomLabel title="Estado" />
        <CustomInput
          type="text"
          name="state"
          id="state"
          placeholder="Estado"
          onChange={handleStateChange}
          value={state}
        />
        <Button
          color="success"
          type="submit"
          onClick={onSubmit}
        >
          Enviar

        </Button>
        <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
      </Form>

    </div>
  );
};

export default Register;
