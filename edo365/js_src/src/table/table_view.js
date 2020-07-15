
import {Table} from './table';

export class TableView {

    constructor(table, target){
        this.table = table 
        if(typeof target == 'string')
            target = document.querySelector(target);
        this.target = target
    }

    draw(){

        var caption = this.target.querySelector('caption');
        var tab = this.target;
        tab.innerHTML = "";
        var cell, chk, row = document.createElement('tr');
        cell = document.createElement('td');
        chk = document.createElement('input');
        chk.type = "checkbox"; 
        chk.name = this.target.id+"_chk_all"; 
        chk.id =  chk.name; 
        cell.appendChild(chk)
        row.appendChild(cell);
        for(var i=0;i<this.table.header.length;i++){
            cell = document.createElement('th');
            cell.innerText = this.table.header[i];
            row.appendChild(cell);
        }
        tab.appendChild(row);
        for(var i=0; i<this.table.length(); i++){
            row = document.createElement('tr');
            cell = document.createElement('td');
            chk = document.createElement('input');
            chk.type = "checkbox"; 
            chk.name = this.target.id+"_chk_"+i; 
            chk.pos_id = i; 
            chk.id =  chk.name; 
            cell.appendChild(chk)
            row.appendChild(cell);
            for(var j=0; j<this.table.header.length; j++){
                cell = document.createElement('td');
                cell.innerText = this.table.data[i][j];
                row.appendChild(cell);
            }
            tab.appendChild(row);
        }
        tab.appendChild(caption);
        tab.onclick = this.on_click;
        
    }

    update(){}

    on_click(e){
        var row = null;
        if ( e.target.nodeName == 'TR' ){
            row = e.target;
        } else if (e.target.parentNode.nodeName == 'TR') {
            row = e.target.parentNode;
        } else {
            return;
        }
        row.childNodes[0].childNodes[0].checked ^= true;
        console.log(row);
    }

    get_selected(){
        var row, chk, r = [];
        for(var i = 1; i < this.target.childElementCount; i++){
            var row = this.target.childNodes[i];
            if(row.nodeName == 'TR'){
                chk = row.childNodes[0].childNodes[0];
                if (chk.checked)
                    r.push(chk.pos_id);
            }
        }
        return r;
    }
}