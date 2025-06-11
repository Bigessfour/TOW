---
layout: page
title: News & Updates
permalink: /news/
description:
  'Latest news, announcements, and updates from the Town of Wiley government'
---

# News & Updates

Stay informed with the latest news and announcements from the Town of Wiley.

<div class="news-grid">
{% for post in site.posts %}
  <article class="news-card">
    <header>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}" class="text-sm text-gray-600">
        {{ post.date | date: "%B %d, %Y" }}
      </time>
      {% if post.author %}
        <p class="text-sm text-gray-600">By {{ post.author }}</p>
      {% endif %}
    </header>
    
    <div class="excerpt">
      {{ post.excerpt | strip_html | truncate: 200 }}
    </div>
    
    {% if post.categories %}
      <div class="categories">
        {% for category in post.categories %}
          <span class="category-tag">{{ category }}</span>
        {% endfor %}
      </div>
    {% endif %}
    
    <a href="{{ post.url | relative_url }}" class="btn btn-outline">Read More</a>
  </article>
{% endfor %}
</div>

{% if site.posts.size == 0 %}

<div class="text-center py-8">
  <p>No news articles available at this time. Please check back later for updates.</p>
</div>
{% endif %}

---

## Subscribe to Updates

Stay informed about town news and announcements by:

- Following us on social media
- Signing up for our newsletter
- Attending town council meetings

For urgent announcements, visit our [contact page](/contact/) or call town hall
at [(555) 123-4567](tel:+15551234567).
