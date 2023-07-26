<?php
/**
 * Plugin Name:     Custom CRUD API
 * Description:     Learning about the WP REST API
 * Version:         0.0.1
 */

register_meta(
	'post',
	'url',
	array(
		'single'       => true,
		'type'         => 'string',
		'default'      => '',
		'show_in_rest' => true,
	)
);

add_action( 'admin_menu', 'custom_crud_api_submenu', 11 );
function custom_crud_api_submenu() {
  add_submenu_page(
    'tools.php',
    esc_html__( 'Custom CRUD API', 'custom_crud' ),
    esc_html__( 'Custom CRUD API', 'custom_crud' ),
    'manage_options',
    'custom-crud-api',
    'custom_crud_api_render_admin_page',
    10
  );
}

function custom_crud_api_render_admin_page() {
  ?>
  <div class="wrap" id="custom_crud_admin">
		<div>
			<h1>Admin</h1>
			<button id="custom-crud-api-button">Load Posts</button>
			<button id="cutom-crud-clear-posts">Clear Posts</button>
			<h2>Posts</h2>
			<textarea id="custom-crud-posts" cols="100" rows="15"></textarea>
		</div>

		<div style="width:50%;">
			<h2>Add Post</h2>
			<form>
				<div>
					<label for="custom-crud-post-title">Post Title</label>
					<input type="text" id="custom-crud-post-title" placeholder="Title">
				</div>
				<div>
					<label for="custom-crud-post-content">Post Content</label>
					<textarea id="custom-crud-post-content" cols="100" rows="10"></textarea>
				</div>
                <div>
                    <label for="custom-crud-post-url-value">URL Value</label>
                    <input type="text" id="custom-crud-post-url-value" placeholder="Value">
                </div>
				<div>
					<input type="button" id="custom-crud-submit-post" value="Add">
				</div>
			</form>
		</div>

        <div style="width:50%;">
            <h2>Update Post</h2>
            <form>
                <div>
                    <label for="custom-crud-update-post-id">Post ID</label>
                    <input type="text" id="custom-crud-update-post-id" placeholder="ID">
                </div>
                <div>
                    <label for="custom-crud-update-post-title">Post Title</label>
                    <input type="text" id="custom-crud-update-post-title" placeholder="Title">
                </div>
                <div>
                    <label for="custom-crud-update-post-content">Post Content</label>
                    <textarea id="custom-crud-update-post-content" cols="100" rows="10"></textarea>
                </div>
                <div>
                    <label for="custom-crud-update-post-url-value">URL Value</label>
                    <input type="text" id="custom-crud-update-post-url-value" placeholder="Value">
                </div>
                <div>
                    <input type="button" id="custom-crud-update-post" value="Update">
                </div>
            </form>
        </div>

		<div style="width:50%;">
			<h2>Delete Post</h2>
			<form>
				<div>
					<label for="custom-crud-post-id">Post ID</label>
					<input type="text" id="custom-crud-post-id" placeholder="ID">
				</div>
				<div>
					<input type="button" id="custom-crud-delete-post" value="Delete">
				</div>
			</form>
		</div>

	</div>
  <?php
}

add_action( 'admin_enqueue_scripts', 'custom_crud_api_enqueue_script' );
function custom_crud_api_enqueue_script(){
  $screen = get_current_screen();
  if ( $screen->id !== 'tools_page_custom-crud-api') {
    return;
  }
  wp_register_script(
    'custom-crud-api',
    plugin_dir_url(__FILE__) . 'custom-crud-api.js',
    array( 'wp-api' ),
    time(),
    true
  );
  wp_enqueue_script( 'custom-crud-api' );
}




