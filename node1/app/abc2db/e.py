from music21 import converter
s = converter.parse('app\\abc2db\\t1.abc')
s.write('midi', fp='app\\abc2db\\t1.mid')