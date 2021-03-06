# csp-demo
A playground app for Content Security Policy (CSP) stuff

Favicon generated by https://www.favicon.cc/

## Local execution instructions
 1. Install dependencies with `npm install`
 2. Launch the site with `npm start`
 
## Project Layout
 1. Mustache Page Templates are located in the `templates` directory
 2. Public assets are located in the `public` directory
 3. Server code is in the `index.js` file
 
## CSP Notes

Content Security Policy or "CSP" is an extra layer of security usually added to web pages 
designed to prevent cross site scripting (XSS), data injection, and other attacks.
It works by restricting where a website can load resources such as executable code, styles,
embedded objects, images, et. al.

It is also designed to be backwards compatible so that browsers that don't support CSP and 
sites that don't implement CSP; will simply fall back to the standard `same-origin policy`.

### Implementation
CSP is typically implemented either via a HTTP Header or via a HTML `<meta>` tag in a page's header.

#### CSP via HTTP Headers
The HTTP Header name is `Content-Security-Policy`, though during initial implementation, testing, and debugging;
one may opt to use `Content-Security-Policy-Report-Only` instead. The difference between the two is that 
`Content-Security-Policy` enforces CSP by blocking the loading of non-compliant resources, while 
`Content-Security-Policy-Report-Only` only warns of non-compliant resources.

Example HTTP Headers:
```http
Content-Security-Policy: script-src 'self'
Content-Security-Policy-Report-Only: script-src 'self'; report-uri /csp-report-endpoint/
```

As seen in the examples above, the CSP headers consist of a HTTP Header name (`Content-Security-Policy`/`Content-Security-Policy-Report-Only`),
followed by the `:` delimeter, and then the Header value.

In the case of CSP the Header value contains the actual CSP "policy" which tells the browser how to restrict resource loading.

#### CSP via meta Tags
The meta tags work in a similar way, with the exception that `Content-Security-Policy-Report-Only` is 
not supported:

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'">
```

As seen above, the `meta` tag based implementation is comparable to the HTTP Header based implementation where
the header name is provided in the `http-equiv` tag attribute, and the CSP policy is provided in the `content`
attribute.

One caveat with `meta` tags is that they don't apply to html content that precedes them in the html document.

### CSP Policies
As mentioned earlier, CSP Policies are strings that specify how the browser should restrict access to various resources.
CSP Policies consist of one or more CSP Policy Directives delimited by semicolons `;`.
Further more each Policy Directive should consist of a string consisting of a "directive-name" seperated from a corresponding 
"directive-value" with a block of whitespace.

As an example:
```
Content-Security-Policy: default-src 'self'; img-src *; media-src cdn1.example.com cdn2.example.com; script-src scripts.example.com
```
The above CSP Policy header contains a CSP Policy with four directives:
 - `default-src 'self'` - with a directive name of `default-src` and directive value of `self`
 - `img-src *` - with a directive name of `img-src` and directive value of `*`
 - `media-src cdn1.example.com cdn2.example.com` - with a directive name of `media-src` and directive value of `cdn1.example.com cdn2.example.com`
 - `script-src scripts.example.com` - with a directive name of `script-src` and directive value of `scripts.example.com`

### CSP Directives
CSP Directives are typically used to manage page access to various resources, according to MDN they can be broadly categorized into the following
[categories](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#directives):
 - Fetch
 - Document
 - Navigation
 - Reporting
 - Other

For the purposes of this discussion, we are going to primarily focus on the "Reporting" and "Fetch" categories.

#### Reporting Directives
The "Reporting" directives pretty much just consist of the `report-uri` directive.
```
Content-Security-Policy: default-src 'none'; style-src cdn.example.com; report-uri /csp-reports
```
This `report-uri` tells the browser to `POST` a "violation report" contained in a JSON body to the specified URL ("/csp-reports" in the example above). For more details about this feature, please see MDN's excellent [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#enabling_reporting)

#### Fetch Directives
"Fetch" directives limit the pages ability to access certain type of resources as specifed by the directive.
These include the commonly seen `default-src`, `img-src`, `script-src`, and others.
In my mind, I see these directives as nodes on a tree where `default-src` is the fall back directive that governs all resource access that is not
specified by another more narrowly scoped directive such as `script-src`. `script-src` is used to manage which scripts can be loaded on to a page.
Further more, `script-src` can be even more narrowly scoped using the incubating children directives `script-src-elem` and `script-src-attr`
For more details about each policy directive, please visit the MDN [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#directives)


### Applicability
Nested

## Resources:
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 - https://www.w3.org/TR/CSP2/
 - https://csp-evaluator.withgoogle.com/
