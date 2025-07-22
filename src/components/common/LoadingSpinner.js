import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SpinnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  min-height: ${({ fullScreen }) => fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const EcoSpinner = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`;

const Leaf = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0 100% 0 100%;
  transform-origin: center;
  
  &:nth-child(1) {
    top: 0;
    left: 50%;
    transform: translateX(-50%) rotate(0deg);
    animation: ${spin} 2s linear infinite;
  }
  
  &:nth-child(2) {
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(90deg);
    animation: ${spin} 2s linear infinite 0.5s;
  }
  
  &:nth-child(3) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    animation: ${spin} 2s linear infinite 1s;
  }
  
  &:nth-child(4) {
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(270deg);
    animation: ${spin} 2s linear infinite 1.5s;
  }
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ 
  fullScreen = false, 
  text = "Loading...", 
  variant = "default" 
}) => {
  return (
    <SpinnerContainer
      fullScreen={fullScreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {variant === "eco" ? (
        <EcoSpinner>
          <Leaf />
          <Leaf />
          <Leaf />
          <Leaf />
        </EcoSpinner>
      ) : (
        <Spinner />
      )}
      
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
