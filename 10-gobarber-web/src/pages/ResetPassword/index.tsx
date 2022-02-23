import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router';
import { Background, Content } from '../ForgotPassword/styles';
import { Container } from './style';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErrors';
import { useToasts } from '../../hooks/toasts';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToasts } = useToasts();
  const history = useHistory();
  const location = useLocation();
  const token = location.search.replace('?token=', '');

  if (!token) {
    history.push('/');
  }

  const handleSubmit = useCallback(
    async data => {
      const { password, passwordConfirmation } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha Obrigatoria'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senhas devem ser igual',
          ),
        });
        await schema.validate(data, { abortEarly: false });

        await api.post('/password/reset', { password, token });

        addToasts({
          type: 'info',
          title: 'Redefinição de senha',
          description: 'Senha Redefinida',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log(err);
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        } else {
          addToasts({
            type: 'info',
            title: 'Falha na recuperação de senha',
            description:
              'Ocorreu uma falha no cadastro da nova senha. Favor tentar mais tarde',
          });
        }
      }
    },
    [addToasts, history, token],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Informe a nova senha</h1>

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />

          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirma da senha"
          />

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
