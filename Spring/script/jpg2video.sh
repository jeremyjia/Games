#!/bin/bash

readonly MY_NAME=$(basename "$0")
readonly MY_WIDTH=$(basename "$1")
readonly MY_HEIGHT=$(basename "$2")
readonly RATE=$(basename "$3")
readonly THISDIR=$(cd "$(dirname "$0")" ; pwd)
FFMPEGDIR=/usr/bin

echo "------------------------------jpg2video.sh v0.0.3------------------------------"
if [ -z $RATE ] ; then
 RATE=1
 echo "The rate is:" $RATE
fi

if [ -z $MY_WIDTH ] || [ -z $MY_HEIGHT ] ; then
 echo "param error"
 echo "param 1 size-width"
 echo "param 2 size-height"
 echo "param 3 framerate "
else
    echo "Call ffmpeg to generate video"
    if [ ! -f $FFMPEGDIR/ffmpeg ];then
       FFMPEGDIR=/usr/local/bin
     fi
    $FFMPEGDIR/ffmpeg -framerate $RATE -i $THISDIR/%d.jpg -r $RATE -s $MY_WIDTH"x"$MY_HEIGHT -y vSubtitle.mp4
fi
echo "-------------------------------end----------------------------------------"
