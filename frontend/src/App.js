import React from 'react';
import './App.css';

// Custom SVG Icons
const CustomYouTubeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const CustomPlayIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const CustomEyeIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CustomClockIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const CustomUsersIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CustomExternalLinkIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Mock data for latest uploads
const mockLatestUploads = [
  {
    id: '1',
    title: 'Mind-Blowing Google Search Tricks You Didn\'t Know About',
    thumbnail: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf',
    description: 'Discover hidden Google search features that will revolutionize your productivity.',
    views: '45.2K',
    uploadedAt: '2 days ago',
    duration: '12:34'
  },
  {
    id: '2',
    title: '10 Essential Chrome Extensions for Developers',
    thumbnail: 'https://images.unsplash.com/photo-1612914033131-2fbd331a3806',
    description: 'Must-have Chrome extensions to boost your development workflow.',
    views: '38.1K',
    uploadedAt: '1 week ago',
    duration: '15:22'
  },
  {
    id: '3',
    title: 'Free AI Tools That Will Blow Your Mind',
    thumbnail: 'https://images.unsplash.com/photo-1676380364777-d53c900178fa',
    description: 'Explore the latest free AI tools for productivity and creativity.',
    views: '62.8K',
    uploadedAt: '2 weeks ago',
    duration: '18:45'
  },
  {
    id: '4',
    title: 'How to Build a Website in 30 Minutes',
    thumbnail: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf',
    description: 'Step-by-step tutorial for creating a professional website quickly.',
    views: '29.7K',
    uploadedAt: '3 weeks ago',
    duration: '31:12'
  },
  {
    id: '5',
    title: 'Top 5 Coding Apps for Your Phone',
    thumbnail: 'https://images.unsplash.com/photo-1612914033131-2fbd331a3806',
    description: 'Learn to code on the go with these mobile applications.',
    views: '41.5K',
    uploadedAt: '1 month ago',
    duration: '9:56'
  },
  {
    id: '6',
    title: 'Windows 11 Hidden Features & Tips',
    thumbnail: 'https://images.unsplash.com/photo-1676380364777-d53c900178fa',
    description: 'Unlock the full potential of Windows 11 with these hidden features.',
    views: '55.3K',
    uploadedAt: '1 month ago',
    duration: '22:18'
  }
];

// Mock data for playlists
const mockPlaylists = [
  {
    id: '1',
    title: 'Tech Tricks & Tips',
    thumbnail: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf',
    videoCount: 24,
    description: 'Discover amazing tech tricks that will make your digital life easier.'
  },
  {
    id: '2',
    title: 'Web Development Tutorials',
    thumbnail: 'https://images.unsplash.com/photo-1612914033131-2fbd331a3806',
    videoCount: 18,
    description: 'Learn web development from scratch with these comprehensive tutorials.'
  }
];

