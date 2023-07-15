/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.attributes.message
 * @param  root0.attributes.content
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @return {WPElement} Element to render.
 */
export default function save({attributes: { metaType, metaKey, metaValue }}) {

  // const { acfMeta } = metaKey;
	// console.log('acfmeta =>', metaKey);

	apiFetch({
		path: 'wp/acf-meta-block/v1/save',
		method: 'POST',
		data: {
			post_id: wp.data.select('core/editor').getCurrentPostId(),
			acf_meta_value: metaKey,
		},
	})
	.then(res => console.log('result =>', res))
	.catch((error) => {

	});

  
	return (
		<div {...useBlockProps.save()}>
			{/* <RichText.Content tagName="h2" value={metaValue} />
			<RichText.Content tagName="p" value={metaType} /> */}
		</div>
	);
}
