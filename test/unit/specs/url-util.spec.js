import { should } from 'chai';  // Using Should style
import urlUtil from '../../../src/renderer/store/modules/url-util.js';
should();  // Modifies `Object.prototype`

describe('url util default signature', () => {
  it('should exist', () => {
    urlUtil.should.exist;
  });
});