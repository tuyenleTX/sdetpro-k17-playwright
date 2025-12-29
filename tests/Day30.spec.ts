import test from "@playwright/test";
import Homepage from "./models/pages/HomePage";

test('Test POM - Reusing Base Component', async ({ page }) => {
    await page.goto('/');
    const homepage = new Homepage(page);

    const footerComponent = homepage.footerComponent();
    const informationColumnComponent = footerComponent.informationColumnComponent();
    const infoTitle = await informationColumnComponent.getTitle();
    console.log(`Information title: ${infoTitle}`);
    const linkTexts = await informationColumnComponent.getLinkTexts();
    

    console.log(linkTexts);
    const hrefs = await informationColumnComponent.getLinkHrefs();
    console.log(hrefs);
    console.log(`---------------`);

    const customerServiceColumnComponent = footerComponent.customerServiceColumnComponent();
    const custServiceTitle = await customerServiceColumnComponent.getTitle();
    console.log(`Customer Service title: ${custServiceTitle}`);

    const linkTextsOfCustomerService = await informationColumnComponent.getLinkTexts();
    console.log(linkTextsOfCustomerService);

    const hrefsOfCustService = await informationColumnComponent.getLinkHrefs();
    console.log(hrefsOfCustService);
    console.log(`---------------`)
})