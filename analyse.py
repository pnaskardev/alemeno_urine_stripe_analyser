import cv2
import numpy as np

def analyse_colors(filepath):

    # extract the given image
    image = cv2.imread(filepath)

    interested_image=None
    analysed_list=[]

    # I am trying to isolate the whole image by cropping the image 
    temp_img=image[100:1000, 150:170]
    cv2.imshow("Interested Area", temp_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    # 

    return 

filepath = 'image1.jpg'
# colors, color_bars = extract_colors(filepath)
analyse_colors(filepath)

# # Access the RGB values
# for color in colors:
#     print(color)

# # Display the color bars image
# cv2.imshow("Color Bars", color_bars)
# cv2.waitKey(0)
# cv2.destroyAllWindows()