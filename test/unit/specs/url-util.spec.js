import { should } from 'chai';  // Using Should style
import urlUtil from '../../../src/renderer/store/modules/url-util.js';

import {createValidUrlFromFragment} from '../../../src/renderer/store/modules/url-util.js';
should();  // Modifies `Object.prototype`

describe('url util default signature', () => {
  it('should exist', () => {
    urlUtil.should.exist;
  });
  describe('createValidUrlFromFragment:signature', () => {
    it('should return an object', () => {
      let result = createValidUrlFromFragment('');
      result.should.be.an('object');
    })
    it('should specify if string should be searched', () => {
      let result = createValidUrlFromFragment('');
      result.isSearch.should.exist;
    })
    it('use boolean for isSearch', () => {
      let result = createValidUrlFromFragment('');
      result.isSearch.should.be.a('boolean');
    })
    it('should contain the original input', () => {
      let input = 'hi mom';
      let result = createValidUrlFromFragment(input);
      result.input.should.eql(input);
    })
    it('should return a normalized url as a string', () => {
      let input = 'hi mom';
      let result = createValidUrlFromFragment(input);
      result.normalized.should.be.a('string');
    })
    
  })
  describe('createValidUrlFromFragment:guards', () => {
    it('should throw a type error for non-string inputs', () => {
      let input = 42;
      function uhOh(){
        let result = createValidUrlFromFragment(input);
      }
      uhOh.should.throw(TypeError);
    })
    it('should not be able to discern pre-cast primitives', () => {
      let input = 'null'; //looks like a null, but ain't
      function uhOh(){
        let result = createValidUrlFromFragment(input);
      }
      uhOh.should.not.throw(TypeError);
    })
  });

  describe('createValidUrlFromFragment:happy', () => {
    let base = {};
    beforeEach(()=>{
      base = {
        isSearch: false,
        query: '',
        input: '',
        normalized: ''
      }
    })
    describe('add protocol to url-like fragments', ()=>{
      it('should visit amazon.com', () =>{
        var input = 'amazon.com';
        Object.assign(base, {
          input: input,
          normalized: `http://${input}`
        })
        let result = createValidUrlFromFragment(input);
        result.should.eql(base);
      })
      it('should visit ip addresses', () =>{
        var input = '10.0.0.1';
        Object.assign(base, {
          input: input,
          normalized: `http://${input}`
        })
        let result = createValidUrlFromFragment(input);
        result.should.eql(base);
      })
    })

    describe('pass through strings that satisfy built in url parser', ()=>{
      let happyUrls = [
        'http://google.com',
        'https://google.com',
        'http://www.ibm.com/developerworks/news/dw_dwtp.rss',
        'http://myotherportal.com:1234/sitemap',
        'http://www-01.ibm.com/software/swnews/swnews.nsf/swnewsrss?openview&RestrictToCategory=lotus',
        'http://myportal.com:10040/wps/ibmsoftwarenews/swnews.nsf/swnewsrss?openview&RestrictToCategory=lotus'
      ]

      happyUrls.forEach((candidate)=>{
        it('should pass for ' + candidate, () =>{
          Object.assign(base, {
            input: candidate,
            normalized: candidate
          })
          let result = createValidUrlFromFragment(candidate);
          result.should.eql(base);
        })
      })
    })
  })

  describe('createValidUrlFromFragment:sad', () => {
    // search as a failure mode
    describe('recast as search', ()=>{
      let base = {};
      beforeEach(()=>{
        base = {
          isSearch: true,
          query: '',
          input: '',
          normalized: ''
        }
      })
      it('should search plain text', ()=>{
        var input = 'hello';
        let result = createValidUrlFromFragment(input);
        Object.assign(base, {
          query: input,
          input: input,
          normalized: ''
        })
        result.should.eql(base)
      })
    })
  })

});

/*
http://google.com
https://google.com
http://www.ibm.com/developerworks/news/dw_dwtp.rss
http://myotherportal.com:1234/sitemap

http://www-01.ibm.com/software/swnews/swnews.nsf/swnewsrss?openview&RestrictToCategory=lotus
http://myportal.com:10040/wps/ibmsoftwarenews/swnews.nsf/swnewsrss?openview&RestrictToCategory=lotus


*/