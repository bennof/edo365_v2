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

import {get_hash, decode_base64, encode_base64, get_header} from '../core/url'
import {map} from '../core/tools';

// used constants
const  CONN_CFG = "_conn_cfg";
const  CONN_STATE = "_conn_state";
const  REFRESH_REQ = "_refresh_request";
const  LOCATION = "_location";

/**
 * Office 365 Connection Class
 */
export class Connection {
    
    /**
     * constructor for a connection
     * @param {*} name name of the connection 
     * @param {*} cfg a config object (should be undefined)
     */
    constructor(name, cfg){
        // set name of the connection
        this.name = name;

        var hash = get_hash(window.location); //store all values passed as hash (not seen by server)
        
        // try to get a config
        if(cfg) { // config is passed directly (unsecure)
            this.config = cfg;
            this.save_config(); // safe data for session
        } else if (hash[this.name+CONN_CFG]){ // decode config from hash
            this.config = decode_base64(hash[this.name + CONN_CFG]);
            this.save_config(); // safe data for session
        } else if ((cfg = sessionStorage.getItem(this.name + CONN_CFG)) != null){ // get data from session
            this.config = JSON.parse(cfg);
        } else if ((cfg = localStorage.getItem(this.name + CONN_CFG)) != null){ // get data from store
            this.config = JSON.parse(cfg);
            this.save_config(); // safe data for session
        } else { // use empty setting
            this.config = {
                tenant: "", 
                login: { 
                    link: "",
                    params: {
                        client_id: "",
                        response_type: "",
                        redirect_uri: "",
                        scope: "",
                        nonce: "",
                        state: ""
                    }
                },
                logout: {
                    link: "",
                    params: {}
                }

            }
            this.save_config(); // safe data for session
        }

        // checking for login information
        var state = localStorage.getItem(this.name + CONN_STATE) || [];
        // state info from url hash overrides saved state
        this.access_token = hash.access_token || state.access_token || null;
        this.refresh_token = hash.refresh_token || state.refresh_token || null;
        this.id = state.id || null;
        if (hash.id_token){
            this.id = base64UrlDecode(hash.id_token.split('.')[1]); // JWT data element
        }

        // a refresh is send
        state = decode_base64(hash.state);
        if (state.refresh == true){
            var url = new URL(window.location);
            url.hash='';
            if (hash.error) {
                window.parent.postMessage({state: hash.error, desc: hash.error_description},url);
            } else {
                window.parent.postMessage({state: 'ok', access_token: params.access_token},url);
            }
            return;
        }

        // error 
        if (hash.error) {
            alert(hash.error+'\n'+hash.error_description);
            return;
        }

        // setup message handler for refresh
        window.addEventListener('message', function(event){
            if(event.data.state){
                if(event.data.state === 'ok'){
                    this.access_token = event.data.access_token;
                    this.save_state();
                } else {
                    alert(event.data.state+'\n'+event.data.error_description);
                }
                document.body.removeChild(document.getElementById(this.name+"_refresh"));
            }
        }.bind(this),false);

        this.save_state(); // save state
        this.requests = []; // store request, for serialisation
        this.req = false;

        // check for state arguments
        if (state.location && window.location.pathname != state.location) {
            window.location.pathname = state.location;
        }
    }

    /**
     * open a connection / login
     */
    open(){
        if(!this.config.login.link){
            alert("Incomplet connection config - please load or create a configuration");
            return;
        }
        // build link
        var link = this.config.login.link;
        for (var param in this.config.login.params) {
            link += encodeURIComponent(param)+"="
                +encodeURIComponent(this.config.login.params[param])+"&";
        }
        link += encodeURIComponent(state)+"="
                +encode_base64({location: window.location.pathname})+"&";

        window.location.href = link;
    }

    /**
     * close connection / logout
     */
    close(){
        sessionStorage.removeItem(this.name+CONN_STATE); // delete session storage
        // unset all values
        this.access_token = null;
        this.refresh_token = null;
        this.id = null;

        // build link
        var link = this.config.logout.link;
        for (var param in this.config.logout.params) {
            link += encodeURIComponent(param)+"="
                +encodeURIComponent(this.config.logout.params[param])+"&";
        }
        window.location.href = link;
    }

    /**
     * refresh connection
     */
    refresh(){
        // build link
        var link = this.config.login.link;
        for (var param in this.config.login.param) {
            link += encodeURIComponent(param)+"="
                +encodeURIComponent(this.config.login.param[param])+"&";
        }
        link += encodeURIComponent('prompt')+"=" //avoid login prompt
            +encodeURIComponent('none')+"&";
        if (this.id.email)
            link += encodeURIComponent('login_hint')+"="
                +encodeURIComponent(this.id.email)+"&";
        link += encodeURIComponent(state)+"="
            +encode_base64({refresh: true, location: window.location.pathname})+"&";

        if(document.getElementById(this.name+"_refesh"))
            return; // avoid multiple refreshs

        // create hidden iframe
        var iframe = document.createElement('iframe');
        iframe.id = this.name+"_refesh";
        iframe.style.display = "none";
        iframe.src = link;
        document.body.appendChild(iframe);
    }

    /**
     * perform a request async
     * @param {*} fun 
     * @param {*} method 
     * @param {*} url 
     * @param {*} body
     * @param {*} param 
     */
    request(fun, method, url, body, param){
        this.requests.push({
            fun: fun,
            method: method,
            url: url,
            body: body,
            param: param
        });
        this.process_requests();
    }

    json_request(fun, method, url, body, param){
        this.requests.push({
            fun: json_req_handle.bind({conn: this,fun: fun}),
            method: method,
            url: url,
            body: body,
            param: param
        });
        this.process_requests();
    }

    /**
     * perform requests
     */
    process_requests(){
        //check for open requests
        if(this.req)
            return; 
        var r = this.requests.shift();
        if (r){
            this.req = true
            var req = new XMLHttpRequest();
            req.open(r.method, r.url, true);
            req.setRequestHeader("Authorization", "Bearer "+this.access_token);
            map(req.setRequestHeader.bind(req),r.param);
            req.conn = this;
            req.fun = r.fun;
            req.body = r.body;
            req.onreadystatechange = function(){
                if(req.readyState === 4 ){
                    //missing handle refresh error
                    var header = get_header(req);
                    req.fun(req.status, req.response, header);
                    req.conn.req = false;
                    req.conn.process_requests();
                }
            }
            if (r.body)
                req.send(r.body);
            else
                req.send();
            return req;
        }
    }



    /**
     * save config 
     * @param {*} target to save to (default is sessionStorage)
     */
    save_config(target = sessionStorage){
        target.setItem(this.name+CONN_CFG,JSON.stringify(this.config));
    }

    /**
     * save state
     * @param {*} target to save to (default is sessionStorage)
     */
    save_state(target = sessionStorage){
        target.setItem(this.name+CONN_STATE,JSON.stringify({access_token: this.access_token, refresh_token: this.refresh_token, id: this.id}));
    }

    /**
     * convert config to a url hash element
     */
    config_to_url(){
        return this.name+CONN_CFG+"="+base64UrlEncode(this.config);
    }

}


function json_req_handle(state,body,header){
    if(state === 200) {
        var json = JSON.parse(body)
        this.data = (this.data) ? this.data.concat(json.value) : json.value;
        if(json["@odata.nextLink"]) { // if there is more data
            this.conn.request(json_req_handle.bind(this),'GET',json["@odata.nextLink"],null,null);
        } else { //transfer complete
            this.fun(state,this.data, header);
        }
    } else {
        this.fun(state,(this.data)? this.data:[],header);
    }
}