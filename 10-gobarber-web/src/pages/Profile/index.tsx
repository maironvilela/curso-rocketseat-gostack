/* eslint-disable prettier/prettier */
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  FiArrowDownLeft,
  FiArrowLeft,
  FiCamera,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import { AxiosResponse } from 'axios';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Header, Avatar, Content } from './styled';
import { useToasts } from '../../hooks/toasts';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}



const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToasts } = useToasts();
  const history = useHistory();


  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      const {
        name,
        email,
        password,
        old_password,
        password_confirmation,
      } = data;

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatorio'),
          email: Yup.string()
            .email('Formato do email inválido')
            .required('E-mail obrigatorio'),
          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: () => !!old_password.length === true,
            then: Yup.string().required(
              'Campo obrigatorio após a senha for informada',
            ),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: () => !!old_password.length === true,
            then: Yup.string()
              .required('Campo obrigatorio após a senha for informada')
              .oneOf(
                [Yup.ref('password'), null],
                'Senha deve ser igual a nova senha',
              ),
          }),
        });
        await schema.validate(data, { abortEarly: false });


        const formData = {
          name,
          email,
          ...(old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };
        const response = await api.put('/profile', formData);
        updateUser(response.data);

        addToasts({
          type: 'success',
          title: 'Perfil Atualizado',
          description: 'Perfil Atualizado com sucesso',
        });
        history.push('/');
      } catch (err) {
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToasts({
            type: 'error',
            title: 'Falha na atualização do perfil',
            description: `${err}`
            ,
          });
        }
      }
    },
    [addToasts, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();
      if (e.target.files) {
        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToasts({
            type: 'success',
            title: 'Avatar Atualaizado',
            description: 'Atualização do avatar realizado com sucesso',
          });
        });
      }
    },
    [addToasts, updateUser],
  );

  return (
    <Container>
      <Header>
        <Link to="dashboard">
          <FiArrowLeft />
        </Link>
      </Header>
      <Avatar>
        <img src={user.avatar_url} alt={user.name} />
        <label htmlFor="avatar">
          <FiCamera />
          <input type="file" id="avatar" onChange={handleAvatarChange} />
        </label>
      </Avatar>

      <Content>
        <h1>Meu Perfil</h1>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            type="password"
            name="old_password"
            placeholder="Senha Atual"
            icon={FiLock}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha "
            icon={FiLock}
          />

          <Input
            type="password"
            name="password_confirmation"
            placeholder="Confirma Senha "
            icon={FiLock}
          />

          <Button type="submit"> Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
