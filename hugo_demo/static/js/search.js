var searchElem = document.getElementById("search-input");
var posts;
function loadSearch() { 
    // call the index.json file from server by http get request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data) {
                    posts = data.items; // load json data
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../hugo-demo/index.json");
    xhr.send();
}
loadSearch(); // call loadsearch to load the json files
function showSearchResults() {
    var query = searchElem.value || ''; // get the value from input
    console.log(query);
    var searchString = query.replace(/[^\w\s]/gi, ''); // clear white spaces
    console.log(searchString);
    var target = document.getElementById('list'); // target the ul list to render the results
    console.log(target);
    var postsByTitle = posts.reduce((acc, curr) => { // map lunr search index to your articles
        acc[curr.title] = curr;
        return acc;
    }, {}
    );
    // build lunr index file
    var index = lunr(function () {
        this.ref('title')
        this.field('content')
        posts.forEach(function (doc) {
            this.add(doc)
        }, this)
    });
    // search in lunr index
    if (searchString && searchString != '') {
        var matches = index.search(searchString);
        var matchPosts = [];
        matches.forEach((m) => {
            matchPosts.push(postsByTitle[m.ref]);
        });
        if (matchPosts.length > 0) {
            // match found with input text and lunr index
            target.innerHTML = matchPosts.map(function (p) {
                if (p != undefined) {
                    var searchHtml = `
                        <a href='${p.url}'>
                            <table>
                                <tr>
                                        <td><img src=${p.image} width='80' height='80' ></td>
                                        <td>${p.title}</td>
                                </tr>
                            </table>
                        </a>`;
                    return searchHtml;
                }
            }).join('');
        } else {
            // if no results found, then render a general message
            target.innerHTML = `<br><h2 style="text-align:center">No search results found</h2>`;
        };
    } else {
        target.innerHTML = ''
    }
};