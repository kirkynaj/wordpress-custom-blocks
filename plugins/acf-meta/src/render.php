<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
    $custom_field_key_title = 'custom_field_key';
    $generate_title_field_info = 'generate_title_field';

    $post_id = isset( $attributes['postId'] ) ? $attributes['postId'] : get_the_ID();
    
    $custom_field_key = get_post_meta( $post_id, $custom_field_key_title, true );
    $generate_title_field = get_post_meta( $post_id, $generate_title_field_info, true );

		?>
	
    <div class="custom-field-block-output">
      <p><?php echo esc_html( $custom_field_key ) ?></p>
      <p>Generated Post Title: <?php echo esc_html( $generate_title_field) ?></p>
     </div>

