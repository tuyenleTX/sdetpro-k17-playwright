import { Locator } from "@playwright/test";
import InformationColumnComponent from "./footer/InformationColumnComponent";
import CustomerServiceColumnComponent from "./footer/CustomerServiceColumnComponent";

export default class FooterComponent {
    public static readonly SELECTOR = ".footer";
    constructor(private component: Locator) {
        this.component = component;
    }

    public informationColumnComponent(): InformationColumnComponent {
        return new InformationColumnComponent(this.component.locator(InformationColumnComponent.SELECTOR));
    }

    public customerServiceColumnComponent(): CustomerServiceColumnComponent {
        return new CustomerServiceColumnComponent(this.component.locator(CustomerServiceColumnComponent.SELECTOR));
    }

    public async powerText(): Promise<string> {
        return await this.component.locator('.footer-poweredby').innerText();
    }
}