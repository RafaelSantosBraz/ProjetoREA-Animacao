function aumentarImagem(x) { //aplica efeito de zoom no botão/imagem selecionado
    x.style.height = "45px";
    x.style.width = "45px";
}

function diminuirImagem(x) { //retira efeito de zoom no botão/imagem selecionado
    x.style.height = "40px";
    x.style.width = "40px";
}

function ativarImagem() { //exiba imagem de play/pause
    document.getElementById("playPause").style.opacity = 1;
}

function desativarImagem() { //oculta imagem de play/pause
    document.getElementById("playPause").style.opacity = 0;
}

function reiniciarAnimacao() { //retorna ao estado inicial da animação
    clearInterval(temp);
    clearInterval(p);
    clearInterval(efeito);
    clearInterval(aux);
    clearInterval(intervaloAudio);
    p = null;
    efeito = null;
    pintarArea(0, 0, 500, 500, "#FFFFFF");
    xAtual = 0;
    yAtual = 460;
    etapa = 1;
    controleEtapa = 1;
    prencherquad = 1;
    audio.src = "";
    configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
    temp = setInterval("animacao();", tempoPadrao);
}

function controleAudio() { //ativa ou destiva o volume
    if (audio.volume === 1.0) {
        document.getElementById("botaoAudio").src = "mute.png";
        audio.volume = 0.0;
    }
    else {
        document.getElementById("botaoAudio").src = "audio.png";
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
        pausarPreencher = !null;
        contadorTextoTemp = true;
        if (audio.played.end(0) != audio.duration) {
            audio.play();
        }
    }
    else {
        controleEtapaTemp = controleEtapa;
        controleEtapa = 0;
        audio.pause();
        contadorTextoTemp = null;
        pausarPreencher = null;
    }
}

function retrocederAnimacao() { //retorna a etapa anterior da animação
    if (controleEtapa != 0 && controleEtapa > 1) {
        clearInterval(temp);
        clearInterval(p);
        clearInterval(efeito);
        clearInterval(aux);
        clearInterval(intervaloAudio);
        p = null;
        efeito = null;
        pintarArea(0, 0, 500, 500, "#FFFFFF");
        xAtual = 0;
        yAtual = 460;
        etapa = 1;
        controleEtapa--;
        prencherquad = 1;
        audio.src = "";
        configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
        temp = setInterval("animacao();", tempoPadrao);
    }
}

