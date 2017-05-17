// alert("Welcome! It's really a pleasure to play with you! Enjoy our game!");
var hombre = new Array("___\n", "   |\n", "   O\n", "  /", "|", "\\\n", "  /", " \\\n", "___")
var libreriaPalabras = new Array("t o r t i l l a","p e d r o - i n f a n t e","b a l e r o",
                                  "d i a - d e - m u e r t o s","b e l l a s - a r t e s","a n g e l - d e - l a - i n d e p e n d e n c i a",
                                  "l u c h a - l i b r e","x o l o i t z c u i n t l e","u n a m","f r i d a - k a h l o");
var palabra;
var partes = 0;
var colNueva = 0;
var jugando;
var contador = 0;
var indice;


var eventoBtn= document.getElementById('juegonuevo');
eventoBtn.addEventListener("click",muestraImagen);
var arregloImagenes= document.getElementsByClassName('pistaSecreta');


function ObtienePalabra() {
   //obtiene la palabra para jugar de forma pseudoaleatoria
  //  var indice = Math.round ( Math.random() * 10 )
  //  var cadena = new String( libreriaPalabras[indice] )
  //  palabra = cadena.split(" ")

  if(contador < 10) {
    var cadena = new String(libreriaPalabras[contador]);
    palabra = cadena.split(" ");
    contador++;
  }else{
    contador =0;
    alert("You guys got all the words, click on Show me a word to star over :D ")
  }

}


function DibujaHombre(visor, partes) {
   //dibuja el hombre ahorcado
   //partes indica el numero de partes a dibujar
   var dibujo = ""
   if (partes < 10)
      for(var x = 0; x < partes; x++) {
         dibujo += hombre[x]
      }
   visor.displayHombre.value = dibujo
}


function DibujaLetra(visor, letra) {
   //dibuja una letra de la palabra
   //posicion indica donde debe dibujar la letra
   var flag = false
   //indica si se encontro la letra
   //obtiene cadena actual
   var cadena = new String(visor.displayPalabra.value)
   //la separa en sus espacios
   var letrasCadena = cadena.split(" ")
   cadena = ""
   for (var x = 0; x < palabra.length; x++) {
      if (palabra[x] == letra) {
         cadena += letra + " "
         flag = true
      } else
         cadena += letrasCadena[x] + " "
   }
   visor.displayPalabra.value = cadena
   return flag
}


function NuevaLetra(visor, letra) {
   //añade letra lista de letras
   visor.displayLetras.value += letra + " "
   //comprueba si ha de pasar a la siguiente fila
   if(colNueva == 3) {
      visor.displayLetras.value += "\n"
      colNueva = 0
   } else
      colNueva++
}


function Juega(visor, letra) {
   //comprueba si esta jugando
   if (jugando) {
      //ciclo de jugada
      //1. añade letra a la lista
      NuevaLetra(visor, letra)
      //2. dibuja la letra y comprueba si acierto
      var acierto = DibujaLetra(visor, letra)
      //3. si no acierto, dibuja hombre
      if (!acierto)
         DibujaHombre(visor, ++partes)
      //4. comprueba si fin
      if (partes == 9)
         FinJuego(false)
      else if (CompruebaPalabra(visor))
         FinJuego(true)
      } else {
         alert('Click on SHOW ME A WORD to start :D')
   }
}

function IniciaJuego(visor) {
   //inicializa visor y variables globales
   jugando = true
   partes = 0
   colNueva = 0
    ocultarImagenes();
   ObtienePalabra()
   DibujaHombre(visor, partes)
   visor.displayPalabra.value = ""
   for (var x = 0; x < palabra.length; x++)
    if(palabra[x] == "-"){
      visor.displayPalabra.value += "- "
    }else{
      visor.displayPalabra.value += "_ ";
      visor.displayLetras.value = "";
    }


}

function CompruebaPalabra(visor) {
   //comprueba si se completo toda la palabra
   var fin = true
   //obtiene cadena actual
   var cadena = new String(visor.displayPalabra.value)
   //la separa en sus espacios
   var letrasCadena = cadena.split(" ")
   for(var x = 0; x < letrasCadena.length; x++)
      if (letrasCadena[x] == "_" )
         fin = false
   return fin
}


function FinJuego(resultado) {
   //indica que si se ha perdido o ganado
   var solucion = ""
   jugando = false
   if (resultado) {
      document.visor.ganadas.value++
      alert("You got it!")
      
   } else {
     document.visor.perdidas.value++
     //construye la palabra solucion
     for (var x = 0; x < palabra.length; x++)
        solucion += palabra[x]
     alert("Sorry you lost this one !\n The word was: " + solucion);
     
   }
}


function muestraImagen(){

    var testDivs = Array.prototype.filter.call(arregloImagenes, function(elemento,pos){
      if(contador==pos){
      return elemento;
      }
    });

    testDivs[0].style.display="block";



}

function ocultarImagenes(){
  var testDivs = Array.prototype.forEach.call(arregloImagenes, function(elemento){
      elemento.style.display="none";

  })
}
