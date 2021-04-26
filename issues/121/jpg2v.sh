#!/bin/bash

readonly MY_NAME=$(basename "$0")
readonly MY_WIDTH=$(basename "$1")
readonly THISDIR=$(cd "$(dirname "$0")" ; pwd)

echo "------------------------------jpg2v.sh v0.0.1------------------------------"
if [ -z $MY_WIDTH ] ; then
    echo "The usage is:" $MY_NAME "360"
else
    echo "Call ffmpeg to generate video"
    ffmpeg -framerate 1 -i $THISDIR/output/%d.jpg -r 1 -s $MY_WIDTH"x"$MY_WIDTH -y v60s.mp4
fi
echo "-------------------------------end----------------------------------------"
