var posts = $(".post_container").not(".new_post_buttons_container"); //gets all posts on the page$
$.each(posts, function(index, post){
	var postChild = $(".post_full", post).get(0);
	var postJson = JSON.parse(postChild.attributes["data-json"].value);
	var rootId = postJson['root_id'];
	var postId = postJson['id'];
	var reblogKey = postJson['reblog-key'];
	var reblogLink ="/reblog/"+rootId+"/"+reblogKey;		

	if(rootId != postId) { //if you are NOT the OP, create the new button
		console.log("in the button maker");
		var buttons_div = $('.post_controls_inner', post).get(0); //grabs the buttons
		buttons_div.innerHTML = buttons_div.innerHTML + '<a  target="_blank" title="Reblog from Source" href="'+reblogLink+'" >link!</a>'; //element text
		console.log("made a button!");
	}
});

//class="post_control post-control-icon reblog"