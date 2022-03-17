var data = require('fs').readFileSync('out.mid', 'binary');
var smf = new JZZ.MIDI.SMF(data);

var player = smf.player();
player.onEnd = function() { console.log('Done!'); };

JZZ().or('Cannot start MIDI engine!').openMidiOut().or('Cannot open MIDI Out!').and(function() {
  player.connect(this);
  player.play();
});