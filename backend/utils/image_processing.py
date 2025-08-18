import cv2
import numpy as np
from PIL import Image
import io
import base64
from skimage.metrics import structural_similarity as ssim
from typing import Tuple, Dict, Any

def base64_to_image(base64_string: str) -> np.ndarray:
    """Convert base64 string to numpy array image"""
    try:
        # Remove data URL prefix if present
        if base64_string.startswith('data:image'):
            base64_string = base64_string.split(',')[1]
        
        # Decode base64 to bytes
        image_bytes = base64.b64decode(base64_string)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to numpy array
        image_array = np.array(image)
        
        # Convert RGBA to RGB if necessary
        if len(image_array.shape) == 3 and image_array.shape[2] == 4:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGBA2RGB)
        
        return image_array
    except Exception as e:
        raise ValueError(f"Failed to decode base64 image: {str(e)}")

def preprocess_image(image: np.ndarray, target_size: Tuple[int, int] = (512, 512)) -> np.ndarray:
    """Preprocess image for comparison"""
    # Resize image
    resized = cv2.resize(image, target_size)
    
    # Convert to grayscale
    if len(resized.shape) == 3:
        gray = cv2.cvtColor(resized, cv2.COLOR_RGB2GRAY)
    else:
        gray = resized
    
    # Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    return blurred

def detect_damage(before_image: np.ndarray, after_image: np.ndarray) -> Dict[str, Any]:
    """Detect damage between two images"""
    try:
        # Preprocess images
        before_processed = preprocess_image(before_image)
        after_processed = preprocess_image(after_image)
        
        # Calculate structural similarity
        similarity_score, diff_image = ssim(before_processed, after_processed, full=True)
        
        # Convert difference image to uint8
        diff_image = (diff_image * 255).astype("uint8")
        
        # Apply threshold to find significant differences
        _, thresh = cv2.threshold(diff_image, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)
        
        # Find contours of differences
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Filter contours by area (remove very small differences)
        min_area = 50  # Minimum area to consider as damage
        significant_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > min_area]
        
        # Calculate damage metrics
        total_damage_area = sum(cv2.contourArea(cnt) for cnt in significant_contours)
        image_area = before_processed.shape[0] * before_processed.shape[1]
        damage_percentage = (total_damage_area / image_area) * 100
        
        # Determine if damage is detected
        damage_detected = len(significant_contours) > 0 and damage_percentage > 0.1
        
        # Classify damage type based on contour properties
        damage_types = []
        for contour in significant_contours:
            area = cv2.contourArea(contour)
            perimeter = cv2.arcLength(contour, True)
            
            # Calculate circularity
            if perimeter > 0:
                circularity = 4 * np.pi * area / (perimeter * perimeter)
            else:
                circularity = 0
            
            # Classify based on shape properties
            if circularity > 0.7:
                damage_types.append("dent")
            elif perimeter > 100:  # Long perimeter suggests scratch
                damage_types.append("scratch")
            else:
                damage_types.append("paint_damage")
        
        # Determine severity
        if damage_percentage < 1:
            severity = "minor"
        elif damage_percentage < 5:
            severity = "moderate"
        else:
            severity = "major"
        
        return {
            "damage_detected": damage_detected,
            "similarity_score": float(similarity_score),
            "damage_percentage": round(damage_percentage, 2),
            "damage_count": len(significant_contours),
            "damage_types": damage_types,
            "severity": severity,
            "message": generate_damage_message(damage_detected, damage_percentage, damage_types, severity)
        }
        
    except Exception as e:
        return {
            "damage_detected": False,
            "error": f"Failed to process images: {str(e)}",
            "message": "Error occurred during image processing"
        }

def generate_damage_message(damage_detected: bool, damage_percentage: float, damage_types: list, severity: str) -> str:
    """Generate human-readable damage message"""
    if not damage_detected:
        return "No significant damage detected. Images are very similar."
    
    damage_type_text = ", ".join(set(damage_types))
    return f"Damage detected! {severity.title()} damage found ({damage_percentage:.1f}% of image). Damage types: {damage_type_text}."
