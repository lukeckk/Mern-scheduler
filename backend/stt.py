import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()


# Get the API key from environment variables
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is not set in the environment variables")


audio_file= open("/Users/lukecheng/Mern-scheduler/backend/audio/recording.wav", "rb")
transcription = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file,
  response_format="text"
)
print(transcription)

