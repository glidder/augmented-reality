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
  var code = 'if(markers[i].id == \''+value_id+'\'){'+
  				statements_consequence+
  			 '}';
  return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#agfidq

Blockly.Blocks['load'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
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
    this.setTooltip('');
  }
};

Blockly.JavaScript['load'] = function(block) {
  var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
  var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'for(k=0;k<markers.length;++k){'+
  				'if(markers[k].id==\''+value_id+'\'){'+
  				'corners = transformCorners(markers[k].corners);'+
  				'pose = posit.pose(corners);'+
  				'if(!map['+value_obj+']){'+
  				'map['+value_obj+']=createModel('+value_obj+');'+
  				'scene.add(map['+value_obj+']);}'+
  				'updateObject(map['+value_obj+'], pose.bestRotation, pose.bestTranslation);}}';
  return code;
};
