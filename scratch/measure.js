const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewportSize({ width: 1366, height: 768 });
  
  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  } catch (err) {
    console.error('Error loading page:', err.message);
    await browser.close();
    process.exit(1);
  }
  
  console.log('Page loaded. Measuring elements...');
  
  const measurements = await page.evaluate(() => {
    const results = [];
    
    // Measure body and html
    results.push({
      selector: 'html',
      width: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      rect: document.documentElement.getBoundingClientRect()
    });
    
    results.push({
      selector: 'body',
      width: document.body.scrollWidth,
      clientWidth: document.body.clientWidth,
      rect: document.body.getBoundingClientRect()
    });
    
    // Measure main sections
    const selectors = [
      '#hero',
      '#about',
      '#projects',
      '#skills',
      '#certifications',
      '#contact',
      '#projects .max-w-7xl',
      '#projects .grid',
      '#projects .glass-card',
      '#about .max-w-6xl',
      '#skills .max-w-7xl'
    ];
    
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        const rect = el.getBoundingClientRect();
        results.push({
          selector: sel,
          rect: {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
          },
          scrollWidth: el.scrollWidth,
          offsetWidth: el.offsetWidth
        });
      } else {
        results.push({ selector: sel, error: 'Not found' });
      }
    });
    
    return results;
  });
  
  console.log(JSON.stringify(measurements, null, 2));
  
  await browser.close();
})();
