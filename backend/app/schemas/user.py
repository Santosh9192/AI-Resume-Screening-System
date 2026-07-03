from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str


class JobDescriptionRequest(BaseModel):
    job_description: str