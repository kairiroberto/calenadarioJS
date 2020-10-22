var contador = 1;
var data = new Date();
var dia = data.getDate();
var mes = data.getMonth();
var ano = data.getFullYear();
var semana = data.getDay();
var l1 = [];
var l2 = [];
var l3 = [];
var l4 = [];
var l5 = [];
var l6 = [];
var celulaSelecionada = 0;
var meses = ["JAN", "FEV", "MAR", "ABR", "MAIO", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

function diaMaxMes(mes, ano) {
    var diaMax = 0;
    if (mes == 3 || mes == 5 || mes == 8 || mes == 10) {
        diaMax = 30;
    } else {
        if (mes == 1) {
            if (ano % 4 == 0) {
                diaMax = 29;
            } else {
                diaMax = 28;
            }
        } else {
            diaMax = 31;
        }
    }
    return diaMax;
}

function criarCalendario() {
    l1 = criarLinha();
    l2 = criarLinha();
    l3 = criarLinha();
    l4 = criarLinha();
    l5 = criarLinha();
    l6 = criarLinha();

    var x1 = document.getElementById("l1");
    var x2 = document.getElementById("l2");
    var x3 = document.getElementById("l3");
    var x4 = document.getElementById("l4");
    var x5 = document.getElementById("l5");
    var x6 = document.getElementById("l6");

    preencherLinha(x1, l1);
    preencherLinha(x2, l2);
    preencherLinha(x3, l3);
    preencherLinha(x4, l4);
    preencherLinha(x5, l5);
    preencherLinha(x6, l6);

    marcarHoje();

    document.getElementById("calendarioAtual").innerHTML = meses[mes] + "/" + ano;
}

function limparCalendario() {
    let table = document.getElementById("calendario");
    for (let j = 6; j > 0; j--) {
        for (let i = 6; i > -1; i--) {
            table.rows[j].deleteCell(i);
        }
    }
}

function criarLinha() {
    var linha = [];
    for (let i = 0; i < 7; i++) {
        if (contador <= diaMaxMes(mes, ano)) {
            var dx = new Date(ano, mes, contador);
            if (dx.getDay() === i) {
                linha[i] = dx.getDate();
                contador++;
            } else {
                linha[i] = "&nbsp";
            }
        } else {
            linha[i] = "&nbsp";
        }
    }
    return linha;
}



function preencherLinha(x, l) {
    for (let i = 0; i < 7; i++) {
        let celula = x.insertCell(i);
        celula.innerHTML = l[i];
        celula.onclick = function (celulaSelecionada) {
            celula.style.backgroundColor = "#FFFF00";
            preencherCelulaSelecionada(l[i]);
        };
    }
}

function preencherCelulaSelecionada(valor) {
    let table = document.getElementById("calendario");
    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (celulaSelecionada != 0 && celulaSelecionada == table.rows[i].cells[j].innerHTML) {
                //alert("listar datas");    
                table.rows[i].cells[j].style.backgroundColor = "#FFFFFF";
            }
        }
    }
    celulaSelecionada = valor;
    marcarHoje();
}

function marcarHoje() {
    let table = document.getElementById("calendario");
    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (dia == table.rows[i].cells[j].innerHTML) {
                table.rows[i].cells[j].style.backgroundColor = "#FF00FF";
            }
            if (j == 0 && table.rows[i].cells[j].innerHTML != "-" && table.rows[i].cells[j].innerHTML != "Dom") {
                table.rows[i].cells[j].style.backgroundColor = "#FF0000";
                table.rows[i].cells[j].style.color = "#FFFFFF";
            }
        }
    }
}

function retrocederMes() {
    data = new Date(ano, (mes - 1), dia);
    contador = 1;
    dia = data.getDate();
    mes = data.getMonth();
    ano = data.getFullYear();
    semana = data.getDay();
    l1 = [];
    l2 = [];
    l3 = [];
    l4 = [];
    l5 = [];
    l6 = [];
    celulaSelecionada = 0;
    limparCalendario();
    criarCalendario();
    //removerColunas();
}

function avancarMes() {
    data = new Date(ano, (mes + 1), dia);
    contador = 1;
    dia = data.getDate();
    mes = data.getMonth();
    ano = data.getFullYear();
    semana = data.getDay();
    l1 = [];
    l2 = [];
    l3 = [];
    l4 = [];
    l5 = [];
    l6 = [];
    celulaSelecionada = 0;
    limparCalendario();
    criarCalendario();
}

function criarHtml() {
    var divc = document.getElementById("divc");
    var texto = '<div style="font-size: 400%; text-align: center; width: 50%; margin-left: 25%; margin-right: 25%;">';
    texto += '<div style="width: 90%; margin: auto;">';
    texto += '<table style="width: 100%">';
    texto += '<tr>';
    texto += '<td style="width: 25%;"><button style="height: 100px; width: 100px; font-size: 30px; padding: 5px;" onclick="retrocederMes()"><<</button></td>';
    texto += '<td style="width: 50%; text-align: center; font-size: larger" id="calendarioAtual"></td>';
    texto += '<td style="width: 25%;"><button style="height: 100px; width: 100px; font-size: 30px; padding: 5px;" onclick="avancarMes()">>></button></td>';
    texto += '</tr>';
    texto += '</table>';
    texto += '</div>';
    texto += '<table id="calendario" border="1" style="margin: auto;">'
    texto += '<tr style="background-color: black; color: white; font-weight: bold;">';
    texto += '<td>Dom</td>';
    texto += '<td>Seg</td>';
    texto += '<td>Ter</td>';
    texto += '<td>Qua</td>';
    texto += '<td>Qui</td>';
    texto += '<td>Sex</td>';
    texto += '<td>Sáb</td>';
    texto += '</tr>';
    texto += '<tr id="l1"></tr>';
    texto += '<tr id="l2"></tr>';
    texto += '<tr id="l3"></tr>';
    texto += '<tr id="l4"></tr>';
    texto += '<tr id="l5"></tr>';
    texto += '<tr id="l6"></tr>';
    texto += '</table>';
    texto += '</div>'
    divc.innerHTML = texto;
    criarCalendario();
}

criarHtml();


