import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Header from './Header';
import Footer from './Footer';

const LayoutWrapper = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding-top: 80px; /* Account for fixed header */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 70px;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
