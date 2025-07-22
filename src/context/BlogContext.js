import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

// Initial eco-conscious blog posts with awareness content
const initialPosts = [
  {
    id: uuidv4(),
    title: "The Climate Crisis: Why We Can't Wait Any Longer",
    content: `The Earth is sending us distress signals that we can no longer ignore. Rising temperatures, melting ice caps, extreme weather events, and biodiversity loss are just the beginning. Scientists worldwide agree: we have less than a decade to make dramatic changes to prevent catastrophic climate change.

## The Reality We Face

Every day we delay action, the cost becomes higher:
- **Temperature Rise**: Global temperatures have risen 1.1°C since pre-industrial times
- **Ice Loss**: Arctic sea ice is declining at 13% per decade
- **Species Extinction**: We're losing species 1,000-10,000 times faster than natural rates
- **Ocean Acidification**: Ocean pH has dropped by 0.1 units since industrialization

## What's Causing This Crisis?

The primary driver is human activity, particularly:
- Burning fossil fuels (coal, oil, gas)
- Deforestation and land use changes
- Industrial agriculture and livestock farming
- Overconsumption and waste

## Solutions Exist, But We Need Action NOW

1. **Renewable Energy Transition**: Solar and wind are now the cheapest forms of electricity
2. **Reforestation**: Trees are our natural carbon capture technology
3. **Sustainable Agriculture**: Regenerative farming can sequester carbon
4. **Policy Changes**: Carbon pricing and green regulations
5. **Individual Action**: Reduce, reuse, recycle, and vote

## The Power of Collective Action

When we unite for change, we can:
- Force corporations to adopt sustainable practices
- Elect leaders who prioritize environmental protection
- Create market demand for green alternatives
- Build resilient communities

The time for half-measures is over. The future of our planet depends on what we do today.`,
    excerpt: "Scientists worldwide agree: we have less than a decade to make dramatic changes to prevent catastrophic climate change. Learn about the reality we face and solutions that exist.",
    author: "Dr. Maya Environmental",
    category: "Climate Change",
    tags: ["climate crisis", "global warming", "environmental protection", "sustainability"],
    imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
    publishedAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    likes: 234,
    comments: [],
    views: 1250,
    readTime: 8,
    featured: true,
    status: 'published'
  },
  {
    id: uuidv4(),
    title: "Plastic Pollution: The Silent Killer of Our Oceans",
    content: `Every minute, the equivalent of a garbage truck full of plastic enters our oceans. This isn't just an environmental issue—it's a crisis that affects every living being on Earth.

## The Shocking Statistics

- **8 million tons** of plastic waste enter oceans annually
- **Over 1 million** marine animals die from plastic pollution each year
- **Microplastics** are found in drinking water, food, and even human blood
- **By 2050**, there could be more plastic than fish in the ocean by weight

## The Journey of Plastic Pollution

1. **Production**: 380 million tons of plastic produced globally each year
2. **Consumption**: Single-use plastics make up 50% of all plastic production
3. **Disposal**: Only 9% of plastic is actually recycled
4. **Ocean Entry**: Plastic reaches oceans through rivers, wind, and direct dumping
5. **Breakdown**: Plastic doesn't biodegrade—it just breaks into smaller pieces

## Impact on Marine Life

- **Entanglement**: Seals, turtles, and birds get trapped in plastic debris
- **Ingestion**: Animals mistake plastic for food, leading to starvation
- **Habitat Destruction**: Coral reefs suffocated by plastic waste
- **Chemical Contamination**: Toxic chemicals leach into marine ecosystems

## Solutions We Can Implement Today

### Individual Actions:
- Use reusable bags, bottles, and containers
- Avoid single-use plastics
- Support plastic-free alternatives
- Participate in beach cleanups

### Systemic Changes:
- Extended Producer Responsibility laws
- Plastic bag bans and bottle deposit systems
- Investment in plastic alternatives
- Improved waste management infrastructure

## Innovation for Change

Exciting developments include:
- Biodegradable plastics from algae
- Plastic-eating enzymes and bacteria
- Ocean cleanup technologies
- Circular economy business models

The ocean has given us life—now it's our turn to give life back to the ocean.`,
    excerpt: "Every minute, a garbage truck worth of plastic enters our oceans. Discover the shocking impact of plastic pollution and actionable solutions we can implement today.",
    author: "Ocean Defender",
    category: "Ocean Conservation",
    tags: ["plastic pollution", "ocean conservation", "marine life", "waste reduction"],
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=400&fit=crop",
    publishedAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString(),
    likes: 189,
    comments: [],
    views: 987,
    readTime: 6,
    featured: true,
    status: 'published'
  },
  {
    id: uuidv4(),
    title: "Deforestation: The War Against Our Planet's Lungs",
    content: `Forests are the lungs of our planet, yet we're destroying them at an alarming rate. Every year, we lose 10 million hectares of forest—an area the size of South Korea. This isn't just about trees; it's about the survival of our planet.

## The Scale of Destruction

- **10 million hectares** lost annually (27,000 hectares daily)
- **Amazon Rainforest**: Lost 20% of its original size
- **80% of deforestation** driven by agriculture
- **1 billion people** depend on forests for their livelihoods

## Why Forests Matter

### Climate Regulation
- Absorb 2.6 billion tons of CO2 annually
- Store 861 billion tons of carbon globally
- Regulate local and global weather patterns
- Prevent soil erosion and desertification

### Biodiversity Hotspots
- Home to 80% of terrestrial species
- Provide habitats for endangered animals
- Source of medicinal plants and genetic diversity
- Support complex ecosystems

### Human Benefits
- Clean air and water filtration
- Economic resources and jobs
- Cultural and spiritual significance
- Tourism and recreation

## The Drivers of Deforestation

1. **Agricultural Expansion** (80%)
   - Cattle ranching in Amazon
   - Palm oil plantations in Southeast Asia
   - Soy cultivation for animal feed

2. **Logging** (20%)
   - Legal and illegal timber harvesting
   - Paper and pulp production
   - Construction materials

3. **Infrastructure Development**
   - Roads and urban expansion
   - Mining operations
   - Dam construction

## The Ripple Effects

### Climate Impact
- Increased greenhouse gas emissions
- Disrupted rainfall patterns
- Higher temperatures
- Loss of carbon storage

### Biodiversity Loss
- Species extinction
- Ecosystem collapse
- Loss of genetic resources
- Broken food chains

### Human Consequences
- Displacement of indigenous communities
- Loss of livelihoods
- Increased natural disasters
- Health impacts from air pollution

## Solutions and Hope

### Conservation Efforts
- Protected area establishment
- Sustainable forest management
- Reforestation and afforestation programs
- Indigenous land rights recognition

### Sustainable Practices
- Certified sustainable products (FSC, PEFC)
- Agroforestry systems
- Reduced consumption of forest-risk commodities
- Digital alternatives to paper

### Policy Solutions
- Zero-deforestation commitments
- Payment for ecosystem services
- Stronger law enforcement
- International cooperation (REDD+)

### What You Can Do
- Choose sustainable products
- Reduce paper consumption
- Support forest conservation organizations
- Vote for leaders who protect forests
- Plant trees in your community

## Success Stories

- **Costa Rica**: Increased forest cover from 24% to 54%
- **Rwanda**: Planted 43 million trees in one day
- **Brazil**: Reduced Amazon deforestation by 70% (2004-2014)
- **India**: Increased forest cover by 5,188 sq km (2017-2019)

Forests don't just clean our air—they give us hope. Every tree planted is a vote for the future.`,
    excerpt: "Forests are the lungs of our planet, yet we lose 10 million hectares annually. Explore the causes, consequences, and solutions to deforestation.",
    author: "Forest Guardian",
    category: "Conservation",
    tags: ["deforestation", "forests", "conservation", "biodiversity", "climate change"],
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    publishedAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString(),
    likes: 156,
    comments: [],
    views: 756,
    readTime: 10,
    featured: false,
    status: 'published'
  },
  {
    id: uuidv4(),
    title: "Why War is the Enemy of Environmental Progress",
    content: `While the world burns—literally and figuratively—from climate change, humanity continues to wage wars that not only destroy lives but also devastate our environment. It's time to recognize that war and environmental protection are fundamentally incompatible.

## The Environmental Cost of Conflict

### Direct Environmental Damage
- **Habitat Destruction**: Bombing and military operations destroy ecosystems
- **Soil Contamination**: Unexploded ordnance and chemical weapons poison land
- **Water Pollution**: Military activities contaminate water sources
- **Air Pollution**: Burning infrastructure and vehicles release toxic gases

### Resource Depletion
- Wars consume massive amounts of fossil fuels
- Military production requires extensive raw materials
- Reconstruction after war doubles resource consumption
- Refugee displacement puts pressure on fragile ecosystems

## The Carbon Footprint of War

- **US Military**: World's largest institutional consumer of fossil fuels
- **Global Military**: Produces more CO2 than entire countries
- **Jet Fuel**: Military aircraft consume billions of gallons annually
- **Naval Operations**: Warships burn heavy fuel oil, highly polluting

## Case Studies of Environmental Warfare

### Vietnam War
- Agent Orange contaminated 4.8 million hectares
- Long-term soil and water contamination
- Birth defects still occurring today
- Ecosystem recovery taking decades

### Gulf War
- Oil well fires burned for months
- Massive air pollution across the region
- Soil contamination from depleted uranium
- Marine ecosystem destruction

### Current Conflicts
- Ukraine: Nuclear facilities at risk
- Middle East: Oil infrastructure targeted
- Africa: Water sources weaponized
- Global: Climate refugees increase conflict

## The Politics Behind Environmental Destruction

### Corporate Interests
- War profits the fossil fuel industry
- Arms manufacturers benefit from conflict
- Reconstruction contracts favor corporations
- Environmental regulations weakened during wartime

### Political Diversion
- War distracts from climate action
- Military spending reduces environmental budgets
- Nationalism overrides global cooperation
- Short-term thinking dominates policy

## The Human Cost

While politicians and corporations profit, ordinary people suffer:
- **Climate Refugees**: 216 million by 2050
- **Resource Wars**: Fighting over water and arable land
- **Health Impacts**: Pollution-related diseases increase
- **Economic Burden**: Military spending vs. green investment

## The Path to Peace and Planet

### Redirecting Resources
- Convert military budgets to climate action
- Peace dividends for renewable energy
- Green jobs for former military personnel
- International cooperation over competition

### Environmental Diplomacy
- Climate as a security issue
- Water sharing agreements
- Cross-border conservation
- Peace parks and protected areas

### Civil Society Action
- Anti-war environmental movements
- Divestment from arms manufacturers
- Support for peace organizations
- Education about war's environmental costs

## What We Can Do

### Individual Actions
- Vote against war-supporting politicians
- Divest from defense contractors
- Support peace and environmental organizations
- Educate others about war's environmental costs

### Collective Movements
- Climate strikes against militarism
- Protests against environmental warfare
- Solidarity with climate refugees
- Building peace movements

### Policy Advocacy
- Military carbon footprint reporting
- Environmental protection in wartime
- Peace as climate solution
- Green conversion of military industries

## Hope for the Future

History shows us that change is possible:
- Nuclear weapons treaties reduced global tensions
- Environmental movements have stopped wars
- Renewable energy reduces resource conflicts
- International cooperation has solved global problems

The choice is clear: we can choose war and watch our planet die, or we can choose peace and save our environment. The Earth doesn't recognize national boundaries—neither should our commitment to protecting it.

**War is not just hell—it's ecocide. Peace is not just the absence of conflict—it's the presence of environmental justice.**`,
    excerpt: "While the world burns from climate change, humanity continues to wage wars that devastate our environment. Explore why war and environmental protection are incompatible.",
    author: "Peace & Planet Activist",
    category: "War & Environment",
    tags: ["war", "peace", "environment", "militarism", "climate justice"],
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=400&fit=crop",
    publishedAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
    likes: 298,
    comments: [],
    views: 1456,
    readTime: 12,
    featured: true,
    status: 'published'
  }
];

