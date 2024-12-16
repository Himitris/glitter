import React from 'react';
import { components } from '../../utils/theme';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`${components.container} ${className}`}>
      {children}
    </div>
  );
};

export default Container;