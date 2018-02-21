import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for test', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be test', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('test');
    })
  });

  it('navbar-brand should be placilo-po-povzetju-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('placilo-po-povzetju-network@0.0.1');
  });

  
    it('Izdelek component should be loadable',() => {
      page.navigateTo('/Izdelek');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Izdelek');
    });

    it('Izdelek table should have 6 columns',() => {
      page.navigateTo('/Izdelek');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Narocilo component should be loadable',() => {
      page.navigateTo('/Narocilo');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Narocilo');
    });

    it('Narocilo table should have 8 columns',() => {
      page.navigateTo('/Narocilo');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  
    it('Posiljka component should be loadable',() => {
      page.navigateTo('/Posiljka');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Posiljka');
    });

    it('Posiljka table should have 7 columns',() => {
      page.navigateTo('/Posiljka');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
