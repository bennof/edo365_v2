/* Copyright (c) 2018-2020 Benjamin 'Benno' Falkner
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

/** 
* @module jsdox/url
*/


/**
 * Scan and return header fields of XHTTP requests
 * @param {*} Res a Xhttp response object
 * @returns a map of header fields
 */
export function get_header(res){
    var i, elem, key, value, r={}, hl = res.getAllResponseHeaders().trim().split(/[\r\n]+/);
    for ( i=0; i<hl.length; i++ ) {
        elem = hl[i].split(': ');
        key   = elem.shift();
        value = elem.join(': ');
        r[key] = value;
    }
    return r;
}
  
/**
 * easier access to url encoded hash fields
 * @param {*} URL a url like window.location
 * @returns a map of hash values in url 
 */
export function get_hash(url){
    var i, r1, res={}, hash = (url.hash.substr(1)).split("&");
    for (i=0; i<hash.length; i++) {
        r1 = hash[i].split("=");
        res[r1[0]]=decodeURIComponent(r1[1]) || r1[0];
    }
    return res;
}
  

/**
 * easier access to url encoded query fields
 * @param {*} URL a url like window.location
 * @returns a map of query values in url 
 */
export function get_query(url){
    var i, r1, res={}, query = (url.search.substr(1)).split("&");
    for (i=0; i<query.length; i++) {
        r1 = query[i].split("=");
        res[r1[0]]=r1[1] || r1[0];
    }
    return res;
}

export function encode_base64(input){
    var json = JSON.stringify(input);
    var base64 = btoa(json).replace(/=+$/gm,'');
    return base64.replace(/\+/g, '-').replace(/\//g,'_');
}

export function decode_base64(input){
    var base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    var json = atob(base64);
    return JSON.parse(json);
}