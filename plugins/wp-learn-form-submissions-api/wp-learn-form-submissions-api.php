<?php
/**
 * Plugin Name: WP Learn Form Submissions API
 * Version: 0.0.1
 */

 register_activation_hook( __FILE__, 'wp_learn_setup_table' );

 function wp_learn_setup_table() {
  global $wpdb;
  $table_name = $wpdb->prefix . 'form_submissions';

  $sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar (100) NOT NULL,
    email varcher (100) NOT NULL,
    PRIMARY KEY (id)
  )";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  dbDelta( $sql );
 }

 add_action( 'rest_api_init', 'wp_learn_register_routes' );
 function wp_learn_register_routes() {
  register_rest_route(
    'wp-learn-form-submissions-api/v1',
    '/form-submissions/',
    array(
      'methods'  => 'GET',
      'callback' => 'wp_learn_get_form_submissions',
      'permission_callback' => '__return_true'
    ) 
  );

  register_rest_route(
    'wp-learn-form-submissions-api/v1',
    '/form-submissions/',
    array(
      'methods'  => 'POST',
      'callback' => 'wp_learn_create_form_submission',
      'permission_callback' => 'wp_learn_check_permissions',
    ) 
  );

  register_rest_route(
    'wp-learn-form-submissions-api/v1',
    '/form-submissions/ (?P<id>\d+',
    array(
      'methods'  => 'GET',
      'callback' => 'wp_learn_get_form_submission',
      'permission_callback' => '__return_true'
    ) 
  );

 }

 function wp_learn_get_form_submissions() {
  global $wpdb;
  $table_name = $wpdb->prefix . 'form_submissions';

  $results = $wpdb->get_results("SELECT * FROM $table_name");

  return $results;
 }

 function wp_learn_check_permissions() {
  return current_user_can( 'edit_posts' );
 }

 function wp_learn_create_form_submission($request) {
  global $wpdb;
  $table_name = $wpdb->prefix . 'form_submissions';

  $rows = $wpdb->insert(
    $table_name,
    array(
      'name' => $request['name'],
      'email' => $request['email'],
    )
  );
  
  return $rows;
 }

 function wp_learn_get_form_submission($request) {
  $id = $request['id'];
  global $wpdb;
  $table_name = $wpdb->prefix . 'form_submissions';

  $results = $wpdb->get_results( "SELECT * FROM $table_name WHERE id = $id" );

  return $results;
 }