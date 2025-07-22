import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Globe, 
  Heart,
  Eye,
  MessageCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

import { useBlog } from '../context/BlogContext';
import { animationVariants } from '../styles/theme';

const HeroSection = styled(motion.section)`
  background: ${({ theme }) => theme.colors.gradientHero};
  color: white;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const CTASection = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-weight: 600;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  &.primary {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.xl};
      text-decoration: none;
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      color: white;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StatsSection = styled(motion.section)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};

  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const StatNumber = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  margin: 0;
`;

const FeaturedSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.lg};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const PostsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 250px;
  background: url(${({ src }) => src}) center/cover;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
  }
`;

const PostContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PostCategory = styled.span`
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PostTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  line-height: 1.3;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ViewAllButton = styled(motion.div)`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const Home = () => {
  const { getFeaturedPosts } = useBlog();
  const featuredPosts = getFeaturedPosts();

  const stats = [
    { icon: Globe, number: "50K+", label: "Eco Warriors" },
    { icon: TrendingUp, number: "200+", label: "Environmental Articles" },
    { icon: Users, number: "25K+", label: "Community Members" },
    { icon: Heart, number: "100K+", label: "Actions Taken" }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants.fadeIn}
    >
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle
            variants={animationVariants.slideUp}
            transition={{ delay: 0.2 }}
          >
            🌍 Voice for Our Planet
          </HeroTitle>
          <HeroSubtitle
            variants={animationVariants.slideUp}
            transition={{ delay: 0.4 }}
          >
            Join the global movement for environmental protection, climate action, and sustainable living. 
            Together, we can create a better future for our planet and all living beings.
          </HeroSubtitle>
          <CTASection
            variants={animationVariants.slideUp}
            transition={{ delay: 0.6 }}
          >
            <CTAButton to="/posts" className="primary">
              Explore Articles <ArrowRight />
            </CTAButton>
            <CTAButton to="/about" className="secondary">
              Join the Movement
            </CTAButton>
          </CTASection>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection
        variants={animationVariants.fadeIn}
        transition={{ delay: 0.8 }}
      >
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              variants={animationVariants.slideUp}
              transition={{ delay: 1 + (index * 0.1) }}
            >
              <StatIcon>
                <stat.icon />
              </StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      {/* Featured Posts Section */}
      <FeaturedSection>
        <SectionHeader>
          <SectionTitle
            variants={animationVariants.slideUp}
          >
            Latest Environmental Insights
          </SectionTitle>
          <SectionSubtitle
            variants={animationVariants.slideUp}
            transition={{ delay: 0.2 }}
          >
            Discover urgent environmental issues, solutions, and stories of hope from around the world.
          </SectionSubtitle>
        </SectionHeader>

        <PostsGrid
          variants={animationVariants.staggerContainer}
        >
          {featuredPosts.slice(0, 4).map((post, index) => (
            <PostCard
              key={post.id}
              variants={animationVariants.staggerItem}
              whileHover={{ y: -8 }}
              onClick={() => window.location.href = `/posts/${post.id}`}
            >
              <PostImage src={post.imageUrl} />
              <PostContent>
                <PostCategory>{post.category}</PostCategory>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <PostMeta>
                  <PostAuthor>
                    <Clock />
                    {format(new Date(post.publishedAt), 'MMM d, yyyy')} • {post.readTime} min read
                  </PostAuthor>
                  <PostStats>
                    <span>
                      <Heart />
                      {post.likes}
                    </span>
                    <span>
                      <Eye />
                      {post.views}
                    </span>
                    <span>
                      <MessageCircle />
                      {post.comments.length}
                    </span>
                  </PostStats>
                </PostMeta>
              </PostContent>
            </PostCard>
          ))}
        </PostsGrid>

        <ViewAllButton>
          <CTAButton to="/posts" className="primary">
            View All Articles <ArrowRight />
          </CTAButton>
        </ViewAllButton>
      </FeaturedSection>
    </motion.div>
  );
};

export default Home;
