#!/bin/bash

readonly MY_NAME=$(basename "$0")
readonly MY_START_TIME=$(basename "$1")
readonly THISDIR=$(cd "$(dirname "$0")" ; pwd)
readonly MY_FOLDER="${THISDIR}/output"

function getTime()
{
  local strtime=$1
  hour=`echo $strtime | cut -d \: -f 1`
  min=`echo $strtime | cut -d \: -f 2`
  sec=`echo $strtime | cut -d \: -f 3`
  sec=`expr $sec + 1`

  if [ $sec -ge 60 ]; then
    sec=0
    min=`expr $min + 1`
  fi

  if [ $min -ge 60 ]; then
    min=0
    hour=`expr $hour + 1`
  fi

  if [ $hour -ge 24 ]; then
    hour=0
  fi

  res=$hour:$min:$sec
  echo $res
}

echo "------------------------------------------------------------------------------------"
if [ -z $MY_START_TIME ] ; then
    echo "The usage for this script is:" $MY_NAME "<hour:minute:second>"
else
    echo "Begin time is " $MY_START_TIME
    if [ ! -d $MY_FOLDER ]; then
       mkdir $MY_FOLDER
    fi
    strtime=$MY_START_TIME
    for ((num=1;num<=60;num++))
    do
       curl http://localhost:8080/image/clock?time=$strtime -o $MY_FOLDER/$num.jpg
       strtime=`getTime $strtime`
    done
fi
echo "------------------------------------------------------------------------------------"