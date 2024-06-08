import shlex
import pipes
import argparse
from subprocess import check_call

parser = argparse.ArgumentParser(description='overlay video plugin')
parser.add_argument('--input', '-i', help='file_input', required=True)
parser.add_argument('--out', '-o', help='file_out', default='output.mp4')
parser.add_argument('--overlay', '-v', help='ov', required=True)
parser.add_argument('--left', '-l', help='left_pos', default='W-w-10')
parser.add_argument('--top', '-t', help='top_pos', default='H-h-10')
parser.add_argument('--start', '-s', help='start_time', default='1')
parser.add_argument('--end', '-e', help='end_time', default='10')

args = parser.parse_args()
in_source_video = args.input
out_file_name = args.out
in_overlay_video = args.overlay
in_left_pos = args.left
in_top_pos = args.top
in_start_time = args.start
in_end_time = args.end

command = 'ffmpeg -y -i ' + in_source_video + ' -i ' + in_overlay_video + ' -filter_complex ' + "\"[1:v]scale=320:240[ov];[0:v][ov]overlay="+in_left_pos+":"+in_top_pos+":enable=\'between(t,"+in_start_time+","+in_end_time+")\'\"" + ' -c:a copy -max_muxing_queue_size 1024 ' + out_file_name

check_call(shlex.split(command))