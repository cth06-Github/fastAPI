# database model, defining how the database look like? [might be some SQL terms]

from .database import Base
from sqlalchemy import Column, String, Boolean, Integer


class DeviceInfo(Base): # inherits from Base class (declarative_base() in database.py file)
    __tablename__ = 'DeviceInfo' # DB table name ("instructs SQLAlchemy which DB table to use for storing instances of this class.")
    token = Column(String, primary_key = True)
    username = Column(String, default = 'user')
# * We initialise our custom class attributes (id, email, hashed_password) 
# using a library of types provided by SQLAlchemy, 
# in order to instruct it how to map each attribute to an SQL column.



class Configuration(Base):
    __tablename__ = 'Configuration'
    id = Column(Integer, primary_key = True, autoincrement = True)
    modelUrl = Column(String)
    frequency = Column(Integer)
    federated = Column(Boolean)