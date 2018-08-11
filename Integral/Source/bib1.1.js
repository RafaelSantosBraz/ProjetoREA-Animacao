function converterPixelX(valor, escala) { // converte de número decimal para a escala pixel - para valores de X
    return valor * escala + 40;

}

function converterPixelY(valor, escala) { // converte de número decimal para a escala pixel - para valores de Y
    return (-1) * valor * escala + 460;

}

function desenhaFuncaoSeno(xInicial, xFinal, escala, tempoRetorno) {
    contadorEfeito += ProgPixPadrao;
    contadorEfeito = parseFloat(contadorEfeito.toFixed(1));
    var y = Math.sin(xInicial + contadorEfeito);
    var xPx = converterPixelX(xInicial + contadorEfeito, escala);
    var yPx = converterPixelY(y, escala);
    camada.lineTo(xPx, yPx);
    camada.stroke();
    if (xInicial + contadorEfeito === xFinal) {
        clearInterval(efeito);
        contadorEfeito = 0.0;
        proximaEtapa(tempoRetorno);
    }
}

function desenhaFuncaoX(xInicial, xFinal, a, b, c, escala, tempoRetorno) { // faz o cálculo de desenha uma função no padrão f(x) = ax^2 + bx + c 
    contadorEfeito += ProgPixPadrao;
    contadorEfeito = parseFloat(contadorEfeito.toFixed(1));
    var y = a * (xInicial + contadorEfeito) * (xInicial + contadorEfeito) + b * (xInicial + contadorEfeito) + c;
    var xPx = converterPixelX(xInicial + contadorEfeito, escala);
    var yPx = converterPixelY(y, escala);
    camada.lineTo(xPx, yPx);
    camada.stroke();
    if (xInicial + contadorEfeito === xFinal) {
        clearInterval(efeito);
        contadorEfeito = 0.0;
        proximaEtapa(tempoRetorno);
    }
}

function desenhaFuncaoJ(xInicial, xFinal, j, a, b, c, escala, tempoRetorno) { // faz o cálculo de desenha uma função no padrão f(x) = ax^2 + bx + c 
    contadorEfeito += ProgPixPadrao;
    contadorEfeito = parseFloat(contadorEfeito.toFixed(1));
    var y = j * (xInicial + contadorEfeito) * (xInicial + contadorEfeito) * (xInicial + contadorEfeito) + a * (xInicial + contadorEfeito) * (xInicial + contadorEfeito) + b * (xInicial + contadorEfeito) + c;
    var xPx = converterPixelX(xInicial + contadorEfeito, escala);
    var yPx = converterPixelY(y, escala);
    camada.lineTo(xPx, yPx);
    camada.stroke();
    if (xInicial + contadorEfeito === xFinal) {
        clearInterval(efeito);
        contadorEfeito = 0.0;
        proximaEtapa(tempoRetorno);
    }
}

function desenhaFuncaoY(yInicial, yFinal, a, b, c, escala, tempoRetorno) { // faz o cálculo de desenha uma função no padrão f(y) = ay^2 + by + c
    contadorEfeito += ProgPixPadrao;
    contadorEfeito = parseFloat(contadorEfeito.toFixed(1));
    var x = a * (yInicial + contadorEfeito) * (yInicial + contadorEfeito) + b * (yInicial + contadorEfeito) + c;
    var yPx = converterPixelY(yInicial + contadorEfeito, escala);
    var xPx = converterPixelX(x, escala);
    camada.lineTo(xPx, yPx);
    camada.stroke();
    if (yInicial + contadorEfeito === yFinal) {
        clearInterval(efeito);
        contadorEfeito = 0.0;
        proximaEtapa(tempoRetorno);
    }
}

function alterarTamanhoImagem(elemento, opcao) { //aplica efeito de zoom no botão/imagem selecionado
    if (opcao === 1) {
        elemento.style.height = "45px";
        elemento.style.width = "45px";
    }
    if (opcao === -1) {
        elemento.style.height = "40px";
        elemento.style.width = "40px";
    }
}

function ativarDesativarImagem(opcao) { //exiba imagem de play/pause
    document.getElementById("playPause").style.opacity = opcao;
}

function reiniciarAnimacao() { //retorna ao estado inicial da animação
    clearInterval(temp);
    clearInterval(efeito);
    clearInterval(aux);
    clearInterval(intervaloAudio);
    pintarArea(0, 0, 500, 500, "#FFFFFF");
    etapa = 1;
    controleEtapa = 1;
    ProgPixPadrao = 0.1;
    audio.src = "";
    temp = setInterval("animacao();", tempoPadrao);
}

function controleAudio() { //ativa ou destiva o volume
    if (audio.volume === 1.0) {
        document.getElementById("botaoAudio").src = "/Integral/Imagens/mute.png";
        audio.volume = 0.0;
    }
    else {
        document.getElementById("botaoAudio").src = "/Integral/Imagens/audio.png";
        audio.volume = 1.0;
    }
}

function controleTexto() { //ativa ou desativa a visibilidade do balão de texto
    if (legendar === true) {
        caixa.style.opacity = 0;
        legendar = false;
    }
    else {
        caixa.style.opacity = 1;
        legendar = true;
    }
}

