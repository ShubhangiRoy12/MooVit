from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str  # In real app, this would be hashed