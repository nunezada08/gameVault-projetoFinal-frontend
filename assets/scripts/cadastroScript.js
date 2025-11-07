document.getElementById('btns').addEventListener('click', function() {

    const email = document.getElementById('infoMail').value;
    const senha = document.getElementById('infoSenha').value;

    localStorage.setItem('senha', senha);
    localStorage.setItem('email', email);

    window.location.href = './login.html'

})