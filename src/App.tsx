import PasswordChecker from './PasswordChecker'; // Importa el componente
import './App.css'; // Asegúrate de que el archivo CSS esté importado

function App() {
  return (
    <div className="app-container">    
      <h1>Bienvenido al Verificador de Contraseñas</h1>
      <p>Este sitio te ayudará a comprobar la robustez de tus contraseñas.</p>
      <ol>          
        <li>Introduce tu contraseña en el campo de entrada.</li>
        <li>Haz clic en el botón "Verificar Contraseña" para evaluar la seguridad de tu contraseña.</li>
        <li>Recibirás un mensaje que indica si la contraseña es robusta o si necesita mejorar.</li>
        <li>El mensaje de resultado se mostrará en una alerta durante 6 segundos.</li>
      </ol>
      <PasswordChecker /> 
      <footer className="footer">
        <p>La contraseña debe tener al menos 8 caracteres. Cuanto más larga sea, más segura será.</p>
        <p>Usa una combinación de letras mayúsculas (A-Z) y letras minúsculas (a-z). Esto aumenta la complejidad de la contraseña.</p>
        <p>Agrega números (0-9) a la contraseña para mejorar su seguridad.</p>
        <p>Utiliza símbolos especiales (por ejemplo, @, $, !, %, *, &, etc.). Los símbolos añaden una capa adicional de complejidad.</p>
        <p>&copy; {new Date().getFullYear()} UNSL. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
