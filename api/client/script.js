const signIn = document.getElementById("signIn");

signIn.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log(formData.get("email"))

    fetch(event.target.action, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})


