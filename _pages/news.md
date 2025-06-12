---
layout: page
title: News & Updates
permalink: /news/
description:
  'Latest news, announcements, and updates from the Town of Wiley government'
---


<section aria-labelledby="news-heading">
  <h1 id="news-heading">News</h1>
  <ul id="news-list" aria-live="polite"></ul>
</section>
<script>
  fetch('/.netlify/functions/get_news')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('news-list');
      data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.title}</strong>: ${item.content} <em>(${new Date(item.published_at).toLocaleDateString()})</em>`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Error fetching news:', err));
</script>

---

## Subscribe to Updates

Stay informed about town news and announcements by:

- Following us on social media
- Signing up for our newsletter
- Attending town council meetings

For urgent announcements, visit our [contact page](/contact/) or call town hall
at [(555) 123-4567](tel:+15551234567).
