source "https://rubygems.org"

# Jekyll without problematic dependencies
gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"
gem "webrick", "~> 1.7"

# Markdown parser for GitHub Flavored Markdown (required by Netlify/Jekyll)
gem "kramdown-parser-gfm"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
