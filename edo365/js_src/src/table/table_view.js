
import {Table} from './table';

export class TableView {

    constructor(table, target){
        this.table = table 
        if(typeof target == 'string')
            target = document.querySelector(target);
        this.target = target;
        this.head = null;
        this.body = null;
    }

    draw(){
        var caption = this.target.querySelector('caption');
        var tab = this.target;
        tab.innerHTML = "";
        var cell, chk, row = document.createElement('tr');
        cell = document.createElement('th');
        //chk = document.createElement('input');
        //chk.type = "checkbox"; 
        //chk.name = this.target.id+"_chk_all"; 
        //chk.id =  chk.name; 
        //cell.appendChild(chk)
        row.appendChild(cell);
        for(var i=0;i<this.table.header.length;i++){
            cell = document.createElement('th');
            cell.innerText = this.table.header[i];
            row.appendChild(cell);
        }
        this.head = document.createElement('thead');
        this.head.appendChild(row)
        tab.appendChild(this.head);
        this.body = document.createElement('tbody');
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
            this.body.appendChild(row);
        }
        tab.appendChild(this.body);
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
    }

    get_selected(col){
        var row, chk, r = [];
        if(col){
            for(var i = 0; i < this.body.childElementCount; i++){
                var row = this.body.childNodes[i];
                if(row.nodeName == 'TR'){
                    chk = row.childNodes[0].childNodes[0];
                    if (chk.checked)
                        r.push(row.childNodes[col].innerText);
                }
            }
        } else {
            for(var i = 0; i < this.body.childElementCount; i++){
                var row = this.body.childNodes[i];
                if(row.nodeName == 'TR'){
                    chk = row.childNodes[0].childNodes[0];
                    if (chk.checked)
                        r.push(chk.pos_id);
                }
            }
        }
        return r;
    }
}