function App() {
  const handleSubscribe = () => {
    window.open('https://www.youtube.com/@dellyknowstech', '_blank');
  };

  const handleVideoClick = (videoId) => {
    window.open('https://www.youtube.com/@dellyknowstech', '_blank');
  };

  const handlePlaylistClick = (playlistId) => {
    window.open('https://www.youtube.com/@dellyknowstech', '_blank');
  };

  return (
    <div className="App">
      {/* Background Elements */}
      <div className="background-wrapper">
        <div className="background-gradient"></div>
        <div className="background-pattern"></div>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon-wrapper">
              <CustomYouTubeIcon size={32} className="brand-icon" />
            </div>
            <span className="brand-text">DellyKnowsTech</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#videos" className="nav-link">Latest Videos</a>
            <a href="#playlists" className="nav-link">Playlists</a>
            <a href="#about" className="nav-link">About</a>
            <button onClick={handleSubscribe} className="nav-subscribe-btn">
              <CustomYouTubeIcon size={18} />
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-video-background">
          <div className="video-overlay"></div>
          <div className="animated-background">
            <div className="tech-grid"></div>
            <div className="code-rain">
              <div className="code-line"></div>
              <div className="code-line"></div>
              <div className="code-line"></div>
              <div className="code-line"></div>
              <div className="code-line"></div>
            </div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🎯 Tech Education</span>
          </div>
          <h1 className="hero-title">
            <span className="title-main">DellyKnowsTech</span>
            <span className="title-subtitle">Tech Made Simple</span>
          </h1>
          <p className="hero-description">
            Clear, concise, and easy-to-follow tech tutorials that empower you to master technology
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <CustomUsersIcon size={20} />
              <span>50K+ Subscribers</span>
            </div>
            <div className="stat-item">
              <CustomPlayIcon size={20} />
              <span>200+ Videos</span>
            </div>
            <div className="stat-item">
              <CustomEyeIcon size={20} />
              <span>2M+ Views</span>
            </div>
          </div>
          <div className="hero-cta">
            <button onClick={handleSubscribe} className="cta-primary">
              <CustomYouTubeIcon size={24} />
              <span>Subscribe Now</span>
              <div className="button-shine"></div>
            </button>
            <button onClick={() => handleVideoClick('featured')} className="cta-secondary">
              <CustomPlayIcon size={20} />
              <span>Watch Latest</span>
            </button>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Channel Intro */}
      <section className="channel-intro">
        <div className="container">
          <div className="intro-card">
            <div className="card-glow"></div>
            <div className="intro-content">
              <div className="section-badge">About DellyKnowsTech</div>
              <h2 className="section-title">Where Technology Meets Simplicity</h2>
              <p className="intro-text">
                DellyKnowsTech is your go-to YouTube channel for tech tips, tricks, and tutorials 
                that make technology simple and practical. Join thousands of learners discovering 
                the latest tools, techniques, and insights in the ever-evolving world of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="featured-video">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Featured Content</div>
            <h2 className="section-title">Latest Tutorial</h2>
          </div>
          
          <div className="featured-container">
            <div className="video-player-wrapper">
              <div className="video-player" onClick={() => handleVideoClick('featured')}>
                <img 
                  src="https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf" 
                  alt="Featured Video Thumbnail"
                />
                <div className="play-button-overlay">
                  <div className="play-button">
                    <CustomPlayIcon size={32} />
                  </div>
                  <div className="play-ripple"></div>
                </div>
                <div className="video-duration">12:34</div>
              </div>
            </div>
            
            <div className="video-info-card">
              <div className="card-glow"></div>
              <h3 className="video-title">Mind-Blowing Google Search Tricks You Didn't Know About</h3>
              <p className="video-description">
                Discover hidden Google search features and advanced operators that will revolutionize 
                your productivity. Learn how to find exactly what you're looking for with these 
                powerful search techniques that most people don't know about.
              </p>
              <div className="video-stats">
                <div className="stat">
                  <CustomEyeIcon size={16} />
                  <span>45.2K views</span>
                </div>
                <div className="stat">
                  <CustomClockIcon size={16} />
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Uploads */}
      <section id="videos" className="latest-uploads">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Fresh Content</div>
            <h2 className="section-title">Latest Uploads</h2>
            <p className="section-description">Stay up-to-date with our newest tutorials and tech insights</p>
          </div>
          
          <div className="videos-grid">
            {mockLatestUploads.map((video, index) => (
              <div 
                key={video.id} 
                className={`video-card ${index % 2 === 0 ? 'card-even' : 'card-odd'}`}
                onClick={() => handleVideoClick(video.id)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="card-glow"></div>
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <div className="play-button-small">
                      <CustomPlayIcon size={20} />
                    </div>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="video-content">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <span className="views">
                      <CustomEyeIcon size={14} />
                      {video.views} views
                    </span>
                    <span className="upload-date">{video.uploadedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Playlists Section */}
      <section id="playlists" className="playlists">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Organized Learning</div>
            <h2 className="section-title">Featured Playlists</h2>
            <p className="section-description">Curated collections of tutorials for structured learning</p>
          </div>
          
          <div className="playlists-grid">
            {mockPlaylists.map((playlist, index) => (
              <div 
                key={playlist.id} 
                className="playlist-card"
                onClick={() => handlePlaylistClick(playlist.id)}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="card-glow"></div>
                <div className="playlist-thumbnail">
                  <img src={playlist.thumbnail} alt={playlist.title} />
                  <div className="playlist-overlay">
                    <div className="playlist-info">
                      <div className="video-count">
                        <CustomPlayIcon size={16} />
                        <span>{playlist.videoCount} videos</span>
                      </div>
                      <div className="play-button">
                        <CustomPlayIcon size={24} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="playlist-content">
                  <h3 className="playlist-title">{playlist.title}</h3>
                  <p className="playlist-description">{playlist.description}</p>
                  <button className="playlist-cta">
                    <span>Explore Playlist</span>
                    <CustomExternalLinkIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Creator */}
      <section id="about" className="about-creator">
        <div className="container">
          <div className="about-card">
            <div className="card-glow"></div>
            <div className="about-content">
              <div className="creator-section">
                <div className="creator-image-wrapper">
                  <div className="creator-image">
                    <img 
                      src="https://images.unsplash.com/photo-1676380364777-d53c900178fa" 
                      alt="Felix Ashong - DellyKnowsTech"
                    />
                    <div className="creator-badge">
                      <CustomYouTubeIcon size={16} />
                    </div>
                  </div>
                </div>
                <div className="creator-info">
                  <div className="section-badge">Meet the Creator</div>
                  <h2 className="creator-name">Felix Ashong</h2>
                  <p className="creator-title">Tech Educator & Content Creator</p>
                  <p className="creator-bio">
                    Felix Ashong, also known as DellyKnowsTech, creates practical tutorials that 
                    simplify technology for everyone. From apps to web tools, the goal is to empower 
                    users through knowledge. With years of experience in technology and education, 
                    Felix breaks down complex concepts into easy-to-understand tutorials.
                  </p>
                  <div className="creator-achievements">
                    <div className="achievement">
                      <CustomUsersIcon size={24} />
                      <div>
                        <span className="number">50K+</span>
                        <span className="label">Subscribers</span>
                      </div>
                    </div>
                    <div className="achievement">
                      <CustomPlayIcon size={24} />
                      <div>
                        <span className="number">200+</span>
                        <span className="label">Videos</span>
                      </div>
                    </div>
                    <div className="achievement">
                      <CustomEyeIcon size={24} />
                      <div>
                        <span className="number">2M+</span>
                        <span className="label">Views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="subscribe-cta">
        <div className="container">
          <div className="cta-card">
            <div className="card-glow"></div>
            <div className="cta-content">
              <div className="cta-icon">
                <CustomYouTubeIcon size={48} />
              </div>
              <h2 className="cta-title">Ready to Level Up Your Tech Skills?</h2>
              <p className="cta-text">
                Join thousands of learners and stay updated with the latest tech tutorials, 
                tips, and industry insights delivered straight to your feed.
              </p>
              <button onClick={handleSubscribe} className="cta-button-large">
                <CustomYouTubeIcon size={24} />
                <span>Subscribe to DellyKnowsTech</span>
                <div className="button-shine"></div>
              </button>
              <div className="social-proof">
                <span>Trusted by 50,000+ tech enthusiasts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-section">
                <div className="brand-icon-wrapper">
                  <CustomYouTubeIcon size={40} className="footer-brand-icon" />
                </div>
                <div>
                  <h3 className="footer-brand-text">DellyKnowsTech</h3>
                  <p className="footer-tagline">Tech Made Simple</p>
                </div>
              </div>
              <p className="footer-description">
                Empowering learners through practical technology education and tutorials.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Navigation</h4>
                <a href="#home">Home</a>
                <a href="#videos">Latest Videos</a>
                <a href="#playlists">Playlists</a>
                <a href="#about">About Creator</a>
              </div>
              <div className="link-group">
                <h4>Connect</h4>
                <a href="https://www.youtube.com/@dellyknowstech" target="_blank" rel="noopener noreferrer">YouTube Channel</a>
                <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <a href="mailto:contact@dellyknowstech.com">Contact</a>
                <a href="#about">About</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 DellyKnowsTech. All rights reserved. Made with ❤️ for tech learners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;