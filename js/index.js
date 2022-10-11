// variaveis globais.
const som_metro_andando = document.getElementById("som_metro_andando");
/**/som_metro_andando.volume = 0.3; //Alterando volume.
const som_chegada_vagao = document.getElementById("som_chegada_vagao");
/**/som_chegada_vagao.volume = 0.3; //Alterando volume.
const som_porta_abre_fecha = document.getElementById("som_porta_abre_fecha");
/**/som_porta_abre_fecha.volume = 0.3; //Alterando volume.
const som_ambiente = document.getElementById("som_ambiente");
/**/som_ambiente.volume = 0.3; //Alterando volume.
var vagao_atual = 0;
var vagao_destino = 0;
var tempo_movimento = 0;
var destino_pixel = 0;
var diferenca_vagao;
var em_movimento = false;

// Iniciando com vagão número 1 aberto.
window.addEventListener("load", function () { liga_som_ambiente(); abrir_portas() });

function muda_vagao(vg_atual, vg_destino) {
    if (em_movimento == false) {
        liga_som_ambiente();
        vagao_atual = vg_atual;
        vagao_destino = vg_destino;
        diferenca_vagao = vg_atual - vg_destino;
        if (vagao_atual == vagao_destino) {
            liga_som_chegada();
            console.log("Você já esta neste vagão");
        } else {
            // Metro andando.
            em_movimento = true;
            verifica_tempo_acao();
            regula_distancia_pixel();
            fechar_portas();
            //Aguardar 3 Segundos para porta fechar e poder se movimentar.
            setTimeout(function () {
                movimenta_vagao();
                liga_som_metro();
                //Aguardar o tempo de deslocamento para abrir as portas do vagão.
                setTimeout(function () {
                    abrir_portas(),
                        setTimeout(function () {
                            em_movimento = false;
                        }, 3000);
                    liga_som_chegada();
                }, tempo_movimento * 1000);
                // Metro parado.

                imprimir_controle();
            }, 3000)

        }
    }
}

function liga_som_ambiente() {
    play(som_ambiente);
}

function liga_som_metro() {
    play(som_metro_andando);
    setTimeout(function () {
        stop_audio(som_metro_andando);
        liga_som_chegada();
    }, tempo_movimento * 1000);
}

function liga_som_abre_fecha_porta() {
    play(som_porta_abre_fecha);
    setTimeout(function () {
        stop_audio(som_porta_abre_fecha);
    }, 3000);
}

function liga_som_chegada() {
    play(som_chegada_vagao);
}

function verifica_tempo_acao() {
    // Regulando o tempo da animation em segundos.
    switch (diferenca_vagao) {
        case 1:
        case -1:
        case 2:
        case -2:
            tempo_movimento = 5;
            break;
        case 3:
        case -3:
            tempo_movimento = 9;
            break;
        case 4:
        case -4:
            tempo_movimento = 13;
            break;
    }
}

function regula_distancia_pixel() {
    // Regulando a movimentação em pixel que será feito pelo metro.
    switch (vagao_destino) {
        case 1:
            destino_pixel = 0;
            break;
        case 2:
            destino_pixel = document.body.clientWidth;
            break;
        case 3:
            destino_pixel = document.body.clientWidth * 2;
            break;
        case 4:
            destino_pixel = document.body.clientWidth * 3;
            break;
        case 5:
            destino_pixel = document.body.clientWidth * 4;
            break;
        default:
            console.log("Vagão inexistente...");
            break;
    }
}

function movimenta_vagao() {
    // Inserindo a movimentação, o tempo de animação no metro e o audio de fundo.
    document.getElementById("metro").style.cssText =
        "transform: translateX(-" + destino_pixel + "px);" +
        "transition: " + tempo_movimento + "s;";
}

function abrir_portas() {
    liga_som_abre_fecha_porta();
    let portas = document.querySelectorAll(".div_porta");
    if (vagao_destino == 0) {
        portas[0].classList.add("porta_aberta");
        portas[1].classList.add("porta_aberta");
        liga_som_chegada();
    }
    switch (vagao_destino) {
        case 1:
            portas[0].classList.add("porta_aberta");
            portas[1].classList.add("porta_aberta");
            break;
        case 2:

            portas[2].classList.add("porta_aberta");
            portas[3].classList.add("porta_aberta");
            break;
        case 3:
            portas[4].classList.add("porta_aberta");
            portas[5].classList.add("porta_aberta");
            break;
        case 4:
            portas[6].classList.add("porta_aberta");
            portas[7].classList.add("porta_aberta");
            break;
        case 5:
            portas[8].classList.add("porta_aberta");
            portas[9].classList.add("porta_aberta");
            break;
        default:
            console.log("Porta inexistente...");
            break;
    }
}

function fechar_portas() {
    liga_som_abre_fecha_porta();
    let portas = document.querySelectorAll(".div_porta");
    switch (vagao_atual) {
        case 1:
            portas[0].classList.remove("porta_aberta");
            portas[1].classList.remove("porta_aberta");
            break;
        case 2:
            portas[2].classList.remove("porta_aberta");
            portas[3].classList.remove("porta_aberta");
            break;
        case 3:
            portas[4].classList.remove("porta_aberta");
            portas[5].classList.remove("porta_aberta");
            break;
        case 4:
            portas[6].classList.remove("porta_aberta");
            portas[7].classList.remove("porta_aberta");
            break;
        case 5:
            portas[8].classList.remove("porta_aberta");
            portas[9].classList.remove("porta_aberta");
            break;
        default:
            console.log("Porta inexistente...");
            break;
    }
}

//Controle de audio.
function play(audio) {
    audio.play();
}

function stop_audio(audio) {
    audio.pause();
    audio.currentTime = 0;
}
//Fim controle de audio

function imprimir_controle() {
    //Console de controle dos dados trabalhados...
    console.log(document.body.clientWidth + " Pixels da largura do browser");
    console.log(vagao_atual + " Vagão atual");
    console.log(vagao_destino + " Vagão destino");
    console.log(destino_pixel + " Destino em pixel");
    console.log(diferenca_vagao + " Diferença entre vagão");
    console.log(tempo_movimento + " Tempo de movimento");
    console.log("========================");
}