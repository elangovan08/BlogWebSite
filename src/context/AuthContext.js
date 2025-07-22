import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN', payload: user });
      } catch (error) {
        localStorage.removeItem('blogUser');
      }
    }
  }, []);

  // Actions
  const actions = {
    login: async (email, password) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Demo user for development
        const user = {
          id: uuidv4(),
          email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=2d6a4f&color=fff`,
          role: 'user',
          joinedAt: new Date().toISOString(),
          bio: 'Environmental advocate and nature lover',
          location: 'Earth',
          website: '',
          social: {
            twitter: '',
            instagram: '',
            linkedin: ''
          }
        };
        
        localStorage.setItem('blogUser', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: user });
        toast.success('Welcome back!');
        
        return user;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        toast.error('Login failed');
        throw error;
      }
    },

    register: async (userData) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = {
          id: uuidv4(),
          ...userData,
          avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=2d6a4f&color=fff`,
          role: 'user',
          joinedAt: new Date().toISOString(),
          bio: 'Environmental advocate and nature lover',
          location: 'Earth',
          website: '',
          social: {
            twitter: '',
            instagram: '',
            linkedin: ''
          }
        };
        
        localStorage.setItem('blogUser', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: user });
        toast.success('Account created successfully!');
        
        return user;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        toast.error('Registration failed');
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('blogUser');
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    },

    updateProfile: (profileData) => {
      try {
        const updatedUser = { ...state.user, ...profileData };
        localStorage.setItem('blogUser', JSON.stringify(updatedUser));
        dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error('Failed to update profile');
        console.error('Error updating profile:', error);
      }
    },

    // Demo login for quick access
    demoLogin: () => {
      const demoUser = {
        id: 'demo-user',
        email: 'eco.warrior@earth.com',
        name: 'Eco Warrior',
        avatar: 'https://ui-avatars.com/api/?name=Eco+Warrior&background=2d6a4f&color=fff',
        role: 'admin',
        joinedAt: '2023-01-01T00:00:00.000Z',
        bio: 'Climate activist and environmental blogger fighting for our planet',
        location: 'Global',
        website: 'https://saveourplanet.eco',
        social: {
          twitter: '@ecowarrior',
          instagram: '@planetprotector',
          linkedin: 'eco-warrior'
        }
      };
      
      localStorage.setItem('blogUser', JSON.stringify(demoUser));
      dispatch({ type: 'LOGIN', payload: demoUser });
      toast.success('Demo login successful!');
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
