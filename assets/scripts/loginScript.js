document.getElementById('info').addEventListener('click', function () {
    const email = document.getElementById('infoMail').value;
    const senha = document.getElementById('infoSenha').value;

    const emailSalvo = localStorage.getItem('email');
    const senhaSalva = localStorage.getItem('senha');

    if (email === emailSalvo && senha === senhaSalva) {
        window.location.href = '../index.html'
    } else {
        alert('Usuario ou senha estão incorretos!')
    }
})