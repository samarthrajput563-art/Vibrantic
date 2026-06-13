import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

print("KEY:", repr(api_key))

client = genai.Client(api_key=api_key)

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello"
    )

    print("SUCCESS:")
    print(response.text)

except Exception as e:
    print("ERROR:")
    print(e)