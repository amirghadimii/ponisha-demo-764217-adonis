import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runVerification() {
  console.log('🚀 Starting Verification on http://localhost:3008 ...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const results = {
    test1: { passed: false, details: {} },
    test2: { passed: false, details: {} },
    test3: { passed: false, details: {} },
    test4: { passed: false, details: {} },
  };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle0', timeout: 30000 });

    console.log('Page loaded successfully.');

    // ==========================================
    // TEST 1: Solar Calculator Verification
    // ==========================================
    console.log('\n--- Running Test 1: Solar Calculator ---');
    await page.waitForSelector('#calculator');

    // 1a: Set Roof Area to 100 m2
    await page.click('#calc-mode-area');
    await page.$eval('#roof-area-input', (el) => {
      el.value = '100';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    // Also set monthly bill to 5000000
    await page.$eval('#monthly-bill-input', (el) => {
      el.value = '5000000';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await new Promise((r) => setTimeout(r, 400));

    // Read Area Mode Results
    const areaCapacity = await page.$eval('#recommended-capacity-kw', (el) => el.textContent?.trim());
    const areaPanels = await page.$eval('#panel-count-result', (el) => el.textContent?.trim());
    const areaCost = await page.$eval('#estimated-cost-range', (el) => el.textContent?.trim());
    const areaSaving = await page.$eval('#annual-saving-result', (el) => el.textContent?.trim());
    const areaPayback = await page.$eval('#payback-years-result', (el) => el.textContent?.trim());

    console.log(`[Area Mode (100 m²)]:`);
    console.log(`  - Recommended Capacity: ${areaCapacity} kW`);
    console.log(`  - Panel Count: ${areaPanels} panels`);
    console.log(`  - Estimated Cost: ${areaCost}`);
    console.log(`  - Annual Saving: ${areaSaving}`);
    console.log(`  - Payback: ${areaPayback} years`);

    // 1b: Also switch to Bill Mode (5,000,000 Toman) to verify
    await page.click('#calc-mode-bill');
    await new Promise((r) => setTimeout(r, 400));

    const billCapacity = await page.$eval('#recommended-capacity-kw', (el) => el.textContent?.trim());
    const billPanels = await page.$eval('#panel-count-result', (el) => el.textContent?.trim());
    const billCost = await page.$eval('#estimated-cost-range', (el) => el.textContent?.trim());
    const billSaving = await page.$eval('#annual-saving-result', (el) => el.textContent?.trim());

    console.log(`[Bill Mode (5,000,000 Toman)]:`);
    console.log(`  - Recommended Capacity: ${billCapacity} kW`);
    console.log(`  - Panel Count: ${billPanels} panels`);
    console.log(`  - Estimated Cost: ${billCost}`);
    console.log(`  - Annual Saving: ${billSaving}`);

    if (areaCapacity && areaPanels && areaCost && areaSaving) {
      results.test1.passed = true;
      results.test1.details = {
        areaMode: {
          roofArea: '۱۰۰ متر مربع',
          capacity: areaCapacity,
          panelCount: areaPanels,
          cost: areaCost,
          annualSaving: areaSaving,
          payback: areaPayback,
        },
        billMode: {
          monthlyBill: '۵,۰۰۰,۰۰۰ تومان',
          capacity: billCapacity,
          panelCount: billPanels,
          cost: billCost,
          annualSaving: billSaving,
        },
      };
    }

    // ==========================================
    // TEST 2: Product Detail Modal Verification
    // ==========================================
    console.log('\n--- Running Test 2: Product Card & Detail View ---');
    await page.waitForSelector('[data-testid="product-card"]');
    const firstProductCard = await page.$('[data-testid="product-card"]');
    await firstProductCard.click();

    await page.waitForSelector('#product-detail-modal', { visible: true });
    await new Promise((r) => setTimeout(r, 400));

    const modalName = await page.$eval('#modal-product-name', (el) => el.textContent?.trim());
    const modalCapacity = await page.$eval('#modal-product-capacity', (el) => el.textContent?.trim());
    const modalWarranty = await page.$eval('#modal-product-warranty', (el) => el.textContent?.trim());
    const modalPrice = await page.$eval('#modal-product-price', (el) => el.textContent?.trim());
    const specsCount = await page.$$eval('#modal-specs-table > div > div', (els) => els.length);

    console.log(`[Product Modal Open]:`);
    console.log(`  - Product Name: ${modalName}`);
    console.log(`  - Capacity: ${modalCapacity}`);
    console.log(`  - Warranty: ${modalWarranty}`);
    console.log(`  - Price: ${modalPrice}`);
    console.log(`  - Technical Specs Rows: ${specsCount}`);

    if (modalName && modalCapacity && modalWarranty && modalPrice && specsCount > 0) {
      results.test2.passed = true;
      results.test2.details = {
        name: modalName,
        capacity: modalCapacity,
        warranty: modalWarranty,
        price: modalPrice,
        specsCount,
      };
    }

    // Close the modal
    await page.click('#close-modal-btn');
    await new Promise((r) => setTimeout(r, 400));

    // ==========================================
    // TEST 3: Consultation Form Validation & Success State
    // ==========================================
    console.log('\n--- Running Test 3: Consultation Form ---');
    await page.waitForSelector('#consultation-form');

    // 3a: Submit with invalid phone
    console.log('Submitting with invalid mobile "0912"...');
    await page.type('#consultation-fullname', 'مهندس علیرضا رضوی');
    await page.type('#consultation-mobile', '0912'); // invalid: too short!
    await page.click('#consultation-submit-btn');

    await page.waitForSelector('#mobile-error-message', { visible: true });
    const mobileError = await page.$eval('#mobile-error-message', (el) => el.textContent?.trim());
    console.log(`  - Validation Error Displayed: "${mobileError}"`);

    // 3b: Correct phone number and submit with valid data
    console.log('Correcting mobile to "09123456789" and submitting...');
    await page.$eval('#consultation-mobile', (el) => {
      el.value = '';
    });
    await page.type('#consultation-mobile', '09123456789');

    // Select Jalali date
    await page.select('#jalali-day-select', '18');
    await page.select('#jalali-month-select', '2'); // خرداد
    await page.select('#jalali-year-select', '1405');

    const selectedDateLabel = await page.$eval('#selected-jalali-date-label', (el) => el.textContent?.trim());
    console.log(`  - Selected Jalali Date: ${selectedDateLabel}`);

    await page.click('#consultation-submit-btn');

    // Wait for success view
    await page.waitForSelector('#consultation-success-view', { visible: true, timeout: 5000 });
    const trackingCode = await page.$eval('#tracking-code-display', (el) => el.textContent?.trim());
    const successTitle = await page.$eval('#consultation-success-view h3', (el) => el.textContent?.trim());

    console.log(`  - Success State Displayed!`);
    console.log(`  - Tracking Code: ${trackingCode}`);
    console.log(`  - Success Title: ${successTitle}`);

    if (mobileError && trackingCode && trackingCode.startsWith('AD-')) {
      results.test3.passed = true;
      results.test3.details = {
        mobileError,
        trackingCode,
        successTitle,
        jalaliDate: selectedDateLabel,
      };
    }

    // ==========================================
    // TEST 4: Mobile Width & Mobile Menu Verification
    // ==========================================
    console.log('\n--- Running Test 4: Mobile Menu at mobile viewport ---');
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle0' });

    // Open mobile menu
    await page.waitForSelector('#mobile-menu-toggle-btn', { visible: true });
    await page.click('#mobile-menu-toggle-btn');

    await page.waitForSelector('#mobile-drawer-menu', { visible: true });
    const mobileLinks = await page.$$eval('#mobile-drawer-menu [data-testid="mobile-nav-link"]', (els) =>
      els.map((e) => ({
        text: e.textContent?.trim().replace(/\s+/g, ' '),
        href: e.getAttribute('href'),
      }))
    );

    console.log(`[Mobile Menu Open]: ${mobileLinks.length} links found:`);
    mobileLinks.forEach((l) => console.log(`  - ${l.text} -> ${l.href}`));

    // Click a link in mobile menu (e.g. calculator link)
    const calcLink = await page.$('#mobile-drawer-menu a[href="#calculator"]');
    await calcLink.click();
    await new Promise((r) => setTimeout(r, 600));

    // Confirm drawer closes after clicking a link
    const drawerStillOpen = await page.$('#mobile-drawer-menu');
    console.log(`  - Mobile drawer closed on link click: ${drawerStillOpen === null ? 'Yes (Pass)' : 'No'}`);

    if (mobileLinks.length >= 6 && drawerStillOpen === null) {
      results.test4.passed = true;
      results.test4.details = {
        linkCount: mobileLinks.length,
        links: mobileLinks,
        drawerAutoClose: true,
      };
    }

    console.log('\n==========================================');
    console.log('SUMMARY RESULTS:');
    console.log(JSON.stringify(results, null, 2));
    console.log('==========================================');

  } catch (err) {
    console.error('Verification failed with error:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
