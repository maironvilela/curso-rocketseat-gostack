import { format } from 'date-fns';

const formatDate = (value: Date): string => {
  return format(new Date(value), 'dd/MM/yyy');
};

export default formatDate;
