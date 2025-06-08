#!/usr/bin/env python3
"""
Simple website validation script for the Town of Wiley website.
Checks basic accessibility, SEO, and performance indicators.
"""

import urllib.request
import urllib.error
import json
import re
import sys
from html.parser import HTMLParser

class WebsiteValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta_description = ""
        self.headings = []
        self.images_without_alt = []
        self.links = []
        self.forms = []
        self.lang_attr = ""
        self.viewport_meta = False
        self.charset_meta = False
        self.current_tag = ""
        self.in_title = False
        
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)
        
        if tag == "html":
            self.lang_attr = attr_dict.get("lang", "")
            
        elif tag == "title":
            self.in_title = True
            
        elif tag == "meta":
            name = attr_dict.get("name", "").lower()
            if name == "description":
                self.meta_description = attr_dict.get("content", "")
            elif name == "viewport":
                self.viewport_meta = True
            elif attr_dict.get("charset"):
                self.charset_meta = True
                
        elif tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            self.headings.append(tag)
            
        elif tag == "img":
            if not attr_dict.get("alt"):
                src = attr_dict.get("src", "unknown")
                self.images_without_alt.append(src)
                
        elif tag == "a":
            href = attr_dict.get("href", "")
            if href:
                self.links.append(href)
                
        elif tag == "form":
            self.forms.append(attr_dict)
    
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
            
    def handle_data(self, data):
        if self.in_title:
            self.title += data.strip()

def test_url(url):
    """Test a single URL and return validation results."""
    print(f"🔍 Testing: {url}")
    
    try:
        with urllib.request.urlopen(url) as response:
            if response.getcode() != 200:
                return {"error": f"HTTP {response.getcode()}"}
                
            content = response.read().decode('utf-8')
            
        # Parse HTML
        validator = WebsiteValidator()
        validator.feed(content)
        
        # Run checks
        issues = []
        passed = []
        
        # Basic HTML structure
        if not validator.title:
            issues.append("❌ Missing page title")
        else:
            passed.append(f"✅ Page title: '{validator.title}'")
            
        if not validator.meta_description:
            issues.append("❌ Missing meta description")
        else:
            passed.append(f"✅ Meta description present ({len(validator.meta_description)} chars)")
            
        if not validator.lang_attr:
            issues.append("❌ Missing lang attribute on <html>")
        else:
            passed.append(f"✅ Lang attribute: '{validator.lang_attr}'")
            
        if not validator.viewport_meta:
            issues.append("❌ Missing viewport meta tag")
        else:
            passed.append("✅ Viewport meta tag present")
            
        if not validator.charset_meta:
            issues.append("❌ Missing charset meta tag")
        else:
            passed.append("✅ Charset meta tag present")
            
        # Heading structure
        if not validator.headings:
            issues.append("❌ No headings found")
        else:
            h1_count = validator.headings.count('h1')
            if h1_count == 0:
                issues.append("❌ No H1 heading found")
            elif h1_count > 1:
                issues.append(f"⚠️  Multiple H1 headings found ({h1_count})")
            else:
                passed.append("✅ Single H1 heading found")
                
        # Accessibility
        if validator.images_without_alt:
            issues.append(f"❌ {len(validator.images_without_alt)} images without alt text")
        else:
            passed.append("✅ All images have alt text")
            
        # Performance indicators
        css_links = [link for link in validator.links if '.css' in link]
        js_scripts = content.count('<script')
        
        if len(css_links) > 5:
            issues.append(f"⚠️  Many CSS files ({len(css_links)}) - consider combining")
        else:
            passed.append(f"✅ Reasonable CSS file count ({len(css_links)})")
            
        if js_scripts > 10:
            issues.append(f"⚠️  Many script tags ({js_scripts}) - consider combining")
        else:
            passed.append(f"✅ Reasonable script count ({js_scripts})")
            
        return {
            "url": url,
            "title": validator.title,
            "issues": issues,
            "passed": passed,
            "headings": validator.headings,
            "links_count": len(validator.links),
            "forms_count": len(validator.forms)
        }
        
    except Exception as e:
        return {"error": str(e)}

def main():
    base_url = "http://localhost:8000"
    pages = [
        "/",
        "/services.html",
        "/contact.html",
        "/government.html",
        "/news.html",
        "/accessibility.html"
    ]
    
    print("🌐 Town of Wiley Website Validation")
    print("=" * 50)
    
    all_results = []
    
    for page in pages:
        url = base_url + page
        result = test_url(url)
        all_results.append(result)
        
        if "error" in result:
            print(f"❌ ERROR: {result['error']}")
        else:
            print(f"\n📄 Page: {page}")
            for item in result["passed"]:
                print(f"  {item}")
            for item in result["issues"]:
                print(f"  {item}")
            print(f"  📊 Links: {result['links_count']}, Forms: {result['forms_count']}")
        
        print("-" * 30)
    
    # Summary
    total_issues = sum(len(r.get("issues", [])) for r in all_results if "error" not in r)
    total_passed = sum(len(r.get("passed", [])) for r in all_results if "error" not in r)
    
    print(f"\n📋 SUMMARY")
    print(f"✅ Passed checks: {total_passed}")
    print(f"❌ Issues found: {total_issues}")
    
    if total_issues == 0:
        print("🎉 Great! No issues found!")
        return 0
    else:
        print("🔧 Please address the issues above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
