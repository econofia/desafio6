const socket = io.connect();


function render(data) {
    const html = data.map(elem => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" "); // itera por cada mensaje, y los junta separados por un espacio
    document.getElementById('messages').innerHTML = html;
}



socket.on('messages', function(data) { render(data); });
 // cuando recibo un mensaje, responde la function

//creo la función addMessage para que funcione en html. A lo ultimo return false para que no se ejecute nada después.
function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        
    };
    socket.emit('new-message', mensaje);
    return false;
}

//El index.html enlaza tanto el main.js como el script de socket.io.
//Recordemos que esta librería funciona tanto en cliente como servidor
// precisamente para conseguir la conexión bidireccional.