from wagtail.core.fields import RichTextField, StreamField
from . import blocks
from wagtail.core import blocks as wt_blocks

class EDoxField(StreamField):
    def __init__(self, block_types, **kwargs):
        block_types = [
            ('Text', wt_blocks.RichTextBlock()),
            ('Code', blocks.CodeBlock()),
            ('Image', blocks.ImageBlock()),
            ('Plot', blocks.PlotBlock()),
            ('Table', blocks.TableBlock()),
            ('JSProgram', blocks.JSProgramInlineBlock()),
        ].append(block_types)
        super(EDoxField,self).__init__(block_types)