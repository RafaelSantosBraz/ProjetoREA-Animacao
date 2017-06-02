function coraline(){
    switch (expression) {
        
    }
}

function efeitoOpacity(objeto, comando) {
    if (contadorEfeito != 10) {
        document.getElementById(objeto).style.opacity = "0." + contadorEfeito;
    }
    if (comando === "in") {
        if (contadorEfeito - 9 === 1) {
            p = setInterval("controle();", 500);
            clearInterval(efeito);
        }
        contadorEfeito += 1;
    } else {
        if (contadorEfeito === 0) {
            p = setInterval("controle();", 500);
            clearInterval(efeito);
        }
        contadorEfeito -= 1;
    }
}

function efeitoPintarCrescente(xInicial, yInicial, comprimento, altura, tempoRetorno) {
    contadorEfeito += 1;
    camada.moveTo(xInicial + contadorEfeito, yInicial);
    if (xInicial + contadorEfeito === xInicial + comprimento) {
        p = setInterval("controle();", tempoRetorno);
        clearInterval(efeito);
    } else {
        camada.lineTo(xInicial, yInicial - contadorEfeito);
        camada.stroke();
    }
}

function efeitoPintarEsquerdaDireita(xInicial, yInicial, comprimento, tempoRetorno) {
    contadorEfeito += 1;
    camada2.moveTo(xInicial + contadorEfeito, 462);
    if (xInicial + contadorEfeito === xInicial + comprimento) {
        proximaEtapa(2000);
        clearInterval(efeito);
    } else {
        camada2.lineTo(xInicial + contadorEfeito, yInicial - contadorEfeito);
        camada2.stroke();
    }
}

function efeitoPintarDecrescente(xInicialMove, yInicialMove, xInicialLine, yInicialLine, comprimento, altura, tempoRetorno) {
    contadorEfeito += 1;
    camada.moveTo(xInicialMove, yInicialMove - contadorEfeito);
    if (xInicialLine + contadorEfeito === xInicialLine + comprimento) {
        p = setInterval("controle();", tempoRetorno);
        clearInterval(efeito);
    } else {
        camada.lineTo(xInicialLine + contadorEfeito, yInicialLine);
        camada.stroke();
    }
}

function pintarAreaIntegral(comprimento, yFinal, tempoRetorno) {
    yAtual -= 2;
    if (yAtual === yFinal){
        clearInterval(efeito);
        proximaEtapa(tempoRetorno);
    }
    camada2.moveTo(xAtual, yAtual);
    camada2.lineTo(xAtual + comprimento, yAtual);
    camada2.stroke();
}

function desenharFigura(caminho) {
    var j;
    camada.moveTo(caminho[0], caminho[1]);
    for (j = 2; j < caminho.length; j += 2) {
        camada.lineTo(caminho[j], caminho[j + 1]);
    }
    camada.stroke();
}

function escrever(item, x, y, fonte, cor) {
    camada.fillStyle = cor;
    camada.font = fonte;
    camada.fillText(item, x, y);
}

function configDesenho(tamLinha, corLinha, corSombra, tamSombra, tamSombraX, tamSombraY, x, y) {
    camada.beginPath();
    camada.lineWidth = tamLinha;
    camada.strokeStyle = corLinha;
    camada.shadowColor = corSombra;
    camada.shadowBlur = tamSombra;
    camada.shadowOffsetX = tamSombraX;
    camada.shadowOffsetY = tamSombraY;
    camada.moveTo(x, y);
}

function proximaEtapa(tempo) {
    clearInterval(temp);
    etapa++;
    temp = setInterval("animacao();", tempo);
}

function efeitoZoom(quantRepet){
    camada.clearRect(0, 0, canvas.width, canvas.width);
    camada.beginPath();
    camada2.clearRect(0, 0, canvas.width, canvas.width);
    camada2.beginPath();
    camada.strokeStyle = "#000000";
    camada.moveTo(0, 460);
    camada.lineWidth = 3;
    camada.lineTo(460, 460);
    desenharFigura([ //desenha um polígono com a matriz recebida
        444, 450,
        458, 460,
        444, 470
    ]);
    escrever('X', 465, 465, "20px Arial", "#000000");
    camada.moveTo(40, 500);
    camada.lineTo(40, 40);
    desenharFigura([
        30, 56,
        40, 42,
        50, 56
    ]);
    escrever('Y', 34, 35, "20px Arial", "#000000");
    camada.moveTo(0, 84 - contadorEfeito);
    //camada.strokeStyle = "#B3B3B3";
    camada.lineWidth = 1;
    camada.lineTo(460 + contadorEfeito, 84 - contadorEfeito);
    camada.stroke();
    if (contadorEfeito === quantRepet){
        proximaEtapa(2000);
        clearInterval(efeito);
    } else{
        contadorEfeito += 1;
    }
}

