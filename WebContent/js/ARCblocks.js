//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pnmsvs

Blockly.Blocks['marker'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Con marcador");
    this.appendValueInput("id")
        .setCheck("Number");
    this.appendStatementInput("consequence");
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['marker'] = function(block) {
  var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_consequence = Blockly.JavaScript.statementToCode(block, 'consequence');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if(this.ARl.signalIsActive('+value_id+')){'+'this.signalIsRotated('+value_id+',\"right\");'+
  				statements_consequence+'}';
  return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zwgzqv

Blockly.Blocks['load'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Cargar");
    this.appendValueInput("obj")
        .setCheck("String");
    this.appendDummyInput()
        .appendField("en marcador");
    this.appendValueInput("id")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['load'] = function(block) {
  var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
  var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 	'var k=this.ARl.getSignalIndexById('+value_id+');'+
  				'if(k>=0){'+
  				'this.setObjectMarker('+value_obj+','+value_id+');}';
  return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k3k5ez

Blockly.Blocks['animate'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Aplicar animación");
    this.appendValueInput("animation")
        .setCheck("String");
    this.appendDummyInput()
        .appendField("en objeto");
    this.appendValueInput("obj")
        .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['animate'] = function(block) {
  var value_animation = Blockly.JavaScript.valueToCode(block, 'animation', Blockly.JavaScript.ORDER_ATOMIC);
  var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'this.runAnimation('+value_animation+','+value_obj+');';
  return code;
};

