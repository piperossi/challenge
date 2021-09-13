
window.onload = () =>{
    jsonpreguntas = readText("jsonpreguntas.json")
    interprete_bp = JSON.parse(jsonpreguntas)
    preguntaAleatoria()
}




var pregunta;
var posible_respuestas;


var btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4")
]


npreguntas = [];


var preguntas_hechas = 0;
var preguntas_correctas = 0;



function preguntaAleatoria() {
  let n = Math.floor(Math.random() * interprete_bp.length)
  

  while (npreguntas.includes(n)) {
    n++
    if (n >= interprete_bp.length) {
      n = 0
    }
    if (npreguntas.length == interprete_bp.length) {
      npreguntas = []
    }
  }

  npreguntas.push(n)
  preguntas_hechas++
  
  escogerPregunta(n)
}


function escogerPregunta(n) {
 
  pregunta = interprete_bp[n]
  select_id("categoria").innerHTML = pregunta.categoria
  select_id("pregunta").innerHTML = pregunta.pregunta
  select_id("numero").innerHTML = n
    
  select_id("btn1").innerHTML = pregunta.respuestacorrecta
  select_id("btn2").innerHTML = pregunta.respuesta2
  select_id("btn3").innerHTML = pregunta.respuesta3
  select_id("btn4").innerHTML = pregunta.respuesta4
    
  let pc = preguntas_correctas

  if(preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas-1)
  }else{
    select_id("puntaje").innerHTML = ""
  }
    

}

function desordenarRespuestas(pregunta) {
    posible_respuestas = [
    pregunta.respuestacorrecta,
    pregunta.respuesta2,
    pregunta.respuesta3,
    pregunta.respuesta4
  ]

  posible_respuestas.sort(() => Math.random() - 0.5)

  select_id("btn1").innerHTML =  posible_respuestas[0]
  select_id("btn2").innerHTML =  posible_respuestas[1]
  select_id("btn3").innerHTML =  posible_respuestas[2]
  select_id("btn4").innerHTML =  posible_respuestas[3]
}

let suspender_botones = false;

function oprimir_btn(i) {
    

  if (suspender_botones) {
    return
    
  }
  suspender_botones = true

  if (posible_respuestas[i] == pregunta.respuestacorrecta) {
    preguntas_correctas++

    btn_correspondiente[i].style.background = "green"
  } else {

    btn_correspondiente[i].style.background = "red"
  }

  for (let j = 0; j < 4; j++) {
    if (posible_respuestas[j] == pregunta.respuestacorrecta) {
      btn_correspondiente[j].style.background = "lightgreen"
      break
    }
  }
  setTimeout(() => {
    reiniciar()
    suspender_botones = false
  }, 3000);
}



function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white"
  }
  preguntaAleatoria()
}

function select_id(id) {
  return document.getElementById(id)
}

function style(id) {
  return select_id(id).style
}

function readText(ruta_local) {

  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

