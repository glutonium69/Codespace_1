let json;

fetch("https://automatic-capybara-4j75wj7gjxrrh7pwr-5000.app.github.dev/json")
    .then(response => response.json())
    .then(data => {json = data; console.log(data)})
    .then(() => document.body.textContent = json.message)
    .catch(err => console.log(err));


