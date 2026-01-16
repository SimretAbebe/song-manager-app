import React from "react";
import styled from "@emotion/styled";
import AppLayout from "./layout/AppLayout";
import SongList from "./components/SongList";

// Welcome section title
const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-align: center;
`;

// Descriptive subtitle text
const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
  max-width: 600px;
`;

// Feature showcase card
const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  max-width: 600px;
  margin: 0 auto;
`;

// Feature list styling
const FeatureList = styled.ul`
  margin: ${({ theme }) => theme.spacing(2)} 0 0 0;
  padding-left: ${({ theme }) => theme.spacing(3)};

  li {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

function App() {
  return (
    <AppLayout>
      <div>
        <PageTitle>Welcome to Song Manager</PageTitle>
        <Subtitle>
          A modern React application with Emotion theming and Redux state
          management. Built with professional development practices and scalable
          architecture.
        </Subtitle>

        <SongList />

        <FeatureCard>
          <h3 style={{ marginTop: 0, color: "#1976d2" }}>
            Features Coming Soon:
          </h3>
          <FeatureList>
            <li>Full CRUD operations for songs</li>
            <li>Paginated song list with search</li>
            <li>Redux Toolkit + Redux-Saga for state management</li>
            <li>Advanced Emotion theming with dark mode</li>
            <li>Fully responsive design</li>
            <li>REST API integration</li>
          </FeatureList>
        </FeatureCard>
      </div>
    </AppLayout>
  );
}

export default App;
