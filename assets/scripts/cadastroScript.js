document.getElementById('infos').addEventListener('click', function() {

    const usuario = document.getElementById('infoNome').value;
    const dataNasc = document.getElementById('infoData').value;
    const email = document.getElementById('infoMail').value;
    const senha = document.getElementById('infoSenha').value;

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('dataNasc', dataNasc);
    localStorage.setItem('senha', senha);
    localStorage.setItem('email', email);

    window.location.href = './login.html'

})