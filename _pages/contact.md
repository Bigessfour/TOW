---
layout: page
title: Contact Us
permalink: /contact/
description: "Contact information for the Town of Wiley including town hall, emergency services, and online contact form"
---

# Contact Information

## Town Hall

**Address:**  
123 Main Street  
Wiley, State 12345

**Phone:** [(555) 123-4567](tel:+15551234567)  
**Email:** [info@townofwiley.gov](mailto:info@townofwiley.gov)

**Hours:**  
Monday - Friday: 8:00 AM - 5:00 PM  
Saturday: 9:00 AM - 12:00 PM

## Emergency Services

**Emergency:** [911](tel:911)  
**Police (Non-Emergency):** [(555) 123-4569](tel:+15551234569)  
**Fire Department:** [(555) 123-4570](tel:+15551234570)  
**Public Works:** [(555) 123-4571](tel:+15551234571)

## Send us a Message

<form class="form" id="contactForm" novalidate action="/contact" method="POST">
    <div class="form-group">
        <label for="name">Full Name <span class="required">*</span></label>
        <input type="text" id="name" name="name" required aria-describedby="name-error" aria-invalid="false">
        <div id="name-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
        <label for="email">Email Address <span class="required">*</span></label>
        <input type="email" id="email" name="email" required aria-describedby="email-error" aria-invalid="false">
        <div id="email-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
        <label for="subject">Subject <span class="required">*</span></label>
        <select id="subject" name="subject" required aria-describedby="subject-error" aria-invalid="false">
            <option value="">Select a topic</option>
            <option value="utilities">Utilities</option>
            <option value="permits">Permits & Licenses</option>
            <option value="public-works">Public Works</option>
            <option value="complaint">Complaint/Issue</option>
            <option value="general">General Inquiry</option>
        </select>
        <div id="subject-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
        <label for="message">Message <span class="required">*</span></label>
        <textarea id="message" name="message" rows="5" required aria-describedby="message-error message-help" aria-invalid="false"></textarea>
        <div id="message-help" class="help-text">Please provide details about your inquiry or request</div>
        <div id="message-error" class="error-message" aria-live="polite"></div>
    </div>
    
    <button type="submit" class="btn btn-primary">Send Message</button>
</form>

---

For immediate assistance during business hours, please call or visit town hall. For after-hours emergencies, dial 911.
