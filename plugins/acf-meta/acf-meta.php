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
		'/save',
		array(
			'methods'		=> 'POST',
			'callback' 	=> 'save_acf_meta_data',
			'args'			=> array(
				'post_id'			=> array(
					'required' 					=> true,
					'sanitize_callback' => 'absint',
				),
				'acf_meta_value' 			=> array(
					'required'					=> true,
					'type'							=> 'string',
					'sanitize_callback'	=> 'sanitize_text_field',
				),
			),
		)
	);
}

function save_acf_meta_data( WP_REST_Request $request ) {
	$post_id = $request->get_param( 'post_id' );
	$acf_meta_value = $request->get_param( 'acf_meta_value' );

	update_post_meta( $post_id, 'acf_meta_key', $acf_meta_value );

	return new WP_REST_Response( array( 'success' => true ) );
}
