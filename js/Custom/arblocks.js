//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#qnwbb7

Blockly.Blocks['relation'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Marcador:");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("0"), "num");
    this.appendDummyInput()
        .appendField("Objeto:");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Coche", "us_police_car"], ["Banco", "park_bench"], ["Casa", "house_15"]]), "object");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['relation'] = function(block) {
  var text_num = block.getFieldValue('num');
  var dropdown_object = block.getFieldValue('object');
  // JavaScript into code variable.
  var code = '\n\"'+text_num+'\":{\n'+
			 '\"name\":\"'+dropdown_object+'\",\n'+
			 '\"url\": \"models/'+dropdown_object+'/'+dropdown_object+'_bin.js\",\n'+
			 '\"type\": \"json_bin\",\n'+
			 '\"translate\": [0, 0, 0],\n'+
			 '\"rotate\": [0, 0, 0],\n'+
			 '\"rotationOrder\": \"XYZ\",\n'+
			 '\"scale\": [0.3, 0.3, 0.3]\n},';
  return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#m3mnfq

Blockly.Blocks['skarf'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("Marcador principal:");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("0"), "main");
    this.appendStatementInput("relations");
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['skarf'] = function(block) {
  var statements_relations = Blockly.JavaScript.statementToCode(block, 'relations');
  var text_main = block.getFieldValue('main');
  // TODO: Assemble JavaScript into code variable.
  var code = '{\n\"mainMarkerId\": \"'+text_main+'\",\n'+
  			 '\"models\": {\n'+statements_relations.substring(0, statements_relations.length - 1)+'\n}\n}';
  return code;
};
