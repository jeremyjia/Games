from youtube_transcript_api import YouTubeTranscriptApi
from google_trans_new import google_translator

YOUTUBEVIDEOCODE = "nc5EhK12QUw"
LANGUAGECODETOCHANGETO = "zh"
FILENAME = "2.txt"

#delete old text file
with open(FILENAME, mode = "a") as file:
    file.write("")

translator = google_translator()

video_subtitle = YouTubeTranscriptApi.get_transcript(YOUTUBEVIDEOCODE, languages = ["en", "zh"])

for part in video_subtitle:
    text = part["text"]
    print(text)
    translated_text = translator.translate(text, lang_tgt= LANGUAGECODETOCHANGETO)
    print(translated_text)
    part["text"] = translated_text
    # Creat a new text file
    try:
        with open(FILENAME, mode = "a") as file:
            file.write("\n" + str(part["start"]) + "\n" + part["text"])
    except UnicodeEncodeError:
        continue
