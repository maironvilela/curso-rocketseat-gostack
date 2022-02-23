import React from 'react';
import {
  FiAlertCircle,
  FiX,
  FiInfo,
  FiCheckCircle,
  FiAlertOctagon,
  FiMessageSquare,
} from 'react-icons/fi';

import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastsMessage, useToasts } from '../../hooks/toasts';
import Toast from './Toast';

interface ToastsContainerProps {
  messages: ToastsMessage[];
}

const icons = {
  info: <FiInfo size={25} />,
  success: <FiCheckCircle size={25} />,
  error: <FiAlertOctagon size={25} />,
};
const ToastsContainer: React.FC<ToastsContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id as string,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );
  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastsContainer;
