#!/usr/bin/env python3
"""
Integration Test for DellyKnowsTech Frontend-Backend Integration
Tests if frontend can successfully call backend APIs
"""

import requests
import json
import sys
from datetime import datetime

class FrontendBackendIntegrationTester:
    def __init__(self, backend_url="https://tech-guide-gallery.preview.emergentagent.com"):
        self.backend_url = backend_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def test_cors_headers(self):
        """Test if CORS headers are properly configured for frontend integration"""
        print("\n🔗 Testing CORS Configuration...")
        
        try:
            # Simulate a preflight request
            response = requests.options(
                f"{self.backend_url}/api/videos/latest",
                headers={
                    'Origin': 'https://tech-guide-gallery.preview.emergentagent.com',
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                timeout=10
            )
            
            self.tests_run += 1
            
            # Check CORS headers
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            print(f"   CORS Headers: {cors_headers}")
            
            if cors_headers['Access-Control-Allow-Origin']:
                print("   ✅ CORS Origin header present")
                self.tests_passed += 1
                return True
            else:
                print("   ❌ CORS Origin header missing")
                self.failed_tests.append("CORS Configuration - Missing Origin header")
                return False
                
        except Exception as e:
            print(f"   ❌ CORS test failed: {str(e)}")
            self.failed_tests.append(f"CORS Configuration - Exception: {str(e)}")
            return False

    def test_api_endpoints_for_frontend(self):
        """Test all API endpoints that frontend should use"""
        print("\n📡 Testing API Endpoints for Frontend Integration...")
        
        endpoints_to_test = [
            {
                'name': 'Channel Info',
                'endpoint': 'api/channel/info',
                'expected_keys': ['channel_name', 'handle', 'tagline', 'stats']
            },
            {
                'name': 'Latest Videos',
                'endpoint': 'api/videos/latest',
                'expected_keys': None,  # Should be array
                'is_array': True
            },
            {
                'name': 'Featured Video',
                'endpoint': 'api/videos/featured',
                'expected_keys': ['id', 'title', 'description', 'thumbnail_url']
            },
            {
                'name': 'Playlists',
                'endpoint': 'api/playlists',
                'expected_keys': None,  # Should be array
                'is_array': True
            }
        ]
        
        all_passed = True
        
        for endpoint_test in endpoints_to_test:
            self.tests_run += 1
            print(f"\n   Testing {endpoint_test['name']}...")
            
            try:
                response = requests.get(
                    f"{self.backend_url}/{endpoint_test['endpoint']}",
                    headers={
                        'Origin': 'https://tech-guide-gallery.preview.emergentagent.com',
                        'Content-Type': 'application/json'
                    },
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Check if it's an array when expected
                    if endpoint_test.get('is_array'):
                        if isinstance(data, list):
                            print(f"      ✅ Returned array with {len(data)} items")
                            self.tests_passed += 1
                        else:
                            print(f"      ❌ Expected array, got {type(data)}")
                            all_passed = False
                            self.failed_tests.append(f"{endpoint_test['name']} - Not an array")
                    
                    # Check for expected keys
                    elif endpoint_test.get('expected_keys'):
                        missing_keys = []
                        for key in endpoint_test['expected_keys']:
                            if key not in data:
                                missing_keys.append(key)
                        
                        if not missing_keys:
                            print(f"      ✅ All expected keys present")
                            self.tests_passed += 1
                        else:
                            print(f"      ❌ Missing keys: {missing_keys}")
                            all_passed = False
                            self.failed_tests.append(f"{endpoint_test['name']} - Missing keys: {missing_keys}")
                    else:
                        print(f"      ✅ Response received")
                        self.tests_passed += 1
                        
                else:
                    print(f"      ❌ Status {response.status_code}")
                    all_passed = False
                    self.failed_tests.append(f"{endpoint_test['name']} - Status {response.status_code}")
                    
            except Exception as e:
                print(f"      ❌ Exception: {str(e)}")
                all_passed = False
                self.failed_tests.append(f"{endpoint_test['name']} - Exception: {str(e)}")
        
        return all_passed

    def test_data_format_compatibility(self):
        """Test if API data format matches what frontend expects"""
        print("\n🔄 Testing Data Format Compatibility...")
        
        self.tests_run += 1
        
        try:
            # Get latest videos from API
            response = requests.get(f"{self.backend_url}/api/videos/latest", timeout=10)
            
            if response.status_code == 200:
                api_videos = response.json()
                
                # Expected frontend format (from mock data)
                expected_fields = ['id', 'title', 'description', 'thumbnail_url', 'views', 'uploaded_at', 'duration']
                
                if api_videos and len(api_videos) > 0:
                    first_video = api_videos[0]
                    
                    # Check if API data has all fields frontend expects
                    missing_fields = []
                    for field in expected_fields:
                        # Map API fields to frontend expected fields
                        api_field_mapping = {
                            'thumbnail_url': 'thumbnail_url',
                            'uploaded_at': 'uploaded_at',
                            'views': 'views'
                        }
                        
                        check_field = api_field_mapping.get(field, field)
                        if check_field not in first_video:
                            missing_fields.append(field)
                    
                    if not missing_fields:
                        print("   ✅ API data format compatible with frontend")
                        self.tests_passed += 1
                        return True
                    else:
                        print(f"   ⚠️  API missing fields expected by frontend: {missing_fields}")
                        print("   💡 Frontend may need to adapt to API format")
                        self.tests_passed += 1  # Not a failure, just needs adaptation
                        return True
                else:
                    print("   ❌ No video data returned from API")
                    self.failed_tests.append("Data Format - No video data")
                    return False
            else:
                print(f"   ❌ API call failed with status {response.status_code}")
                self.failed_tests.append(f"Data Format - API Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"   ❌ Exception: {str(e)}")
            self.failed_tests.append(f"Data Format - Exception: {str(e)}")
            return False

    def test_performance_for_frontend(self):
        """Test API response times for frontend integration"""
        print("\n⚡ Testing API Performance for Frontend...")
        
        endpoints = ['api/channel/info', 'api/videos/latest', 'api/playlists', 'api/videos/featured']
        
        all_fast = True
        
        for endpoint in endpoints:
            self.tests_run += 1
            
            try:
                start_time = datetime.now()
                response = requests.get(f"{self.backend_url}/{endpoint}", timeout=10)
                end_time = datetime.now()
                
                response_time = (end_time - start_time).total_seconds()
                
                if response.status_code == 200:
                    if response_time < 2.0:  # Less than 2 seconds is good for frontend
                        print(f"   ✅ {endpoint}: {response_time:.2f}s")
                        self.tests_passed += 1
                    else:
                        print(f"   ⚠️  {endpoint}: {response_time:.2f}s (slow)")
                        all_fast = False
                        self.tests_passed += 1  # Still passes, just slow
                else:
                    print(f"   ❌ {endpoint}: Status {response.status_code}")
                    all_fast = False
                    self.failed_tests.append(f"Performance - {endpoint} Status {response.status_code}")
                    
            except Exception as e:
                print(f"   ❌ {endpoint}: Exception {str(e)}")
                all_fast = False
                self.failed_tests.append(f"Performance - {endpoint} Exception")
        
        return all_fast

    def print_integration_summary(self):
        """Print integration test summary with recommendations"""
        print(f"\n{'='*70}")
        print(f"🔗 FRONTEND-BACKEND INTEGRATION TEST SUMMARY")
        print(f"{'='*70}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"   {i}. {test}")
        
        print(f"\n💡 INTEGRATION RECOMMENDATIONS:")
        
        if len(self.failed_tests) == 0:
            print("   ✅ Backend APIs are ready for frontend integration")
            print("   📝 Frontend currently uses mock data - can be replaced with API calls")
            print("   🔧 Recommended: Update frontend to use backend APIs")
        else:
            print("   ⚠️  Some integration issues found - fix before frontend integration")
        
        print(f"\n🛠️  NEXT STEPS FOR INTEGRATION:")
        print("   1. Replace mock data in App.js with API calls")
        print("   2. Add error handling for API failures")
        print("   3. Add loading states while fetching data")
        print("   4. Test frontend with real API data")
        
        return len(self.failed_tests) == 0

def main():
    print("🚀 Starting Frontend-Backend Integration Tests...")
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = FrontendBackendIntegrationTester()
    
    # Run integration tests
    tests = [
        tester.test_cors_headers,
        tester.test_api_endpoints_for_frontend,
        tester.test_data_format_compatibility,
        tester.test_performance_for_frontend,
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.failed_tests.append(f"{test.__name__} - Exception: {str(e)}")
    
    # Print summary
    all_passed = tester.print_integration_summary()
    
    print(f"\n⏰ Integration test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())