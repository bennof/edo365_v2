from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.documents.blocks import DocumentChooserBlock


class CodeBlock(blocks.StructBlock):
    code = blocks.TextBlock()
    description = blocks.RichTextBlock(required = False)
    class Meta:
        icon = 'code'
        template = 'edox/templates/edox/blocks/code.html'

class ImageBlock(blocks.StructBlock):
    src = ImageChooserBlock()
    description = blocks.RichTextBlock(required = False),
    class Meta:
        icon = 'image'
        template = 'edox/templates/edox/blocks/image.html'

class PlotBlock(blocks.StructBlock):
    id = blocks.CharBlock()
    description = blocks.RichTextBlock(required = False),
    class Meta:
        icon = 'tick'
        template = 'edox/templates/edox/blocks/plot.html'

class TableBlock(blocks.StructBlock):
    src = DocumentChooserBlock()
    description = blocks.RichTextBlock(required = False),
    class Meta:
        icon = 'list-ul'
        template = 'edox/templates/edox/blocks/table.html'

class JSProgramInlineBlock(blocks.StructBlock):
    jsprogram = blocks.RawHTMLBlock()
    class Meta:
        icon = 'cogs'
        template = 'edox/templates/edox/blocks/program.html'