import { Locator } from "@playwright/test";
import ProductItemComponent from "./ProductItemComponent";

export default class PageBodyComponent {

    public static readonly SELECTOR = '.page-body';

    constructor(private component: Locator) {
        this.component = component;
    }

    public async productItemComponentList(): Promise<ProductItemComponent[]> {
        //Find all locators for product items
        const productItemList = await this.component.locator(ProductItemComponent.SELECTOR).all();
        
        //Map found locators into ProductItemComponent
        return productItemList.map (locator => new ProductItemComponent(locator));
    }
}