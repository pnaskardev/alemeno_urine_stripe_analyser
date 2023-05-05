import cv2
import numpy as np

def create_shade_card(height, width, color):
    card = np.zeros((height, width, 3), np.uint8)
    card[:] = color
    return card

def analyse_colors(filepath):


    # extract the given image
    image = cv2.imread(filepath)

    interested_image=None
    analysed_list=[]

    # I am trying to isolate the whole image by cropping the image 
    temp_image=image[50:1000, 150:170]
    
    # getting the height and the width of the image
    height=temp_image.shape[0]
    width=temp_image.shape[1]

    # UNNECESSARY AS OF NOW
    # THIS METHOD WILL HELP IF I AM ZOOOMING THE IMAGE A LOT
    # for i in range(height):
    #     # takes the average value horizontally
    #     mean = np.average(temp_image[i], axis=0)
    #     # fills the whole array with that mean value with the size of width
    #     temp_image[i] = np.array([mean] * width)

    # MAY HAVE TO ADD INTERPOLATION CAUSE WE HAVE STRETHCHED THE IMAGE 
    # ,interpolation=cv2.INTER_LANCZOS4
    # resizing the image so that we get better margins of the sides
    temp_image = cv2.resize(temp_image, dsize=(width * 2, height))
    image=temp_image
    x_position = width // 2
    y_position=30
    next_segment=90
    average_strip_color_list=[]
    for i in range(10):
        segment = image[y_position-10:y_position, x_position-10:x_position +10]
        average_segment_color = np.mean(segment, axis=(0, 1))
        average_segment_color = average_segment_color.astype(int)
        print(f"Average color: B={average_segment_color[0]}, G={average_segment_color[1]}, R={average_segment_color[2]}")
        average_strip_color_list.append(average_segment_color)
        y_position+=next_segment
    

    bars = []

    # for i in enumerate(average_strip_color_list):
    for i,color_value in enumerate(average_strip_color_list):
        bar = create_shade_card(200,100,color_value)
        padding = create_shade_card(200,5,[0, 0, 0])
        bars.append(bar)
        bars.append(padding)

    final_analysed_colors = np.hstack(bars)
    return final_analysed_colors



filepath = 'image1.jpg'
colors=analyse_colors(filepath)


# Display the color bars image
cv2.imshow("Colors", colors)
cv2.waitKey(0)
cv2.destroyAllWindows()