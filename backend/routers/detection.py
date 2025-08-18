from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
import base64
from typing import Optional
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.image_processing import base64_to_image, detect_damage

router = APIRouter(prefix="/api", tags=["damage-detection"])

@router.post("/detect-damage")
async def detect_damage_endpoint(
    before_image: str = Form(...),
    after_image: str = Form(...)
):
    """
    Detect damage between two images
    Images should be sent as base64 strings
    """
    try:
        # Convert base64 strings to images
        before_img = base64_to_image(before_image)
        after_img = base64_to_image(after_image)
        
        # Detect damage
        result = detect_damage(before_img, after_img)
        
        return JSONResponse(content=result)
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/upload-images")
async def upload_images(
    before_image: UploadFile = File(...),
    after_image: UploadFile = File(...)
):
    """
    Upload two images and detect damage
    Alternative endpoint for file uploads
    """
    try:
        # Read image files
        before_content = await before_image.read()
        after_content = await after_image.read()
        
        # Convert to base64
        before_b64 = base64.b64encode(before_content).decode('utf-8')
        after_b64 = base64.b64encode(after_content).decode('utf-8')
        
        # Convert base64 to images
        before_img = base64_to_image(before_b64)
        after_img = base64_to_image(after_b64)
        
        # Detect damage
        result = detect_damage(before_img, after_img)
        
        return JSONResponse(content=result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process images: {str(e)}")
