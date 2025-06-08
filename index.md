---
layout: default
title: Home
description: "Official website of the Town of Wiley - Your rural community government providing accessible services, programs, and activities to all residents"
keywords: "Town of Wiley, government, services, utilities, permits, meetings, accessibility"
---

<!-- Main Content -->
<main id="main-content" class="main-content" role="main">

    <!-- Hero Section -->
    <section id="home" class="hero" aria-labelledby="hero-heading">
        <div class="hero-content">
            <div class="hero-text">
                <h2 id="hero-heading" class="hero-title">Welcome to the Town of Wiley</h2>
                <p class="hero-subtitle">Your rural community government committed to providing accessible services, programs, and activities to all residents.</p>
                <div class="hero-actions">
                    <a href="{{ '/services/' | relative_url }}" class="btn btn-primary" aria-describedby="services-description">
                        Explore Services
                    </a>
                    <a href="{{ '/contact/' | relative_url }}" class="btn btn-secondary">
                        Contact Us
                    </a>
                </div>
                <div id="services-description" class="sr-only">Access comprehensive information about town services including utilities, permits, and community programs</div>
            </div>
            <div class="hero-image" aria-hidden="true">
                <img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Town of Wiley scenic view" class="hero-img">
            </div>
        </div>
    </section>

    <!-- Quick Access Services -->
    <section class="quick-access" aria-labelledby="quick-access-heading">
        <div class="container">
            <h2 id="quick-access-heading" class="section-title">Quick Access</h2>
            <div class="quick-access-grid">
                <a href="{{ '/payments/' | relative_url }}" class="quick-access-item" aria-describedby="payment-desc">
                    <div class="quick-access-icon" aria-hidden="true">💳</div>
                    <h3>Pay Bills Online</h3>
                    <p id="payment-desc">Secure online payment portal for utilities and services</p>
                </a>
                <a href="{{ '/services/#permits' | relative_url }}" class="quick-access-item" aria-describedby="permits-desc">
                    <div class="quick-access-icon" aria-hidden="true">📋</div>
                    <h3>Apply for Permits</h3>
                    <p id="permits-desc">Building, business, and event permit applications</p>
                </a>
                <a href="{{ '/government/#meetings' | relative_url }}" class="quick-access-item" aria-describedby="meetings-desc">
                    <div class="quick-access-icon" aria-hidden="true">📅</div>
                    <h3>Meeting Schedule</h3>
                    <p id="meetings-desc">Town council and committee meeting calendar</p>
                </a>
                <a href="{{ '/services/#utilities' | relative_url }}" class="quick-access-item" aria-describedby="utilities-desc">
                    <div class="quick-access-icon" aria-hidden="true">⚡</div>
                    <h3>Utilities</h3>
                    <p id="utilities-desc">Water, sewer, and electric service information</p>
                </a>
            </div>
        </div>
    </section>

    <!-- News and Announcements -->
    <section class="news-preview" aria-labelledby="news-preview-heading">
        <div class="container">
            <h2 id="news-preview-heading" class="section-title">Latest News</h2>
            <div class="news-grid">
                {% for post in site.posts limit:3 %}
                <article class="news-item">                    <h3><a href="{{ post.url | relative_url }}" aria-label="Read full article: {{ post.title }}">{{ post.title }}</a></h3>
                    <time datetime="{{ post.date | date_to_xmlschema }}" class="news-date">
                        {{ post.date | date: "%B %d, %Y" }}
                    </time>
                    <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                    <a href="{{ post.url | relative_url }}" class="read-more" aria-label="Read full article about {{ post.title }}">Read more about {{ post.title | truncatewords: 5 }}</a>
                </article>
                {% endfor %}
            </div>            <div class="text-center mt-6">
                <a href="{{ '/news/' | relative_url }}" class="btn btn-outline" aria-label="View all news and announcements from the Town of Wiley">View All News</a>
            </div>
        </div>
    </section>

    <!-- Emergency Information -->
    <section class="emergency-info" aria-labelledby="emergency-heading">
        <div class="container">
            <h2 id="emergency-heading" class="section-title">Emergency Information</h2>
            <div class="emergency-grid">
                <div class="emergency-item urgent" role="alert">
                    <h3>Emergency Services</h3>
                    <p><strong>For life-threatening emergencies, call 911</strong></p>
                    <p>Non-emergency: (XXX) XXX-XXXX</p>
                </div>
                <div class="emergency-item">
                    <h3>Public Works</h3>
                    <p>Report issues: (XXX) XXX-XXXX</p>
                    <p>After hours: (XXX) XXX-XXXX</p>
                </div>
                <div class="emergency-item">
                    <h3>Utility Outages</h3>
                    <p>Report outages: (XXX) XXX-XXXX</p>
                    <p>Status updates on our website</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Community Features -->
    <section class="community-features" aria-labelledby="community-heading">
        <div class="container">
            <h2 id="community-heading" class="section-title">Community Hub</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <h3>Business Directory</h3>
                    <p>Support local businesses in our community</p>
                    <a href="{{ '/services/#business-directory' | relative_url }}" class="feature-link">Explore Businesses</a>
                </div>
                <div class="feature-item">
                    <h3>Calendar of Events</h3>
                    <p>Stay informed about community events and activities</p>
                    <a href="{{ '/news/#calendar' | relative_url }}" class="feature-link">View Calendar</a>
                </div>
                <div class="feature-item">
                    <h3>Digital Forms</h3>
                    <p>Complete applications and requests online</p>
                    <a href="{{ '/services/#forms' | relative_url }}" class="feature-link">Access Forms</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="newsletter-signup" aria-labelledby="newsletter-heading">
        <div class="container">
            <h2 id="newsletter-heading" class="section-title">Stay Connected</h2>
            <p>Subscribe to receive important town updates and announcements</p>
            <form class="newsletter-form" aria-label="Newsletter subscription">
                <div class="form-group">
                    <label for="newsletter-email" class="sr-only">Email address</label>
                    <input type="email" id="newsletter-email" name="email" placeholder="Enter your email address" required aria-describedby="email-help">
                    <div id="email-help" class="sr-only">Enter your email to receive town updates</div>
                </div>
                <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
        </div>
    </section>

    <!-- Accessibility Statement Link -->
    <section class="accessibility-notice">
        <div class="container">
            <p class="text-center">
                <a href="{{ '/accessibility/' | relative_url }}" class="accessibility-link">
                    View our Accessibility Statement
                </a>
            </p>
        </div>
    </section>

</main>

<!-- Page-specific JavaScript -->
<script>
// Newsletter form handling
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    if (email) {
        // Here you would typically send to your email service
        showNotification('Thank you for subscribing! You will receive confirmation shortly.', 'success');
        this.reset();
    }
});

// Quick access analytics
document.querySelectorAll('.quick-access-item').forEach(item => {
    item.addEventListener('click', function() {
        // Track quick access usage
        const service = this.querySelector('h3').textContent;
        console.log('Quick access used:', service);
    });
});
</script>
