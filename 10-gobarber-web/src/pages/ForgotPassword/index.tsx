import React, { useCallback, useRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToasts } from '../../hooks/toasts';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { addToasts } = useToasts();
  // console.log(user);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Informe um e-mail válido'),
        });
        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToasts({
          type: 'success',
          title: 'Recuperação de Senha',
          description:
            'Foi enviado um e-mail para realizar a recuperação da senha',
        });
      } catch (err) {
        // verificar se o error é referente a validaçao do formulario
        if (err instanceof Yup.ValidationError) {
          console.log(err);
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToasts({
            type: 'info',
            title: 'Falha na recuperação de senha',
            description: 'Ocorreu uma falha ao tentar recuperar a senha',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToasts],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperação de Senha</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Button loading={loading} type="submit">
            Recuperar Senha
          </Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
