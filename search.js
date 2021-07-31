const formTag = document.querySelector("form");
const inputTag = document.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey = "9QskPaThhJg_PUn6VNFJovNXnOZLiGnhqg8KsjkwRiI";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="

const searchUnsplash = function (term) {
  return fetch(apiUrl +term, {
    method: "GET", 
    headers: {
      "Authorization": "Client-ID " + accessKey
    }
  })
  	.then(response => response.json())
  	.then(data => {
//     console.log(data);
		return data.results.map(result => {
      return {
        imageSrc: result.urls.regular,
        width: result.width,
        height: result.width,
        name: result.user.name,
        title: (result.description || ""),
        backgroundColor: (result.color || "#cccccc") + "33"
      }
    })
  })
}

// Add the results to the page

const addResults = function (results) {
//   Remove all the loading tags first
	resultsTag.innerHTML = ""
// Loop over each individual result and add to the results tag
	results.forEach(result => {
    resultsTag.innerHTML = resultsTag.innerHTML + `
			<div class="single-result">
				<div class="image" style="background-color: ${result.backgroundColor}">
					<img src="${result.imageSrc}">
				</div>
				<h2>${result.title}</h2>
				<p>by ${result.name} - ${result.width} x ${result.height} px</p>
			</div>
`
  })
}


// When we submit the form, get the info from input

formTag.addEventListener("submit", function (event) {
  
//   Get the info from input

  const searchTerm = inputTag.value;
  
  searchUnsplash(searchTerm)
    .then(results => {
    	addResults(results);
  	});
  
  
//   Stop the form from going to the usual next page
event.preventDefault()
})