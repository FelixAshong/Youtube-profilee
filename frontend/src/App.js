import React from 'react';
import './App.css';
import { Play, Youtube, ExternalLink, Clock, Eye, Users } from 'lucide-react';

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
    // In real implementation, this would open the specific video
    window.open('https://www.youtube.com/@dellyknowstech', '_blank');
  };

  const handlePlaylistClick = (playlistId) => {
    // In real implementation, this would open the specific playlist
    window.open('https://www.youtube.com/@dellyknowstech', '_blank');
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Youtube className="brand-icon" size={28} />
            <span className="brand-text">DellyKnowsTech</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#videos" className="nav-link">Latest Videos</a>
            <a href="#playlists" className="nav-link">Playlists</a>
            <a href="#about" className="nav-link">About</a>
            <button onClick={handleSubscribe} className="subscribe-btn">
              <Youtube size={18} />
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf" 
            alt="Tech Background"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">DellyKnowsTech</h1>
            <p className="hero-tagline">Clear, concise, and easy-to-follow tech tutorials.</p>
            <button onClick={handleSubscribe} className="cta-button">
              <Youtube size={20} />
              Subscribe on YouTube
            </button>
          </div>
        </div>
      </section>

      {/* Channel Intro */}
      <section className="channel-intro">
        <div className="container">
          <div className="intro-content">
            <h2 className="section-title">Welcome to DellyKnowsTech</h2>
            <p className="intro-text">
              DellyKnowsTech is your go-to YouTube channel for tech tips, tricks, and tutorials 
              that make technology simple and practical. Join thousands of learners discovering 
              the latest tools, techniques, and insights in the world of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="featured-video">
        <div className="container">
          <h2 className="section-title">Featured Video</h2>
          <div className="featured-container">
            <div className="video-embed">
              <div className="video-placeholder">
                <div className="video-thumbnail" onClick={() => handleVideoClick('featured')}>
                  <img 
                    src="https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf" 
                    alt="Featured Video Thumbnail"
                  />
                  <div className="play-overlay">
                    <Play size={64} className="play-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Mind-Blowing Google Search Tricks You Didn't Know About</h3>
              <p className="video-description">
                Discover hidden Google search features and advanced operators that will revolutionize 
                your productivity. Learn how to find exactly what you're looking for with these 
                powerful search techniques that most people don't know about.
              </p>
              <div className="video-stats">
                <span className="stat">
                  <Eye size={16} />
                  45.2K views
                </span>
                <span className="stat">
                  <Clock size={16} />
                  12:34
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Uploads */}
      <section id="videos" className="latest-uploads">
        <div className="container">
          <h2 className="section-title">Latest Uploads</h2>
          <div className="videos-grid">
            {mockLatestUploads.map(video => (
              <div key={video.id} className="video-card" onClick={() => handleVideoClick(video.id)}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-duration">{video.duration}</div>
                  <div className="video-overlay">
                    <Play size={24} className="play-icon-small" />
                  </div>
                </div>
                <div className="video-details">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <span className="views">{video.views} views</span>
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
          <h2 className="section-title">Featured Playlists</h2>
          <div className="playlists-grid">
            {mockPlaylists.map(playlist => (
              <div key={playlist.id} className="playlist-card" onClick={() => handlePlaylistClick(playlist.id)}>
                <div className="playlist-thumbnail">
                  <img src={playlist.thumbnail} alt={playlist.title} />
                  <div className="playlist-overlay">
                    <div className="playlist-count">{playlist.videoCount} videos</div>
                    <Play size={32} className="playlist-play-icon" />
                  </div>
                </div>
                <div className="playlist-info">
                  <h3 className="playlist-title">{playlist.title}</h3>
                  <p className="playlist-description">{playlist.description}</p>
                  <button className="playlist-btn">
                    <ExternalLink size={16} />
                    View Playlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Creator */}
      <section id="about" className="about-creator">
        <div className="container">
          <div className="about-content">
            <div className="creator-image">
              <img 
                src="https://images.unsplash.com/photo-1676380364777-d53c900178fa" 
                alt="Felix Ashong - DellyKnowsTech"
                className="creator-avatar"
              />
            </div>
            <div className="creator-info">
              <h2 className="section-title">About the Creator</h2>
              <h3 className="creator-name">Felix Ashong</h3>
              <p className="creator-bio">
                Felix Ashong, also known as DellyKnowsTech, creates practical tutorials that 
                simplify technology for everyone. From apps to web tools, the goal is to empower 
                users through knowledge. With years of experience in technology and education, 
                Felix breaks down complex concepts into easy-to-understand tutorials that anyone can follow.
              </p>
              <div className="creator-stats">
                <div className="stat-item">
                  <Users size={20} />
                  <span>50K+ Subscribers</span>
                </div>
                <div className="stat-item">
                  <Play size={20} />
                  <span>200+ Videos</span>
                </div>
                <div className="stat-item">
                  <Eye size={20} />
                  <span>2M+ Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="subscribe-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Thousands of Learners</h2>
            <p className="cta-text">
              Stay updated with the latest tech tutorials, tips, and tricks. 
              Subscribe to DellyKnowsTech and never miss out on valuable content.
            </p>
            <button onClick={handleSubscribe} className="cta-button-large">
              <Youtube size={24} />
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Youtube className="footer-logo" size={32} />
              <span className="footer-brand-text">DellyKnowsTech</span>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Navigation</h4>
                <a href="#home">Home</a>
                <a href="#videos">Latest Videos</a>
                <a href="#playlists">Playlists</a>
                <a href="#about">About</a>
              </div>
              <div className="link-group">
                <h4>Social Media</h4>
                <a href="https://www.youtube.com/@dellyknowstech" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Twitter/X</a>
              </div>
              <div className="link-group">
                <h4>Contact</h4>
                <a href="mailto:contact@dellyknowstech.com">Email</a>
                <a href="#about">About Creator</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 DellyKnowsTech. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;