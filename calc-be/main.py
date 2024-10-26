from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from constants import SERVER_URL, PORT, ENV

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespa=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers=['*'],

)

@app.get("/")
async def health():
    return{"message":"Server is Runing"}

if __name__ == '__main__':
    uvicorn.run('main:app',host = SERVER_URL,port = (PORT), reload =ENV)