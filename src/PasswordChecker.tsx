"use client";

import { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Snackbar, Alert as MuiAlert, LinearProgress } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Alert = MuiAlert;

// Componente que centra su contenido
const CenteredContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 32px',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '400px',
});

// Estilo para el contenedor de Snackbar
const SnackbarContainer = styled('div')({
  marginTop: '16px',
  width: '100%',
});

// Estilo para el contenedor de progreso
const ProgressContainer = styled('div')({
  width: '100%',
  marginTop: '16px',
});

// Lista de contraseñas comunes para evitar su uso
const commonPasswords: string[] = ['contraseña', '123456', '123456789', 'password', '123456', '123456789', 'qwerty', 'abc123', '111111', '123123', '12345678', 
  '12345', '1234', '1234567', 'dragon', 'baseball', 'football', 'monkey', 'letmein', 
  '696969', 'shadow', 'master', '666666', 'qwertyuiop', '123321', 'mustang', '1234567890', 
  'michael', '654321', 'pussy', 'superman', '1qaz2wsx', '7777777', 'fuckyou', '121212', 
  '000000', 'qazwsx', '123qwe', 'killer', 'trustno1', 'jordan', 'jennifer', 'zxcvbnm', 
  'asdfgh', 'hunter', 'buster', 'soccer', 'harley', 'batman', 'andrew', 'tigger', 
  'sunshine', 'iloveyou', 'fuckme', '2000', 'charlie', 'robert', 'thomas', 'hockey', 
  'ranger', 'daniel', 'starwars', 'klaster', '112233', 'george', 'asshole', 'computer', 
  'michelle', 'jessica', 'pepper', '1111', 'zxcvbn', '555555', '11111111', '131313', 
  'freedom', '777777', 'pass', 'fuck', 'maggie', '159753', 'aaaaaa', 'ginger', 'princess', 
  'joshua', 'cheese', 'amanda', 'summer', 'love', 'ashley', '6969', 'nicole', 'chelsea', 
  'biteme', 'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin', 'thunder', 
  'taylor', 'matrix', 'william', 'corvette', 'hello', 'martin', 'heather', 'secret', 
  'fucker', 'merlin', 'diamond', '1234qwer', 'gfhjkm', 'hammer', 'silver', '222222', 
  '88888888', 'anthony', 'justin', 'test', 'bailey', 'q1w2e3r4t5', 'patrick', 'internet', 
  'scooter', 'orange', '11111', 'golfer', 'cookie', 'richard', 'samantha', 'bigdog', 
  'guitar', 'jackson', 'whatever', 'mickey', 'chicken', 'sparky', 'snoopy', 'maverick', 
  'phoenix', 'camaro', 'sexy', 'peanut', 'morgan', 'welcome', 'falcon', 'cowboy', 'ferrari', 
  'samsung', 'andrea', 'smokey', 'steelers', 'joseph', 'mercedes', 'dakota', 'arsenal', 
  'eagles', 'melissa', 'boomer', 'booboo', 'spider', 'nascar', 'monster', 'tigers', 'yellow', 
  'xxxxxx', '123123123', 'gateway', 'marina', 'diablo', 'bulldog', 'qwer1234', 'compaq', 
  'purple', 'hardcore', 'banana', 'junior', 'hannah', '123654', 'porsche', 'lakers', 
  'iceman', 'money', 'cowboys', '987654', 'london', 'tennis', '999999', 'ncc1701', 
  'coffee', 'scooby', '0000', 'miller', 'boston', 'q1w2e3r4', 'fuckoff', 'brandon', 
  'yamaha', 'chester', 'mother', 'forever', 'johnny', 'edward', '333333', 'oliver', 
  'redsox', 'player', 'nikita', 'knight', 'fender', 'barney', 'midnight', 'please', 
  'brandy', 'chicago', 'badboy', 'iwantu', 'slayer', 'rangers', 'charles', 'angel', 
  'flower', 'bigdaddy', 'rabbit', 'wizard', 'bigdick', 'jasper', 'enter', 'rachel', 
  'chris', 'steven', 'winner', 'adidas', 'victoria', 'natasha', '1q2w3e4r', 'jasmine', 
  'winter', 'prince', 'panties', 'marine', 'ghbdtn', 'fishing', 'cocacola', 'casper', 
  'james', '232323', 'raiders', '888888', 'marlboro', 'gandalf', 'asdfasdf', 'crystal', 
  '87654321', '12344321', 'sexsex', 'golden', 'blowme', 'bigtits', '8675309', 'panther', 
  'lauren', 'angela', 'bitch', 'spanky', 'thx1138', 'angels', 'madison', 'winston', 
  'shannon', 'mike', 'toyota', 'blowjob', 'jordan23', 'canada', 'sophie', 'Password', 
  'apples', 'dick', 'tiger', 'razz', '123abc', 'pokemon', 'qazxsw', '55555', 'qwaszx', 
  'muffin', 'johnson', 'murphy', 'cooper', 'jonathan', 'liverpoo', 'david', 'danielle', 
  '159357', 'jackie', '1990', '123456a', '789456', 'turtle', 'horny', 'abcd1234', 'scorpion', 
  'qazwsxedc', '101010', 'butter', 'carlos', 'password1', 'dennis', 'slipknot', 'qwerty123', 
  'booger', 'asdf', '1991', 'black', 'startrek', '12341234', 'cameron', 'newyork', 'rainbow', 
  'nathan', 'john', '1992', 'rocket', 'viking', 'redskins', 'butthead', 'asdfghjkl', '1212', 
  'sierra', 'peaches', 'gemini', 'doctor', 'wilson', 'sandra', 'helpme', 'qwertyui', 
  'victor', 'florida', 'dolphin', 'pookie', 'captain', 'tucker', 'blue', 'liverpool', 
  'theman', 'bandit', 'dolphins', 'maddog', 'packers', 'jaguar', 'lovers', 'nicholas', 
  'united', 'tiffany', 'maxwell', 'zzzzzz', 'nirvana', 'jeremy', 'suckit', 'stupid', 'porn', 
  'monica', 'elephant', 'giants', 'jackass', 'hotdog', 'rosebud', 'success', 'debbie', 
  'mountain', '444444', 'xxxxxxxx', 'warrior', '1q2w3e4r5t', 'q1w2e3', '123456q', 'albert', 
  'metallic', 'lucky', 'azerty', '7777', 'shithead', 'alex', 'bond007', 'alexis', '1111111', 
  'samson', '5150', 'willie', 'scorpio', 'bonnie', 'gators', 'benjamin', 'voodoo', 'driver', 
  'dexter', '2112', 'jason', 'calvin', 'freddy', '212121', 'creative', '12345a', 'sydney', 
  'rush2112', '1989', 'asdfghjk', 'red123', 'bubba', '4815162342', 'passw0rd', 'trouble', 
  'gunner', 'happy', 'fucking', 'gordon', 'legend', 'jessie', 'stella', 'qwert', 'eminem', 
  'arthur', 'apple', 'nissan', 'bullshit', 'bear', 'america', '1qazxsw2', 'nothing', 'parker', 
  '4444', 'rebecca', 'qweqwe', 'garfield', '01012011', 'beavis', '69696969', 'jack', 'asdasd', 
  'december', '2222', '102030', '252525', '11223344', 'magic', 'apollo', 'skippy', '315475', 
  'girls', 'kitten', 'golf', 'copper', 'braves', 'shelby', 'godzilla', 'beaver', 'fred', 'sol', 'estrella', 
 'feliz', 'verano', 'invierno', 'luna', '1234567890', 'moneda', 'dinero', 
 'nieve', 'cielo', 'casa', 'trabajo', 'familia', 'secreto', 'cuerpo', 
 'sueño', 'león', 'tigre', 'gato', 'perro', 'futbol', 'juego', 'caracol', 
 'ratón', 'coche', 'pelota', 'pueblo', 'ciudad', 'nube', 'flor', 
 'mariposa', 'pájaro', 'arbol', 'bueno', 'feliz123', 'seguro', 'tarea', 
 'camino', 'cafe', 'paz', 'luz', 'fuego', 'calor', 'piedra', 'agua', 
 'nube', 'ola', 'mar', 'tierra', 'viento', 'lago', 'playa', 'montaña', 
 'lima', 'naranja', 'manzana', 'banana', 'kiwi', 'uva', 'fruta', 
 'cerca', 'lejos', 'nuevo', 'viejo', 'rojo', 'verde', 
 'azul', 'negro', 'blanco', 'gris', 'morado', 'rosa', 'amarillo', 
 'caramelo', 'chocolate', 'helado', 'pizza', 'hamburguesa', 'pastel', 
 'frijol', 'lenteja', 'cereal', 'arroz', 'maiz', 'pasta', 'sopa', 
 'ensalada', 'desayuno', 'almuerzo', 'cena', 'aperitivo', 'cocina', 
 'comida', 'refresco', 'agua123', 'jugo', 'vino', 'cerveza', 'te', 
 'gaseosa', 'cafe123', 'cocido', 'taco', 'burrito', 'sushi', 
 'tortilla', 'arepa', 'empanada', 'pancake', 'crepe', 'sandwich', 
 'bocadillo', 'pincho', 'tapas', 'aperitivo123', 'menú', 'receta', 
 'cocinero', 'chef', 'delicioso', 'sabroso', 'rico', 'salado', 
 'dulce', 'picante', 'sabor', 'frío', 'caliente', 'tibio', 
 'mojado', 'seco', 'suave', 'áspero', 'blando', 'duro', 
 'largo', 'corto', 'ancho', 'estrecho', 'alto', 'bajo', 
 'grande', 'pequeño', 'cercano', 'lejano', 'rápido', 
 'lento', 'fácil', 'difícil', 'simple', 'complejo', 
 'nuevo123', 'interesante', 'aburrido', 'divertido', 'feliz', 
 'triste', 'enojado', 'emocionado', 'contento', 'sorprendido', 
 'deprimido', 'ansioso', 'relajado', 'tranquilo', 'estresado', 
 'enfermo', 'saludable', 'fuerte', 'débil', 'inteligente', 
 'tonto', 'sabio', 'ignorante', 'valiente', 'cobarde', 
 'lucas', 'mateo', 'david', 'tiago', 'nicolas', 'benjamin', 'santiago', 
 'alonso', 'jose', 'martin', 'francisco', 'agustin', 'facundo', 
 'maximiliano', 'pablo', 'luca', 'gonzalo', 'leandro', 'diego', 
 'roberto', 'ivan', 'jonathan', 'franco', 'tomás', 'felipe', 
 'santiago', 'camila', 'valentina', 'sofia', 'emilia', 'maría', 
 'lourdes', 'juana', 'agustina', 'renata', 'elena', 'magdalena', 
 'florencia', 'silvana', 'yasmín', 'paloma', 'karina', 'veronica', 
 'melisa', 'ines', 'anabella', 'carolina', 'maia', 'belen', 
 'laura', 'lidia', 'barbara', 'mercedes', 'julia', 'victoria', 
 'river', 'boca', 'sanlorenzo', 'independiente', 'racing', 'estudiantes', 
 'vélez', 'talleres', 'newells', 'rosario', 'platense', 'defensa', 
 'sarmiento', 'huracán', 'argentinos', 'colón', 'unión', 'gimnasia', 
 'banfield', 'atletico', 'boca123', 'river123', 'sanlorenzo123'];
