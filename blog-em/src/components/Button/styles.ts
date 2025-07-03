import styled from 'styled-components';

export const Container = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  background: #2e2d37;
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: 0.8px solid rgba(255, 255, 255, 0.2);

  &:disabled {
    background-color: rgb(208, 207, 218);
    cursor: not-allowed;
  }
`;
