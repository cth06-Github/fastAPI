from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
SQLALCHEMY_DATABASE_URL = 'postgresql://{}:{}@{}/{}'.format('myuser', 'mypassword', 'db:5432', 'mydatabase') #postgres:5432

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
#  declarative_base() callable returns a new base class from which all mapped classes should inherit.