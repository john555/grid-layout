# Documentation

## jQuery alert!
gridLayout depends on jQuery for DOM manipulation.

## How to use
Include the required files

``` html
<script src="/path/to/jquery"></script>
<script src="/path/to/grid-layout.js"></script>
```
The js code
``` js
var container = $('#containerID'); // the HTML element to act as a container
var gridLayout = gridLayout(container);

// add a single item
var item = $('#itemID');
gridLayout.addItem(item);

// or add multiple items in a loop
var items = $('.itemsClass');
items.forEach(function(item){
    gridLayout.addItem(item);
});
```
Thats it!