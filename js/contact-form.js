const form = document.getElementById("contact-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(formData);

    // Check if required fields are empty
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert("Please fill in all the required fields (name, email, and message).");
        return;
    }

    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    fetch("https://getform.io/f/awngzdvb", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json",
        },
    })
        .then(response => {
            console.log(response)
            $('#contact :input').attr('disabled', 'disabled');
            $('#contact').fadeTo("slow", 1, function () {
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).find('label').css('cursor', 'default');
                $('#success').fadeIn();
            });
        })
        .catch(error => {
            console.log(error)
            $('#contact').fadeTo("slow", 1, function () {
                $('#error').fadeIn();
            });
        })
} 