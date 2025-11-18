import { BaseModal } from "../base.modal";

export class DeleteModal extends BaseModal {
    readonly uniqueElement = this.page.locator("div[name='confirmation-modal']");

    readonly title = this.uniqueElement.locator('h5');
    readonly closeButton = this.uniqueElement.locator('button.btn-close');
    readonly modalMessage = this.uniqueElement.locator('p');
    readonly deleteButton = this.uniqueElement.locator("button[type='submit']");
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

    async clickClose() {
        await this.closeButton.click();
    }

    async clickDelete() {
        await this.deleteButton.click();
    }
    
    async clickCancel() {
        await this.cancelButton.click();
    }
}
