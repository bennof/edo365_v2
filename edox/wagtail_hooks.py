from wagtail.core import hooks
import wagtail.admin.rich_text.editors.draftail.features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import InlineStyleElementHandler


@hooks.register('register_rich_text_features')
def register_code_feature(features):
    """Add <code>""" 
    feature_name = 'inline_code'
    type_ = 'INLINE_CODE'
    tag = 'code'

    control = {
        'type': type_,
        'label': '</>',
        'description': 'Code',
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.InlineStyleFeature(control)
    )

    db_conversion = {
        'from_database_format': {tag: InlineStyleElementHandler(type_)},
        'to_database_format': {'style_map': {type_: tag}},
    }
    features.register_converter_rule('contentstate', feature_name, db_conversion)
    features.default_features.append(feature_name)

@hooks.register('register_rich_text_features')
def register_dox_get_feature(features):
    """Add <span dox_get>""" 
    feature_name = 'dox_get'
    type_ = 'dox_get'
    tag = 'span'

    control = {
        'type': type_,
        'label': '{{}}',
        'description': 'dox get value',
        'style': {'font-family': 'sans'},
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.InlineStyleFeature(control)
    )

    db_conversion = {
        'from_database_format': {tag: InlineStyleElementHandler(type_)},
        'to_database_format': {
            'style_map': {
                type_: {
                    'element': tag,
                    'props': {
                        'dox_get':''
                    }
                }
            }
        },
    }
    features.register_converter_rule('contentstate', feature_name, db_conversion)
    features.default_features.append(feature_name)

@hooks.register('register_rich_text_features')
def register_centertext_feature(features):
    """Add <center>""" 
    feature_name = 'center'
    type_ = 'CENTERTEXT'
    tag = 'div'

    control = {
        'type': type_,
        'label': '=',
        'description': 'Center Text',
        'style': {'display': 'block','text-align':'center'},
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.BlockFeature(control)
    )

    db_conversion = {
        'from_database_format': {tag: InlineStyleElementHandler(type_)},
        'to_database_format': {
            'style_map': {
                type_: {
                    "element":tag, 
                    "props": {
                        "style": "text-align:center;"
                    }
                }
            }
        }
    }
    features.register_converter_rule('contentstate', feature_name, db_conversion)
    features.default_features.append(feature_name)
