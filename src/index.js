import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

// React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Main App Wrapper with all providers
const AppWrapper = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  );
  
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={currentTheme}>
          <BrowserRouter>
            <AuthProvider>
              <BlogProvider themeContext={{ theme, setTheme }}>
                <GlobalStyles />
                <App />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: currentTheme.colors.surface,
                      color: currentTheme.colors.text,
                    },
                  }}
                />
              </BlogProvider>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

// Initialize React 18
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
