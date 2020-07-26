var notify_block = null;

export class Notify {
    constructor(id, title, content){
        this.id = id
        if (notify_block == null){
            notify_block = document.createElement('div');
            notify_block.classList.add('notify_block');
            document.body.appendChild(notify_block);
        }
        if(document.getElementById(this.id+'_notify'))
            throw Error("Notify already exists!");
        var box = document.createElement('div');
        box.classList.add('notify');
        var header = document.createElement('h1');
        header.innerHTML = title;
        box.appendChild(header);
        var exit = document.createElement('button');
        exit.style.float = 'right';
        exit.innerText='x';
        exit.onclick = this.exit.bind(this);
        header.appendChild(exit);
        var body = document.createElement('div');
        body.classList.add('body')
        if (typeof content == 'string')
            body.innerHTML += content;
        else
            body.appendChild(content);
        box.appendChild(body);
        notify_block.appendChild(box);
        this.target = box;
        this.body = body;
    }

    exit(){
        notify_block.removeChild(this.target);
    }

    timeout(sec){
        setTimeout(this.exit.bind(this),sec*1000);
    }
}

//<progress id="file" value="32" max="100"> 32% </progress>

export class ProgressNotify extends Notify {
    constructor(title, max, value=0){
        var pb = document.createElement('progress');
        pb.max = max;
        pb.value = value;
        super(title,pb);
        this.pb = pb;
    }

    inc(){
        this.pb.value++;
    }

    set(value){
        this.pb.value = value;
    }
}