const combinationsPerSecond = 1e9; // Cantidad de combinaciones por segundo para el cálculo de tiempo

export default function PasswordChecker() {
  // Estado para almacenar la contraseña ingresada
  const [password, setPassword] = useState<string>('');
  // Estado para almacenar los mensajes de retroalimentación sobre la contraseña
  const [feedback, setFeedback] = useState<string[]>([]); // Cambiado a array
  // Estado para el progreso de la fuerza de la contraseña
  const [progress, setProgress] = useState<number>(0);
  // Clase para indicar la fuerza de la contraseña (fuerte, media, débil)
  const [progressClass, setProgressClass] = useState<string>('');
  // Estado para controlar la apertura del Snackbar
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  // Mensaje de alerta que se mostrará en el Snackbar
  const [alertMessage, setAlertMessage] = useState<string>('');
  // Severidad de la alerta (éxito, advertencia, error)
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'warning' | 'error'>('error');

  // Efecto que se ejecuta cada vez que cambia la contraseña ingresada
  useEffect(() => {
    // Reiniciar el progreso y feedback si no hay contraseña
    if (password.trim() === '') {
      setProgress(0);
      setProgressClass('');
      setFeedback([]); // Reiniciar el array de feedback
      return;
    }

    let score = 0; // Variable para puntuar la fuerza de la contraseña
    let newFeedback: string[] = []; // Cambiado a array para almacenar comentarios

    // Verificar longitud de la contraseña
    if (password.length >= 12) {
      score++; // Aumentar puntaje si la contraseña tiene 12 o más caracteres
    } else if (password.length >= 8) {
      score++; // Aumentar puntaje si la contraseña tiene al menos 8 caracteres
      newFeedback.push('La contraseña debe tener al menos 12 caracteres para ser más segura.');
    } else {
      newFeedback.push('La contraseña debe tener al menos 8 caracteres.');
    }

    // Verificar la presencia de mayúsculas, minúsculas, números y caracteres especiales
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Calcular el tamaño del conjunto de caracteres basado en los tipos de caracteres presentes
    let charsetSize = 0;
    if (hasUpper) charsetSize += 26; // Sumar 26 si hay letras mayúsculas
    if (hasLower) charsetSize += 26; // Sumar 26 si hay letras minúsculas
    if (hasNumber) charsetSize += 10; // Sumar 10 si hay números
    if (hasSpecial) charsetSize += 32; // Sumar 32 si hay caracteres especiales

    // Aumentar puntaje si se utilizan todos los tipos de caracteres
    if (hasUpper && hasLower && hasNumber && hasSpecial) {
      score++;
    } else {
      newFeedback.push('Usa mayúsculas, minúsculas, números y símbolos para fortalecer tu contraseña.');
    }

    // Verificar si la contraseña es común
    const isCommon = commonPasswords.includes(password);
    if (!isCommon) {
      score++; // Aumentar puntaje si la contraseña no es común
    } else {
      newFeedback.push('Evita usar contraseñas comunes como "password" o "123456".');
    }

    // Calcular las combinaciones posibles de la contraseña
    const possibleCombinations = Math.pow(charsetSize, password.length);
    const timeInSeconds = possibleCombinations / combinationsPerSecond;

    // Determinar el tiempo estimado para romper la contraseña
    let timeToCrack = '';
    if (timeInSeconds < 60) {
      timeToCrack = `${Math.round(timeInSeconds)} segundos`;
    } else if (timeInSeconds < 3600) {
      timeToCrack = `${Math.round(timeInSeconds / 60)} minutos`;
    } else if (timeInSeconds < 86400) {
      timeToCrack = `${Math.round(timeInSeconds / 3600)} horas`;
    } else if (timeInSeconds < 31536000) {
      timeToCrack = `${Math.round(timeInSeconds / 86400)} días`;
    } else if (timeInSeconds < 3153600000) {
      timeToCrack = `${Math.round(timeInSeconds / 31536000)} años`;
    } else {
      timeToCrack = `${Math.round(timeInSeconds / 3153600000)} siglos`;
    }

    // Calcular el porcentaje de progreso basado en la puntuación
    const progressPercentage = (score / 3) * 100;

    // Asignar clases de progreso según la puntuación
    if (score === 3) {
      setProgressClass('strong');
    } else if (score === 2) {
      setProgressClass('medium');
    } else {
      setProgressClass('weak');
    }

    newFeedback.push(`Tiempo estimado para averiguar la contraseña mediante fuerza bruta: ${timeToCrack}`);
    setFeedback(newFeedback); // Establecer el array de feedback
    setProgress(progressPercentage); // Actualizar el progreso
  }, [password]);

  // Función para manejar la presentación del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Establecer el mensaje de alerta basado en la fuerza de la contraseña
    if (progressClass === 'strong') {
      setAlertMessage('¡Contraseña fuerte!');
      setAlertSeverity('success');
    } else if (progressClass === 'medium') {
      setAlertMessage('Contraseña aceptable. Agrega mayúsculas, símbolos o números.');
      setAlertSeverity('warning');
    } else {
      setAlertMessage('Contraseña muy débil. Mejora la longitud o usa más variedad de caracteres.');
      setAlertSeverity('error');
    }

    // Abrir el Snackbar para mostrar la alerta
    setOpenSnackbar(true);
  };

  // Función para cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Cerrar el Snackbar
  };

  return (
    <CenteredContainer>
      <Card>
        <CardHeader title="Verificador de Contraseña" />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              id="password"
              label="Ingresa tu contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizar contraseña en el estado
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Verificar Contraseña
            </Button>
            <ProgressContainer>
              <LinearProgress
                variant="determinate"
                value={progress} // Asignar el valor del progreso
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: progressClass === 'strong' ? 'green' : progressClass === 'medium' ? 'orange' : 'red', // Colores según la fuerza
                  },
                }}
              />
            </ProgressContainer>
            <div style={{ marginTop: '8px' }}>
              <ul>
                {feedback.map((item, index) => (
                  <li key={index}>{item}</li> // Mostrar comentarios sobre la contraseña
                ))}
              </ul>
            </div>
            <SnackbarContainer>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar} // Controlar la apertura del Snackbar
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
                  {alertSeverity === 'success' ? <CheckCircle sx={{ mr: 1 }} /> : <Cancel sx={{ mr: 1 }} />}
                  {alertMessage}{/* Mensaje de alerta */}
                </Alert>
              </Snackbar>
            </SnackbarContainer>
          </form>
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}