function pauseAnimacao() { //"pausar" a execução da animação e do áudio
    if (controleEtapa === 0) {
        controleEtapa = controleEtapaTemp;
        contadorTextoTemp = true;
        ProgPixPadrao = ProgPixPadraoTemp;
        if (audio.played.end(0) != audio.duration) {
            audio.play();
        }
    }
    else {
        controleEtapaTemp = controleEtapa;
        ProgPixPadraoTemp = ProgPixPadrao;
        ProgPixPadrao = 0.0;
        controleEtapa = 0;
        audio.pause();
        contadorTextoTemp = null;
    }
}

function retrocederAnimacao() { //retorna a etapa anterior da animação
    if (controleEtapa != 0 && controleEtapa > 1) {
        clearInterval(temp);
        clearInterval(efeito);
        clearInterval(aux);
        clearInterval(intervaloAudio);
        pintarArea(0, 0, 500, 500, "#FFFFFF");
        etapa = 1;
        controleEtapa--;
        audio.src = "";
        temp = setInterval("animacao();", tempoPadrao);
    }
}

function avancarAnimacao() { //avança para a próxima etapa da animação 
    if (controleEtapa != 0 && controleEtapa < 3) {
        clearInterval(temp);
        clearInterval(efeito);
        clearInterval(aux);
        clearInterval(intervaloAudio);
        pintarArea(0, 0, 500, 500, "#FFFFFF");
        etapa = 1;
        controleEtapa++;
        audio.src = "";
        temp = setInterval("animacao();", tempoPadrao);
    }
}

function pintarArea(x, y, comprimento, altura, cor) {
    camada.fillStyle = cor;
    camada.fillRect(x, y, comprimento, altura);
}

function efeitoPintarCrescente(xInicial, yInicial, comprimento, altura, tempoRetorno) { //pinta da esquerda inferior até a diagonal principal
    if (pausarPreencher !== null) {
        contadorEfeito += 1;
        camada.moveTo(xInicial + contadorEfeito, yInicial);
        if (xInicial + contadorEfeito === xInicial + comprimento) {
            p = setInterval("controle();", tempoRetorno);
            clearInterval(efeito);
        }
        else {
            camada.lineTo(xInicial, yInicial - contadorEfeito);
            camada.stroke();
        }
    }
}

function efeitoPintarDecrescente(xInicialMove, yInicialMove, xInicialLine, yInicialLine, comprimento, altura, tempoRetorno) { //pinta da diagonal principal ate a direita superior
    if (pausarPreencher !== null) {
        contadorEfeito += 1;
        camada.moveTo(xInicialMove, yInicialMove - contadorEfeito);
        if (xInicialLine + contadorEfeito === xInicialLine + comprimento) {
            p = setInterval("controle();", tempoRetorno);
            clearInterval(efeito);
        }
        else {
            camada.lineTo(xInicialLine + contadorEfeito, yInicialLine);
            camada.stroke();
        }
    }
}

function desenharFigura(caminho) { //preenche um retangulo sem efeitos
    var j;
    camada.moveTo(caminho[0], caminho[1]);
    for (j = 2; j < caminho.length; j += 2) {
        camada.lineTo(caminho[j], caminho[j + 1]);
    }
    camada.stroke();
}

function escrever(item, x, y, fonte, cor, escala) { //escrever texto no canvas
    camada.fillStyle = cor;
    camada.font = fonte;
    camada.fillText(item, converterPixelX(x, escala), converterPixelY(y, escala));
}

function configDesenho(tamLinha, corLinha, corSombra, tamSombra, tamSombraX, tamSombraY, x, y, escala) { //ajustar comfigurações de desenho
    camada.beginPath();
    camada.lineWidth = tamLinha;
    camada.strokeStyle = corLinha;
    camada.shadowColor = corSombra;
    camada.shadowBlur = tamSombra;
    camada.shadowOffsetX = tamSombraX;
    camada.shadowOffsetY = tamSombraY;
    camada.moveTo(converterPixelX(x, escala), converterPixelY(y, escala));
}

function proximaEtapa(tempo) { //avanca uma etapa na funcao animacao();
    clearInterval(temp);
    etapa++;
    temp = setInterval("animacao();", tempo);
}


function audioTermino(funcaoRetorno, tempoRetorno) { //aguarda o termino do áudio atual e retorna a função especificada
    if (audio.ended === true) {
        clearInterval(intervaloAudio);
        if (funcaoRetorno === "animacao") {
            proximaEtapa(tempoRetorno);
        }
        else {
            proximaEtapaControle(tempoRetorno);
        }
    }
}

function audioTerminoFinito() { //aguarda o termino do áudio atual
    if (audio.ended === true) {
        clearInterval(intervaloAudio);
    }
}

function legenda(fala, tempo) { //escreve as falas no balão de texto
    if (contadorTextoTemp === true) {
        if (mensagem[contadorTexto] === undefined) {
            clearInterval(aux);
            return;
        }
        mensagemAux += mensagem[contadorTexto];
        contadorTexto++;
        texto.innerHTML = mensagemAux;
        if (contadorTexto === mensagem.length) {
            clearInterval(aux);
            return;
        }
    }
    clearInterval(aux);
    aux = setInterval("legenda(" + fala + ", " + tempo + ");", tempo);
}

