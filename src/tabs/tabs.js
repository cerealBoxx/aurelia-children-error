import {inject, customElement, bindable, useView, children} from 'aurelia-framework';
import {customElementHelper} from './custom-element-helper';

@customElement('tabs')
@inject(Element)
@children({name:'tabs', selector: "tab"})
export class Tabs  {

  activeTab = undefined;

  constructor(element) {
    this.element = element;
    console.log('construct');
    console.log(this.tabs);
    const scrollAttr = element.attributes.getNamedItem('scroll');
    if (scrollAttr !== null) {
      this.topShiftInPixels = scrollAttr.nodeValue;
      element.style.display = 'block';
      element.style.height = `calc(100% - ${this.topShiftInPixels}px)`;
    }
  }

  attached() {
        console.log(this.tabs); // Returns undefined on promise resolve!!!
        this.tabs.forEach(tab => {
          if (tab.active) {
            this.activeTab = tab;
          }

          tab.hide();
        });

        this.activeTab.show();

  }

  onTabClick(tab) {
    customElementHelper.dispatchEvent(this.element, 'change', {
      tab: tab,
      test: 'baba'
    });

    this.activeTab.hide();

    tab.show();
    this.activeTab = tab;
  }

}
