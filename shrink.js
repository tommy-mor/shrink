document.body.style.visible = "hidden";

wordsThreshold = 0
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
	//var a = [].reduce.call(n.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
	var a = n.textContent
	//console.log(a)
	return a;
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
		for (word of words) { word.cost = nodeCost(word); }
		words.sort(function(a,b) { return b.cost - a.cost })

		for (var i = 0; i <= 10; i++) {
			console.log(words[i])
		}
		//numberToKeep = words[0].cost;
		numberToKeep = 0
	}

	//console.log(words)

	for (var i = 0; i < words.length; i++) {
		if (words[i].cost <= wordsThreshold) {
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
		wordsThreshold += 1;
		console.log('zooming to level' + wordsThreshold);
		removeSmall(document.body)
	} else if (event.key == "Home") {
		wordsThreshold -= 1;
		console.log('zooming to level' + wordsThreshold);
		removeSmall(document.body)
		event.preventDefault()
	}

	if (wordsThreshold < 0) {
		wordsThreshold = 0
	}
})

