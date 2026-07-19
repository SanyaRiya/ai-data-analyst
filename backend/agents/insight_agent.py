import json
from google import genai
from google.genai import types

from backend.config import GEMINI_API_KEY, GEMINI_MODEL


class InsightGenerationAgent:

    def __init__(self):
        self.client = genai.Client(api_key=GEMINI_API_KEY)

    def generate(self, prompt: str):

        response = self.client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )

        return json.loads(response.text)