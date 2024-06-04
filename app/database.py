from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
SQLALCHEMY_DATABASE_URL = 'postgresql://{}:{}@{}/{}'.format('myuser', 'mypassword', 'postgres:5432', 'mydatabase')

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()