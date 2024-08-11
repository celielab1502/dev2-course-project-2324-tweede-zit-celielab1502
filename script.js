const form = document.querySelector("form");

const submit = (event) => {
    event.preventDefault();
    console.log("hello");
}

form.addEventListener("submit", submit);