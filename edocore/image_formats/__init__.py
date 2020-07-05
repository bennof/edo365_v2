from .ImageFormat import ImageFormat
from .CaptionedImageFormat import CaptionedImageFormat 

try:
    unregister_image_format('fullwidth')
    unregister_image_format('left')
    unregister_image_format('right')
    register_image_format(
        ImageFormat('fullwidth', 'Full', 'bodytext-image', 'width-1024')
    )
    register_image_format(
        CaptionedImageFormat('captioned_fullwidth', 'Full width captioned', 'bodytext-image', 'width-250')
    )
except:
    print("Changing image formats, not applied")