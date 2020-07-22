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


const CLEAN_CODE = '[clean-code]';
const TAG_VALUE = 'jsval';

// Create clean code
var EntityMap = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': '&quot;',"'": '&#39;',"/": '&#x2F;'};
function escape_html(string) { return String(string).replace(/[&<>"'\/]/g, function (s) { return EntityMap[s]; }); };
function clean_code(Target) {
    var i, Elem, New, CodeElems = Target.querySelectorAll(CLEAN_CODE);
    for(i=0; i<CodeElems.length; i++) {
        Elem = CodeElems[i];
        New = escape_html(Elem.innerHTML)
        Elem.innerHTML = New;
    }
};



// dynamic values
function replace_vals(target, ctx = window ){
    var i, cur, val, vals = target.querySelectorAll('['+TAG_VALUE+']');
    for (i=0; i<vals.length; i++){
        cur = vals[i];
        val = cur.getAttribute(TAG_VALUE);
        if(!val) {
            val = cur.innerText;
            cur.setAttribute(TAG_VALUE,val)
        }
        try {
            cur.innerHTML = eval.call(ctx,val);
        } catch(e){
            console.error("ERROR: replace val!" + e);
        }
    }
}



/**
 * process all elements with jsdox attributes
 * @param {*} target HTML element
 * @param {*} ctx JS context for script tags, default is window
 */
export function process(target, ctx = window){
    clean_code(target); // clean code elements
    //load(target, ctx); // first load and process dependencies
    //exec_js(target,ctx); // execute js 
    replace_vals(target,ctx); // replace values

    if (typeof MathJax != "undefined") 
        MathJax.typesetPromise();
}