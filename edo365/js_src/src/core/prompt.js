
var notify_block = null;


export class Notify {
    constructor(id, title, content){
        if (notify_block == null){
            notify_block = document.createElement('div');
            notify_block.classList.add('notify_block');
            document.body.appendChild(notify_block);
        }
        this.id = id;
        if(document.getElementById(this.id+'_notify'))
            throw Error("Notify already exists!");
        var box = document.createElement('div');
        box.id = this.id+'_notify';
        box.classList.add('notify');
        var header = document.createElement('h1');
        header.innerHTML = title;
        box.appendChild(header);
        var body = document.createElement('div');
        if (typeof content == 'string')
            body.innerHTML += content;
        else
            body.appendChild(content);
        box.appendChild(body);
        notify_block.appendChild(box);
        this.elem = box;
    }

    exit(){
        this.elem.parentNode.removeChild(this.elem);
    }

    timeout(sec){
        setTimeout(this.exit,sec);
    }
}