browser.browserAction.onClicked.addListener(async () => {
  try {
    // Get all tabs in the current window
    const tabs = await browser.tabs.query({});

    // Create a map to store unique URLs and their corresponding tabs
    const urlMap = new Map();
    const duplicates = [];

    // Identify duplicate tabs
    tabs.forEach(tab => {
      const url = tab.url;
      if (urlMap.has(url)) {
        duplicates.push(tab.id);
      } else {
        urlMap.set(url, tab.id);
      }
    });

    // Remove duplicate tabs
    if (duplicates.length > 0) {
      await browser.tabs.remove(duplicates);
      // Optional: Show notification of how many tabs were removed
      console.log(`Removed ${duplicates.length} duplicate tab(s)`);
    }
  } catch (error) {
    console.error('Error removing duplicate tabs:', error);
  }
});
