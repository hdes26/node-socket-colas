//Referencias HTML
const lblEscritorio    = document.querySelector('h1');
const lblticket        = document.querySelector('small');
const lblPendientes    = document.querySelector('#lblPendientes');
const btnAtenderTicket = document.querySelector('button');
const divAlerta        = document.querySelector('.alert');



const socket = io();




const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.textContent = escritorio;
divAlerta.style.display = 'none';




socket.on('connect', () => {
    btnAtenderTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnAtenderTicket.disabled = true;
});
socket.on('tickets-pendientes', ( pendientes ) => {
    if (pendientes===0) {
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.textContent = pendientes;
        divAlerta.style.display = 'none';

    }
});





btnAtenderTicket.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ok,ticket,msg}) => {

        if (!ok) {
            lblticket.textContent = 'Nadie.';
            return divAlerta.style.display = '';
        }
        lblticket.textContent = 'Ticket ' + ticket.numero;
    });

});

