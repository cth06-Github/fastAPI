from typing import Union
from fastapi import FastAPI, UploadFile, Depends, HTTPException
from pydantic import BaseModel
#from app.database import Base
from .database import SessionLocal, engine
from .schema import DeviceInfo, Configuration
from . import crud, models
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

def db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
    
app = FastAPI() # instance of FastAPI class

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",  # Assuming your frontend runs on port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get("/")
async def read_root():
    return "Hello World"

@app.post("/uploadfile/")
async def create_upload_file(file: Union[UploadFile, None] = None):
    if not file:
        return {"message": "No upload file sent"}
    else:
        contents = await file.read() # read file. return type is byte (think so)
        file_name = file.filename
        newfile_dir_name = f"/var/lib/data/store/copied_{file_name}" # in docker directory
        with open(newfile_dir_name, 'w') as new_file: # create new file
            new_file.write(str(contents, encoding='utf-8')) # convert contents from byte to string
        return {"filename": file.filename, "original contents": contents}

@app.post('/device/info')
def save_device_info(info: DeviceInfo, db=Depends(db)):
    object_in_db = crud.get_device_info(db, info.token)
    if object_in_db:
        raise HTTPException(400, detail= crud.error_message('This device info already exists'))
    return crud.save_device_info(db,info)

@app.get('/device/info/{token}')
def get_device_info(token: str, db=Depends(db)):
    info = crud.get_device_info(db,token)
    if info:
        return info
    else:
        raise HTTPException(404, crud.error_message('No device found for token {}'.format(token)))

@app.get('/device/info')
def get_all_device_info(db=Depends(db)):
    return crud.get_device_info(db)

@app.post('/configuration')
def save_configuration(config: Configuration, db=Depends(db)):
    # always maintain one config
    crud.delete_nudges_configuration(db)
    return crud.save_nudges_configuration(db, config)

@app.get('/configuration')
def get_configuration(db=Depends(db)):
    config = crud.get_nudges_configuration(db)
    if config:
        return config
    else:
        raise HTTPException(404, crud.error_message('No configuration set'))

# Create a SQLAlchemy database engine using the DATABASE_URL
#DATABASE_URL = 'postgresql://{}w:{}@{}/{}'.format('myuser', 'mypassword', 'postgres:5432', 'mydatabase')
#engine = create_engine(DATABASE_URL)

# Create a Session class to handle database interactions
#SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define a function to get a database session
#def get_db():
#    db = SessionLocal()
#    try:
#        yield db
#    finally:
#        db.close()


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
from typing import Annotated, Union
from fastapi import FastAPI, File, UploadFile

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
