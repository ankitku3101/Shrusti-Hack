from dotenv import load_dotenv
import os
from pathlib import Path
from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import json
import ngrok

# Loading api key from .env
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# initializing the fastapi instance
app = FastAPI()

# Allowing all requests from any source
allowed_origins = [
    "*",
]

# Adding the middleware to the fastapi instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# creating an instance of OpenAI
openai = OpenAI(
    api_key = openai_api_key
)


class ReviewDesc(BaseModel):
    review: str

@app.post("/sentiment")
async def analyseSentiment(reviewDesc: ReviewDesc):
    
    # Setting up the system message and building the user prompt.
    message = [
        {
            "role":"system",
            "content":'''You are a helpful evaluator of reviews who sees a review 
            and extract good points and bad points about an school. 
            Even if the text is in other language translate it to english and understand 
            the context of the review and find the one-work points in english only.
            The points are single words. For example: a review that highlights 
            the good infrstructure and teaching however it is bad at playground/playarea. 
            So, the model would return a JSON with good points as "Infrastructure" 
            and "Teaching" and bad points as "Playground".
            You return the data in JSON format as : 
            {
                "good": [],
                "bad": [],
            }
            
            The available tags are : 
                Infrastructure
                Teaching
                Playground
                Faculty
                Curriculum
                Safety
                Extracurricular
                Discipline
                Transport
                Hygiene
                Administration
                Sports
                Facilities
                Academics
                Fees
            ''',
        },
        {
            "role":"user",
            "content":f'''
            The review is as follows, Please perform a sentimental analysis: {reviewDesc.review}
            ''',
        },
    ]
    
    # Getting response from OpenAI
    response = openai.chat.completions.create(
        model = "gpt-4o-mini",
        messages = message,
        max_tokens = 100,
    )
    
    return json.loads(response.choices[0].message.content.strip())




if __name__ == "__main__":
    listener = ngrok.forward(addr=8080, domain="mole-model-drake.ngrok-free.app", authtoken_from_env = True)
    print(listener.url())
    uvicorn.run("sentiment_analysis:app", host="127.0.0.1", port=8080, reload=True)
    ngrok.disconnect()