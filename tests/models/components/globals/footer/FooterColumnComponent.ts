import { Locator } from "@playwright/test";


export default class FooterColumnComponent {
    protected component: Locator;
    private titleSel = "h3";
    private linkSelector = "li a";
    constructor (componnent: Locator) {
        this.component = componnent;
    }

    public async getTitle(): Promise<string> {
        return await this.component.locator(this.titleSel).innerText();
    }

    public async getLinkTexts(): Promise<string[]> {
        const linkTexts:string[] = [];
        const linkLocators = await this.component.locator(this.linkSelector).all();
        for(const linkLocator of linkLocators) {
            const linkText = await linkLocator.textContent();
            linkTexts.push(linkText || '');
        }
        return linkTexts;
    }

    public async getLinkHrefs(): Promise<string[]> {
        const linkHrefs:string[] = [];
        const linkLocators = await this.component.locator(this.linkSelector).all();
        for(const linkLocator of linkLocators) {
            const linkHref = await linkLocator.getAttribute('href');
            linkHrefs.push(linkHref || '');
        }
        return linkHrefs;
    }
}