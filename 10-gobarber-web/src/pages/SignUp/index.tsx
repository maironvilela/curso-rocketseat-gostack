import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
// Interface que possui a tipagem do ref
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiArrowLeft, FiUser, FiLock, FiMail } from 'react-icons/fi';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Background, Container, Content } from './styles';

import Logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Informe um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 digitos '),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={Logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