function animacao() {
    switch (controleEtapa) {
        case 1:
            { //parte 1 da animacao--------------------------------------------------------------------------
                switch (etapa) {
                    case 1: // desenhar o eixo X
                        clearInterval(temp);
                        configDesenho(3, "black", "black", 0, 0, 0, -1, 0, 40);
                        efeito = setInterval("desenhaFuncaoX(-1, 11, 0, 0, 0, 40, 250);", 10);
                        break;
                    case 2: // desenhar o eixo Y
                        clearInterval(temp);
                        configDesenho(3, "black", "black", 0, 0, 0, 0, -1, 40);
                        efeito = setInterval("desenhaFuncaoY(-1, 11, 0, 0, 0, 40, 0);", 10);
                        break;
                    case 3: // desenhar a 1ª reta seta y
                        clearInterval(temp);
                        configDesenho(3, "black", "black", 0, 0, 0, -0.5, 10.5, 40);
                        efeito = setInterval("desenhaFuncaoX(-0.5, 0, 0, 1, 11, 40, 0);", 10);
                        break;
                    case 4: // desenhar a 2ª reta seta y
                        clearInterval(temp);
                        configDesenho(3, "black", "black", 0, 0, 0, 0, 11, 40);
                        efeito = setInterval("desenhaFuncaoX(0, 0.5, 0, -1, 11, 40, 0);", 10);
                        break;
                    case 5: // desenhar a 1ª reta seta x
                        clearInterval(temp);
                        configDesenho(3, "black", "black", 0, 0, 0, 10.5, -0.5, 40);
                        efeito = setInterval("desenhaFuncaoY(-0.5, 0, 0, 1, 11, 40, 0);", 10);
                        break;
                    case 6: // desenhar a 2ª reta seta x
                        clearInterval(temp);
                        configDesenho(3, "black", "black", 0, 0, 0, 11, 0, 40);
                        efeito = setInterval("desenhaFuncaoY(0, 0.5, 0, -1, 11, 40, 0);", 10);
                        break;
                    case 7: // escrever o X e Y nos eixos
                        escrever('X', 11, -0.75, "20px Arial", "#000000", 40);
                        escrever('Y', -0.75, 11, "20px Arial", "#000000", 40);
                        ProgPixPadrao = 0.8;
                        cont = 1; // variável de contagem para os passo recursivos a seguir
                        proximaEtapa(400);
                        break;
                    case 8: // passos da recursão reservados para desenhar as linhas de fundo do plano cartesiano
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                        { // recursão em switch que desenha as linhas de fundo do plano cartesiano 
                            clearInterval(temp);
                            if (etapa % 2 == 0) {
                                configDesenho(1, "grey", "black", 0, 0, 0, (-1) *cont, cont, 40);
                                efeito = setInterval("desenhaFuncaoX(-1, 11, 0, 0, " + cont + ", 40, 0);", 1);
                            }
                            else {
                                configDesenho(1, "grey", "black", 0, 0, 0, cont, (-1) * cont, 40);
                                efeito = setInterval("desenhaFuncaoY(-1, 11, 0, 0, " + cont + ", 40, 0);", 1);
                                if (cont == 10) {
                                    cont = 0;
                                }
                                else {
                                    cont += 1;
                                }
                            }
                            break;
                        }
                    case 28: // escreve os números nas linhas de fundo do plano cartesiano - recursão por cont
                        escrever(cont, cont, -0.75, "20px Arial", "#000000", 40);
                        escrever(cont, -0.75, cont, "20px Arial", "#000000", 40);
                        if (cont == 10) {
                            proximaEtapa(1000);
                            ProgPixPadrao = 0.1;
                        }
                        else {
                            cont += 1;
                        }
                        break;
                    case 29: // faz o desenho da f(x) = ax^2
                        clearInterval(temp);
                        configDesenho(4, "#00FF99", "black", 0, 0, 0, 0, 0, 40);
                        efeito = setInterval("desenhaFuncaoSeno(0, 0, 40, 0);", 20);
                        break;
                }
            }
    }
}

var canvas = document.getElementById("desenho");
var camada = canvas.getContext("2d");
var audio = document.getElementById("audio");
var texto = document.getElementById("texto");
var caixa = document.getElementById("caixaTexto");
var personagem = document.getElementById("carolzinha");

var etapa = 1;
var controleEtapa = 1;
var tempoPadrao = 10;
var ProgPixPadrao = 0.1;
var ProgPixPadraoTemp = 0.0;
var efeito = null;
var contadorEfeito = 0;
var controleEtapaTemp = 0;
var aux;
var intervaloAudio;
var mensagem = "";
var mensagemAux = "";
var contadorTexto = 0;
var contadorTextoTemp = true;
var legendar = true;
var temp;
var cont;

//audio.src = "/Integral/Audios/Fala 1.m4a";

setTimeout(function() {
    reiniciarAnimacao();
}, 500);
