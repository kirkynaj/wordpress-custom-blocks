/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
	SelectControl, 
	PanelBody, 
	TextControl, 
	Button, 
	DatePicker, 
	TextareaControl, 
	RadioControl 
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes, context: { postType, postId }}) {

	const {customFieldKey, metaType, metaKey, metaValue, generateTitleField } = attributes;


	//tutorial rest API
		//fix rest API path
		//save database
		//get data from rest API using useEffect
		//set local state
		//render local state



	// const postType = useSelect(
	// 	(select) => select(editorStore).getCurrentPostType(),
	// 	[]
	// );
	
	// const [nativeMeta, setNativeMeta] = useEntityProp('postType', postType, 'meta', postId);
	// const [acfMeta] = useEntityProp('postType', postType, 'acf');
	const [date, setDate] = useState(new Date());
	const [option, setOption] = useState('a');
	const [generatedText, setGeneratedText] = useState();
	const [textResult, setTextResult] = useState();
	
	// acf_meta_key
	// console.log({metaType}, {metaKey}, {metaValue});
	// console.log(date);
	// console.log(customText);
	
	const handleClick = () => {
			apiFetch({path: '/wp/v2/Posts/25'}).then((posts) => {
			// console.log(posts?.title.rendered);
			setGeneratedText(posts?.title.rendered);
			setAttributes({ generateTitleField: generatedText });
			
		})
	};
	
	console.log('generated text =>', generatedText);

	const {isSaving, edited, saved} = useSelect((select) => {
		return{
			isSaving:  select('core/editor').isSavingPost(),
			edited:  select('core/editor').getEditedPostAttribute('customFieldKey'),
			saved:  select('core/editor').getCurrentPostAttribute('customFieldKey')
		}
	});

	const {savePost, editedPost, savedPost} = useSelect((select) => {
		return {
			savePost: select('core/editor').isSavingPost(),
			editedPost: select('core/editor').getEditedPostAttribute('generateTitleField'),
			savedPost: select('core/editor').getCurrentPostAttribute('generateTitleField')
		}
	});

	useEffect(() => {
		console.log({isSaving}, {edited}, {saved})
		if (isSaving) {
				apiFetch({
					path: `wp/acf-meta-block/v1/custom-field-key/save`,
    			method: 'POST',
    			data: {
						post_id: wp.data.select('core/editor').getCurrentPostId(),
      			custom_field_key: customFieldKey,
    			},
			}).then(res => console.log('result =>', res));		
		} else if (savePost) {
			apiFetch({
				path: `wp/acf-meta-block/v1/genetared-title/save`,
				method: 'POST',
    			data: {
						post_id: wp.data.select('core/editor').getCurrentPostId(),
      			custom_field_key: customFieldKey,
					}
			}).then(res => console.log('result =>', res));
		}
	},[isSaving, savePost]);

	// console.log('this is the custom field key edit.js', customFieldKey)

	// const metaInfo = useSelect((select) => {
	// 	return select('core/editor').getBlocks('');
	// });

	// useEffect(() => {
	// 	console.log('result =>', metaInfo);
	// }, [metaInfo]);

	// we don't need the customFieldKey to the save.json


	
	return (
		<p { ...useBlockProps() }>
			<h2>Result: { customFieldKey }</h2>
			<h3>{ generateTitleField }</h3>

			<InspectorControls>
				<PanelBody
					title={__('Custom Blocks', 'acf-meta')}
					
				>
					{/* <SelectControl
								label={__('Meta Key')}
								value={ metaType }
								options={ [
										{ label: 'Custom Field', value: 'custom_field' },
										{ label: 'Custom Text', value: 'custom_text' },
								] }
								onChange={ ( newType ) => setAttributes( { metaType: newType } ) }
						/> */}
						<p>
							<TextControl
								label="Meta Block Field"
								help="Click button to generate post title"
								value={ generatedText }
								// onChange={() => setAttributes({ generateTitleField: generatedText })}
							/>
							<Button
								variant="primary"
								onClick={()=>handleClick()}
							>Generate</Button>
						</p>
						<TextControl
							label={ customFieldKey === "" ?  __("Custom Text Input") : customFieldKey}
							placeholder='Change Label Here'
							value={customFieldKey}
							onChange={(value) => {
								setAttributes({ customFieldKey: value })
							}}
						/>
						<RadioControl
							label="Custom Radio Button"
							selected={ option }
								options={[
									{label: 'Radio1', value: 'a'},
									{label:'Radio2', value: 'b'},
								]}
							onChange={(value) => setOption(value)}
						/>
					</PanelBody>
					<PanelBody
						title={__('Custom Blocks Date Picker', 'acf-meta')}
					>
						<DatePicker
							currentDate={ date }
							onChange={ (newDate) => setDate(newDate) }
						/>
					</PanelBody>
			</InspectorControls>
		</p>
	);
}




