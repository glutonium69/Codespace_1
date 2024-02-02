document.addEventListener('DOMContentLoaded', () => {
    // Fetch the login page from the server
    fetch('https://automatic-capybara-4j75wj7gjxrrh7pwr-5000.app.github.dev/')
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            console.log(html);
        })
        .catch(error => console.error('Error fetching login page:', error));
});
