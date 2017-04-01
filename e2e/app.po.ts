import { browser, element, by } from 'protractor';

export class RestaurantAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pie-root h1')).getText();
  }
}
