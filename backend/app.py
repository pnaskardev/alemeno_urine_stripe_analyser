from fastapi import FastAPI,File,UploadFile,HTTPException
from fastapi.responses import JSONResponse
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware


from color_analyzer import analyse_colors


app=FastAPI()

img_dir='images/'

# Allow CORS from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get("/")
def index():    
    return {"API Running"}


@app.post("/predict")
async def predict(file: UploadFile):
    file_path=None
    try:
        if file.filename:
            file_path = os.path.join(img_dir, file.filename)
            with open(file_path, "wb+") as file_obj:
                shutil.copyfileobj(file.file, file_obj)
    except Exception as e:
        print(e)
        raise HTTPException(500, detail="Internal Server Error")
    
    print("Uploaded file to {}".format(file_path))

    rgb_val = await analyse_colors(file_path)
    if(len(rgb_val)!=10):
        print('[ERROR] rgb_val length is not 10')
        raise HTTPException(500,detail="Internal Server Error")
    data = {
        'URO': rgb_val[0],
        'BIL': rgb_val[1],
        'KET': rgb_val[2],
        'BLD': rgb_val[3],
        'PRO': rgb_val[4],
        'NIT': rgb_val[5],
        'LEU': rgb_val[6],
        'GLU': rgb_val[7],
        'SG': rgb_val[8],
        'PH': rgb_val[9],   
    }
    return JSONResponse(content=data)
