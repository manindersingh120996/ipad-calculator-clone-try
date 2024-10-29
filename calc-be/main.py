from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from apps.constants import SERVER_URL, PORT, ENV
from apps.route import router as calculator_router

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

app.include_router(calculator_router,prefix = '/calculate',tags=['calculate'])
if __name__ == '__main__':
    uvicorn.run('main:app',host = SERVER_URL,port = (PORT), reload =ENV)