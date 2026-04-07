from fastapi import FastAPI
from app.api.v1.endpoints.users import router as users_router
from app.core.config import settings

app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
    debug=settings.debug,
)

app.include_router(users_router, prefix="/api/v1")

@app.get("/health", status_code=200)
def healthcheck():
    return {"status": "ok"}
