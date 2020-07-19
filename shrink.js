document.body.style.visible = "hidden";

numberToKeep = 1000
// node->word count.
words = []
costs = []

function recursiveCount(node) {
	//console.log(node.style.visibility)
	words.push(node)
	for (smallnode of node.children) {
		recursiveCount(smallnode)
	}
}

function nodeText(n) {
	return [].reduce.call(n.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
}

function nodeCost(n) {
	// TODO improve this, so that it is more efficient, or works at all????

	// console.log('test')
	// Returns the text content as a string
	var sng = nodeText(n)
	//console.log('----')
	//console.log(string.length)
	//console.log(node.textContent.length)
	return sng.length;
}


function removeSmall(node) {
	if(words.length < 10) {
		console.log("firstrun")
		// if we have not already filled out this array
		recursiveCount(node);
		words.sort(function(a,b) { return nodeCost(b) - nodeCost(a)})
		for (word of words) { word.backup_style = word.style; }

		for (var i = 0; i < 10; i++) {
			console.log(words[i])
		}
		numberToKeep = words.length;
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
		event.preventDefault()
	}

	if (numberToKeep < 0) {
		numberToKeep = 0
	}
})

