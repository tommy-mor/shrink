document.body.style.visible = "hidden";


// node->word count.
words = []
numberToKeep = 3;

function recursiveCount(node) {
	//console.log(node.style.visibility)
	words.push(node)
	for (smallnode of node.children) {
		recursiveCount(smallnode)
	}
}


function removeSmall(node) {
	if(words.length < 10) {
		console.log("firstrun")
		// if we have not already filled out this array
		recursiveCount(node);
		words.sort(function(sn) { return - sn.textContent.length })
		for (word of words) { word.backup_style = word.style; }

		for (var i = 0; i < 10; i++) {
			console.log(words[i])
		}
	}

	//console.log(words)

	for (var i = 0; i < words.length; i++) {
		if (i > numberToKeep) {
			words[i].style.visibility = "hidden";
		} else {
			// words[i].style = words[i].backup_style;
			words[i].style.visibility = "";
		}
	}
	
	return words;
}

//removeSmall(document.body)

console.log('uhhhhhhhhh')

window.addEventListener("keydown", function(event) {
	if (event.key == "Insert") {
		console.log('zooming to level' + numberToKeep);
		numberToKeep += 10;
		removeSmall(document.body)
	} else if (event.key == "Home") {
		console.log('zooming to level' + numberToKeep);
		numberToKeep -= 10;
		removeSmall(document.body)
	}

	if (numberToKeep < 0) {
		numberToKeep = 0
	}
})
						
