import React from 'react';
import * as S from './styles';

export const Button: React.FC<
  React.PropsWithChildren & React.ComponentPropsWithoutRef<'button'>
> = ({ children, ...props }) => {
  console.log('a');
  return <S.Container {...props}>{children}</S.Container>;
};
