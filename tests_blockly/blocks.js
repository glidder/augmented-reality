// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3zmpwi


Blockly.Blocks['cube'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./cube.png", 15, 15, "Cube"));
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField("width");
    this.appendValueInput("depth")
        .setCheck("Number")
        .appendField("depth");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
    this.appendStatementInput("position")
        .setCheck("coordinates")
        .appendField("position");
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour("#ff0000"), "colour");
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['cube'] = function(block) {
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_depth = Blockly.JavaScript.valueToCode(block, 'depth', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_position = Blockly.JavaScript.statementToCode(block, 'position');
  var colour_colour = block.getFieldValue('colour');
  //JavaScript into code variable assembly. 

  var code = 'var cubeGeometry = new THREE.BoxGeometry('+value_width+','+value_depth+','+value_height+');\n';
	code=code+'var obj=new THREE.Mesh( cubeGeometry, new THREE.MeshBasicMaterial({ color: \''+colour_colour+'\' }));\n';
	code=code+statements_position;
	code=code+'objects.unshift(obj);';
	code=code+'scene.add(objects[0]);';
  return code;
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ekiube
Blockly.Blocks['coordinates'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("x");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("z")
        .setCheck("Number")
        .appendField("z");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};
Blockly.JavaScript['coordinates'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'obj.position.set('+value_x+','+value_y+','+value_z+');\n';
  return code;
};