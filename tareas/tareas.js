const user = JSON.parse(localStorage.getItem('user'));
const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
const input = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');
if(!user) {
    window.location.href = '../home/index.html';
   // return;
}

const obtenerLista = async ()=> {
    const respuesta = await fetch('http://localhost:3000/tareas', {method: 'GET'});
    const list = await respuesta.json();
    const userList = list.filter(lista => lista.user === user.username);

    userList.forEach(i=> {
        const listado = document.createElement('li');
        console.log(listado);
        listado.innerHTML = `
        
        <li id=${i.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        ${input.value}
        <p class="${i.checked ? "check-todo" : ""}">${i.text}</p>
        <button class="check-btn">&#10003;</button>
        </li>
        `;
        lista.appendChild(listado);
    input.value = '';
    })
}
obtenerLista();

formulario.addEventListener('submit', postF);

async function postF(e) {
    e.preventDefault();
    await fetch('http://localhost:3000/tareas', {
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({text:input.value,user:user.username})
    });
}

cerrarBtn.addEventListener('click', async e => {
    // e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = "../home/index.html";
})

lista.addEventListener('click', async e=> {
    if(e.target.classList.contains('delete-btn')) {
        const id = e.target.parentElement.id;

        await fetch(`http://localhost:3000/tareas/${id}`, {
            method: 'DELETE'})
        e.target.parentElement.remove();
    } else if(e.target.classList.contains('check-btn'));

        const id = e.target.parentElement.id;
        
        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'},
            body: JSON.stringify({checked: e.target.parentElement.classList.contains('check-todo') ? false : true})
        })
        e.preventDefault();
            //con el metodo PATCH, se va a buscar el id especificado
            //actualizar el html

            const response = await respuestaJSON.json();
            //e.target.childNodes[1].classList.toggle('check-todo');
            // console.log(e.target.parentElement);
            // //e.target.text.classList.toggle('check-todo');
            // e.target.parentElement.classList.toggle('check-todo');
            
    
});