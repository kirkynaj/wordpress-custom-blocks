function  clearFields() {
  document.getElementById("custom-crud-posts").value = "";
  document.getElementById('custom-crud-post-title').value = '';
  document.getElementById('custom-crud-post-content').value = '';
  document.getElementById('custom-crud-post-id').value = '';
}

function loadPosts() {
  clearFields();
  const allPosts = new wp.api.collections.Posts();
  allPosts.fetch(
    { data: { "_fields": "id, title" } }
  ).done(function(posts) {
    const textarea = document.getElementById( 'custom-crud-posts' );
    posts.forEach( function(post) {
      textarea.value += post.id + ', ' + post.title.rendered + '\n'
    });
  } );
}

function submitPost() {
  const title = document.getElementById( 'custom-crud-post-title' ).value;
  const content = document.getElementById( 'custom-crud-post-content' ).value;
  const url_value = document.getElementById( 'custom-crud-post-url-value' ).value;

  const post = new wp.api.models.Post( {
    title: title,
    content: content,
    status: 'publish',
    meta: {
      'url': url_value
    }
  } );
  post.save().done( function ( post ) {
      alert( 'Post saved!' );
      loadPosts();
  } );
}

function updatePost() {
  const id = document.getElementById( 'custom-crud-update-post-id' ).value;
  const title = document.getElementById( 'custom-crud-update-post-title' ).value;
  const content = document.getElementById( 'custom-crud-update-post-content' ).value;
  const url_value = document.getElementById( 'custom-crud-update-post-url-value' ).value;

  const post = new wp.api.models.Post( {
      id: id,
      title: title,
      content: content,
      status: 'publish',
      meta: {
          'url': url_value
      }
  } );
  console.log(post);
  post.save().done( function ( post ) {
      alert( 'Post updated!' );
  } );
}

function deletePost(){
  const id = document.getElementById( 'custom-crud-post-id' ).value;
  const post = new wp.api.models.Post( { id: id } );
  post.destroy().done( function ( post ) {
      alert( 'Post deleted!' );
      loadPosts();
  } );
}

const clearPostsButton = document.getElementById( 'custom-crud-clear-posts' );
if ( clearPostsButton ) {
  clearPostsButton.addEventListener( 'click', clearFields );
}

const loadPostsButton = document.getElementById( 'custom-crud-api-button' );
if ( loadPostsButton ) {
  loadPostsButton.addEventListener( 'click', loadPosts );
}

const submitPostButton = document.getElementById( 'custom-crud-submit-post' );
if ( submitPostButton ) {
  submitPostButton.addEventListener( 'click', submitPost );
}

const updatePostButton = document.getElementById( 'custom-crud-update-post' );
if ( updatePostButton ) {
  updatePostButton.addEventListener( 'click', updatePost );
}

const deletePostButton = document.getElementById( 'custom-crud-delete-post' );
if ( deletePostButton ) {
  deletePostButton.addEventListener( 'click', deletePost );
}