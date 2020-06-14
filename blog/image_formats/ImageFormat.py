from wagtail.images.formats import Format, register_image_format, unregister_image_format
from wagtail.images.shortcuts import get_rendition_or_not_found
from django.utils.html import format_html
from django.utils.html import escape
from django.forms.utils import flatatt
from collections import OrderedDict

class ImageFormat(Format):
    def image_to_html(self, image, alt_text, extra_attributes=None):

        #default_html = super().image_to_html(image, alt_text, extra_attributes)
        if extra_attributes is None:
            extra_attributes = {}
        rendition = get_rendition_or_not_found(image, self.filter_spec)

        extra_attributes['alt'] = escape(alt_text)
        if self.classnames:
            extra_attributes['class'] = "%s" % escape(self.classnames)

        #default_html =  rendition.img_tag(extra_attributes)
        attrs = OrderedDict([
            ('src', rendition.url),
            #('width', self.width),
            #('height', self.height),
            ('alt', rendition.alt),
        ])
        attrs.update(extra_attributes)
        #return mark_safe(''.format())

        return format_html('<img {}>', flatatt(attrs), alt_text)

unregister_image_format('fullwidth')
unregister_image_format('left')
unregister_image_format('right')

register_image_format(
    ImageFormat('fullwidth', 'Full', 'bodytext-image', 'width-1024')
)