// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
    readonly emailInput = this.page.locator('#emailinput');
    readonly passwordInput = this.page.locator('#passwordinput');
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });
    readonly loginPageTitle = this.page.locator('p.lead');
    readonly uniqueElement = this.loginPageTitle;

    async fillCredentials(credentials: Partial<ICredentials>) {
        if (credentials.username) await this.emailInput.fill(credentials.username);
        if (credentials.password) await this.passwordInput.fill(credentials.password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

}
