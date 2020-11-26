import React, { useState } from 'react';
import { Table, Button, Form } from 'reactstrap';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import CustomForm from './CustomForm';
import CustomSelectForm from './CustomSelectForm';

import DefaultModal from './DefaultModal';
import UpdateModal from './UpdateModal';

const Post = ({ posts, loading, fetchUsers }) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [userObject, setUserObject] = useState({});
  const [entry, setEntry] = useState({
    maritalStatus: 'Solteiro(a)',
    age: '',
    name: '',
    cpf: '',
    city: '',
    state: '',
  });
  const history = useHistory();

  const selectOptions = [
    { label: 'Solteiro(a)', value: 'single' },
    { label: 'Casado(a)', value: 'married' },
    { label: 'Divorciado(a)', value: 'divorced' },
    { label: 'Separado(a)', value: 'separated' },
    { label: 'Viúvo(a)', value: 'widow/widower' },
  ];

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  const removeToggle = () => setRemoveModal(!removeModal);
  const updateToogle = () => setUpdateModal(!updateModal);

  const handleNameChange = (e) => {
    setUserObject({ ...userObject, name: e.target.value });
  };

  const handleAgeChange = (e) => {
    setUserObject({ ...userObject, age: e.target.value });
  };

  const handleMaritalStatusChange = (e) => {
    const result = selectOptions.find((option) => option.label === e.target.value);
    setUserObject({ ...userObject, maritalStatus: result.value });
  };

  const handleCpfChange = (e) => {
    setUserObject({ ...userObject, cpf: e.target.value });
  };

  const handleCityChange = (e) => {
    setUserObject({ ...userObject, city: e.target.value });
  };

  const handleStateChange = (e) => {
    setUserObject({ ...userObject, state: e.target.value });
  };

  const updateUser = (user) => {
    try {
      const data = {
        name: user.name,
        age: user.age,
        cpf: user.cpf,
        maritalStatus: user.maritalStatus,
        state: user.state,
        city: user.city,
      };
      axios.put(`${process.env.REACT_APP_API_URL}/${user._id}`, data)
        .then((res) => {
          alert(`${res.data.user} atualizado!`);
          setUpdateModal(false);
          fetchUsers();
        });
    } catch (err) {
      setUpdateModal(false);
      console.log(err);
    }
  };

  const removeUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(async () => {
        alert('Usuário removido com sucesso!');
        setRemoveModal(false);
        fetchUsers();
      }).catch((err) => {
        setRemoveModal(false);
        console.log(err);
      });
  };

  const results = posts.map((list) => {
    const result = selectOptions.find((option) => option.value === list.maritalStatus);

    return (
      <tr key={list._id}>
        <th className="text-center" scope="row">{list.name}</th>
        <td className="text-center">{list.age}</td>
        <td className="text-center">{result.label}</td>
        <td className="text-center">{list.cpf}</td>
        <td className="text-center">{list.city}</td>
        <td className="text-center">{list.state}</td>
        <td className="text-center">
          <div className="col-xs-4">
            <Button
              color="light"
              className="btn-md"
              onClick={() => { setUserObject(list); updateToogle(); }}
            >
              <AiTwotoneEdit />
            </Button>

            {' '}

            <Button
              color="light"
              className="btn-md"
              onClick={() => { setUserId(list._id); removeToggle(); }}
            >
              <AiTwotoneDelete />
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  const selectLabel = () => {
    const value = selectOptions.find((option) => option.value === userObject.maritalStatus);
    return (
      value.label
    );
  };

  return (
    <div className="container">
      <Button
        color="success"
        className="btn btn-primary btn-lg float-right m-2"
        tag={Link}
        to="/register"
      >
        Criar Usuário
      </Button>

      {updateModal && (
        <UpdateModal
          modal={updateModal}
          toggle={updateToogle}
          accept={() => updateUser(userObject)}
          acceptText="Atualizar"
        >
          <Form>
            <CustomForm
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              onChange={handleNameChange}
              value={userObject.name}
              label="Nome"
            />
            <CustomForm
              type="text"
              name="age"
              id="age"
              placeholder="Idade"
              onChange={handleAgeChange}
              value={userObject.age}
              label="Idade"
            />
            <CustomSelectForm
              type="select"
              name="maritalStatus"
              id="maritalStatus"
              selectArray={selectOptions}
              onChange={handleMaritalStatusChange}
              value={selectLabel()}
              label="Estado Civil"
            />
            <CustomForm
              type="text"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              onChange={handleCpfChange}
              value={userObject.cpf}
              label="CPF"
            />

            <CustomForm
              type="text"
              name="city"
              id="city"
              placeholder="Cidade"
              onChange={handleCityChange}
              value={userObject.city}
              label="Cidade"
            />

            <CustomForm
              type="text"
              name="state"
              id="state"
              placeholder="Estado"
              onChange={handleStateChange}
              value={userObject.state}
              label="Estado"
            />

          </Form>
        </UpdateModal>

      ) }

      {removeModal && (
      <DefaultModal
        modal={removeModal}
        toggle={removeToggle}
        accept={() => removeUser(userId)}
        acceptText="Deletar"
        title="Deseja deletar este usuário?"
      >
        {' '}
        O usuário será deletado e ficará indisponível permanentemente!
      </DefaultModal>
      ) }
      <Table responsive hover>
        <thead>
          <tr>
            <th className="text-center">Nome</th>
            <th className="text-center">Idade</th>
            <th className="text-center">Estado Civil</th>
            <th className="text-center">CPF</th>
            <th className="text-center">Cidade</th>
            <th className="text-center">Estado</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {results}
        </tbody>
      </Table>
    </div>
  );
};

export default Post;
