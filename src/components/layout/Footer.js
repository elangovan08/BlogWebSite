import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Leaf
} from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surfaceVariant};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NewsletterForm = styled.form`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const NewsletterButton = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  .heart {
    color: ${({ theme }) => theme.colors.error};
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const LegalLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textTertiary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const EnvironmentalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      e.target.reset();
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* About Section */}
          <FooterSection>
            <h3>About EcoVoice</h3>
            <p>
              A platform dedicated to environmental awareness, climate action, and sustainable living. 
              Join our community of eco-warriors fighting for a better planet.
            </p>
            <EnvironmentalBadge>
              <Leaf />
              Carbon Neutral Website
            </EnvironmentalBadge>
            <SocialLinks>
              <SocialLink href="https://twitter.com/ecovoice" target="_blank" rel="noopener noreferrer">
                <Twitter />
              </SocialLink>
              <SocialLink href="https://instagram.com/ecovoice" target="_blank" rel="noopener noreferrer">
                <Instagram />
              </SocialLink>
              <SocialLink href="https://facebook.com/ecovoice" target="_blank" rel="noopener noreferrer">
                <Facebook />
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/ecovoice" target="_blank" rel="noopener noreferrer">
                <Linkedin />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection>
            <h3>Explore</h3>
            <FooterLinks>
              <li>
                <FooterLink to="/posts">Latest Posts</FooterLink>
              </li>
              <li>
                <FooterLink to="/category/climate-change">Climate Change</FooterLink>
              </li>
              <li>
                <FooterLink to="/category/conservation">Conservation</FooterLink>
              </li>
              <li>
                <FooterLink to="/category/sustainable-living">Sustainable Living</FooterLink>
              </li>
              <li>
                <FooterLink to="/category/environmental-justice">Environmental Justice</FooterLink>
              </li>
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
            </FooterLinks>
          </FooterSection>

          {/* Resources */}
          <FooterSection>
            <h3>Resources</h3>
            <FooterLinks>
              <li>
                <FooterLink to="/services">Our Services</FooterLink>
              </li>
              <li>
                <FooterLink as="a" href="#" target="_blank">Climate Reports</FooterLink>
              </li>
              <li>
                <FooterLink as="a" href="#" target="_blank">Action Guides</FooterLink>
              </li>
              <li>
                <FooterLink as="a" href="#" target="_blank">Research Papers</FooterLink>
              </li>
              <li>
                <FooterLink as="a" href="#" target="_blank">Partner Organizations</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Get Involved</FooterLink>
              </li>
            </FooterLinks>
          </FooterSection>

          {/* Contact & Newsletter */}
          <FooterSection>
            <h3>Stay Connected</h3>
            <FooterLinks>
              <li>
                <FooterLink as="a" href="mailto:info@ecovoice.com">
                  <Mail />
                  info@ecovoice.com
                </FooterLink>
              </li>
              <li>
                <FooterLink as="a" href="tel:+1234567890">
                  <Phone />
                  +1 (234) 567-890
                </FooterLink>
              </li>
              <li>
                <FooterLink as="span">
                  <MapPin />
                  Global Community
                </FooterLink>
              </li>
            </FooterLinks>

            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                name="email"
                placeholder="Your email for updates"
                required
              />
              <NewsletterButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe to Newsletter
              </NewsletterButton>
            </NewsletterForm>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            Made with <Heart className="heart" /> for our planet • {new Date().getFullYear()} EcoVoice
          </Copyright>
          
          <LegalLinks>
            <LegalLink to="/privacy">Privacy Policy</LegalLink>
            <LegalLink to="/terms">Terms of Service</LegalLink>
            <LegalLink to="/accessibility">Accessibility</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
