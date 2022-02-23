import React, { useCallback, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
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

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToasts } = useToasts();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      const { email, password } = data;
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio')
            .email('Informe um e-mail válido'),
          password: Yup.string().required('Senha Obrigatoria'),
        });
        await schema.validate(data, { abortEarly: false });

        await signIn({ email, password });
        history.push('/dashboard');
      } catch (err) {
        // verificar se o error é referente a validaçao do formulario
        if (err instanceof Yup.ValidationError) {
          // console.log(err);
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToasts({
            type: 'error',
            title: 'Falha no login',
            description:
              'Ocorreu uma falha ao realizar login. Verifique credenciais',
          });
        }
      }
    },
    [signIn, addToasts, history],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <Link to="/forgot-password">Esqueci minha senha</Link>
        </Form>

        <Link to="/signup">
          <FiLogIn />
          Criar Conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
