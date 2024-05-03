// Script Name: Bindicator

const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new", args: ['--start-maximized'] });
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
    await page.click('#title-0 > a'); //Click Selector for 'Find your household collection day' 
    await page.waitForNavigation();
    console.log("Button 'Find your household collection day' Pressed : SUCCESS");

    //Enter Postcode into Text box & Find Address
    await page.type('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9e3a3750ae560442c29bbbaf7b1f423f84', 'N33NP', {delay: 100});
    await delay(500);
    await page.click('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9e455b794d8fee4fb7922e32157834fd7c'); //Click Selector for the Find Address button
    await page.waitForNavigation();
    console.log("Button 'Find Address' Pressed : SUCCESS");
    await page.click('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9eeaf8742f49cb4f7fa9bef99405b859f2 > option:nth-child(14)'); //Click Selector for Address
    await page.waitForNavigation();
    console.log("Address Selected : SUCCESS");

    // Locate the Bin colors and related dates and assign them to variables
    const bin1 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(2) > div:nth-child(1) > strong');
    const bintext1 = await bin1?.evaluate(el => el.textContent);
    bincolor1 = bintext1.replace(' - weekly collection','');

    const collect1 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(2) > div:nth-child(2)');
    const collecttext1 = await collect1?.evaluate(el => el.textContent);
    collectday1 = collecttext1.replace('Next collection date:   ','');

    const bin2 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(4) > div:nth-child(1) > strong');
    const bintext2 = await bin2?.evaluate(el => el.textContent);
    bincolor2 = bintext2.replace(' - weekly collection','');

    const collect2 = await page.waitForSelector('#MainContent_CUSTOM_FIELD_808562d4b07f437ea751317cabd19d9ed93a174c32b14f839b65f6abc42d8108_div > div > div:nth-child(4) > div:nth-child(2)');
    const collecttext2 = await collect2?.evaluate(el => el.textContent);
    collectday2 = collecttext2.replace('Next collection date:   ','');

    // Print the stored information
    await delay(500);
    console.clear();
    console.log('"%s" : "%s"', bincolor1, collectday1);
    console.log('"%s" : "%s"', bincolor2, collectday2);

    // Save the data to a json
    var fs = require('fs');
    fs.writeFile('./data.json',`{"text" : "BIN 1 : \n${bincolor1} : ${collectday1}\n\nBIN 2 : \n${bincolor2} : ${collectday2}"}`,()=>{
        console.log('Bin Data Saved to data.json');
    })

    await browser.close();

})();