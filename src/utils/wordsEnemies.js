


/* 
#236FE0 -> azul
#E02350 -> rojo
#602389 -> morado
#E9C300 -> amarillo
#E02389​ -> rosa


*/
import { addWordsEnemies } from './firestore.js';


const colors = ['#236FE0', '#E02350', '#602389', '#E9C300', '#E02389'];

const wordsEnemies = [
  // Easy
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'gato' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'perro' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'casa' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'sol' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'luz' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'flor' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'mar' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'pan' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'rio' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'sol' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'ojo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'sal' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'azul' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'rojo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'verde' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'rosa' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'nube' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'pato' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'lago' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'pez' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'paz' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'luz' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'arbol' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'luna' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'vino' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'puerta' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'mesa' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'silla' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'libro' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'reloj' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'taza' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'pan' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'leche' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'queso' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'miel' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'jamon' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'pan' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'agua' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'easy', word: 'arroz' },

  // Normal
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'guitarra' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'telefono' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'elefante' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'camiseta' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'ventana' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'espejo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'mochila' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'piramide' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'estrella' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'lampara' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'televisor' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'bicicleta' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'pintura' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'carretera' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'celular' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'bicicleta' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'barco' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'microfono' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'pantalla' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'almohada' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'globo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'cuaderno' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'altavoz' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'paraguas' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'portatil' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'avion' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'universo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'hormiga' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'caballo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'normal', word: 'edificio' },

  // Hard
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'hipocampo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'otorrinolaringólogo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'electroencefalograma' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'incomprehensible' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'desoxirribonucleico' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'paralelepípedo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'anticonstitucionalidad' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'supercalifragilisticoespialidoso' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'espectrofotometría' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'idiosincrasia' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'contemporáneo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'esternocleidomastoideo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'hiperboloide' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'dificultad' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'microscopía' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'bibliografía' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'biodiversidad' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'paralelepípedo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'cibernético' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'infraestructura' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'filosofía' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'burocracia' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'epistemología' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'paralelepípedo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'anticonstitucional' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'metamorfosis' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'arqueológico' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'irracional' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'estadístico' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'universidad' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'subterráneo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'paralelepípedo' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'extraterrestre' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'anticonstitucional' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'hipopotomonstrosesquipedaliofobia' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'anticonstitucionalidad' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'desoxirribonucleico' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'espectrofotometría' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'bibliografía' },
  { color: colors[Math.floor(Math.random() * colors.length)], difficulty: 'hard', word: 'microscopía' }
];


wordsEnemies.forEach((word) => {

  try {
    addWordsEnemies(word.color, word.difficulty, word.word);
  } catch (e) {
    console.error("Error añadiendo o actualizando el documento: ", e);
  }
});

