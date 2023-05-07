
# Urine Stripe Analyzer

This project is a web application that analyzes an image of a urine strip and returns the RGB values of each segment on the strip. It is built using FastAPI, HTML, CSS, JavaScript, NumPy, and OpenCV.

Tech Stack and Methodology
----------

### Frontend

The Frontend is build with Vanilla Javascript and HTML and CSS with GoogleFonts

### Backend

The Backend is built with the help of FastAPI, the main reason of using FastApi framework is its lightweight fast and fits the requirement of the project.

##### Methodology

The main methodology that has been used can be divided into 2 parts :-

1. **Cropping** - to get the useful part of the image.
2. **Segmentation** - small segments of 10x10 are used to get the average RGB value of each segment.

## Installation

1. Clone this repository using

   ```
   git clone 
   ```

2. Navigate to the backend folder,install the required dependencies and start the webserver on port 8000

   ```
   cd ./backend/
   pip install -r requirements.txt
   uvicorn api:app
   ```

3. Navigate to the frontend folder

   ```
   cd ../frontend/
   ```

4. Open the index.html file on a browser
