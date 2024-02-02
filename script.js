// Script Name: Bindicator

const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'] });
    const page = await browser.newPage();

    //Delay function
    function delay(time) {
	    return new Promise(function(resolve) { 
	    	setTimeout(resolve, time)
	    })
    };

    // Navigate the page to a URL
    await page.goto(`https://www.barnet.gov.uk/recycling-and-waste/bin-collections/find-your-bin-collection-day`, { waitUntil: 'networkidle0' });

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Press the 'Find your household collection day' button
    const fyb = '#title-0 > a'; //Selector for 'Find your household collection day' 
    await page.click(fyb);
    await page.waitForNavigation();
    console.log("Button 'Find your household collection day' Pressed : SUCCESS");

    //Enter Postcode into Text box & Find Address
    await page.type('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9e3a3750ae560442c29bbbaf7b1f423f84', 'N33NP', {delay: 100});
    await delay(500);
    const fa = "#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9e455b794d8fee4fb7922e32157834fd7c"; //Selector for the Find Address button
    await page.click(fa);
    await page.waitForNavigation();
    console.log("Button 'Find Address' Pressed : SUCCESS");
    const add = "#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9eeaf8742f49cb4f7fa9bef99405b859f2 > option:nth-child(14)"; //Selector for Address
    await page.click(add);
    await page.waitForNavigation();
    console.log("Address Selected : SUCCESS");

    // Locate the Bin colors and related dates and assign them to a variable
    const bin1 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(2) > div:nth-child(1) > strong');
    const bincolor1 = await bin1?.evaluate(el => el.textContent);

    const collect1 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(2) > div:nth-child(2)');
    const collectday1 = await collect1?.evaluate(el => el.textContent);

    const bin2 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(4) > div:nth-child(1) > strong');
    const bincolor2 = await bin2?.evaluate(el => el.textContent);

    const collect2 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(4) > div:nth-child(2)');
    const collectday2 = await collect2?.evaluate(el => el.textContent);

    // Print the acquired information
    await delay(2000);
    console.clear();
    console.log('"%s" : "%s"', bincolor1, collectday1);
    console.log('"%s" : "%s"', bincolor2, collectday2);

    await browser.close();

})();