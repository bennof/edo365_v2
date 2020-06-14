from django.utils.html import format_html

from wagtail.images.formats import register_image_format

from .ImageFormat import ImageFormat

class CaptionedImageFormat(ImageFormat):
    def image_to_html(self, image, alt_text, extra_attributes=None):
        return format_html('<figure><img {}><figcaption>{}</figcaption></figure>', super.image_to_html(image, alt_text, extra_attributes), alt_text)

register_image_format(
    CaptionedImageFormat('captioned_fullwidth', 'Full width captioned', 'bodytext-image', 'width-250')
)