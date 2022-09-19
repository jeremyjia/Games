from music21 import converter
s = converter.parse('2.abc')
s.write('midi', fp='2.mid')