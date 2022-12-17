# download srt from video on Youtube
from youtube_transcript_api import YouTubeTranscriptApi
srt = YouTubeTranscriptApi.get_transcript('nc5EhK12QUw')
with open('srt_file.txt','w') as f:
    f.writelines('%s\n' % i for i in srt)
