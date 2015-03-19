// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#g372q5
Blockly.Blocks['cube'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/cube.png", 15, 15, "Cube"));
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField("width");
    this.appendValueInput("depth")
        .setCheck("Number")
        .appendField("depth");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
    this.setInputsInline(true);
    this.setTooltip('');
  }
};