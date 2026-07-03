from fastapi import FastAPI
from app.api.routes import router
from app.api.auth import router as auth_router

from app.api.recruiter import router as recruiter_router

from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base
from app.models.user import User
from app.models.resume import Resume

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Resume Screening API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://your-app-name.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)
app.include_router(recruiter_router)


@app.get("/")
def root():
    return {"message": "AI Resume Screening Backend Running"}