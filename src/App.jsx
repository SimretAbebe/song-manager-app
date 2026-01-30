import React, { Suspense, lazy, useState } from "react";
import styled from "@emotion/styled";
import AppLayout from "./layout/AppLayout";
import SongForm from "./components/SongForm"; 

const LazySongList = lazy(() => import("./components/SongList"));

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding: ${({ theme }) => theme.spacing(4)} 0; 
  width: 100%;

  background: linear-gradient(145deg, ${({ theme }) => theme.colors.background.paper}, ${({ theme }) => theme.colors.background.default});
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
  box-shadow: ${({ theme }) => theme.shadows[4]}; 
  max-width: 1000px; 
  margin: ${({ theme }) => theme.spacing(4)} auto; 

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing(2)} auto;
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
`;

const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary}; 
  font-size: ${({ theme }) => theme.typography.h1.fontSize}; 
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); 
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing(4)}; 
  text-align: center;
  max-width: 700px; 
  padding: 0 ${({ theme }) => theme.spacing(2)}; 

  &::before { 
    font-size: 1.2em;
    vertical-align: middle;
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
  &::after { 
    font-size: 1.2em;
    vertical-align: middle;
    margin-left: ${({ theme }) => theme.spacing(1)};
  }
`;

const SongListWrapper = styled.div`
  background-color: transparent; 
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(4)}; 
  border: none; 
  width: 100%;
  max-width: 900px; 
  margin-top: ${({ theme }) => theme.spacing(4)}; 

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(2)}; 
  }
`;

function App() {
  const [editingSong, setEditingSong] = useState(null);

  const handleEditClick = (song) => {
    setEditingSong(song);
  };

  const handleFormClose = () => {
    setEditingSong(null);
  };

  return (
    <AppLayout>
      <ContentArea>
        <PageTitle>Welcome to Song Manager</PageTitle>
        <Subtitle>
          A modern React application for managing your music collection.
          Enjoy Ethiopian songs with full CRUD operations, all powered by Redux Toolkit, Redux-Saga, and Emotion.
        </Subtitle>

        {/* Song list with enhanced styling and lazy loading */}
        <SongListWrapper>
          <Suspense fallback={<div>Loading your music library...</div>}>
            <LazySongList onEditClick={handleEditClick} />
          </Suspense>
        </SongListWrapper>

        <SongForm editingSong={editingSong} onFormClose={handleFormClose} />
      </ContentArea>
    </AppLayout>
  );
}

export default App;