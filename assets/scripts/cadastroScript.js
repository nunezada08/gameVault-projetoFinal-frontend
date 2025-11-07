document.getElementById('btns').addEventListener('click', function() {

    const email = document.getElementById('infoMail').value;
    const senha = document.getElementById('infoSenha').value;

    localStorage.setItem('senha', senha);
    localStorage.setItem('email', email);

    if (email === undefined || senha === undefined){
        alert('Por favor, preencha todos os campos!');
        return;
    } else {
        window.location.href = './login.html'
    }

})