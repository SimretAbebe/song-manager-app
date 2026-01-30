import React from "react";
import styled from "@emotion/styled";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    at top left,
    ${({ theme }) => theme.colors.background.default} 0%,
    ${({ theme }) => theme.colors.background.paper} 50%,
    ${({ theme }) => theme.colors.background.default} 100%
  );
`;

const Header = styled.header`
  /* Removed background-color: ${({ theme }) => theme.colors.primary.main}; */
  color: ${({ theme }) => theme.colors.primary.main}; 
  padding: ${({ theme }) => theme.spacing(3)} 0;
  /* Removed box-shadow: ${({ theme }) => theme.shadows[3]}; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(5)} 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(3)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

function AppLayout({ children }) {
  return (
    <LayoutWrapper>
      <Header>
        <HeaderTitle>Song Manager App</HeaderTitle>
      </Header>
      <MainContent>
        <ContentContainer>
          {children}
        </ContentContainer>
      </MainContent>
    </LayoutWrapper>
  );
}

export default AppLayout;
