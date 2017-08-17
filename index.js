
function getRepositories(){
	const req = new XMLHttpRequest();
	req.addEventListener("load", displayRepositories);
	let user = document.getElementById("username").value;
	req.open("GET", 'https://api.github.com/users/' + user + '/repos');
	req.send();
}

function displayRepositories(event, data){
	var repos = JSON.parse(this.responseText);
	const repoList = `
	<ul>${repos.map(repo => '<li>' + repo.url + ' - <a href="#" data-repo="' + repo.html_url + '" onclick="getCommits(this)">Get Commits</a>' +  '- <a href="#" data-branch="' + repo.branches_url + '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>
	`
	document.getElementById('repositories').innerHTML = repoList;

}

function getCommits(el){
	const name = el.dataset.repository;

	const req = new XMLHttpRequest();
	let user = document.getElementById("username").value;
	req.addEventListener("load", displayCommits);
	req.open("GET", `https://api.github.com/repos/${user}/` + name + '/commits');
	req.send();
}

function displayCommits(event, data){
	const commits = JSON.parse(this.responseText);
	const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.author.login + commit.commit.message + '</li>').join('')}</ul>`
  	document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
	const name = el.dataset.repository;
	const req = new XMLHttpRequest();
	let user = document.getElementById("username").value;
	req.addEventListener('load', displayBranches)
	req.open("GET", `https://api.github.com/repos/${user}/` + name + '/branches');
	req.send();
}

function displayBranches(){
	const branches = JSON.parse(this.responseText);
	const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchList
}


// 	req.open("GET", 'https://api.github.com/users/${username}/repos')
// 	// req.setRequestHeader('Authorization', '3e60af6b09d4c3a232544b7e46e6ac5e1497b8b2')

// function displayRepositories(event, data) {
//   let username = document.getElementById('username').value
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)


// const userForm = document.getElementById('find-user')
// userForm.addEventListener('submit', getRepositories)

// function getCommits(el) {
// 	const name = el.dataset.repo
// 	const username = el.dataset.username
// 	const req = new XMLHttpRequest()
// 	req.addEventListener("load", displayCommits)
// 	req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
// 	// req.setRequestHeader('Authorization', 'e9661715e052a0d44c4e39e6ceb8560a0ad83640')
//   	req.send()
// }

// function displayCommits() {
// 	const commits = JSON.parse(this.responseText)
// 	console.log(commits)
//   	const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' ' + commit.commit.message + '</li>').join('')}</ul>`

//   	document.getElementById("details").innerHTML = commitsList
// }

// function getBranches(el) {
// 	const name = el.dataset.repo
// 	const username = el.dataset.username

// 	const req = new XMLHttpRequest()
// 	req.addEventListener("load", displayBranches)
// 	req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
// 	req.send()
// }

// function displayBranches() {
// 	const branches = JSON.parse(this.responseText)
// 	console.log(branches)
// 	const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`

// 	document.getElementById("details").innerHTML = branchesList
// }