function controle() {
    switch (prencherquad) {
        case 1: //preenche a metade do primeio quadrado - diagonal
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarCrescente(40, 460, 190, 190, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;
        case 2: //preenche a segunda parte do primeio quadrado - diagonal
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(230, 460, 40, 270, 190, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;
        case 3: //escrever 1u^2 no primeiro quadrado
            escrever("1cm²", 110, 375, "20px Arial", "#000000");
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 0);
            break;
        case 4: //escrever na área
            texto.innerHTML += "Área = 1cm² ";
            texto.style.border = "3px solid #000000";
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 4000);
            break;  
        case 5: //preenche primeira parte do quadrado total
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarCrescente(40, 460, 380, 380, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;  
        case 6: //preenche segunda parte do quadrado total
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(420, 460, 40, 80, 380, 380, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;  
        case 7: //coloca 4u² no centro do quadrado total
            escrever("4cm²", 210, 270, "20px Arial", "black");
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 0);
            break;
        case 8: //escrever na área o total
            texto.innerHTML += "+ 1cm² + 1cm² + 1cm² = 4cm²";
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 4000);
            break;
        case 9: //preenche primeira parte do canvas
            texto.innerHTML = "";
            texto.style.border = "0px solid #000000";
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
            prencherquad++;
            clearInterval(p);
            xAtual = 0;
            yAtual = 460;
            configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
            proximaEtapa(tempoPadrao);
            break;
        
        //---------------------------------------------------------------------- parte 2
        
        case 12: //preenche a metade do primeio quadrado - diagonal
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarCrescente(40, 460, 94, 94, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;
        case 13: //preenche a segunda parte do primeio quadrado - diagonal
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(134, 460, 40, 366, 94, 94, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;
        case 14: //escrever 1u^2 no primeiro quadrado
            escrever("1cm²", 65, 420, "20px Arial", "#000000");
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 0);
            break;
        case 15: //escrever na área
            texto.innerHTML += "Área = 1cm² ";
            texto.style.border = "3px solid #000000";
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 4000);
            break;  
        case 16: //preenche primeira parte do quadrado total
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarCrescente(40, 460, 380, 380, 0);", 5);
            clearInterval(p);
            prencherquad++;
            break;  
        case 17: //preenche seunda parte do quadrado total
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(420, 460, 40, 80, 380, 380, 0);", 5);
            clearInterval(p);
            prencherquad++;
            break;  
        case 18: //coloca 4u² no centro do quadrado total
            escrever("16cm²", 210, 270, "20px Arial", "black");
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 0);
            break;
        case 19: //escrever na área o total
            texto.innerHTML += "+ 1cm² + 1cm² + ... + 1cm² = 16cm²";
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 4000);
            break;
        case 20: //preeenche primeira parte do canvas
            texto.innerHTML = "";
            texto.style.border = "0px solid #000000";
            contadorEfeito = 0;
            configDesenho(3, "#FFFFFF", "#000000", 0, 0, 0, xAtual, yAtual);
            efeito = setInterval("efeitoPintarCrescente(0, 500, 500, 500, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;  
        case 21: //preenche segunda parte do canvas
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(500, 500, 0, 0, 500, 500, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;  
        case 22:
            prencherquad++;
            clearInterval(p);
            xAtual = 0;
            yAtual = 460;
            configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
            proximaEtapa(tempoPadrao);
            break;
            
        //---------------------------------------------------------------------- parte 3
        
        case 23: //preenche a metade do primeio quadrado - diagonal
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarCrescente(40, 460, 47, 47, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;
        case 24: //preenche a segunda parte do primeio quadrado - diagonal
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(87, 460, 40, 413, 47, 47, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;
        case 25: //escrever 1u^2 no primeiro quadrado
            escrever("1cm²", 47, 440, "15px Arial", "#000000");
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 0);
            break;
        case 26: //escrever na área
            texto.innerHTML += "Área = 1cm² ";
            texto.style.border = "3px solid #000000";
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 4000);
            break;  
        case 27: //preenche primeira parte do quadrado total
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarCrescente(40, 460, 380, 380, 0);", 7);
            clearInterval(p);
            prencherquad++;
            break;  
        case 28: //preenche segunda parte do quadrado total
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(420, 460, 40, 80, 380, 380, 0);", 7);
            clearInterval(p);
            prencherquad++;
            break;  
        case 29: //coloca 4u² no centro do quadrado total
            escrever("64cm²", 210, 270, "20px Arial", "black");
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 0);
            break;
        case 30: //escrever na área o total
            texto.innerHTML += "+ 1cm² + 1cm² + ... + 1cm² = 64cm²";
            prencherquad++;
            clearInterval(p);
            p = setInterval("controle();", 4000);
            break;
        case 31: //preeenche primeira parte do canvas
            texto.innerHTML = "";
            texto.style.border = "0px solid #000000";
            contadorEfeito = 0;
            configDesenho(3, "#FFFFFF", "#000000", 0, 0, 0, xAtual, yAtual);
            efeito = setInterval("efeitoPintarCrescente(0, 500, 500, 500, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;  
        case 32: //preenche segunda parte do canvas
            contadorEfeito = 0;
            efeito = setInterval("efeitoPintarDecrescente(500, 500, 0, 0, 500, 500, 0);", 3);
            clearInterval(p);
            prencherquad++;
            break;  
        case 33:
            prencherquad++;
            clearInterval(p);
            xAtual = 0;
            yAtual = 460;
            configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);
            proximaEtapa(tempoPadrao);
            break;
    }
}

