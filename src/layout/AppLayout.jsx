import React from "react";
import styled from "@emotion/styled";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.default};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  text-align: center;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
`;

function AppLayout({ children }) {
  return (
    <LayoutWrapper>
      <Header>
        <HeaderTitle>Song Manager</HeaderTitle>
      </Header>

      <MainContent>
        <ContentContainer>{children}</ContentContainer>
      </MainContent>
    </LayoutWrapper>
  );
}

export default AppLayout;
