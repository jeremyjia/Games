import subprocess
pl = subprocess.run(['ls','-la'],capture_output=True)

# print(pl.stdout)