/*
* Grabs all (not-yet-processed) posts on the page and injects reblog-from-source 
* functionality if the post is not on your dashboard directly from the source.
*/
var makeButtons = function(){
	var posts = $(".post_container").not(".new_post_buttons_container").not("[processed]"); //gets all posts on the page, save for already updated posts
	$.each(posts, function(index, post){
		var postChild = $(".post_full", post).get(0);
		if(postChild == undefined ){
			return;
		}
		var postJson = JSON.parse(postChild.attributes["data-json"].value);
		var rootId = postJson['root_id'];
		var postId = postJson['id'];
		var reblogKey = postJson['reblog-key'];
		var reblogLink ="/reblog/"+rootId+"/"+reblogKey;		

		//if you are NOT the OP, create the button
		//also creates if you ARE the OP, but you were reblogging yourself/someone else and adding comments
		if(rootId != postId) {
			var buttons_div = $('.post_controls_inner', post).get(0); //grabs the button location
			buttons_div.innerHTML = buttons_div.innerHTML + '<a class="post_control post-control-icon reblog-from-source" target="_blank" title="Reblog from Source" href="'+reblogLink+'" data-subview="reblog"></a>'; 
		}
		var typ = document.createAttribute("processed");
		typ.value = true;
		post.attributes.setNamedItem(typ);
	});
}

window.onload = makeButtons();

/*
* Binds to the scroll event, calling the makeButtons() function.
*/
$(window).scroll(function(){
	makeButtons();
});


/* 
* Ideally, the post would open in the current window as a modal on top of the dashboard, not losing your place.
* However, second best we can do is to just open it in a second tab. I'm not sure where the on-current-screen code stems from.
*/