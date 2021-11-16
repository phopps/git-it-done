let userFormElement = document.querySelector("#user-form");
let nameInputElement = document.querySelector("#username");
let repoContainerElement = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

let formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  let username = nameInputElement.value.trim();

  if (username) {
    getUserRepos(username);

    // clear old content
    repoContainerElement.textContent = "";
    nameInputElement.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

let getUserRepos = function(user) {
  // format the github api url
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    }).catch(function(error) {
      alert("Unable to connect to GitHub");
    });
};


let displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerElement.textContent = "No repositories found.";
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (let index = 0; index < repos.length; index++) {
    // format repo name
    let repoName = repos[index].owner.login + "/" + repos[index].name;

    // create a container for each repo
    let repoElement = document.createElement("div");
    repoElement.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    let titleElement = document.createElement("span");
    titleElement.textContent = repoName;

    // append to container
    repoElement.appendChild(titleElement);

    // create a status element
    var statusElement = document.createElement("span");
    statusElement.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[index].open_issues_count > 0) {
      statusElement.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[index].open_issues_count + " issue(s)";
    } else {
      statusElement.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoElement.appendChild(statusElement);

    // append container to the dom
    repoContainerElement.appendChild(repoElement);
  }
};

// add event listener to forms
userFormElement.addEventListener("submit", formSubmitHandler);