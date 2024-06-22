let listaRandomNumb = [];
let numeroLimite = 10;

function gerarRandomNumb(){
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
    let quantidadeElementosLista = listaRandomNumb.length;
    if (quantidadeElementosLista === 3) {
        listaRandomNumb = [];
    }
    if (listaRandomNumb.includes(numeroEscolhido)) {
        return gerarRandomNumb();
    } else {
        listaRandomNumb.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

let randomNumer = gerarRandomNumb();
let tentativa = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}
exibirMsgInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == randomNumer) {
        exibirTexto('h1', 'Acertou!');
        let concordanciaTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto em ${tentativa} ${concordanciaTentativa}`;
        exibirTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > randomNumer) {
            exibirTexto('p', `O número é menor que ${chute}`);
        } else {
            exibirTexto('p', `O número é maior que ${chute}`);
        }
        tentativa++;
        limparCampo();
    }
}


function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    randomNumer = gerarRandomNumb();
    limparCampo();
    tentativa = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
