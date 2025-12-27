import PageBodyComponent from "../components/PageBodyComponent";
import BasePage from "./BasePage";

export default class Homepage extends BasePage {

    public pageBodyComponent(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.SELECTOR));
    }
}