// Blog reducer for state management
const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    
    case 'ADD_POST':
      const newPost = {
        ...action.payload,
        id: uuidv4(),
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        views: 0,
        status: 'published'
      };
      return {
        ...state,
        posts: [newPost, ...state.posts]
      };
    
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? { ...post, ...action.payload, updatedAt: new Date().toISOString() }
            : post
        )
      };
    
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      };
    
    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: uuidv4(),
                    ...action.payload.comment,
                    createdAt: new Date().toISOString()
                  }
                ]
              }
            : post
        )
      };
    
    case 'INCREMENT_VIEWS':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload
            ? { ...post, views: post.views + 1 }
            : post
        )
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  posts: initialPosts,
  loading: false,
  error: null,
  categories: [
    'Climate Change',
    'Ocean Conservation',
    'Conservation',
    'War & Environment',
    'Renewable Energy',
    'Sustainable Living',
    'Biodiversity',
    'Pollution',
    'Environmental Justice'
  ]
};

// Create context
const BlogContext = createContext();

// Provider component
export const BlogProvider = ({ children, themeContext }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const posts = JSON.parse(savedPosts);
        dispatch({ type: 'SET_POSTS', payload: posts });
      } catch (error) {
        console.error('Error loading posts from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage when posts change
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(state.posts));
  }, [state.posts]);

  // Actions
  const actions = {
    createPost: (postData) => {
      try {
        dispatch({ type: 'ADD_POST', payload: postData });
        toast.success('Post published successfully!');
      } catch (error) {
        toast.error('Failed to create post');
        console.error('Error creating post:', error);
      }
    },

    updatePost: (id, postData) => {
      try {
        dispatch({ type: 'UPDATE_POST', payload: { id, ...postData } });
        toast.success('Post updated successfully!');
      } catch (error) {
        toast.error('Failed to update post');
        console.error('Error updating post:', error);
      }
    },

    deletePost: (id) => {
      try {
        dispatch({ type: 'DELETE_POST', payload: id });
        toast.success('Post deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete post');
        console.error('Error deleting post:', error);
      }
    },

    likePost: (id) => {
      dispatch({ type: 'LIKE_POST', payload: id });
    },

    addComment: (postId, comment) => {
      dispatch({
        type: 'ADD_COMMENT',
        payload: { postId, comment }
      });
      toast.success('Comment added!');
    },

    incrementViews: (id) => {
      dispatch({ type: 'INCREMENT_VIEWS', payload: id });
    },

    getPostById: (id) => {
      return state.posts.find(post => post.id === id);
    },

    getPostsByCategory: (category) => {
      return state.posts.filter(post => post.category === category);
    },

    getFeaturedPosts: () => {
      return state.posts.filter(post => post.featured);
    },

    searchPosts: (query) => {
      const lowercaseQuery = query.toLowerCase();
      return state.posts.filter(post =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }
  };

  const value = {
    ...state,
    ...actions,
    theme: themeContext
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

// Hook to use blog context
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export default BlogContext;
