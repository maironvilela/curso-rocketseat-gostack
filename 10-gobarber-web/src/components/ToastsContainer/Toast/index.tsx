import React, { useEffect } from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

import { Container } from './style';

import { useToasts, ToastsMessage } from '../../../hooks/toasts';

interface ToastsContainerProps {
  message: ToastsMessage;
  style: object;
}

const Toast: React.FC<ToastsContainerProps> = ({ message, style }) => {
  const { removeToasts } = useToasts();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToasts(message.id as string);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, removeToasts]);

  return (
    <Container
      hasNotDescription={Number(!message.description)}
      type={message.type}
      style={style}
    >
      <FiAlertCircle />
      <div>
        <span>{message.title}</span>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToasts(message.id as string)} type="button">
        <FiX />
      </button>
    </Container>
  );
};

export default Toast;
