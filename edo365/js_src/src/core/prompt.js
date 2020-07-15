
var notify_block = null;


class Notify {
    constructor(id, title, content){
        if (notify_block == null){
            notify_block = document.createElement('div');
            notify_block.classList.add('notify_block');
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
        if (typeof content == 'string')
            box.innerHTML += content;
        else
            box.appendChild(content);
        notify_block.appendChild(box);
        this.elem = box;
    }

    exit(){
        notify_block.removeChild(this.elem);
    }

    timeout(sec){
        setTimeout(this.exit,sec);
    }
}