export class Mail {
    constructor(subject){
        this.message = {
            subject: subject,
            importance: "High",
            body: {
                contentType:"Text",
                content: ""
            },
            toRecipients: [],
            attachments: []
        }
    }

    write(mesg){
        this.message.body.content += mesg;
    }

    recipient(r){
        if (typeof r == "string")
            this.message.toRecipients.push({ emailAddress: { address: r }})
        else if (Array.isArray(r)){
            for(var i=0; i<Recipient.length; i++)
                this.message.toRecipients.push({ emailAddress: { address: r[i] }})
        } else
            throw TypeError("recipient requests a string or an array of strings");
    }

    attachment(file) {
        this.message.attachments.push({
            "@odata.type": "microsoft.graph.fileAttachment",
            name: file.name,
            contentType: file.mime,
            contentBytes: atob(toUTF8(file.body))//base64
        });
    }

    send(conn){
        conn.request(function(s,d){},'POST',"https://graph.microsoft.com/beta/me/sendMail",JSON.stringify(this),{"Content-Type": "application/json"});
    }
}








export var mail = (function(){
    return {
      send: function (Conn,Recipient,Subject,Body,Attachments){
        // basic Mail
        var Mail = { message: {
          subject: Subject,
          importance: "High",
          body:{
            contentType:"Text",
            content: Body
          },
          toRecipients: [],
          attachments: []
        }};
        // add recipients
        if (typeof Recipient == "string")
          Mail.message.toRecipients.push({ emailAddress: { address: Recipient }})
        else
          for(var i=0; i<Recipient.length; i++)
            Mail.message.toRecipients.push({ emailAddress: { address: Recipient[i] }})
  
  
        // add Attachments
        if (Attachments) {
          if(typeof Attachments == "string")
            Mail.message.attachments.push({
              "@odata.type": "microsoft.graph.fileAttachment",
              name: Attachments.name,
              contentType: Attachments.mime,
              contentBytes: atob(toUTF8(Attachments.body))//base64
            });
          else
            for(var i=0; i<Attachments.length; i++)
              Mail.message.attachments.push({
                "@odata.type": "microsoft.graph.fileAttachment",
                name: Attachments[i].name,
                contentType: Attachments[i].mime,
                contentBytes: base64_enc(toUTF8(Attachments[i].body))//base64
              })
  
        }
        console.log(Mail)
        //send
        oauth.post(OAuth,
            "https://graph.microsoft.com/beta/me/sendMail",
            "",
            {"Content-Type": "application/json"},
            JSON.stringify(Mail),function(S,D){console.log(S);console.log(D)});
      }
    };
  })();