function avancarAnimacao() { //avança para a próxima etapa da animação 
    if (controleEtapa != 0 && controleEtapa < 3) {
        clearInterval(temp);
        clearInterval(p);
        clearInterval(efeito);
        clearInterval(aux);
        clearInterval(intervaloAudio);
        p = null;
        efeito = null;
        pintarArea(0, 0, 500, 500, "#FFFFFF");
        xAtual = 0;
        yAtual = 460;
        etapa = 1;
        controleEtapa++;
        prencherquad = 1;
        audio.src = "";
        configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
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

function escrever(item, x, y, fonte, cor) { //escrever texto no canvas
    camada.fillStyle = cor;
    camada.font = fonte;
    camada.fillText(item, x, y);
}

function configDesenho(tamLinha, corLinha, corSombra, tamSombra, tamSombraX, tamSombraY, x, y) { //ajustar comfigurações de desenho
    camada.beginPath();
    camada.lineWidth = tamLinha;
    camada.strokeStyle = corLinha;
    camada.shadowColor = corSombra;
    camada.shadowBlur = tamSombra;
    camada.shadowOffsetX = tamSombraX;
    camada.shadowOffsetY = tamSombraY;
    camada.moveTo(x, y);
}

function proximaEtapa(tempo) { //avanca uma etapa na funcao animacao();
    clearInterval(temp);
    etapa++;
    temp = setInterval("animacao();", tempo);
}

function proximaEtapaControle(tempo) { //avanca uma etapa na funcao controle();
    prencherquad++;
    clearInterval(p);
    p = setInterval("controle();", tempo);
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

function controle() {
    switch (controleEtapa) {
        case 1:
            {
                switch (prencherquad) {
                    case 1: //preenche o primeio quadrado - 1cm²
                        pintarArea(40, 270, 190, 190, "#00FF99");
                        audio.src = "Fala 3.m4a";
                        audio.play();
                        clearInterval(p);
                        intervaloAudio = setInterval("audioTermino('controle', 100);", 1000);
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Aqui temos a representação de uma unidade quadrada, medida em cm. Ou seja, um cm². ";
                        aux = setInterval("legenda(3, 125);", 1000);
                        break;
                    case 2: //escrever 1cm² no primeiro quadrado
                        escrever("1cm²", 110, 375, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 2000);
                        break;
                    case 3: //preenche o segundo quadrado - 1cm²
                        pintarArea(230, 270, 190, 190, "#00FF99");
                        prencherquad++;
                        audio.src = "Fala 4.m4a";
                        audio.play();
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Contando a quantidade de cm quadrados dessa nova figura, temos: um cm² + \n\n\n\n\n\num cm² + \n\n\n\n\n\num cm² + \n\n\n\n\n\num cm² = quatro cm², que representa a área total da figura, pintada na cor verde. ";
                        aux = setInterval("legenda(4, 145);", 1000);
                        clearInterval(p);
                        p = setInterval("controle();", 3000);
                        break;
                    case 4: //preenche o terceiro quadrado - 1cm²
                        pintarArea(40, 80, 190, 190, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 3000);
                        break;
                    case 5: //preenche o quarto quadrado - 1cm²
                        pintarArea(230, 80, 190, 190, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 6000);
                        break;
                    case 6: //escrever 1cm² no segundo quadrado
                        escrever("1cm²", 300, 375, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 3000);
                        break;
                    case 7: //escrever 1cm² no terceiro quadrado
                        escrever("1cm²", 110, 182, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 3000);
                        break;
                    case 8: //escrever 1cm² no quarto quadrado
                        escrever("1cm²", 300, 182, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 3000);
                        break;
                    case 9: //limpar textos dos quadrados
                        pintarArea(40, 80, 380, 380, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 200);
                        break;
                    case 10: //coloca 4u² no centro do quadrado total 4cm²
                        escrever("4cm²", 210, 270, "20px Arial", "black");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 15000);
                        break;
                    case 11: //preenche primeira parte do canvas
                        contadorEfeito = 0;
                        configDesenho(3, "#FFFFFF", "#000000", 0, 0, 0, xAtual, yAtual);
                        efeito = setInterval("efeitoPintarCrescente(0, 500, 500, 500, 0);", 3);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 12: //preenche segunda parte do canvas
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarDecrescente(500, 500, 0, 0, 500, 500, 0);", 3);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 13:
                        texto.innerHTML = "";
                        controleEtapa++;
                        prencherquad = 1;
                        etapa = 1;
                        xAtual = 0;
                        yAtual = 460;
                        configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
                        clearInterval(p);
                        temp = setInterval("animacao();", 0);
                        break;
                }
                break;
            }
        case 2:
            {
                switch (prencherquad) {
                    case 1: //preenche o quadrado 1
                        pintarArea(40, 366, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 2: //escrever 1cm² no quadrado 1
                        escrever("1cm²", 65, 420, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 3: //preenche o quadrado 2
                        pintarArea(134, 366, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 4: //escrever 1cm² no quadrado 2
                        escrever("1cm²", 159, 420, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 5: //preenche o quadrado 3
                        pintarArea(228, 366, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 6: ///escrever 1cm² no quadrado 3
                        escrever("1cm²", 253, 420, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 7: //preenche o quadrado 4
                        pintarArea(322, 366, 96, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 8: //escrever 1cm² no quadrado 4
                        escrever("1cm²", 347, 420, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 9: //preenche o quadrado 5
                        pintarArea(40, 272, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 10: //escrever 1cm² no quadrado 5
                        escrever("1cm²", 65, 326, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 11: //preenche o quadrado 6
                        pintarArea(134, 272, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 12: //escrever 1cm² no quadrado 6
                        escrever("1cm²", 159, 326, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 13: //preenche o quadrado 7
                        pintarArea(228, 272, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 14: //escrever 1cm² no quadrado 7
                        escrever("1cm²", 253, 326, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 15: //preenche o quadrado 8
                        pintarArea(322, 272, 96, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 16: //escrever 1cm² no quadrado 8
                        escrever("1cm²", 347, 326, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 17: //preenche o quadrado 9
                        pintarArea(40, 178, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 18: //escrever 1cm² no quadrado 9
                        escrever("1cm²", 65, 232, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 19: //preenche o quadrado 10
                        pintarArea(134, 178, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 20: //escrever 1cm² no quadrado 10
                        escrever("1cm²", 159, 232, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 21: //preenche o quadrado 11
                        pintarArea(228, 178, 94, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 22: //escrever 1cm² no quadrado 11
                        escrever("1cm²", 253, 232, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 23: //preenche o quadrado 12
                        pintarArea(322, 178, 96, 94, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 24: //escrever 1cm² no quadrado 12
                        escrever("1cm²", 347, 232, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 25: //preenche o quadrado 13
                        pintarArea(40, 80, 96, 98, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 26: //escrever 1cm² no quadrado 13
                        escrever("1cm²", 65, 134, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 27: //preenche o quadrado 14
                        pintarArea(134, 80, 96, 98, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 28: //escrever 1cm² no quadrado 14
                        escrever("1cm²", 159, 134, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 29: //preenche o quadrado 15
                        pintarArea(228, 80, 96, 98, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 30: //escrever 1cm² no quadrado 15
                        escrever("1cm²", 253, 134, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 500);
                        break;
                    case 31: //preenche o quadrado 16
                        pintarArea(322, 80, 96, 98, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 32: //escrever 1cm² no quadrado 16
                        escrever("1cm²", 347, 134, "20px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 5000);
                        break;

                        /*--------------------------------------------------------------------------------------------------------------------------------*/

                    case 33: //limpar textos dos quadrados
                        pintarArea(40, 80, 380, 380, "#00FF99");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 100);
                        break;
                    case 34: //coloca 16cm² no centro do quadrado total
                        escrever("16cm²", 210, 270, "20px Arial", "black");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 1500);
                        break;
                    case 35: //executa o sexto áudio
                        audio.src = "Fala 6.m4a";
                        audio.play();
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Mas, percebam que conforme o tamanho da base e altura do quadrado aumenta, a contagem vai ficando cansativa. ";
                        aux = setInterval("legenda(6, 100);", 1000);
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 5000);
                        break;
                    case 36: //preenche primeira parte do canvas
                        contadorEfeito = 0;
                        configDesenho(3, "#FFFFFF", "#000000", 0, 0, 0, xAtual, yAtual);
                        efeito = setInterval("efeitoPintarCrescente(0, 500, 500, 500, 0);", 3);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 37: //preenche segunda parte do canvas
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarDecrescente(500, 500, 0, 0, 500, 500, 500);", 1);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 38: //faz a chamada da animação na terceira parte
                        texto.innerHTML = "";
                        controleEtapa++;
                        prencherquad = 1;
                        etapa = 1;
                        xAtual = 0;
                        yAtual = 460;
                        configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
                        clearInterval(p);
                        setTimeout("temp = setInterval(\"animacao();\", tempoPadrao);", 3000);
                        break;
                }
                break;
            }
        case 3:
            {
                switch (prencherquad) {
                    case 1: //preenche a metade do primeio quadrado - diagonal
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarCrescente(40, 460, 47, 47, 0);", 20);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 2: //preenche a segunda parte do primeio quadrado - diagonal
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarDecrescente(87, 460, 40, 413, 47, 47, 0);", 20);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 3: //escrever 1u^2 no primeiro quadrado
                        escrever("1cm²", 47, 440, "15px Arial", "#000000");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 0);
                        break;
                    case 4: //escrever na área
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 4000);
                        break;
                    case 5: //preenche primeira parte do quadrado total
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarCrescente(40, 460, 380, 380, 0);", 7);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 6: //preenche segunda parte do quadrado total
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarDecrescente(420, 460, 40, 80, 380, 380, 0);", 7);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 7: //coloca 4u² no centro do quadrado total
                        escrever("64cm²", 210, 270, "20px Arial", "black");
                        prencherquad++;
                        clearInterval(p);
                        p = setInterval("controle();", 7000);
                        break;
                    case 8: //execução do áudio 10
                        audio.src = "Fala 10.m4a";
                        audio.play();
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Sugiro que volte nas etapas anteriores e verifique se o método: Base x Altura é válido para todas as regiões de forma quadrada e/ou retangular. Assim você compreenderá que para calcular a área de regiões quadradas podemos sempre realizar Base x Altura. ";
                        aux = setInterval("legenda(10, 90);", 1000);
                        clearInterval(p);
                        p = setInterval("controle();", 1000);
                        prencherquad++;
                        break;
                    case 9: //preeenche primeira parte do canvas
                        contadorEfeito = 0;
                        configDesenho(3, "#FFFFFF", "#000000", 0, 0, 0, xAtual, yAtual);
                        efeito = setInterval("efeitoPintarCrescente(0, 500, 500, 500, 0);", 3);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 10: //preenche segunda parte do canvas
                        contadorEfeito = 0;
                        efeito = setInterval("efeitoPintarDecrescente(500, 500, 0, 0, 500, 500, 0);", 3);
                        clearInterval(p);
                        prencherquad++;
                        break;
                    case 11:
                        texto.innerHTML = "";
                        clearInterval(p);
                        break;
                }
                break;
            }
    }
}

function animacao() {
    switch (controleEtapa) {
        case 1:
            { //parte 1 da animacao--------------------------------------------------------------------------
                camada.lineTo(xAtual, yAtual);
                camada.stroke();
                switch (etapa) {
                    case 1: //ativação do áudio 1
                        personagem.src = "repouso.gif";
                        audio.src = "Fala 1.m4a";
                        audio.play();
                        clearInterval(temp);
                        intervaloAudio = setInterval("audioTermino('animacao', 1);", 1000);
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Olá! Com essa animação vamos compreender o conceito de Área de regiões regulares, o que posteriormente nos auxiliará na compreensão do conceito de INTEGRAL. ";
                        aux = setInterval("legenda(1, 90);", 1100);
                        break;
                    case 2: //ativação do áudio 2
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Um quadrado é uma região regular. ";
                        aux = setInterval("legenda(2, 85);", 3200);
                        audio.src = "Fala 2.m4a";
                        setTimeout("audio.play();", 1800);
                        proximaEtapa(tempoPadrao);
                        break;
                    case 3: //eixo x
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            desenharFigura([
                                444, 450,
                                458, 460,
                                444, 470
                            ]);
                            escrever('X', 465, 465, "20px Arial", "#000000");
                            xAtual = 40;
                            yAtual = 500;
                            configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 4: //eixo y
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            desenharFigura([
                                30, 56,
                                40, 42,
                                50, 56
                            ]);
                            escrever('Y', 34, 35, "20px Arial", "#000000");
                            xAtual = 0;
                            yAtual = 80;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            ProgPixPadrao = 10;
                            proximaEtapa(1);
                        }
                        break;
                    case 5: //linha divisisória 1 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 270;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 6: //linha divisisória 2 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 420;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 7: //linha divisisória 1 -- y
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 230;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 8: //linha divisisória 2 -- y
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 40;
                            yAtual = 80;
                            configDesenho(5, "#00FF99", "#BFBFBF", 0, 0, 0, xAtual, yAtual);
                            ProgPixPadrao = 5;
                            escrever('0', 25, 480, "20px Arial", "#000000");

                            escrever('1', 215, 480, "20px Arial", "#000000");
                            escrever('2', 405, 480, "20px Arial", "#000000");

                            escrever('1', 25, 290, "20px Arial", "#000000");
                            escrever('2', 25, 100, "20px Arial", "#000000");

                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 9: //desenha linha 1
                        yAtual += ProgPixPadrao;
                        if (yAtual === 460) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 10: //desenha linha 2
                        xAtual += ProgPixPadrao;
                        if (xAtual === 420) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 11: //desenha linha 3
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 80) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 12: //desenha linha 4
                        xAtual -= ProgPixPadrao;
                        if (xAtual === 40) {
                            xAtual -= 3
                            camada.lineTo(xAtual, yAtual);
                            camada.stroke();
                            proximaEtapa(3000);
                        }
                        break;
                    case 13: //chamada da função controle que "apaga tudo"
                        prencherquad = 1;
                        p = setInterval("controle();", 500);
                        clearInterval(temp);
                        break;
                }
                break;
            }
        case 2:
            { // parte 2 da animação--------------------------------------------------------------------------
                camada.lineTo(xAtual, yAtual);
                camada.stroke();
                switch (etapa) {
                    case 1:
                        personagem.src = "repouso.gif";
                        audio.src = "Fala 5.m4a";
                        setTimeout("audio.play();", 3000);
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Seguindo o mesmo raciocínio, contando a quantidade de unidades de cm², note que a área é 16 cm². ";
                        aux = setInterval("legenda(5, 125);", 3000);
                        proximaEtapa(1);
                        break;
                    case 2: //eixo x
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            desenharFigura([ //desenha um polígono com a matriz recebida
                                444, 450,
                                458, 460,
                                444, 470
                            ]);
                            escrever('x', 465, 465, "20px Arial", "#000000");
                            xAtual = 40;
                            yAtual = 500;
                            configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 3: //eixo y
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            desenharFigura([
                                30, 56,
                                40, 42,
                                50, 56
                            ]);
                            escrever('Y', 34, 35, "20px Arial", "#000000");
                            xAtual = 0;
                            yAtual = 82;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            ProgPixPadrao = 10;
                            proximaEtapa(1);
                        }
                        break;
                    case 4: //linha divisisória 1 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 178;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 5: //linha divisisória 2 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 272;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 6: //linha divisisória 3 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 366;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 7: //linha divisisória 4 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 134;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 8: //desenha a 1ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 228;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 9: //desenha a 2ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 322;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 10: //desenha a 3ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 418;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 11: //desenha a 4ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 418;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 12: //escrever a numeração dos eixos
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 40;
                            yAtual = 80;
                            configDesenho(5, "#00FF99", "#BFBFBF", 0, 0, 0, xAtual, yAtual);
                            ProgPixPadrao = 5;

                            escrever('0', 25, 480, "20px Arial", "#000000");

                            escrever('1', 119, 480, "20px Arial", "#000000"); //x
                            escrever('2', 215, 480, "20px Arial", "#000000"); //x
                            escrever('3', 306, 480, "20px Arial", "#000000"); //x
                            escrever('4', 402, 480, "20px Arial", "#000000"); //x


                            escrever('1', 25, 384, "20px Arial", "#000000"); //y
                            escrever('2', 25, 290, "20px Arial", "#000000"); //y
                            escrever('3', 25, 196, "20px Arial", "#000000"); //y
                            escrever('4', 25, 102, "20px Arial", "#000000"); //y

                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 13: //desenha linha 1
                        yAtual += ProgPixPadrao;
                        if (yAtual === 460) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 14: //desenha linha 2
                        xAtual += ProgPixPadrao;
                        if (xAtual === 420) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 15: //desenha linha 3
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 80) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 16: //desenha linha 4
                        xAtual -= ProgPixPadrao;
                        if (xAtual === 40) {
                            xAtual -= 3
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 17: //chamar a função de preenchimento
                        p = setInterval("controle();", 500);
                        clearInterval(temp);
                        break;
                }
                break;
            }
        case 3:
            { //---------------------------------------------------------------------- Parte 3 da Animação
                camada.lineTo(xAtual, yAtual);
                camada.stroke();
                switch (etapa) {
                    case 1: //executa o sétimo áudio
                        personagem.src = "duvida.gif";
                        audio.src = "Fala 7.m4a";
                        audio.play();
                        clearInterval(temp);
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Você consegue pensar em uma maneira de saber quantos cm² têm nesta figura toda, sem contar um a um? ";
                        aux = setInterval("legenda(7, 100);", 500);
                        proximaEtapa(tempoPadrao);
                        break;
                    case 2: //eixo x
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            desenharFigura([ //desenha um polígono com a matriz recebida
                                444, 450,
                                458, 460,
                                444, 470
                            ]);
                            escrever('x', 465, 465, "20px Arial", "#000000");
                            xAtual = 40;
                            yAtual = 500;
                            configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 3: //eixo y
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            desenharFigura([
                                30, 56,
                                40, 42,
                                50, 56
                            ]);
                            escrever('Y', 34, 35, "20px Arial", "#000000");
                            xAtual = 0;
                            yAtual = 82;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            ProgPixPadrao = 10;
                            proximaEtapa(1);
                        }
                        break;
                    case 4: //linha divisisória 1 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 131;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 5: //linha divisisória 2 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 178;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 6: //linha divisisória 3 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 225;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 7: //linha divisisória 4 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 272;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 8: //linha divisisória 5 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 319;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 9: //linha divisisória 6 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 366;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 10: //linha divisisória 7 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 0;
                            yAtual = 413;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 11: //linha divisisória 8 -- X
                        xAtual += ProgPixPadrao;
                        if (xAtual === 460) {
                            xAtual = 87;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 12: //desenha a 1ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 134;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 13: //desenha a 2ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 181;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 14: //desenha a 3ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 228;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 15: //desenha a 4ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 275;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 16: //desenha a 5ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 322;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 17: //desenha a 6ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 369;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 18: //desenha a 7ª vertical
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 418;
                            yAtual = 500;
                            configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                            proximaEtapa(1);
                        }
                        break;
                    case 19:
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 40) {
                            xAtual = 40;
                            yAtual = 80;
                            configDesenho(5, "#00FF99", "#BFBFBF", 0, 0, 0, xAtual, yAtual);
                            ProgPixPadrao = 5;

                            escrever('0', 25, 480, "20px Arial", "#000000");

                            escrever('1', 72, 480, "20px Arial", "#000000"); //x
                            escrever('2', 119, 480, "20px Arial", "#000000"); //x
                            escrever('3', 166, 480, "20px Arial", "#000000"); //x
                            escrever('4', 215, 480, "20px Arial", "#000000"); //x
                            escrever('5', 262, 480, "20px Arial", "#000000"); //x
                            escrever('6', 306, 480, "20px Arial", "#000000"); //x
                            escrever('7', 353, 480, "20px Arial", "#000000"); //x
                            escrever('8', 402, 480, "20px Arial", "#000000"); //x

                            escrever('1', 25, 431, "20px Arial", "#000000"); //y
                            escrever('2', 25, 384, "20px Arial", "#000000"); //y
                            escrever('3', 25, 337, "20px Arial", "#000000"); //y
                            escrever('4', 25, 290, "20px Arial", "#000000"); //y
                            escrever('5', 25, 243, "20px Arial", "#000000"); //y
                            escrever('6', 25, 196, "20px Arial", "#000000"); //y
                            escrever('7', 25, 149, "20px Arial", "#000000"); //y
                            escrever('8', 25, 102, "20px Arial", "#000000"); //y

                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 20: //desenha linha 1
                        yAtual += ProgPixPadrao;
                        if (yAtual === 460) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 21: //desenha linha 2
                        xAtual += ProgPixPadrao;
                        if (xAtual === 420) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 22: //desenha linha 3
                        yAtual -= ProgPixPadrao;
                        if (yAtual === 80) {
                            proximaEtapa(tempoPadrao);
                        }
                        break;
                    case 23: //desenha linha 4
                        xAtual -= ProgPixPadrao;
                        if (xAtual === 40) {
                            xAtual -= 3
                            camada.lineTo(xAtual, yAtual);
                            camada.stroke();
                            proximaEtapa(8000);
                        }
                        break;
                    case 24:
                        personagem.src = "aponta.gif";
                        audio.src = "Fala 8.m4a";
                        audio.play();
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Eu tive uma ideia, e você? ";
                        aux = setInterval("legenda(8, 150);", 1000);
                        proximaEtapa(10000);
                        break;
                    case 25:
                        personagem.src = "repouso.gif";
                        audio.src = "Fala 9.m4a";
                        audio.play();
                        mensagemAux = "";
                        contadorTexto = 0;
                        mensagem = "Minha ideia é multiplicar o tamanho da base pelo tamanho da altura: 8x8 = 64 cm². Ufa! É bem mais fácil assim. ";
                        aux = setInterval("legenda(9, 135);", 1000);
                        proximaEtapa(500);
                        break;
                    case 26:
                        p = setInterval("controle();", 1000);
                        xAtual = 0;
                        yAtual = 460;
                        clearInterval(temp);
                        break;
                }
                break;
            }
    }
}

var canvas = document.getElementById("desenho");
var camada = canvas.getContext("2d");
var audio = document.getElementById("audio");
var texto = document.getElementById("texto");
var caixa = document.getElementById("caixaTexto");
var personagem = document.getElementById("carolzinha");

var xAtual = 0;
var yAtual = 460;
var etapa = 1;
var controleEtapa = 1;
var pausarPreencher = !null;
var tempoPadrao = 10;
var ProgPixPadrao = 5;
var prencherquad = 1;
var p = null;
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

alert("Esta animação depende da velocidade de sua conexão à internet. \nCaso apresente mau funcionamento, atualize a página e tente novamente.\nOs controladores presentes no final da página são, respectivamente: reiniciar; avançar; retroceder; e ativar/desativar áudio.\nPressione a região do plano cartesiano para fazer uma pausa ou retomar a animação.\nPressione a região do balão de texto para exibir/ocultar o texto.");

audio.src = "Fala 1.m4a";

setTimeout(function() {
    reiniciarAnimacao();
}, 500);
