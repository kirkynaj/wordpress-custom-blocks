<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
    $acf_meta_value_title = 'acf_meta_value';
    $post_id = isset( $attributes['postId'] ) ? $attributes['postId'] : get_the_ID();
    
    $acf_meta_value = get_post_meta( $post_id, $acf_meta_value_title, true );
		?>
	
    <div class="custom-field-block-output">
      <p><?php echo esc_html( $acf_meta_value ) ?></p>
     </div>

