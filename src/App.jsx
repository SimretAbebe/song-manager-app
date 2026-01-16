import React from 'react';
import styled from '@emotion/styled'; 

// Styled component using theme values
const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background.default};
  min-height: 100vh;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border: 1px solid ${({ theme }) => theme.colors.divider};
`;

function App() {
  return (
    <Container>
      <Title>Song Manager App</Title>
      <Subtitle>
        A modern React application with Emotion theming and Redux state management
      </Subtitle>

      <Card>
        <h2>Features Coming Soon:</h2>
        <ul>
          <li>Song CRUD operations</li>
          <li>Paginated song list</li>
          <li>Redux Toolkit + Redux-Saga</li>
          <li>Emotion theming system</li>
          <li>Responsive design</li>
        </ul>
      </Card>
    </Container>
  );
}

export default App; 