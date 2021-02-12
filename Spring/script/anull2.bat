ffmpeg -f lavfi -t %1 -i anullsrc=channel_layout=stereo:sample_rate=44100 -i %2 -filter_complex "[1:a][0:a]concat=n=2:v=0:a=1" %3
