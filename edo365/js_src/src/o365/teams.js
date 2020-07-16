//import { get } from "../../OneDrive/dev/dev/tabularrasa/src/js/net";

export function info(fun, gid,conn){
    conn.request(fun, 
        "GET", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/?$select=id,displayname",
        null, // body
        "text/json", // mime
        {} // params
    );
}

export function locate(fun, query, conn){
    info(function(state,res,header){
            if(state === 200 && res && res.value.length === 1 && res.value[0].id === Gid) { // it is a valid gid
                fun(200,query,header);
            } else {
                conn.request(function(state,res,header){
                        if( state === 200){
                            if( res.value.length === 1)
                                fun(state,res.value[0].id,header);
                            else if ( res.value.length > 1 )
                                fun(300,res.value,header);
                            else
                                fun(404,res,header);
                        } else {
                            fun(state,res,header);
                        }
                    }, 
                    "GET", 
                    "https://graph.microsoft.com/beta/groups?$filter=startswith(displayName,'"+query
                                +"')+or+startswith(mail,'"+query
                                +"')&$select=id,displayname",
                    null, // body
                    "text/json", // mime
                    {} // params
                );
                
            }
        },
        query,
        conn
    )
}


export function mk(fun, name, params, conn){
    var Conf ={
        "template@odata.bind": "https://graph.microsoft.com/beta/teamsTemplates('"+ (params.template || "standard") +"')",
        displayName: name,
        description: params.desc || "Auto Gen for:" + name,
        memberSettings: {
            allowCreateUpdateChannels: false,
            allowDeleteChannels: false,
            allowAddRemoveApps: false,
            allowCreateUpdateRemoveTabs: false,
            allowCreateUpdateRemoveConnectors: false
        },
        messagingSettings: {
            allowUserEditMessages: true,
            allowUserDeleteMessages: false
        },
        funSettings: {
            allowGiphy: true,
            giphyContentRating: "strict"
        }
    };

    if(params.owners) {
        var i,o = [];
        for(i=0;i<params.owners.length;i++)
          o.push("https://graph.microsoft.com/beta/users('"+Settings.owners[i]+"')");
        Conf["owners@odata.bind"] = o;
    }

    loacte(
        function(state,res,header){
            if(state != 200 ){
                conn.request(fun, 
                    "POST", 
                    "https://graph.microsoft.com/beta/teams",
                    JSON.stringify(conf), // body
                    "application/json", // mime
                    {"Content-Type": "application/json"} // params
                );
            } else {
                fun(409,res,header);
            }
        },
        name,
        conn
    );
}

/**
 * 
 * @param {*} fun removes a team
 * @param {*} gid 
 * @param {*} conn 
 */
export function rm(fun, gid, conn){
    conn.json_request(fun,"DELETE","https://graph.microsoft.com/beta/groups/"+gid,null,{});
}

/**
 * list all teams
 * @param {*} fun 
 * @param {*} conn 
 */
export function ls(fun, conn) {
    conn.json_request(fun, "GET", "https://graph.microsoft.com/beta/groups/?$select=id,displayname,createdDateTime,expirationDateTime&$filter=groupTypes/any(c:c+eq+'Unified')", null,{});
}

export function add_member(fun, conn){
    conn.request(fun, 
        "POST", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/members/$ref",
        JSON.stringify({"@odata.id": "https://graph.microsoft.com/beta/users/"+uid}), // body
        "", // mime
        {"Content-Type": "application/json"} // params
    );
}
export function rm_member(fun, gid, uid, conn){
    conn.request(fun, 
        "DELETE", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/members/"+uid+"/$ref",
        null, // body
        "", // mime
        {} // params
    );
}
export function ls_members(fun, gid, conn){
    conn.request(fun, 
        "GET", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/members/?$select=id,displayName,givenName,surname,mail",
        null, // body
        "text/json", // mime
        {} // params
    );
}

export function add_owner(fun, gid, uid, conn){
    conn.request(fun, 
        "POST", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/owners/$ref",
        JSON.stringify({"@odata.id": "https://graph.microsoft.com/beta/users/"+uid}), // body
        "", // mime
        {"Content-Type": "application/json"} // params
    );
}
export function rm_owner(fun, gid, uid, conn){
    conn.request(fun, 
        "DELETE", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/owners/"+uid+"/$ref",
        null, // body
        "", // mime
        {} // params
    );
}
export function ls_owner(fun, gid, conn){
    conn.request(fun, 
        "GET", 
        "https://graph.microsoft.com/beta/groups/"+gid+"/owners/?$select=id,displayName,givenName,surname,mail",
        null, // body
        "text/json", // mime
        {} // params
    );
}



/**
 * get all groups
 * @param {*} fun handler function f 
 * @param {*} conn office 365 connection
 */
export function list_all_groups(fun, conn) {
    conn.json_request(fun, "GET", "https://graph.microsoft.com/beta/groups/?$select=id,displayname,createdDateTime,expirationDateTime", null, {});
}