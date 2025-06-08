source "https://rubygems.org"

# Use Jekyll 3.9 for better Windows compatibility without native extensions
gem "jekyll", "~> 3.9.0"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Skip native extensions that require compilation on Windows
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Use webrick as the development server (included with Ruby, no compilation needed)
gem "webrick", "~> 1.7"

# Skip http_parser.rb to avoid native compilation issues
# gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
