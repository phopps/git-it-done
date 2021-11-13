let getUserRepos = function() {
  let response = fetch("https://api.github.com/users/octocat/repos").then(function(response) {
    console.log("inside", response);

  });

  console.log("outside");
};

getUserRepos();