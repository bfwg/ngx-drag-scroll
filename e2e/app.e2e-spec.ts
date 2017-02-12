import { Angular2DragScrollPage } from './app.po';

describe('angular2-drag-scroll App', function() {
  let page: Angular2DragScrollPage;

  beforeEach(() => {
    page = new Angular2DragScrollPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
