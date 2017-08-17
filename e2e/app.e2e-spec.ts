import { QchainFrontendPage } from './app.po';

describe('qchain-frontend App', () => {
  let page: QchainFrontendPage;

  beforeEach(() => {
    page = new QchainFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
