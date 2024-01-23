const {normaliseURL} = require('./crawl')
const {test, expect} = require('@jest/globals')

test('normalizerURL strip protocols',()=>{
    const input = 'https://boot.dev/path';
    const actual = normaliseURL(input);
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected)

})

test('normalizerURL strip slashes',()=>{
    const input = 'https://boot.dev/path/';
    const actual = normaliseURL(input);
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected)

})

test('normalizerURL capitals',()=>{
    const input = 'https://BLOG.boot.dev/path';
    const actual = normaliseURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected)

})

test('normalizerURL strip http',()=>{
    const input = 'http://blog.boot.dev/path';
    const actual = normaliseURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected)

})