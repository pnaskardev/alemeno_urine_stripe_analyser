import cv2
import numpy as np

def analyse_colors(filepath):
    
    def create_bar(height, width, color):
        bar = np.zeros((height, width, 3), np.uint8)
        bar[:] = color
        return bar

    # extract the given image
    image = cv2.imread(filepath)

    interested_image=None
    analysed_list=[]

    # I am trying to isolate the whole image by cropping the image 
    temp_image=image[50:1000, 150:170]
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
    temp_image = cv2.resize(temp_image, dsize=(width * 2, height),interpolation=cv2.INTER_CUBIC)
    image=temp_image
    x_position = width // 2
    y_position=30
    next_segment=90
    average_strip_color_list=[]
    for i in range(10):
        segment = image[y_position:y_position + 5, x_position:x_position + 5]
        average_segment_color = np.mean(segment, axis=(0, 1))
        average_segment_color = average_segment_color.astype(int)
        print(f"Average color: B={average_segment_color[0]}, G={average_segment_color[1]}, R={average_segment_color[2]}")
        average_strip_color_list.append(average_segment_color)
        y_position+=next_segment
    

    bars = []

    # for i in enumerate(average_strip_color_list):
    for i,color_value in enumerate(average_strip_color_list):
        bar = create_bar(200,100,color_value)
        padding = create_bar(200,10,[0, 0, 0])
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