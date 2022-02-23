import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // Informe a tipagem HTMLInputElement para o useRef
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleIsFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    // Altera o valor do state Fucus para false
    setIsFocused(false);
    /* inputRef.current?.value se tiver preenchido sera true
       ! se for true vira false
       !! se for true vira false e depois vira true novamente
    */
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      // forma de acessar o elemendo direto (document.getElement)
      ref: inputRef.current,
      // onde o unforme dentro da referencia buscara o valor do input
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        onFocus={handleIsFocus}
        onBlur={handleInputBlur}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size="20px" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
