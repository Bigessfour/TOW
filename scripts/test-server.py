#!/usr/bin/env python3
"""
Local server testing script for Town of Wiley website
This script helps debug server issues that might occur in GitHub Actions
"""

import http.server
import socketserver
import sys
import os
import threading
import time
import urllib.request
import urllib.error

def test_server():
    """Test if the server is responding correctly"""
    port = 8080
    base_url = f"http://localhost:{port}"
    
    print(f"🔍 Testing server at {base_url}")
    
    # Test main page
    try:
        with urllib.request.urlopen(f"{base_url}/") as response:
            if response.status == 200:
                print("✅ Main page accessible")
                content_length = len(response.read())
                print(f"📄 Content length: {content_length} bytes")
            else:
                print(f"❌ Main page returned status {response.status}")
    except urllib.error.URLError as e:
        print(f"❌ Failed to access main page: {e}")
        return False
    
    # Test CSS file
    try:
        with urllib.request.urlopen(f"{base_url}/assets/css/styles.css") as response:
            if response.status == 200:
                print("✅ CSS file accessible")
            else:
                print(f"⚠️ CSS file returned status {response.status}")
    except urllib.error.URLError as e:
        print(f"⚠️ CSS file not accessible: {e}")
    
    return True

def start_server():
    """Start a local HTTP server"""
    port = 8080
    
    # Change to the website directory
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    print(f"🚀 Starting HTTP server on port {port}")
    print(f"📁 Serving from: {os.getcwd()}")
    
    try:
        with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
            print(f"🌐 Server running at http://localhost:{port}/")
            print("📝 Available files:")
            for file in os.listdir("."):
                if file.endswith((".html", ".css", ".js", ".json")):
                    print(f"   - {file}")
            
            # Start server in a separate thread
            server_thread = threading.Thread(target=httpd.serve_forever)
            server_thread.daemon = True
            server_thread.start()
            
            # Wait for server to start
            time.sleep(2)
            
            # Test the server
            if test_server():
                print("\n✅ Server test completed successfully")
                print("🔗 You can now run Lighthouse CI or access the site manually")
                print("⏹️  Press Ctrl+C to stop the server")
                
                try:
                    while True:
                        time.sleep(1)
                except KeyboardInterrupt:
                    print("\n🛑 Shutting down server...")
                    httpd.shutdown()
            else:
                print("\n❌ Server test failed")
                httpd.shutdown()
                sys.exit(1)
                
    except OSError as e:
        print(f"❌ Failed to start server: {e}")
        if "Address already in use" in str(e):
            print(f"💡 Port {port} is already in use. Try stopping other servers first.")
        sys.exit(1)

if __name__ == "__main__":
    start_server()
