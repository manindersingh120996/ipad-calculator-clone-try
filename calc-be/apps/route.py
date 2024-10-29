import base64
from fastapi import APIRouter
from io import BytesIO
from .utils import analyze_image
from schema import ImageData
from PIL import Image
# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')
  
router = APIRouter()

@router.post('')
async def run(data:ImageData):
#   print("DATA \n\n",data)
#   image_data = base64.b64encode(data).decode('utf-8')
  image_data = data.image.split(',')[1]
  print("image_data \n\n\n",image_data)
  responses = analyze_image(image_data,dict_of_vars=data.dict_of_vars)
  data = []
  for response  in responses:
    data.append(response)
  print('response in route', responses)
  return{
    "message":"Image Processed",
    "type":"success",
    "data":data,
  }
