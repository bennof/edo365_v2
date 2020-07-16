

export class users{
    constuctor(name){
        this.name=name;
    }

    /*
    ls(cb){}
    ls_group(name, cb){}
    search(){}


    get: function(OAuth, Id, Cb){
        oauth.get(OAuth, "https://graph.microsoft.com/beta/"+Id, "json" ,[], Cb);
      },
      list:   function (OAuth, Cb){
          oauth.get(OAuth,
              "https://graph.microsoft.com/beta/users/?$select=id,displayName,givenName,surname,mail",
              "json", [],
              get_concat.bind({oauth:OAuth, cb: Cb}));
      },
      list_by_group: function(OAuth, Gid, Cb){
          teams.get_gid(OAuth,Gid,function(S,D){
                  if( S === 200 ){
                      oauth.get(OAuth,
                          "https://graph.microsoft.com/beta/groups/"+D+"/members/?$select=id,displayName,givenName,surname,mail",
                          "json",
                          [],
                          get_concat.bind(this));
                  }
              }.bind({oauth:OAuth, cb: Cb})
          );
      },
      search: function (OAuth, Value, Cb){ // use values
          // explicite search
          var S = fold(function(K,V,Acc){return Acc+K+"+eq+'"+V+"'+and+"},"",Value).slice(0,-5);
          oauth.get(OAuth,
              "https://graph.microsoft.com/beta/users?$filter="+S+"&$select=id,displayname",
              "json",
              [],
              function(S,D){
                  if( S === 200 && D.value.length > 0){ // results
                      if (D.value.length === 1)// one hit
                          this.cb(S,D.value[0].id);
                      else  // multiple hits
                          this.cb(300, D.value);
                  } else { // more fuzzy search
                      S = fold(function(K,V,Acc){return Acc+"startswith("+K+",'"+V+"')+and+"},"",Value).slice(0,-5);
                      console.log(S);
                      oauth.get(this.oauth,
                          "https://graph.microsoft.com/beta/users?$filter="+S+"&$select=id,displayname",
                          "json",
                          [],
                          function(S,D){
                              if( S === 200 && D.value.length > 0){ // results
                                  if (D.value.length === 1)// one hit
                                      this.cb(S,D.value[0].id);
                                  else  // multiple hits
                                      this.cb(300, D.value);
                              } else {
                                  this.cb((S === 200)? 404 : S, D);
                              }
                          }.bind(this)
                      );
                  }

              }.bind({oauth:OAuth, cb: Cb})
          );
      }
  };*/
}