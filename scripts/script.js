const url = "https://reqres.in/api/users";

function getUsers() {
    axios.get(url)
        .then(response => response.data)
        .then(data => {

            const markup = data.data.map(element => {
                return `
            <div class="container-card">
                <div class="container-card-style">
                    <span>
                        <img src="${element.avatar}" alt="user-image" class="avatar">
                    </span>

                    <span>
                        <p class="ident">${element.id}</p>
                        <p class="email">${element.email}</p>
                        <p class="firstName">${element.first_name}</p>
                        <p class="lastName">${element.last_name}</p>
                    </span>
                </div>
            </div>
            `;
            });
            document.querySelector(".container-flex").innerHTML = markup;
        });
};


function addNewUser() {

    const btn = document.querySelector('#send');

    btn.addEventListener("click", function (event) {
        event.preventDefault();

        const newUser = {
            email: document.getElementById("emailInput").value,
            first_name: document.getElementById("firstNameInput").value,
            last_name: document.getElementById("lastNameInput").value,
            avatar: document.getElementById("avatarInput").value
        };

        if (newUser.email.length > 0 && newUser.first_name.length > 0 && newUser.last_name.length > 0) {

            axios.post(url, newUser)
                .then(response => response.data)
                .then(data => {

                    const markup = `
                            <div class="container-card">
                                <div class="container-card-style">
                                    <span>
                                        <img src="${data.avatar}" alt="user-image" class="avatar">
                                    </span>

                                    <span>
                                        <p class="ident">${data.id}</p>
                                        <p class="email">${data.email}</p>
                                        <p class="firstName">${data.first_name}</p>
                                        <p class="lastName">${data.last_name}</p>
                                    </span>
                                </div>
                            </div>
                        `;

                    document.querySelector(".container-flex").insertAdjacentHTML('beforeend', markup);

                    clearForm();
                }).catch(error => console.error(error));

            let element = document.getElementById('field-fill-Criar');
            element.classList.replace('not-filled', 'filled');

        } else {
            let element = document.getElementById('field-fill-Criar');
            element.classList.replace('filled', 'not-filled');
        };
    });
};

function updateUser() {

    const btn = document.querySelector('#modify');

    btn.addEventListener("click", function (event) {
        event.preventDefault();

        const id = document.getElementById("idInputAtt").value;

        const updatedUser = {
            email: document.getElementById("emailInputAtt").value,
            first_name: document.getElementById("firstNameInputAtt").value,
            last_name: document.getElementById("lastNameInputAtt").value,
            avatar: document.getElementById("avatarInputAtt").value
        };

        if (updatedUser.email.length > 0 && updatedUser.first_name.length > 0 &&
            updatedUser.last_name.length > 0 && id.length > 0) {

            axios.put(`${url}/${id}`, updatedUser)
                .then(response => response.data)
                .then(data => {

                    let ids = document.getElementsByClassName('ident');

                    for (var i = 0; i < ids.length; i++) {

                        if (ids[i].innerHTML == id) {

                            document.getElementsByClassName('avatar')[i].src = data.avatar;
                            document.getElementsByClassName('email')[i].innerHTML = data.email;
                            document.getElementsByClassName('firstName')[i].innerHTML = data.first_name;
                            document.getElementsByClassName('lastName')[i].innerHTML = data.last_name;
                        };
                    };

                    clearForm();
                })
                .catch(error => console.error(error));

            let element = document.getElementById('field-fill-Atualizar');
            element.classList.replace('not-filled', 'filled');
        } else {
            let element = document.getElementById('field-fill-Atualizar');
            element.classList.replace('filled', 'not-filled');
        };
    });
};

function deleteUser() {
    const btn = document.querySelector('#delete');

    btn.addEventListener("click", function (event) {
        event.preventDefault();

        const id = document.getElementById('deleteInput').value;

        if (id.length > 0) {
            axios.delete(`${url}/${id}`)
                .then(response => response.data)
                .then(data => {

                    let container = document.getElementsByClassName('container-card');
                    let ids = document.getElementsByClassName('ident');

                    for (var i = 0; i < ids.length; i++) {

                        if (ids[i].innerHTML == id) {
                            container[i].remove();
                        };
                    };

                    clearForm();
                })
                .catch(error => console.error(error));

            let element = document.getElementById('field-fill-Deletar');
            element.classList.replace('not-filled', 'filled');

        } else {
            let element = document.getElementById('field-fill-Deletar');
            element.classList.replace('filled', 'not-filled');
        }
    })
};

function clearForm() {
    const clean = document.getElementsByClassName('clean');

    for (let i = 0; i < clean.length; i++) {
        clean[i].value = '';
    };
};

getUsers();
addNewUser();
updateUser();
deleteUser();
