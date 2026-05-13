from fastapi import FastAPI, HTTPException
from app.schema.login import LoginRequest
from app.repo.user_repo import UserRepository

app = FastAPI()

user_repo = UserRepository()

@app.get("/health")
def read_root():
    return {"status": "ok"}

@app.post("/login")
def login(request: LoginRequest):
    if user_repo.authenticate(request.email, request.password):
        return {"message": "Login successful", "user": request.email}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")