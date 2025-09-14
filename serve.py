#!/usr/bin/env python3
"""
Simple HTTP server for testing the Feeding Calculator webapp
Includes proper MIME types for PWA functionality
"""

import http.server
import socketserver
import os

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers for PWA support
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Service-Worker-Allowed', '/')
        
        # Add CORS headers for fonts
        self.send_header('Access-Control-Allow-Origin', '*')
        
        super().end_headers()
    
    def guess_type(self, path):
        mimetype = super().guess_type(path)
        
        # Ensure correct MIME types
        if path.endswith('.js'):
            return ('application/javascript', None)
        elif path.endswith('.json'):
            return ('application/json', None)
        elif path.endswith('.webmanifest') or path.endswith('manifest.json'):
            return ('application/manifest+json', None)
        
        return mimetype

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"""
╔════════════════════════════════════════════════════════╗
║   Seasonal Feeding Calculator & Schedule - Test Server   ║
╚════════════════════════════════════════════════════════╝

Server running at: http://localhost:{PORT}

Open this URL in your browser to test the application.
Press Ctrl+C to stop the server.

Features available for testing:
✓ Feeding Calculator
✓ Regional Calendar
✓ Emergency Diagnostics
✓ Batch Recipes
✓ Offline Mode (after first load)
✓ Mobile Responsive Design

For mobile testing, use your local IP address:
- Find your IP: ifconfig or ipconfig
- Access: http://[YOUR-IP]:{PORT}
        """)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")
            pass