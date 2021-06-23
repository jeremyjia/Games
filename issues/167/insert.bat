rem insert A_Sax.wav 2 null30s.mp3 xds2.mp3
ffmpeg -i %3 -i %1 -filter_complex "aevalsrc=0:d= %2 [s1];[s1][1:a]concat=n=2:v=0:a=1[aout]" -c:v copy -map 0:v? -map [aout] %4
