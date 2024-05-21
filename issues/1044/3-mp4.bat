ffmpeg -loop 1 -i 1.jpg -i bzll.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest v1.mp4
ffmpeg -loop 1 -i 2.jpg -i bzll.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest v2.mp4
ffmpeg -loop 1 -i 3.jpg -i bzll.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest v3.mp4
