import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  PenTool,
  LogOut,
  Settings
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme, scrolled }) => 
    scrolled 
      ? `${theme.colors.surface}95`
      : `${theme.colors.background}95`
  };
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 1000;
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    text-decoration: none;
    transform: scale(1.05);
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.textSecondary
  };
  text-decoration: none;
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceVariant};
    text-decoration: none;
  }

  ${({ active, theme }) => active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: ${theme.colors.primary};
      border-radius: 1px;
    }
  `}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
    width: 280px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceVariant};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const UserMenu = styled(motion.div)`
  position: relative;
`;

const UserAvatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: 200px;
  z-index: 1001;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceVariant};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 999;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MobileNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const { theme } = useBlog();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/posts', label: 'Posts' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleThemeToggle = () => {
    theme.setTheme(theme.theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <HeaderContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Nav>
        <Logo to="/">
          <div className="logo-icon">🌍</div>
          EcoVoice
        </Logo>

        <NavLinks>
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              active={location.pathname === path}
            >
              {label}
            </NavLink>
          ))}
        </NavLinks>

        <RightSection>
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </SearchContainer>

          <IconButton
            onClick={handleThemeToggle}
            title={`Switch to ${theme.theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme.theme === 'light' ? <Moon /> : <Sun />}
          </IconButton>

          {isAuthenticated ? (
            <UserMenu>
              <UserAvatar
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img src={user.avatar} alt={user.name} />
              </UserAvatar>

              <AnimatePresence>
                {showUserMenu && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownItem onClick={() => navigate('/profile')}>
                      <Settings />
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate('/posts/create')}>
                      <PenTool />
                      Write Post
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      <LogOut />
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </UserMenu>
          ) : (
            <IconButton onClick={demoLogin} title="Demo Login">
              <User />
            </IconButton>
          )}

          <MobileMenuButton
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu />
          </MobileMenuButton>
        </RightSection>
      </Nav>

      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuHeader>
              <Logo to="/" onClick={() => setShowMobileMenu(false)}>
                <div className="logo-icon">🌍</div>
                EcoVoice
              </Logo>
              <IconButton onClick={() => setShowMobileMenu(false)}>
                <X />
              </IconButton>
            </MobileMenuHeader>

            {navItems.map(({ path, label }) => (
              <MobileNavLink
                key={path}
                to={path}
                onClick={() => setShowMobileMenu(false)}
              >
                {label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
