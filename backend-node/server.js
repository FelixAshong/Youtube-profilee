const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(cors({
	origin: (process.env.CORS_ORIGINS || '*').split(','),
	credentials: true,
}));

const api = express.Router();

api.get('/', (req, res) => {
	res.json({
		message: 'DellyKnowsTech Showcase API',
		channel: '@dellyknowstech',
		description: 'API for DellyKnowsTech YouTube Channel Showcase',
	});
});

api.get('/channel/info', (req, res) => {
	res.json({
		channel_name: 'DellyKnowsTech',
		handle: '@dellyknowstech',
		tagline: 'Clear, concise, and easy-to-follow tech tutorials.',
		description: 'DellyKnowsTech is your go-to YouTube channel for tech tips, tricks, and tutorials that make technology simple and practical.',
		creator: {
			name: 'Felix Ashong',
			bio: 'Felix Ashong, also known as DellyKnowsTech, creates practical tutorials that simplify technology for everyone. From apps to web tools, the goal is to empower users through knowledge.',
		},
		youtube_url: 'https://www.youtube.com/@dellyknowstech',
		stats: {
			subscribers: '50K+',
			videos: '200+',
			views: '2M+',
		},
	});
});

api.get('/videos/latest', (req, res) => {
	const mockVideos = [
		{
			id: '1',
			title: "Mind-Blowing Google Search Tricks You Didn't Know About",
			description: 'Discover hidden Google search features that will revolutionize your productivity.',
			thumbnail_url: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf',
			video_url: 'https://www.youtube.com/@dellyknowstech',
			duration: '12:34',
			views: '45.2K',
			uploaded_at: '2 days ago',
		},
		{
			id: '2',
			title: '10 Essential Chrome Extensions for Developers',
			description: 'Must-have Chrome extensions to boost your development workflow.',
			thumbnail_url: 'https://images.unsplash.com/photo-1612914033131-2fbd331a3806',
			video_url: 'https://www.youtube.com/@dellyknowstech',
			duration: '15:22',
			views: '38.1K',
			uploaded_at: '1 week ago',
		},
		{
			id: '3',
			title: 'Free AI Tools That Will Blow Your Mind',
			description: 'Explore the latest free AI tools for productivity and creativity.',
			thumbnail_url: 'https://images.unsplash.com/photo-1676380364777-d53c900178fa',
			video_url: 'https://www.youtube.com/@dellyknowstech',
			duration: '18:45',
			views: '62.8K',
			uploaded_at: '2 weeks ago',
		},
	];
	res.json(mockVideos);
});

api.get('/playlists', (req, res) => {
	const mockPlaylists = [
		{
			id: '1',
			title: 'Tech Tricks & Tips',
			description: 'Discover amazing tech tricks that will make your digital life easier.',
			thumbnail_url: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf',
			video_count: 24,
			playlist_url: 'https://www.youtube.com/@dellyknowstech',
		},
		{
			id: '2',
			title: 'Web Development Tutorials',
			description: 'Learn web development from scratch with these comprehensive tutorials.',
			thumbnail_url: 'https://images.unsplash.com/photo-1612914033131-2fbd331a3806',
			video_count: 18,
			playlist_url: 'https://www.youtube.com/@dellyknowstech',
		},
	];
	res.json(mockPlaylists);
});

api.get('/videos/featured', (req, res) => {
	res.json({
		id: 'featured-1',
		title: "Mind-Blowing Google Search Tricks You Didn't Know About",
		description: 'Discover hidden Google search features and advanced operators that will revolutionize your productivity. Learn how to find exactly what you\'re looking for with these powerful search techniques that most people do not know about.',
		thumbnail_url: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf',
		video_url: 'https://www.youtube.com/@dellyknowstech',
		duration: '12:34',
		views: '45.2K',
		uploaded_at: '2 days ago',
	});
});

api.get('/health', (req, res) => {
	res.json({ status: 'healthy', service: 'DellyKnowsTech Showcase API' });
});

app.use('/api', api);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`DellyKnowsTech Showcase API (Node) listening on port ${PORT}`);
});