function animacao() {
    if (etapa <= 61 || etapa === 93){
        camada.lineTo(xAtual, yAtual);
        camada.stroke();
    }
    switch (etapa) {
        case 1: //eixo x
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                desenharFigura([
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
        case 2: //eixo y
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
        case 3: //linha divisisória 1 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 270;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 4: //linha divisisória 2 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 420;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 5: //linha divisisória 1 -- y
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 230;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 6: //linha divisisória 2 -- y
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
        case 7: //desenha linha 1
            yAtual += ProgPixPadrao;
            if (yAtual === 460) {
                proximaEtapa(tempoPadrao);
            }
            break;
        case 8: //desenha linha 2
            xAtual += ProgPixPadrao;
            if (xAtual === 420) {
                proximaEtapa(tempoPadrao);
            }
            break;
        case 9: //desenha linha 3
            yAtual -= ProgPixPadrao;
            if (yAtual === 80) {
                proximaEtapa(tempoPadrao);
            }
            break;
        case 10: //desenha linha 4
            xAtual -= ProgPixPadrao;
            if (xAtual === 40) {
                xAtual -= 3
                proximaEtapa(tempoPadrao);
            }
            break;
        case 11: //chamada da função controle que "apaga tudo"
            p = setInterval("controle();", 500);
            clearInterval(temp);
            break;
        
        //---------------------------------------------------------------------- Parte 2 da Animação
        
        case 12: //eixo x
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
        case 13: //eixo y
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                desenharFigura([
                    30, 56,
                    40, 42,
                    50, 56
                ]);
                escrever('Y', 34, 35, "20px Arial", "#000000");
                xAtual = 0;
                yAtual = 84;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                ProgPixPadrao = 10;
                proximaEtapa(1);
            }
            break;
        case 14: //linha divisisória 1 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 178;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 15: //linha divisisória 2 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 272;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 16: //linha divisisória 3 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 366;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 17: //linha divisisória 4 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 134;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 18: //desenha a 1ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 228;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 19: //desenha a 2ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 322;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 20: //desenha a 3ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 416;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 21: //desenha a 4ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 416;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 22: 
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
        case 23:
           p = setInterval("controle();", 500);
           clearInterval(temp);
           break;
        
        //---------------------------------------------------------------------- Parte 3 da Animação
        
        case 24: //eixo x
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
        case 25: //eixo y
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                desenharFigura([
                    30, 56,
                    40, 42,
                    50, 56
                ]);
                escrever('Y', 34, 35, "20px Arial", "#000000");
                xAtual = 0;
                yAtual = 84;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                ProgPixPadrao = 10;
                proximaEtapa(1);
            }
            break;
        case 26: //linha divisisória 1 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 131;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 27: //linha divisisória 2 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 178;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 28: //linha divisisória 3 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 225;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 29: //linha divisisória 4 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 272;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 30: //linha divisisória 5 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 319;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 31: //linha divisisória 6 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 366;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 32: //linha divisisória 7 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 413;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 33: //linha divisisória 8 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 87;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 34: //desenha a 1ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 134;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 35: //desenha a 2ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 181;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 36: //desenha a 3ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 228;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 37: //desenha a 4ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 275;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 38: //desenha a 5ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 322;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 39: //desenha a 6ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 369;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 40: //desenha a 7ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 416;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 41: 
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
        case 42:
           p = setInterval("controle();", 500);
           xAtual = 0;
           yAtual = 460;
           clearInterval(temp);
           break;
        
        //---------------------------------------------------------------------- Parte 4 (integral)
        
        case 43: //eixo x
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
        case 44: //eixo y
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                desenharFigura([
                    30, 56,
                    40, 42,
                    50, 56
                ]);
                escrever('Y', 34, 35, "20px Arial", "#000000");
                xAtual = 0;
                yAtual = 84;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                ProgPixPadrao = 10;
                proximaEtapa(1);
            }
            break;
        case 45: //linha divisisória 1 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 131;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 46: //linha divisisória 2 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 178;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 47: //linha divisisória 3 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 225;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 48: //linha divisisória 4 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 272;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 49: //linha divisisória 5 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 319;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 50: //linha divisisória 6 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 366;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 51: //linha divisisória 7 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 0;
                yAtual = 413;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 52: //linha divisisória 8 -- X
            xAtual += ProgPixPadrao;
            if (xAtual === 460) {
                xAtual = 87;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 53: //desenha a 1ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 134;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 54: //desenha a 2ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 181;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 55: //desenha a 3ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 228;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 56: //desenha a 4ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 275;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 57: //desenha a 5ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 322;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 58: //desenha a 6ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 369;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 59: //desenha a 7ª vertical
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 416;
                yAtual = 500;
                configDesenho(1, "#B3B3B3", "#000000", 0, 0, 0, xAtual, yAtual);
                proximaEtapa(1);
            }
            break;
        case 60: 
            yAtual -= ProgPixPadrao;
            if (yAtual === 40) {
                xAtual = 40;
                yAtual = 460;
                configDesenho(2, "#00FF99", "#BFBFBF", 0, 0, 0, xAtual, yAtual);
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
        case 61: //desenha a reta que calcula-se a integral
            xAtual += ProgPixPadrao;
            yAtual -= ProgPixPadrao;
            if (xAtual === 420) {
                proximaEtapa(1);
            }
            camada.lineTo(xAtual, yAtual);
            camada.stroke();
            break;
        case 62: //retangulo 1 de 4
            xAtual = 134;
            yAtual = 462;
            camada2.lineWidth = 5;
            camada2.strokeStyle = "#427DF4";
            efeito = setInterval("pintarAreaIntegral(48, 368, 0);", 1);
            clearInterval(temp);
            break;
        case 63: //retangulo 2 de 4
            xAtual = 181;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(48, 322, 0);", 1);
            clearInterval(temp);
            break;
        case 64: //retangulo 3 de 4
            xAtual = 228;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(48, 274, 0);", 1);
            clearInterval(temp);
            break;
        case 65: //retangulo 4 de 4
            texto.style.border = "3px solid #000000";
            texto.innerHTML = "Área = 14cm² ";
            xAtual = 275;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(48, 228, 3000);", 1);
            clearInterval(temp);
            break;
        case 66: //limpa retangulos da integral
            texto.style.border = "0px solid #000000";
            texto.innerHTML = "";
            camada2.clearRect(0, 0, 500, 500);
            proximaEtapa(1000);
            break;
        case 67: //retangulo 1 de 8
            xAtual = 134;
            yAtual = 462;
            camada2.beginPath();
            efeito = setInterval("pintarAreaIntegral(24, 368, 0);", 1);
            clearInterval(temp);
            break;
        case 68: //retangulo 2 de 8
            xAtual = 158;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 344, 0);", 1);
            clearInterval(temp);
            break;
        case 69: //retangulo 3 de 8
            xAtual = 182;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 320, 0);", 1);
            clearInterval(temp);
            break;
        case 70: //retangulo 4 de 8
            xAtual = 206;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 296, 0);", 1);
            clearInterval(temp);
            break;
        case 71: //retangulo 5 de 8
            xAtual = 230;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 272, 0);", 1);
            clearInterval(temp);
            break;
        case 72: //retangulo 6 de 8
            xAtual = 254;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 248, 0);", 1);
            clearInterval(temp);
            break;
        case 73: //retangulo 7 de 8
            xAtual = 278;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 224, 0);", 1);
            clearInterval(temp);
            break;
        case 74: //retangulo 8 de 8
            texto.style.border = "3px solid #000000";
            texto.innerHTML = "Área = 15cm²";
            xAtual = 302;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(24, 200, 3000);", 1);
            clearInterval(temp);
            break;
        case 75: //limpa retangulos da integral
            texto.style.border = "0px solid #000000";
            texto.innerHTML = "";
            camada2.clearRect(0, 0, 500, 500);
            proximaEtapa(1000);
            break;
        case 76: //retangulo 1 de 16
            xAtual = 134;
            yAtual = 462;
            camada2.beginPath();
            efeito = setInterval("pintarAreaIntegral(12, 368, 0);", 1);
            clearInterval(temp);
            break;
        case 77: //retangulo 2 de 16
            xAtual = 146;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 356, 0);", 1);
            clearInterval(temp);
            break;
        case 78: //retangulo 3 de 16
            xAtual = 158;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 346, 0);", 1);
            clearInterval(temp);
            break;
        case 79: //retangulo 4 de 16
            xAtual = 170;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 332, 0);", 1);
            clearInterval(temp);
            break;
        case 80: //retangulo 5 de 16
            xAtual = 182;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 320, 0);", 1);
            clearInterval(temp);
            break;
        case 81: //retangulo 6 de 16
            xAtual = 194;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 308, 0);", 1);
            clearInterval(temp);
            break;
        case 82: //retangulo 7 de 16
            xAtual = 206;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 296, 0);", 1);
            clearInterval(temp);
            break;
        case 83: //retangulo 8 de 16
            xAtual = 218;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 284, 0);", 1);
            clearInterval(temp);
            break;
        case 84: //retangulo 9 de 16
            xAtual = 230;
            yAtual = 462;
            camada2.beginPath();
            efeito = setInterval("pintarAreaIntegral(12, 272, 0);", 1);
            clearInterval(temp);
            break;
        case 85: //retangulo 10 de 16
            xAtual = 242;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 260, 0);", 1);
            clearInterval(temp);
            break;
        case 86: //retangulo 11 de 16
            xAtual = 254;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 246, 0);", 1);
            clearInterval(temp);
            break;
        case 87: //retangulo 12 de 16
            xAtual = 266;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 236, 0);", 1);
            clearInterval(temp);
            break;
        case 88: //retangulo 13 de 16
            xAtual = 278;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 224, 0);", 1);
            clearInterval(temp);
            break;
        case 89: //retangulo 14 de 16
            xAtual = 290;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 212, 0);", 1);
            clearInterval(temp);
            break;
        case 90: //retangulo 15 de 16
            xAtual = 302;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 200, 0);", 1);
            clearInterval(temp);
            break;
        case 91: //retangulo 16 de 16
            texto.style.border = "3px solid #000000";
            texto.innerHTML = "Área = 15,5cm²";
            xAtual = 314;
            yAtual = 462;
            efeito = setInterval("pintarAreaIntegral(12, 188, 1000);", 1);
            clearInterval(temp);
            break;
        case 92: //limpa retangulos da integral
            texto.style.border = "0px solid #000000";
            texto.innerHTML = "";
            camada2.clearRect(0, 0, 500, 500);
            proximaEtapa(1000);
            break;
        case 93:
            contadorEfeito = 0; 
            camada2.beginPath(); //(xInicial, yInicial, comprimento, tempoRetorno)
            efeito = setInterval("efeitoPintarEsquerdaDireita(136, 368, 186, 0);", 10);
            clearInterval(temp);
            break;
        case 94:  
            //drawImage(imagem, xorigem, yorigem, larguraorigem, alturaorigem, xdestino, ydestino, larguradestino, alturadestino)
            contadorEfeito = 0;
            efeito = setInterval("efeitoZoom(300);", 30);
            clearInterval(temp);
            break;
        case 95:
            
            etapa = 94;
            break;   
    }
}

var canvas = document.getElementById("desenho");
var camada = canvas.getContext("2d");

var canvas2 = document.getElementById("camada2");
var camada2 = canvas2.getContext("2d");


var texto = document.getElementById("area");

var xAtual = 0;
var yAtual = 460;
var etapa = 1;
var tempoPadrao = 10;
var ProgPixPadrao = 5;
var prencherquad = 1;
var p;
var efeito;
var contadorEfeito = 0;

configDesenho(3, "black", "#000000", 0, 0, 0, xAtual, yAtual);

var temp = setInterval("animacao();", tempoPadrao);