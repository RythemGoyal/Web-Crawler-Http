const { normaliseURL, getUrlsFromHtml } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizerURL strip protocols", () => {
  const input = "https://boot.dev/path";
  const actual = normaliseURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizerURL strip slashes", () => {
  const input = "https://boot.dev/path/";
  const actual = normaliseURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizerURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normaliseURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizerURL strip http", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normaliseURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml absolute", () => {
  const inputHtmlBody = `
    <html>
        <body>
                <a href="https://blog.boot.dev/path"
                    Boot.dev Blog
                </a>
        </body>
    </html>
    `;

  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml relative", () => {
  const inputHtmlBody = `
    <html>
        <body>
                <a href="/path/"
                    Boot.dev Blog
                </a>
        </body>
    </html>
    `;

  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml both", () => {
  const inputHtmlBody = `
    <html>
        <body>
                <a href="https://blog.boot.dev/path"
                    Boot.dev Blog 1
                </a>
                <a href="/path/"
                    Boot.dev Blog 2
                </a>
        </body>
    </html>
    `;

  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path","https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml invalid", () => {
    const inputHtmlBody = `
      <html>
          <body>
                  <a href="invalid"
                      Invalid
                  </a>
          </body>
      </html>
      `;
  
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected);
  });