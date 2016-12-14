/**
 * GridLayout
 */

(function(scope){
"use strict";
if(typeof scope === 'object'){
    scope.gridLayout = GridLayout;
}

function GridLayout(root){
    if(!(this instanceof GridLayout)){
        return new GridLayout(root);
    }

    if(!(root instanceof jQuery)){
        if(1 !== root.nodeType) return;
    }

    this.root = $(root);
    this.prevWindowWidth = window.innerWidth;
    this.items = [];
    this.colIndex = 0;
    this.maxColCount = 4;
    this.minColWidth = 300;
    this.colCount = this.maxColCount;
    this.margin = 20;

    this.root.css({
        boxSizing: 'border-box'
    });
    
    this.calculateGeometry();
    this.renderColumns();
    this.bindEvents();
}

GridLayout.prototype.toPercentage = function (val){
    val = parseInt(val);
    return val * 100 / this.width;
}

GridLayout.prototype.renderColumns = function(){
    var self = this;
    self.columns = [];
    self.root.children().remove();
    for(var i = 0; i < self.colCount; ++i){
        var col = $('<div>').css({ 
            float: 'left',
            width: self.toPercentage(self.colWidth) +'%',
            minHeight: '400px',
            boxSizing: 'border-box'
         });

         if(i > 0){
             col.css({
                 marginLeft: self.toPercentage(self.margin) + '%'
             });
        }

        self.columns.push(col);
    }
    
    if(self.columns){
        self.columns.forEach(function(col, i){
            col.attr('id', 'col-'+i);
            self.root.append(col);
        }.bind(self));
    }

    self.root.append($('<div style="clear:both">'));
}

GridLayout.prototype.addItem = function(item){
    if(!(item instanceof jQuery)){
        if(1 !== item.nodeType) return;
    }

    if(this.items.indexOf(item) < 0){
        this.items.push(item);
        this.appendItem(item);
    }
}

GridLayout.prototype.updateGrid = function(){
    var self = this;
    
    self.items.forEach(function(item){
       self.appendItem(item); 
    });
    
}

GridLayout.prototype.appendItem = function(item){
    if(!(item instanceof jQuery)){
        if(1 !== item.nodeType) return;
    }

    var self = this;
    self.colIndex = self.colIndex % self.colCount;
    $(item).css({
        marginBottom: self.margin + 'px',
        width: '100%'
    });

    $('#col-'+self.colIndex).append(item);
    self.colIndex++;
}

GridLayout.prototype.refresh = function(){
    var self = this;
    self.colIndex = 0;
    self.renderColumns();
    self.updateGrid();
}

GridLayout.prototype.calculateGeometry = function(){
    this.width = this.root.width();
    var w = this.width/this.colCount;
    
    if((w - this.margin) >= this.minColWidth || this.colCount === 1){
        this.colWidth =  w - this.margin;
        
    } else {
        --this.colCount;
        this.calculateGeometry();
    }

}

GridLayout.prototype.calculateUpSizeGeometry = function(){
    this.width = this.root.width();
    var c = this.colCount;
    c = ((c + 1) > this.maxColCount)? this.maxColCount : ++c;
    var w = this.width/c; // proposed colWidth
    if((w-this.margin) > this.minColWidth){
        this.colCount = c;
        this.colWidth = w - this.margin;
    } 
}

GridLayout.prototype.bindEvents = function(){
    var self = this;
    
    window.addEventListener('resize', function(e){
        var _colCount = self.colCount;
        if(window.innerWidth < self.prevWindowWidth){ 
            self.calculateGeometry();

            if(_colCount !== self.colCount){
                self.refresh();
                self.breakPoint
            }
        } else if(window.innerWidth > self.prevWindowWidth) {
            self.calculateUpSizeGeometry();
            if(_colCount !== self.colCount){
                self.refresh();
            }
        }
        

        self.prevWindowWidth = window.innerWidth;
    });   
}

GridLayout.prototype.showGrid = function(){

}

}(window));