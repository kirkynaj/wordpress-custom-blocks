<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
    $meta_key = 'your_custom_meta_key'; // Replace with your actual meta key
    $post_id = isset( $attributes['postId'] ) ? $attributes['postId'] : get_the_ID();
    $meta_value = get_post_meta( $post_id, $meta_key, true );

		?>
	
    <div class="custom-field-block-output"><?php esc_html( $meta_value ) ?> </div>

