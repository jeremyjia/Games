from music21 import converter
s = converter.parse('1.abc')
s.write('midi', fp='1.mid')