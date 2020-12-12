const form = document.querySelector('form');

const API_URL = 'https://whispering-river-16276.herokuapp.com/api/user/register';
const genKey_URL = ' https://autotune-api-key-generator.herokuapp.com/'



 makeGenKeyAPIrequest = async function(user){
   
    let response = await fetch(genKey_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json',
            "password" : user.password,
            "email": user.email
        }
    })
    .then(status)
    .then(res => res.json())
    .then(res => localStorage.setItem("apikey", res.userAPIKEY))
    }
    
    function status(res) {
        if (!res.ok) {
            return Promise.reject();
        }
        return res;
    }

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const name = formData.get('uname');
    const password = formData.get('password');

    form.submitButton.disabled = true;
    form.submitButton.value = "Generating Key...";

    localStorage.removeItem("apikey");

    var user = {
        "email": email, 
        "name": name,
        "password": password
    };
    console.log(user)

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
          }
    })
    .then(response => {
        
        if(!response.ok){
            form.submitButton.disabled = false;
            form.submitButton.value = "Submit";
            alert("Invalid request. Ensure username and password are longer than 6 characters and email is not already registered to an Autotune account")
            throw new Error('Invalid Request')
        }else{
            genKeyFunction(user)
        
        }
    })
    .catch((error) => {
        console.log(error);
    });
});

genKeyFunction = async function(user){
    const keyAPI = await makeGenKeyAPIrequest(user)
    console.log(localStorage.getItem("apikey"));
    form.reset();
    window.location.href = "genkey.html"
}




