from fastapi import FastAPI 

app = FastAPI() # instance of FastAPI class

@app.get("/")
def read_root():
    return "Hello World"


## Ignore below. Raw code given##
#from typing import Union # what's Union?
#from fastapi import FastAPI

#app = FastAPI()


#@app.get("/") <-- decorators
#def read_root():
 #   return {"Hello": "World"}

#@app.get("/items/{item_id}")
#def read_item(item_id: int, q: Union[str, None] = None): <-- item_id must be int type (data validation)
 #   return {"item_id": item_id, "q": q}