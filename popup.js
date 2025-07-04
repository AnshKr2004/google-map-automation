let isScrapingActive = false;
let scrapedData = [];

// DOM elements
const scrapeBtn = document.getElementById('scrapeBtn');
const stopBtn = document.getElementById('stopBtn');
const statusDiv = document.getElementById('status');
const businessCountSpan = document.getElementById('businessCount');
const emailCountSpan = document.getElementById('emailCount');
const resultsDiv = document.getElementById('results');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const delayInput = document.getElementById('delayInput');
const autoScrollCheck = document.getElementById('autoScrollCheck');
const useGrokAPICheck = document.getElementById('useGrokAPICheck');

// Load saved data and settings on popup open
chrome.storage.local.get(['scrapedData', 'settings'], (result) => {
    if (result.scrapedData) {
        scrapedData = result.scrapedData;
        updateUI();
    }
    
    // Load settings
    if (result.settings) {
        delayInput.value = result.settings.delay || 1500;
        autoScrollCheck.checked = result.settings.autoScroll !== false;
        useGrokAPICheck.checked = result.settings.useGrokAPI !== false;
    }
});

// Event listeners
scrapeBtn.addEventListener('click', startScraping);
stopBtn.addEventListener('click', stopScraping);
exportBtn.addEventListener('click', exportData);
clearBtn.addEventListener('click', clearData);

// Settings event listeners
delayInput.addEventListener('change', saveSettings);
autoScrollCheck.addEventListener('change', saveSettings);
useGrokAPICheck.addEventListener('change', saveSettings);

// Start scraping
async function startScraping() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we're on Google Maps
    if (!tab.url.includes('google.com/maps') && !tab.url.includes('maps.google.com')) {
        updateStatus('Please navigate to Google Maps first', 'error');
        return;
    }

    isScrapingActive = true;
    updateStatus('Scraping in progress...', 'warning');
    toggleButtons(true);

    // Send message to content script to start scraping
    chrome.tabs.sendMessage(tab.id, {
        action: 'startScraping',
        settings: {
            delay: parseInt(delayInput.value),
            autoScroll: autoScrollCheck.checked,
            useGrokAPI: useGrokAPICheck.checked
        }
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener(handleContentMessage);
}

// Stop scraping
function stopScraping() {
    isScrapingActive = false;
    updateStatus('Scraping stopped', 'success');
    toggleButtons(false);

    // Send message to content script to stop scraping
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'stopScraping' });
    });
}

// Handle messages from content script
function handleContentMessage(message, sender, sendResponse) {
    if (!isScrapingActive) return;

    switch (message.action) {
        case 'dataScraped':
            addScrapedData(message.data);
            break;
        case 'scrapingComplete':
            stopScraping();
            updateStatus('Scraping completed successfully', 'success');
            break;
        case 'scrapingError':
            stopScraping();
            updateStatus(`Error: ${message.error}`, 'error');
            break;
        case 'statusUpdate':
            updateStatus(message.status, message.type || 'default');
            break;
    }
}

// Add scraped data
function addScrapedData(data) {
    // Check if business already exists
    const exists = scrapedData.some(item => 
        item.name === data.name && item.address === data.address
    );

    if (!exists) {
        scrapedData.push(data);
        chrome.storage.local.set({ scrapedData });
        updateUI();
    }
}

// Update UI
function updateUI() {
    // Update counts
    businessCountSpan.textContent = scrapedData.length;
    const emailCount = scrapedData.reduce((count, item) => {
        let emails = 0;
        if (item.email) emails++;
        if (item.additional_emails && item.additional_emails.length > 0) {
            emails += item.additional_emails.length;
        }
        return count + (emails > 0 ? 1 : 0);
    }, 0);
    emailCountSpan.textContent = emailCount;

    // Update results display
    resultsDiv.innerHTML = '';
    scrapedData.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        let details = '';
        if (item.phone) details += `Phone: ${item.phone}<br>`;
        if (item.additional_phones && item.additional_phones.length > 0) {
            details += `Additional Phones: ${item.additional_phones.join(', ')}<br>`;
        }
        if (item.website) details += `Website: ${item.website}<br>`;
        if (item.email) details += `<span class="email">Email: ${item.email}</span><br>`;
        if (item.additional_emails && item.additional_emails.length > 0) {
            details += `<span class="email">Additional Emails: ${item.additional_emails.join(', ')}</span><br>`;
        }
        if (item.social_media && item.social_media.length > 0) {
            details += `Social Media: ${item.social_media.join(', ')}<br>`;
        }
        if (item.additional_contacts && item.additional_contacts.length > 0) {
            details += `Other Contacts: ${item.additional_contacts.join(', ')}<br>`;
        }
        if (item.rating) details += `Rating: ${item.rating}`;

        resultItem.innerHTML = `
            <strong>${item.name}</strong>
            <div class="details">
                ${item.address || 'No address'}<br>
                ${details}
            </div>
        `;
        resultsDiv.appendChild(resultItem);
    });

    // Enable/disable action buttons
    const hasData = scrapedData.length > 0;
    exportBtn.disabled = !hasData;
    clearBtn.disabled = !hasData;
}

// Update status
function updateStatus(message, type = 'default') {
    statusDiv.textContent = message;
    statusDiv.className = 'status';
    if (type !== 'default') {
        statusDiv.classList.add(type);
    }
}

// Toggle buttons
function toggleButtons(isScraping) {
    if (isScraping) {
        scrapeBtn.style.display = 'none';
        stopBtn.style.display = 'flex';
        document.querySelector('.loader').style.display = 'inline-block';
    } else {
        scrapeBtn.style.display = 'flex';
        stopBtn.style.display = 'none';
        document.querySelector('.loader').style.display = 'none';
    }
}

// Export data to CSV
function exportData() {
    if (scrapedData.length === 0) return;

    let csv = 'Name,Address,Phone,Additional Phones,Website,Email,Additional Emails,Social Media,Other Contacts,Rating\n';
    scrapedData.forEach(item => {
        csv += `"${item.name || ''}","${item.address || ''}","${item.phone || ''}","${(item.additional_phones || []).join('; ')}","${item.website || ''}","${item.email || ''}","${(item.additional_emails || []).join('; ')}","${(item.social_media || []).join('; ')}","${(item.additional_contacts || []).join('; ')}","${item.rating || ''}"\n`;
    });

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google-maps-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    updateStatus('Data exported successfully', 'success');
}

// Clear data
function clearData() {
    if (confirm('Are you sure you want to clear all scraped data?')) {
        scrapedData = [];
        chrome.storage.local.remove('scrapedData');
        updateUI();
        updateStatus('Data cleared', 'success');
    }
}

// Save settings to storage
function saveSettings() {
    const settings = {
        delay: parseInt(delayInput.value),
        autoScroll: autoScrollCheck.checked,
        useGrokAPI: useGrokAPICheck.checked
    };
    
    chrome.storage.local.set({ settings });
} 