<?php
/**
 * Plugin Name:       Acf Meta
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       acf-meta
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_acf_meta_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_acf_meta_block_init' );

add_action( 'rest_api_init', 'register_acf_meta_route' );

function register_acf_meta_route() {
	register_rest_route( 
		'wp/acf-meta-block/v1',
		'/custom-field-key/save',
		array(
			'methods'		=> 'POST',
			'callback' 	=> 'save_custom_field_key',
			'args'			=> array(
				'post_id'			=> array(
					'required' 					=> true,
					'sanitize_callback' => 'absint',
				),
				'custom_field_key' 			=> array(
					'required'					=> true,
					'type'							=> 'string',
					'sanitize_callback'	=> 'sanitize_text_field',
				),
			),
		)
	);
	register_rest_route( 
		'wp/acf-meta-block/v1',
		'/generate-title-field/save',
		array(
			'methods'		=> 'POST',
			'callback' 	=> 'save_genarate_title_field',
			'args'			=> array(
				'post_id'			=> array(
					'required' 					=> true,
					'sanitize_callback' => 'absint',
				),
				'generate_title_field' 			=> array(
					'required'					=> true,
					'type'							=> 'string',
					'sanitize_callback'	=> 'sanitize_text_field',
				),
			),
		)
	);
	register_rest_route( 
		'wp/acf-meta-block/v1',
		'/radio-button/save',
		array(
			'methods'		=> 'POST',
			'callback' 	=> 'save_radio_button',
			'args'			=> array(
				'post_id'			=> array(
					'required' 					=> true,
					'sanitize_callback' => 'absint',
				),
				'radio_button' 			=> array(
					'required'					=> true,
					'type'							=> 'boolean',
					'sanitize_callback'	=> 'sanitize_text_field',
				),
			),
		)
	);
	// register_rest_route( 
	// 	'wp/acf-meta-block/v1',
	// 	'/get-date-block/save',
	// 	array(
	// 		'methods'		=> 'POST',
	// 		'callback' 	=> 'save_get_date_block',
	// 		'args'			=> array(
	// 			'post_id'			=> array(
	// 				'required' 					=> true,
	// 				'sanitize_callback' => 'absint',
	// 			),
	// 			'get_date_block' 			=> array(
	// 				'required'					=> true,
	// 				'type'							=> 'string',
	// 				'sanitize_callback'	=> 'sanitize_text_field',
	// 			),
	// 		),
	// 	)
	// );
}

function save_custom_field_key( WP_REST_Request $request ) {
	$post_id = $request->get_param( 'post_id' );
	$custom_field_key = $request->get_param( 'custom_field_key' );
	
	update_post_meta( $post_id, 'custom_field_key', $custom_field_key );

	return new WP_REST_Response( array( 'success custom field' => true ) );
}

function save_genarate_title_field( WP_REST_Request $request ) {
	$post_id = $request->get_param( 'post_id' );
	$generate_title_field = $request->get_param( 'generate_title_field' );

	update_post_meta( $post_id, 'generate_title_field', $generate_title_field );

	return new WP_REST_Response( array( 'success generate title' => true ) );
}

function save_radio_button( WP_REST_Request $request ) { 
	$post_id = $request->get_param( 'post_id' );
	$radio_button = $request->get_param( 'radio_button' );

	update_post_meta( $post_id, 'radio_button', $radio_button );

	return new WP_REST_Response( array( 'success radio button' => true ) );
}

// function save_get_date_block( WP_REST_Request $request ) { 
// 	$post_id = $request->get_param( 'post_id' );
// 	$get_date_block = $request->get_param( 'get_date_block' );

// 	update_post_meta( $post_id, 'get_date_block', $get_date_block );

// 	return new WP_REST_Response( array( 'success get date' => true ) );
// }