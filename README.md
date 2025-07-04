# Google Maps Data Scraper Chrome Extension

A powerful Chrome extension that automatically extracts business contact information, including emails, from Google Maps search results. This tool is designed to help businesses, marketers, and researchers efficiently collect contact data from Google Maps listings.

## 🚀 Features

### Core Functionality
- **Automated Business Data Extraction**: Scrapes business names, addresses, phone numbers, websites, emails, and ratings
- **AI-Powered Email Discovery**: Uses Grok API for advanced email extraction when basic methods fail
- **Smart Auto-Scrolling**: Automatically scrolls through Google Maps results to load more businesses
- **Duplicate Detection**: Prevents duplicate entries based on business name and address
- **Real-Time Progress Tracking**: Shows live statistics of businesses and emails found

### Advanced Email Extraction
- **Multiple Extraction Methods**: Combines direct Google Maps data with website scraping
- **CORS Proxy Support**: Uses multiple proxy services to bypass cross-origin restrictions
- **Email Validation**: Filters out invalid, fake, and blacklisted email addresses
- **Business Email Prioritization**: Identifies business-relevant emails (info@, contact@, sales@, etc.)

### Data Export & Management
- **CSV Export**: Export all scraped data to CSV format
- **Local Storage**: Automatically saves progress and data
- **Data Persistence**: Maintains scraped data across browser sessions
- **Clear Data Option**: Easy data management with clear functionality

### Customizable Settings
- **Adjustable Delay**: Configure scraping speed (500ms - 5000ms)
- **Auto-Scroll Toggle**: Enable/disable automatic result loading
- **AI Extraction Control**: Toggle Grok API usage for enhanced email finding

## 📋 Prerequisites

- Google Chrome browser
- Active internet connection
- Access to Google Maps search results
- (Optional) Grok API key for enhanced email extraction

## 🛠️ Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Clone or download** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer mode** by toggling the switch in the top right
4. **Click "Load unpacked"** and select the extension directory
5. **Pin the extension** to your Chrome toolbar for easy access

### Method 2: From Chrome Web Store (if published)

1. Visit the Chrome Web Store page for this extension
2. Click "Add to Chrome"
3. Confirm the installation when prompted

## 🎯 Usage

### Basic Usage

1. **Navigate to Google Maps** (`maps.google.com`)
2. **Search for businesses** using any search term (e.g., "restaurants in New York")
3. **Wait for results** to load on the left sidebar
4. **Click the extension icon** in your Chrome toolbar
5. **Click "Start Scraping"** to begin data extraction
6. **Monitor progress** in the popup window
7. **Export data** to CSV when complete

### Advanced Usage

#### Customizing Settings
- **Delay Configuration**: Adjust the delay between scrapes to avoid rate limiting
- **Auto-Scroll**: Enable to automatically load more results as you scrape
- **AI Enhancement**: Use Grok API for more comprehensive email extraction

#### Managing Data
- **View Results**: See real-time results in the popup interface
- **Export Data**: Download all scraped data as a CSV file
- **Clear Data**: Remove all stored data to start fresh

## 📊 Data Fields Extracted

The extension captures the following information for each business:

| Field | Description |
|-------|-------------|
| **Name** | Business name |
| **Address** | Physical address |
| **Phone** | Primary phone number |
| **Additional Phones** | Secondary phone numbers |
| **Website** | Business website URL |
| **Email** | Primary email address |
| **Additional Emails** | Secondary email addresses |
| **Social Media** | Social media profiles |
| **Other Contacts** | Additional contact information |
| **Rating** | Google Maps rating |

## 🔧 Technical Details

### Architecture
- **Manifest Version**: 3 (latest Chrome extension standard)
- **Content Script**: Runs on Google Maps pages for data extraction
- **Background Service Worker**: Handles CORS proxy requests and API calls
- **Popup Interface**: User interaction and data visualization

### Permissions Required
- `activeTab`: Access to the currently active tab
- `storage`: Local data storage
- `scripting`: Dynamic script injection
- Host permissions for Google Maps and proxy services

### File Structure
```
├── manifest.json          # Extension configuration
├── popup.html             # User interface
├── popup.css              # Styling
├── popup.js               # UI logic and controls
├── content.js             # Google Maps scraping logic
├── background.js          # Service worker and API handling
├── icon.svg               # Extension icon
└── README.md              # This file
```

## 🔐 Privacy & Security

### Data Handling
- **Local Storage Only**: All data is stored locally in your browser
- **No External Servers**: No data is sent to external servers (except for optional API calls)
- **User Control**: You control when data is collected and exported

### API Integration
- **Optional Grok API**: Enhanced email extraction (requires user consent)
- **CORS Proxies**: Used only for website scraping to find additional emails
- **Rate Limiting**: Built-in delays to respect website policies

## ⚠️ Important Notes

### Legal Compliance
- **Terms of Service**: Ensure compliance with Google Maps Terms of Service
- **Data Protection**: Respect GDPR, CCPA, and other privacy regulations
- **Business Use**: Obtain proper permissions before using scraped data commercially
- **Rate Limits**: Use reasonable delays to avoid overwhelming servers

### Technical Limitations
- **Dynamic Content**: Some emails may not be immediately visible and require website visits
- **JavaScript-Heavy Sites**: Some websites may not load properly through proxies
- **Rate Limiting**: Google Maps may temporarily block rapid requests

## 🛟 Troubleshooting

### Common Issues

**Extension won't start scraping:**
- Ensure you're on a Google Maps search results page
- Check that search results are visible in the left sidebar
- Try refreshing the page and starting again

**No emails found:**
- Enable AI-powered extraction in settings
- Increase the delay between scrapes
- Check if businesses have websites with contact pages

**Scraping stops unexpectedly:**
- Check browser console for error messages
- Verify internet connection
- Try disabling other extensions that might interfere

**Data export not working:**
- Ensure you have scraped data before exporting
- Check browser's download settings
- Try clearing browser cache and cookies

## 🔄 Development & Contributing

### Development Setup
1. Clone the repository
2. Make your changes
3. Test thoroughly on different Google Maps searches
4. Submit pull requests for improvements

### Testing
- Test on various Google Maps search results
- Verify data accuracy and completeness
- Check performance with large result sets
- Ensure compatibility with Chrome updates

## 📝 Changelog

### Version 1.0
- Initial release
- Basic business data extraction
- CSV export functionality
- Configurable settings
- AI-powered email extraction

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

If you encounter issues or have suggestions:
1. Check the troubleshooting section above
2. Review existing issues in the repository
3. Create a new issue with detailed information
4. Include browser version and extension version

## ⚖️ Disclaimer

This tool is provided for educational and legitimate business purposes only. Users are responsible for:
- Complying with all applicable laws and regulations
- Respecting website terms of service
- Obtaining necessary permissions for data use
- Following ethical scraping practices

Use this tool responsibly and respect the privacy and rights of businesses and individuals. 