import os
from dotenv import load_dotenv
load_dotenv()

SERVER_URL = 'localhost'
PORT = 8900
ENV = 'dev'
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
# print(GROQ_API_KEY)