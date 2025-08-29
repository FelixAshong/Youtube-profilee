from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="DellyKnowsTech Showcase API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models for YouTube Channel Showcase
class VideoItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    thumbnail_url: str
    video_url: str
    duration: str
    views: str
    uploaded_at: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class VideoItemCreate(BaseModel):
    title: str
    description: str
    thumbnail_url: str
    video_url: str
    duration: str
    views: str
    uploaded_at: str

class PlaylistItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    thumbnail_url: str
    video_count: int
    playlist_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PlaylistItemCreate(BaseModel):
    title: str
    description: str
    thumbnail_url: str
    video_count: int
    playlist_url: str

class ChannelStats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subscriber_count: str
    video_count: int
    total_views: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Original status check models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


# YouTube Channel Showcase Routes
@api_router.get("/")
async def root():
    return {
        "message": "DellyKnowsTech Showcase API", 
        "channel": "@dellyknowstech",
        "description": "API for DellyKnowsTech YouTube Channel Showcase"
    }

@api_router.get("/channel/info")
async def get_channel_info():
    """Get basic channel information"""
    return {
        "channel_name": "DellyKnowsTech",
        "handle": "@dellyknowstech",
        "tagline": "Clear, concise, and easy-to-follow tech tutorials.",
        "description": "DellyKnowsTech is your go-to YouTube channel for tech tips, tricks, and tutorials that make technology simple and practical.",
        "creator": {
            "name": "Felix Ashong",
            "bio": "Felix Ashong, also known as DellyKnowsTech, creates practical tutorials that simplify technology for everyone. From apps to web tools, the goal is to empower users through knowledge."
        },
        "youtube_url": "https://www.youtube.com/@dellyknowstech",
        "stats": {
            "subscribers": "50K+",
            "videos": "200+",
            "views": "2M+"
        }
    }

@api_router.get("/videos/latest", response_model=List[VideoItem])
async def get_latest_videos():
    """Get latest uploaded videos (currently returns mock data)"""
    # This would connect to YouTube API in real implementation
    mock_videos = [
        {
            "id": "1",
            "title": "Mind-Blowing Google Search Tricks You Didn't Know About",
            "description": "Discover hidden Google search features that will revolutionize your productivity.",
            "thumbnail_url": "https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf",
            "video_url": "https://www.youtube.com/@dellyknowstech",
            "duration": "12:34",
            "views": "45.2K",
            "uploaded_at": "2 days ago"
        },
        {
            "id": "2",
            "title": "10 Essential Chrome Extensions for Developers",
            "description": "Must-have Chrome extensions to boost your development workflow.",
            "thumbnail_url": "https://images.unsplash.com/photo-1612914033131-2fbd331a3806",
            "video_url": "https://www.youtube.com/@dellyknowstech",
            "duration": "15:22",
            "views": "38.1K",
            "uploaded_at": "1 week ago"
        },
        {
            "id": "3",
            "title": "Free AI Tools That Will Blow Your Mind",
            "description": "Explore the latest free AI tools for productivity and creativity.",
            "thumbnail_url": "https://images.unsplash.com/photo-1676380364777-d53c900178fa",
            "video_url": "https://www.youtube.com/@dellyknowstech",
            "duration": "18:45",
            "views": "62.8K",
            "uploaded_at": "2 weeks ago"
        }
    ]
    
    return [VideoItem(**video) for video in mock_videos]

@api_router.get("/playlists", response_model=List[PlaylistItem])
async def get_playlists():
    """Get channel playlists (currently returns mock data)"""
    # This would connect to YouTube API in real implementation
    mock_playlists = [
        {
            "id": "1",
            "title": "Tech Tricks & Tips",
            "description": "Discover amazing tech tricks that will make your digital life easier.",
            "thumbnail_url": "https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf",
            "video_count": 24,
            "playlist_url": "https://www.youtube.com/@dellyknowstech"
        },
        {
            "id": "2",
            "title": "Web Development Tutorials",
            "description": "Learn web development from scratch with these comprehensive tutorials.",
            "thumbnail_url": "https://images.unsplash.com/photo-1612914033131-2fbd331a3806",
            "video_count": 18,
            "playlist_url": "https://www.youtube.com/@dellyknowstech"
        }
    ]
    
    return [PlaylistItem(**playlist) for playlist in mock_playlists]

@api_router.get("/videos/featured")
async def get_featured_video():
    """Get the current featured video"""
    return {
        "id": "featured-1",
        "title": "Mind-Blowing Google Search Tricks You Didn't Know About",
        "description": "Discover hidden Google search features and advanced operators that will revolutionize your productivity. Learn how to find exactly what you're looking for with these powerful search techniques that most people don't know about.",
        "thumbnail_url": "https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf",
        "video_url": "https://www.youtube.com/@dellyknowstech",
        "duration": "12:34",
        "views": "45.2K",
        "uploaded_at": "2 days ago"
    }

# Database operations for future use
@api_router.post("/videos", response_model=VideoItem)
async def create_video(video: VideoItemCreate):
    """Create a new video entry"""
    video_dict = video.dict()
    video_obj = VideoItem(**video_dict)
    await db.videos.insert_one(video_obj.dict())
    return video_obj

@api_router.post("/playlists", response_model=PlaylistItem)
async def create_playlist(playlist: PlaylistItemCreate):
    """Create a new playlist entry"""
    playlist_dict = playlist.dict()
    playlist_obj = PlaylistItem(**playlist_dict)
    await db.playlists.insert_one(playlist_obj.dict())
    return playlist_obj

# Original status check routes (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "DellyKnowsTech Showcase API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Log startup
@app.on_event("startup")
async def startup_event():
    logger.info("DellyKnowsTech Showcase API started successfully")
    logger.info("YouTube Channel: @dellyknowstech")
    logger.info("API Documentation available at: /docs")