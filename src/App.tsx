import PasswordChecker from './PasswordChecker'; // Importa el componente
import './App.css'; // Asegúrate de que el archivo CSS esté importado

function App() {
  return (
    <div className="app-container">
      <PasswordChecker /> {/* Añade el verificador de contraseñas */}
    </div>
  );
}

export default App;
