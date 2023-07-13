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
export default function Edit({attributes: {metaType, metaKey, metaValue}, setAttributes, context: { postType, postId }}) {


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
	const [customText, setCustomText] = useState('');
	const [option, setOption] = useState('a');
	const [generatedText, setGeneratedText] = useState();
	const [textResult, setTextResult] = useState();

	// console.log({metaType}, {metaKey}, {metaValue});
	// console.log(date);
	// console.log(customText);

	const handleClick = () => {
		apiFetch({path: '/wp/v2/Posts/25'}).then((posts) => {
			console.log(posts?.title.rendered);
			setGeneratedText(posts?.title.rendered);
		})
	};

	// const { acfMeta } = () => metaValue;

	// apiFetch({
	// 	path: 'wp/acf-meta-block/v1/save',
	// 	method: 'POST',
	// 	data: {
	// 		post_id: wp.data.select('core/editor').getCurrentPostId(),
	// 		acf_meta_value: acfMeta,
	// 	},
	// })
	// .then(res => console.log('result =>', res))
	// .catch((error) => {

	// });




	// const isSaving = useSelect((select) => {
	// 	return select('core/editor').isSavingPost();
	// });


	// useEffect(() => {
	// 	if (isSaving) {
	// 			apiFetch({
	// 				path: `/acf-meta-block/v1/`,
  //   			method: 'POST',
  //   			data: {
  //     			acf_meta_value: {
	// 						...metaValue,
	// 					}
  //   			},
	// 		}).then(res => console.log('result =>', res));		
	// 	};
	// },[isSaving]);

	// const metaInfo = useSelect((select) => {
	// 	return select('core/editor').getBlocks('');
	// });

	// useEffect(() => {
	// 	console.log('result =>', metaInfo);
	// }, [metaInfo]);
	
	return (
		<p { ...useBlockProps() }>
			<h2>Result: { metaValue }</h2>

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
											help="Click generate to display post title"
											value={ generatedText }
											// onChange={(value) => setGeneratedText({value})}
							/>
							<Button
								variant="primary"
								onClick={()=>handleClick()}
							>Generate</Button>
						</p>
						<TextControl
							label={__("Custom Text Input")}
							placeholder='Enter something here'
							value={metaValue}
							onChange={(value) => setAttributes({ metaValue: value })}
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
