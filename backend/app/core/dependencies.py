from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.jwt_handler import verify_access_token

# Bearer Authentication
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Verify JWT token and return user payload.
    """

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    return payload


def recruiter_required(
    current_user: dict = Depends(get_current_user)
):
    """
    Allow access only to recruiters.
    """

    if current_user.get("role") != "recruiter":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Recruiter access required"
        )

    return current_user