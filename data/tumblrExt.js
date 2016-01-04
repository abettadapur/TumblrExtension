makeButtons = function(){

	var posts = $(".post_container").not(".new_post_buttons_container"); //gets all posts on the page
	$.each(posts, function(index, post){
		var postChild = $(".post_full", post).get(0);
		if(postChild == undefined){
			return;
		}
		var postJson = JSON.parse(postChild.attributes["data-json"].value);
		var rootId = postJson['root_id'];
		var postId = postJson['id'];
		var reblogKey = postJson['reblog-key'];
		var reblogLink ="/reblog/"+rootId+"/"+reblogKey;	


		if(rootId != postId) { //if you are NOT the OP, create the new button
			var buttons_div = $('.post_controls_inner', post).get(0); //grabs the button location
			buttons_div.innerHTML = buttons_div.innerHTML + '<a class="post_control post-control-icon reblog-from-source" target="_blank" title="Reblog from Source" href="'+reblogLink+'" data-subview="reblog"></a>'; 
		}
	});
}



window.onload = makeButtons();


/*var scrollPosition = 0;
var currScrollPosition = $(window).scrollTop();*/

/*
* Binds to the scroll event. On scroll (in any direction), calls the makeButtons() function.
*/
$(window).scroll(function(){
	makeButtons();
	//this stuff doesn't work 100% of the time
	//if we could make it so it's only called on scroll down, that could help remove some of the extraneous calls
	/*if(currScrollPosition < scrollPosition){
		//scrolling down
		alert("going down!");
	}
	else if(currScrollPosition > scrollPosition){
		alert("going up!");
	}
	else{
		//haven't moved, shouldn't hit this?
	}
	scrollPosition = currScrollPosition*/
});

/* 
* Ideally, the post would open in the current window as a modal on top of the dashboard, not losing your place.
* However, second best we can do is to just open it in a second tab. I'm not sure where the on-current-screen code stems from.
*/