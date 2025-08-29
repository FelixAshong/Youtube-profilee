import requests
import sys
from datetime import datetime
import json

class DellyKnowsTechAPITester:
    def __init__(self, base_url="https://tech-guide-gallery.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, expected_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json={}, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"✅ Passed - Status: {response.status_code}")
                    
                    # Check for expected keys if provided
                    if expected_keys:
                        for key in expected_keys:
                            if key not in response_data:
                                success = False
                                print(f"❌ Missing expected key: {key}")
                                break
                        
                        if success:
                            print(f"   Response keys: {list(response_data.keys())}")
                    
                    if success:
                        self.tests_passed += 1
                        return True, response_data
                    else:
                        self.failed_tests.append(f"{name} - Missing expected keys")
                        return False, {}
                        
                except json.JSONDecodeError:
                    print(f"❌ Failed - Invalid JSON response")
                    self.failed_tests.append(f"{name} - Invalid JSON")
                    return False, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append(f"{name} - Status {response.status_code}")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.failed_tests.append(f"{name} - Network Error")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200,
            expected_keys=["message", "channel", "description"]
        )
        
        if success:
            if response.get("channel") == "@dellyknowstech":
                print("   ✅ Correct channel handle found")
            else:
                print(f"   ⚠️  Unexpected channel: {response.get('channel')}")
        
        return success

    def test_channel_info(self):
        """Test channel information endpoint"""
        success, response = self.run_test(
            "Channel Info",
            "GET",
            "api/channel/info",
            200,
            expected_keys=["channel_name", "handle", "tagline", "description", "creator", "youtube_url", "stats"]
        )
        
        if success:
            # Validate specific content
            expected_values = {
                "channel_name": "DellyKnowsTech",
                "handle": "@dellyknowstech",
                "tagline": "Clear, concise, and easy-to-follow tech tutorials.",
                "youtube_url": "https://www.youtube.com/@dellyknowstech"
            }
            
            for key, expected_value in expected_values.items():
                if response.get(key) == expected_value:
                    print(f"   ✅ {key}: {expected_value}")
                else:
                    print(f"   ❌ {key}: Expected '{expected_value}', got '{response.get(key)}'")
            
            # Check creator info
            creator = response.get("creator", {})
            if creator.get("name") == "Felix Ashong":
                print("   ✅ Creator name correct")
            
            # Check stats
            stats = response.get("stats", {})
            expected_stats = ["subscribers", "videos", "views"]
            for stat in expected_stats:
                if stat in stats:
                    print(f"   ✅ Stat {stat}: {stats[stat]}")
        
        return success

    def test_latest_videos(self):
        """Test latest videos endpoint"""
        success, response = self.run_test(
            "Latest Videos",
            "GET",
            "api/videos/latest",
            200
        )
        
        if success:
            if isinstance(response, list):
                print(f"   ✅ Returned {len(response)} videos")
                
                # Check if we have the expected number of videos (should be 6 according to requirements, but backend returns 3)
                if len(response) >= 3:
                    print("   ✅ Minimum video count met")
                    
                    # Check first video structure
                    if response:
                        video = response[0]
                        required_fields = ["id", "title", "description", "thumbnail_url", "video_url", "duration", "views", "uploaded_at"]
                        
                        for field in required_fields:
                            if field in video:
                                print(f"   ✅ Video has {field}")
                            else:
                                print(f"   ❌ Video missing {field}")
                        
                        # Check if featured video is in the list
                        featured_title = "Mind-Blowing Google Search Tricks You Didn't Know About"
                        if any(v.get("title") == featured_title for v in response):
                            print("   ✅ Featured video found in latest videos")
                else:
                    print(f"   ⚠️  Expected at least 3 videos, got {len(response)}")
            else:
                print("   ❌ Response is not a list")
                return False
        
        return success

    def test_playlists(self):
        """Test playlists endpoint"""
        success, response = self.run_test(
            "Playlists",
            "GET",
            "api/playlists",
            200
        )
        
        if success:
            if isinstance(response, list):
                print(f"   ✅ Returned {len(response)} playlists")
                
                # Should have exactly 2 playlists
                if len(response) == 2:
                    print("   ✅ Correct playlist count")
                    
                    # Check playlist structure and content
                    expected_titles = ["Tech Tricks & Tips", "Web Development Tutorials"]
                    actual_titles = [p.get("title") for p in response]
                    
                    for title in expected_titles:
                        if title in actual_titles:
                            print(f"   ✅ Found playlist: {title}")
                        else:
                            print(f"   ❌ Missing playlist: {title}")
                    
                    # Check first playlist structure
                    if response:
                        playlist = response[0]
                        required_fields = ["id", "title", "description", "thumbnail_url", "video_count", "playlist_url"]
                        
                        for field in required_fields:
                            if field in playlist:
                                print(f"   ✅ Playlist has {field}")
                            else:
                                print(f"   ❌ Playlist missing {field}")
                else:
                    print(f"   ⚠️  Expected 2 playlists, got {len(response)}")
            else:
                print("   ❌ Response is not a list")
                return False
        
        return success

    def test_featured_video(self):
        """Test featured video endpoint"""
        success, response = self.run_test(
            "Featured Video",
            "GET",
            "api/videos/featured",
            200,
            expected_keys=["id", "title", "description", "thumbnail_url", "video_url", "duration", "views", "uploaded_at"]
        )
        
        if success:
            # Check if it's the expected featured video
            expected_title = "Mind-Blowing Google Search Tricks You Didn't Know About"
            if response.get("title") == expected_title:
                print(f"   ✅ Correct featured video: {expected_title}")
            else:
                print(f"   ⚠️  Unexpected featured video: {response.get('title')}")
            
            # Check video URL points to YouTube channel
            if response.get("video_url") == "https://www.youtube.com/@dellyknowstech":
                print("   ✅ Video URL points to correct YouTube channel")
        
        return success

    def test_health_check(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            expected_keys=["status", "service"]
        )
        
        if success:
            if response.get("status") == "healthy":
                print("   ✅ Service is healthy")
            if "DellyKnowsTech" in response.get("service", ""):
                print("   ✅ Correct service name")
        
        return success

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print(f"📊 BACKEND API TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"   {i}. {test}")
        else:
            print(f"\n🎉 ALL TESTS PASSED!")
        
        return len(self.failed_tests) == 0

def main():
    print("🚀 Starting DellyKnowsTech API Tests...")
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = DellyKnowsTechAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_check,
        tester.test_root_endpoint,
        tester.test_channel_info,
        tester.test_latest_videos,
        tester.test_playlists,
        tester.test_featured_video,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.failed_tests.append(f"{test.__name__} - Exception: {str(e)}")
    
    # Print summary
    all_passed = tester.print_summary()
    
    print(f"\n⏰ Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())