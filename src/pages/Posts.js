import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Heart,
  Eye,
  MessageCircle,
  Clock,
  User,
  Calendar,
  Tag
} from 'lucide-react';
import { format } from 'date-fns';

import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { animationVariants } from '../styles/theme';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PostsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const PageTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const PageSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ControlsBar = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ViewControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ViewButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.surface
  };
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.textSecondary
  };
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    text-decoration: none;
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const PostsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: ${({ view }) => 
    view === 'grid' 
      ? 'repeat(auto-fill, minmax(350px, 1fr))'
      : '1fr'
  };
  gap: ${({ theme, view }) => 
    view === 'grid' 
      ? theme.spacing['2xl']
      : theme.spacing.lg
  };

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  display: ${({ view }) => view === 'list' ? 'flex' : 'block'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const PostImage = styled.div`
  width: ${({ view }) => view === 'list' ? '200px' : '100%'};
  height: ${({ view }) => view === 'list' ? '120px' : '200px'};
  background: url(${({ src }) => src}) center/cover;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 200px;
  }
`;

const PostContent = styled.div`
  padding: ${({ theme, view }) => 
    view === 'list' 
      ? theme.spacing.lg
      : theme.spacing.xl
  };
  flex: 1;
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
  font-size: ${({ theme, view }) => 
    view === 'list' 
      ? theme.fontSizes.lg
      : theme.fontSizes.xl
  };
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  line-height: 1.3;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: -webkit-box;
  -webkit-line-clamp: ${({ view }) => view === 'list' ? 2 : 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  svg {
    width: 14px;
    height: 14px;
  }
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

const PostTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const PostTag = styled.span`
  background: ${({ theme }) => theme.colors.surfaceVariant};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const Posts = () => {
  const { posts, loading } = useBlog();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(post => post.category))];
    return cats.sort();
  }, [posts]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading posts..." variant="eco" />;
  }

  return (
    <PostsContainer>
      <PageHeader>
        <PageTitle
          variants={animationVariants.slideUp}
          initial="initial"
          animate="animate"
        >
          Environmental Articles
        </PageTitle>
        <PageSubtitle
          variants={animationVariants.slideUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          Explore our collection of articles on climate change, conservation, sustainability, and environmental justice.
        </PageSubtitle>
      </PageHeader>

      <ControlsBar
        variants={animationVariants.slideUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
      >
        <SearchFilters>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <FilterSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </FilterSelect>
        </SearchFilters>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ViewControls>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List />
            </ViewButton>
          </ViewControls>

          {isAuthenticated && (
            <CreateButton to="/posts/create">
              <Plus />
              Write Article
            </CreateButton>
          )}
        </div>
      </ControlsBar>

      {filteredPosts.length === 0 ? (
        <EmptyState>
          <h3>No articles found</h3>
          <p>
            {searchQuery || selectedCategory 
              ? "Try adjusting your search criteria or filters."
              : "No articles have been published yet."
            }
          </p>
          {isAuthenticated && (
            <CreateButton to="/posts/create">
              <Plus />
              Write the First Article
            </CreateButton>
          )}
        </EmptyState>
      ) : (
        <PostsGrid
          view={viewMode}
          variants={animationVariants.staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                view={viewMode}
                variants={animationVariants.staggerItem}
                whileHover={{ y: -4 }}
                onClick={() => window.location.href = `/posts/${post.id}`}
                layout
              >
                <PostImage src={post.imageUrl} view={viewMode} />
                <PostContent view={viewMode}>
                  <PostCategory>{post.category}</PostCategory>
                  <PostTitle view={viewMode}>{post.title}</PostTitle>
                  <PostExcerpt view={viewMode}>{post.excerpt}</PostExcerpt>
                  
                  <PostTags>
                    {post.tags.slice(0, 3).map(tag => (
                      <PostTag key={tag}>
                        <Tag />
                        {tag}
                      </PostTag>
                    ))}
                  </PostTags>

                  <PostMeta>
                    <PostAuthor>
                      <User />
                      {post.author}
                      <Calendar />
                      {format(new Date(post.publishedAt), 'MMM d')}
                      <Clock />
                      {post.readTime} min
                    </PostAuthor>
                    <PostStats>
                      <span title="Likes">
                        <Heart />
                        {post.likes}
                      </span>
                      <span title="Views">
                        <Eye />
                        {post.views}
                      </span>
                      <span title="Comments">
                        <MessageCircle />
                        {post.comments.length}
                      </span>
                    </PostStats>
                  </PostMeta>
                </PostContent>
              </PostCard>
            ))}
          </AnimatePresence>
        </PostsGrid>
      )}
    </PostsContainer>
  );
};

export default Posts;
