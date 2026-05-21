from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schema.login import LoginRequest
from app.repo.user_repo import UserRepository

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development; restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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