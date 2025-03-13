import shlex
import pipes
import argparse
import urllib.parse
from subprocess import check_call

parser = argparse.ArgumentParser(description='audio to waveform')
parser.add_argument('--input', '-i', help='file_input', required=True)
parser.add_argument('--out', '-o', help='file_out', default='output.png')
args = parser.parse_args()

in_file_name = args.input
out_file_name = args.out

prefix, text = in_file_name.split("-", 1) #string-a cat

encoded_prompt = urllib.parse.quote(text)
url = f"https://image.pollinations.ai/prompt/{encoded_prompt}"
        
command = 'curl ' + url + ' -o ' + out_file_name
check_call(shlex.split(command))