from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.documents.blocks import DocumentChooserBlock


class CodeBlock(blocks.StructBlock):
    code = blocks.TextBlock(blank=True)
    description = blocks.RichTextBlock(required = False)
    class Meta:
        icon = 'code'
        template = 'edox/blocks/code.html'

class ImageBlock(blocks.StructBlock):
    src = ImageChooserBlock()
    description = blocks.RichTextBlock(required = False)
    class Meta:
        icon = 'image'
        template = 'edox/blocks/image.html'

class PlotBlock(blocks.StructBlock):
    id = blocks.CharBlock()
    src = DocumentChooserBlock(required = False)
    code = blocks.RawHTMLBlock(required = False)
    description = blocks.RichTextBlock(required = False)
    class Meta:
        icon = 'tick'
        template = 'edox/blocks/plot.html'

class TableBlock(blocks.StructBlock):
    src = DocumentChooserBlock(required = False)
    description = blocks.RichTextBlock(required = False)
    class Meta:
        icon = 'list-ul'
        template = 'edox/blocks/table.html'

class JSProgramInlineBlock(blocks.StructBlock):
    code = blocks.RawHTMLBlock(required = False)
    class Meta:
        icon = 'cogs'
        template = 'edox/blocks/program.html'