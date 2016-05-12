# Tooltip-API
VocaDB Tooltip API assets includes:
voca_tooltip.css
voca_tooltip.js
voca_tooltip_request.php

for more info, visit: http://appsmithing.com/voca/api/

also includes VocaDB Flag selection:
voca_lang_sel.css
voca_lang_sel.js

for more info about Flag Selection tool, visit: http://appsmithing.com/voca/api/docu/tooltip
Flag selection is an open-source tlang selection tool for any 
Flag selection is using Bootstrap's Tooltip and Popover class (included inside js and css) and JQuery 1.9 or higher.

Setting up Flag selection:
to setup, just include the css in head section:
```
<head>
...
<link href="PATH/TO/voca_lang_sel.css" rel="stylesheet" type="text/css" />
...
</head>
```

and the js right before the end of body tag: (or make it a Non-blocking script like async or defer)
```
<body>
......
<script type="text/javascript" src="PATH/TO/jquery.min.js" language="JavaScript"></script>
<script type="text/javascript" src="PATH/TO/voca_lang_sel.js" language="JavaScript"></script>
</body>
```

after that, just include this code anywhere inside body tag:
```
<body>
...
<button class="vocadb_lang_select flag_settings">
</button>
<input type="hidden" id="tlang"/>
...
</body>
```
