import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Modern CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Root and HTML */
  :root {
    --scroll-behavior: smooth;
    --font-feature-settings: 'liga' 1, 'calt' 1;
  }

  html {
    scroll-behavior: var(--scroll-behavior);
    font-feature-settings: var(--font-feature-settings);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Body */
  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    transition: color ${({ theme }) => theme.transitions.normal},
                background-color ${({ theme }) => theme.transitions.normal};
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 { font-size: ${({ theme }) => theme.fontSizes['5xl']}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes['4xl']}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes['3xl']}; }
  h4 { font-size: ${({ theme }) => theme.fontSizes['2xl']}; }
  h5 { font-size: ${({ theme }) => theme.fontSizes.xl}; }
  h6 { font-size: ${({ theme }) => theme.fontSizes.lg}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover, &:focus {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Forms */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  input, textarea, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color ${({ theme }) => theme.transitions.fast},
                box-shadow ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textTertiary};
    }
  }

  /* Buttons */
  button {
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-weight: 500;
    transition: all ${({ theme }) => theme.transitions.fast};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Primary Button */
  .btn-primary {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    color: white;
    box-shadow: ${({ theme }) => theme.shadows.sm};

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* Secondary Button */
  .btn-secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }

  /* Utility Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing.md};
    }
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }

  .grid {
    display: grid;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  /* Responsive utilities */
  .hidden { display: none; }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .md\\:hidden { display: none; }
    .md\\:block { display: block; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    .sm\\:hidden { display: none; }
    .sm\\:block { display: block; }
    
    h1 { font-size: ${({ theme }) => theme.fontSizes['3xl']}; }
    h2 { font-size: ${({ theme }) => theme.fontSizes['2xl']}; }
    h3 { font-size: ${({ theme }) => theme.fontSizes.xl}; }
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  /* Loading states */
  .loading {
    position: relative;
    overflow: hidden;
  }

  .loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary}22,
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    to {
      left: 100%;
    }
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @media (prefers-contrast: high) {
    button, input, textarea, select {
      border-width: 2px;
    }
  }

  /* Focus styles for keyboard navigation */
  .keyboard-navigation *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
    
    .no-print {
      display: none !important;
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  /* Selection styles */
  ::selection {
    background: ${({ theme }) => theme.colors.primary}33;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default GlobalStyles;
