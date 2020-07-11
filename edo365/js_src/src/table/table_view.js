
import {Table} from './table';

export class TableView {

    constructor(table, target){
        this.table = table 
        if(typeof target == 'string')
            target = document.querySelector(target);
        this.target = target
    }

    draw(){
        var caption = this.target.querySelector('caption').innerHTML;
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
            chk.name = this.target.id+"_chk_"+i+"_"+j; 
            chk.id =  chk.name; 
            cell.appendChild(chk)
            row.appendChild(cell);
            for(var j=0; j<this.table.header.length; j++){
                cell = document.createElement('td');
                cell.innerText = this.table.data[i][j];
                row.appendChild(cell);
            }
            tab.appendChild(row);

            tab.onclick(this.on_click)
        }
    }

    update(){}

    on_click(e){
        console.log(e);
    }
}