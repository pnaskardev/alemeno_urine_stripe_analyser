import cv2
import numpy as np

def analyse_colors(filepath):

    # extract the given image
    image = cv2.imread(filepath)

    interested_image=None
    analysed_list=[]

    # I am trying to isolate the whole image by cropping the image 
    temp_image=image[100:1000, 150:170]
    height=temp_image.shape[0]
    width=temp_image.shape[1]
    # print('height: ', height)
    # print('width:', width)

    # UNNECESSARY AS OF NOW
    # THIS METHOD WILL HELP IF I AM ZOOOMING THE IMAGE A LOT
    for i in range(height):
        # takes the average value horizontally
        mean = np.average(temp_image[i], axis=0)
        # fills the whole array with that mean value with the size of width
        temp_image[i] = np.array([mean] * width)

    # MAY HAVE TO ADD INTERPOLATION CAUSE WE HAVE STRETHCHED THE IMAGE 
    # ,interpolation=cv2.INTER_LANCZOS4
    temp_image = cv2.resize(temp_image, dsize=(width * 2, height))
    image=temp_image

    

    cv2.imshow("Interested Area", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

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