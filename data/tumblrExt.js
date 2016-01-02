makeButtons = function(){

	var posts = $(".post_container").not(".new_post_buttons_container"); //gets all posts on the page$
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

		if(rootId != postId) { //if you are NOT the OP, create the new button
			var buttons_div = $('.post_controls_inner', post).get(0); //grabs the button location
			buttons_div.innerHTML = buttons_div.innerHTML + '<a class="post_control post-control-icon reblog-from-source" target="_blank" title="Reblog from Source" href="'+reblogLink+'" data-subview="reblog"></a>'; 
		}
	});
}



window.onload = makeButtons();


/*var scrollPosition = 0;
var currScrollPosition = $(window).scrollTop();*/
$(window).scroll(function(){
	makeButtons();
	console.log("Scrolled");
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
* Attempted use of ".on" function, the modern version of the ".bind" function. 
* But I think I'm binding to the wrong event--I'm not sure what to call
* the pagination event that we are trying to bind to.
*/
/*$(".posts").on("scroll", makeButtons);*/



/*
* Trying to check for infinite scroll using MutationObserver, but still working out the kinks.
* getElementById insists that "posts" doesn't exist, when it in fact does.
* We can't use a JQuery selector here because it doesn't create a Node object, which the target must be.
*/
/*MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    makeButtons();
    // ...
});

var target = getElementById( "posts" );
// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(target, {
	childList: true,
	attributes: false,
	characterData: true, //???
	subtree: false,
	attributeOldValue: false,
	characterDataOldValue: false
});*/





/* 
* Ideally, the post would open in the current window as a modal on top of the dashboard, not losing your place.
* However, second best we can do is to just open it in a second tab. I'm not sure where the on-current-screen code stems from.
*/