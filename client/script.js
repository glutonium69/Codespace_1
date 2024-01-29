// script.js
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("https://automatic-capybara-4j75wj7gjxrrh7pwr-5000.app.github.dev/submit-form", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
});
