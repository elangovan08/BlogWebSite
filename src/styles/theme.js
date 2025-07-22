// Modern theme system for eco-conscious design
export const lightTheme = {
  colors: {
    // Primary eco-friendly colors
    primary: '#2d6a4f',      // Forest green
    primaryLight: '#40916c',  // Lighter green
    primaryDark: '#1b4332',   // Dark forest green
    
    // Secondary colors
    secondary: '#5f8a8b',     // Sage green
    accent: '#f77f00',        // Warm orange (call to action)
    warning: '#fcbf49',       // Amber warning
    error: '#d62828',         // Red for errors
    success: '#2d6a4f',       // Green for success
    
    // Earth tones
    earth: '#a67c52',         // Brown earth
    sky: '#219ebc',           // Sky blue
    sun: '#ffd166',           // Sun yellow
    
    // Neutral colors
    background: '#ffffff',
    surface: '#f8fffe',
    surfaceVariant: '#e8f5e8',
    text: '#1a1a1a',
    textSecondary: '#4a4a4a',
    textTertiary: '#6a6a6a',
    border: '#e0e7e0',
    shadow: 'rgba(45, 106, 79, 0.1)',
    
    // Gradient backgrounds
    gradientPrimary: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
    gradientHero: 'linear-gradient(135deg, #2d6a4f 0%, #5f8a8b 50%, #219ebc 100%)',
    gradientCard: 'linear-gradient(145deg, #ffffff 0%, #f8fffe 100%)',
  },
  
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Playfair Display', serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '5rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(45, 106, 79, 0.05)',
    md: '0 4px 6px -1px rgba(45, 106, 79, 0.1)',
    lg: '0 10px 15px -3px rgba(45, 106, 79, 0.1)',
    xl: '0 20px 25px -5px rgba(45, 106, 79, 0.1)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    
    // Dark mode adjustments
    primary: '#52b788',       // Brighter green for dark mode
    primaryLight: '#74c69d',  // Even brighter
    primaryDark: '#2d6a4f',   // Darker green
    
    // Dark backgrounds
    background: '#0a0f0a',    // Very dark green-black
    surface: '#1a251a',       // Dark green surface
    surfaceVariant: '#2d3a2d', // Variant surface
    
    // Dark text
    text: '#f0f8f0',          // Light green-white
    textSecondary: '#b8d4b8',  // Secondary light green
    textTertiary: '#8bb88b',   // Tertiary green
    
    // Dark borders and shadows
    border: '#3d4a3d',        // Dark green border
    shadow: 'rgba(0, 0, 0, 0.3)',
    
    // Dark gradients
    gradientPrimary: 'linear-gradient(135deg, #52b788 0%, #74c69d 100%)',
    gradientHero: 'linear-gradient(135deg, #1a251a 0%, #2d3a2d 50%, #0a0f0a 100%)',
    gradientCard: 'linear-gradient(145deg, #1a251a 0%, #2d3a2d 100%)',
  },
};

// Animation variants for Framer Motion
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  slideInFromRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};
