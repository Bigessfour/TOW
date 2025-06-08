source "https://rubygems.org"

# Use Jekyll 4.x without problematic native extensions
gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Use webrick as the development server (included with Ruby, no compilation needed)
gem "webrick", "~> 1.7"

# Skip http_parser.rb to avoid native compilation issues
# gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
