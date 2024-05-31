from typing import Annotated, Union
from fastapi import FastAPI, File, UploadFile
#import shutil # what's that
# import os

app = FastAPI() # instance of FastAPI class

@app.get("/")
async def read_root():
    return "Hello fff"

@app.post("/uploadfile/")
async def create_upload_file(file: Union[UploadFile, None] = None):
    if not file:
        return {"message": "No upload file sent"}
    else:
        contents = await file.read() # return type String
        #newfile_directory = "C:/Users/htcyl/Desktop/HTX_Intern/fast-api/file-storage.testest.txt" # no, vol. mount directory...
        #with open(newfile_directory, 'a') as newfile:
        #    newfile.write(contents)
        return {"filename": file.filename, "original contents": contents}


## Ignore below. 
### Raw code given ###
#from typing import Union # what's Union?
#from fastapi import FastAPI

#app = FastAPI()

#@app.get("/") <-- decorators
#def read_root():
 #   return {"Hello": "World"}

#@app.get("/items/{item_id}")
#def read_item(item_id: int, q: Union[str, None] = None): <-- item_id must be int type (data validation)
 #   return {"item_id": item_id, "q": q}


### ITERATION 1 ###
#from fastapi import FastAPI 

#app = FastAPI() # instance of FastAPI class

#@app.get("/")
#def read_root():
#    return "Hello World"

#UPLOAD_FOLDER = "C:\Users\htcyl\Desktop\HTX_Intern" 
# high likely to have error

## ChatGPT way
'''
@app.post("/uploadmyfile/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    # Save the uploaded file to the specified folder
    with open(file_path, "wb") as buffer: # consider change buffer naming
        buffer.write(await file.read())
    
    return "executed"
    JSONResponse(status_code=200, content={"message": "File uploaded successfully"})
'''

## YESTERDAY-TodayMorning DRAFT ("3 versions") ## 
'''
@app.post("/myfiles/") # change to get if you want to enter the website... otherwise cURL to post something.
async def create_file(file: Annotated[Union[str, None], File()] = None): # change from byte to str
    if not file:
        return {"message": "No file sent"}
    else:
        with open(file) as the_file:
            lines = the_file.readlines()
            new_file = open("to_save.txt", "w")
            for item in lines:
                new_file.write(item)
        return {"file_name_size": len(file), "original content": lines, "new conent": new_file.readlines()}

## fastAPI way of doing
@app.post("/files/") 
async def create_file(file: Annotated[Union[bytes, None], File()] = None): # change from byte to str
    if not file:
        return {"message": "No file sent"}
    else:
        return {"file contents": file} # original: return {"file_name_size": len(file)}


@app.post("/uploadfile/")
async def create_upload_file(file: Union[UploadFile, None] = None):
    if not file:
        return {"message": "No upload file sent"}
    else:
        return {"filename": file.filename}
'''
## Today morning Try D4? ##
## My way of doing
'''
@app.post("/myfiles/") # change to get if you want to enter the website... otherwise cURL to post something.
async def create_file(file: Annotated[Union[str, None], File()] = None): # change from byte to str
    if not file:
        return {"message": "No file sent"}
    else:
        with open(file) as the_file:
            lines = the_file.readlines()
            new_file = open("to_save.txt", "r+") # not "w". readlines(): UnsupportedOperation: not readable
            for item in lines:
                new_file.write(item)
        return {"file_name_size": len(file), "original content": lines, "new conent": new_file.readlines()}
'''