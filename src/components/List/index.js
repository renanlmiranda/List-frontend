import React, { useState } from 'react';
import {
  Table, Button, Form, FormGroup, FormFeedback,
} from 'reactstrap';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import axios from 'axios';
import CustomForm from '../CustomForm';
import CustomSelectForm from '../CustomSelectForm';
import UpdateModal from '../UpdateModal';
import { LoadingContainer, CustomTitle } from './styles';

const List = ({ posts, loading, fetchUsers }) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [userObject, setUserObject] = useState({});
  const [isValid, setIsValid] = useState({});
  const [values, setValues] = useState({
    age: 0,
    name: '',
    cpf: '',
    city: '',
    state: '',
    maritalStatus: 'single',
  });

  const selectOptions = [
    { label: 'Solteiro(a)', value: 'single' },
    { label: 'Casado(a)', value: 'married' },
    { label: 'Divorciado(a)', value: 'divorced' },
    { label: 'Separado(a)', value: 'separated' },
    { label: 'Viúvo(a)', value: 'widow/widower' },
  ];

  const removeToggle = () => setRemoveModal(!removeModal);
  const updateToogle = () => setUpdateModal(!updateModal);
  const createToogle = () => setCreateModal(!createModal);

  const handleUpdateMaritalStatusChange = (e) => {
    const result = selectOptions.find((option) => option.label === e.target.value);
    setUserObject({ ...userObject, maritalStatus: result.value });
  };

  const handleCreateMaritalStatusChange = (e) => {
    const result = selectOptions.find((option) => option.label === e.target.value);
    setValues({ ...values, maritalStatus: result.value });
  };

  const createUser = (user) => {
    const data = user;

    axios.post(`${process.env.REACT_APP_API_URL}/users`, data)
      .then((res) => {
        alert(`${res.data.user.name} criado!`);
        setCreateModal(false);
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = (user) => {
    console.log(user);
    try {
      const data = {
        name: user.name,
        age: user.age,
        cpf: user.cpf,
        maritalStatus: user.maritalStatus,
        state: user.state,
        city: user.city,
      };
      axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, data)
        .then((res) => {
          alert(`${res.data.user.name} atualizado!`);
          setUpdateModal(false);
          fetchUsers();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const removeUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(async () => {
        alert('Usuário removido!');
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

  const validateEmpty = (e) => {
    e.target.value ? setIsValid({ [e.target.name]: 'true' }) : setIsValid({ [e.target.name]: 'false' });
  };

  return (
    <div className="container">
      {loading && (
        <LoadingContainer>
          <CustomTitle>
            Carregando...
          </CustomTitle>
        </LoadingContainer>
      )}

      <Button
        color="success"
        className="btn btn-primary btn-lg float-right m-2"
        onClick={() => { createToogle(); }}
      >
        Criar Usuário
      </Button>

      { updateModal && (
        <UpdateModal
          modal={updateModal}
          toggle={updateToogle}
          accept={() => updateUser(userObject)}
          acceptText="Atualizar"
          title="Atualização de dados"
        >
          <Form>
            <CustomForm
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              onChange={(e) => setUserObject({ ...userObject, [e.target.name]: e.target.value })}
              value={userObject.name}
              label="Nome"
            />
            <CustomForm
              type="number"
              name="age"
              id="age"
              placeholder="Idade"
              onChange={(e) => setUserObject({ ...userObject, [e.target.name]: e.target.value })}
              value={userObject.age}
              label="Idade"
            />
            <CustomSelectForm
              type="select"
              name="maritalStatus"
              id="maritalStatus"
              selectArray={selectOptions}
              onChange={handleUpdateMaritalStatusChange}
              label="Estado Civil"
            />
            <CustomForm
              type="text"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              onChange={(e) => setUserObject({ ...userObject, [e.target.name]: e.target.value })}
              value={userObject.cpf}
              label="CPF"
            />

            <CustomForm
              type="text"
              name="city"
              id="city"
              placeholder="Cidade"
              onChange={(e) => setUserObject({ ...userObject, [e.target.name]: e.target.value })}
              value={userObject.city}
              label="Cidade"
            />

            <CustomForm
              type="text"
              name="state"
              id="state"
              placeholder="Estado"
              onChange={(e) => setUserObject({ ...userObject, [e.target.name]: e.target.value })}
              value={userObject.state}
              label="Estado"
            />

          </Form>
        </UpdateModal>

      )}

      {createModal && (
      <UpdateModal
        modal={createModal}
        toggle={createToogle}
        accept={() => createUser(values)}
        acceptText="Criar"
        title="Criação de usuário"
      >
        <Form>
          <FormGroup>
            <CustomForm
              type="text"
              name="name"
              id="name"
              placeholder="Nome"
              onChange={
                (e) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                  validateEmpty(e);
                }
              }
              value={values.name}
              label="Nome"
              valid={isValid.name === 'true'}
              invalid={isValid.name === 'false'}
            />
            <FormFeedback invalid>
              Preencha o campo
            </FormFeedback>
          </FormGroup>
          <CustomForm
            type="number"
            name="age"
            id="age"
            placeholder="Idade"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            value={values.age}
            label="Idade"
          />
          <CustomSelectForm
            type="select"
            name="maritalStatus"
            id="maritalStatus"
            selectArray={selectOptions}
            onChange={(e) => handleCreateMaritalStatusChange(e)}
            label="Estado Civil"
          />
          <CustomForm
            type="text"
            name="cpf"
            id="cpf"
            placeholder="CPF"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            value={values.cpf}
            label="CPF"
          />

          <CustomForm
            type="text"
            name="city"
            id="city"
            placeholder="Cidade"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            value={values.city}
            label="Cidade"
          />

          <CustomForm
            type="text"
            name="state"
            id="state"
            placeholder="Estado"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
            value={values.state}
            label="Estado"
          />

        </Form>
      </UpdateModal>

      ) }

      {removeModal && (
        <UpdateModal
          modal={removeModal}
          toggle={removeToggle}
          accept={() => removeUser(userId)}
          acceptText="Deletar"
          title="Deseja deletar este usuário?"
        >
          {' '}
          O usuário será deletado e ficará indisponível permanentemente!
        </UpdateModal>
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

export default List;
