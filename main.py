#from typing import Union # what's Union?

from fastapi import FastAPI # requiremens.txt didn't really work out, manually pip install fastapi

app = FastAPI() # create instance of FastAPI class and store into app variable

# 1] check decorators 
# can @ function. 2] Hmm what methods (functions) associated with FastAPI() are there? 
@app.get("/")
def read_root():
    return "Hello World" # return {"Hello": "World"}


## NO need yet.
#@app.get("/items/{item_id}")
#def read_item(item_id: int, q: Union[str, None] = None):
#    return {"item_id": item_id, "q": q}