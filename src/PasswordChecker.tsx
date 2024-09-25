"use client";

import { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Snackbar, Alert as MuiAlert, LinearProgress } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Alert = MuiAlert;

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

const SnackbarContainer = styled('div')({
  marginTop: '16px',
  width: '100%',
});

const ProgressContainer = styled('div')({
  width: '100%',
  marginTop: '16px',
});

const commonPasswords: string[] = ['password', '123456', '123456789', 'qwerty', 'abc123', '111111', '123123'];
const combinationsPerSecond = 1e9;

export default function PasswordChecker() {
  const [password, setPassword] = useState<string>('');
  const [feedback, setFeedback] = useState<string[]>([]); // Cambiado a array
  const [progress, setProgress] = useState<number>(0);
  const [progressClass, setProgressClass] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'warning' | 'error'>('error');

  useEffect(() => {
    if (password.trim() === '') {
      setProgress(0);
      setProgressClass('');
      setFeedback([]); // Reiniciar el array de feedback
      return;
    }

    let score = 0;
    let newFeedback: string[] = []; // Cambiado a array

    // Verificar longitud de la contraseña
    if (password.length >= 12) {
      score++;
    } else if (password.length >= 8) {
      score++;
      newFeedback.push('La contraseña debe tener al menos 12 caracteres para ser más segura.');
    } else {
      newFeedback.push('La contraseña debe tener al menos 8 caracteres.');
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let charsetSize = 0;
    if (hasUpper) charsetSize += 26;
    if (hasLower) charsetSize += 26;
    if (hasNumber) charsetSize += 10;
    if (hasSpecial) charsetSize += 32;

    if (hasUpper && hasLower && hasNumber && hasSpecial) {
      score++;
    } else {
      newFeedback.push('Usa mayúsculas, minúsculas, números y símbolos para fortalecer tu contraseña.');
    }

    const isCommon = commonPasswords.includes(password);
    if (!isCommon) {
      score++;
    } else {
      newFeedback.push('Evita usar contraseñas comunes como "password" o "123456".');
    }

    const possibleCombinations = Math.pow(charsetSize, password.length);
    const timeInSeconds = possibleCombinations / combinationsPerSecond;

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

    const progressPercentage = (score / 3) * 100;

    if (score === 3) {
      setProgressClass('strong');
    } else if (score === 2) {
      setProgressClass('medium');
    } else {
      setProgressClass('weak');
    }

    newFeedback.push(`Tiempo estimado para averiguar la contraseña mediante fuerza bruta: ${timeToCrack}`);
    setFeedback(newFeedback); // Establecer el array de feedback
    setProgress(progressPercentage);
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Verificar Contraseña
            </Button>
            <ProgressContainer>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    backgroundColor: progressClass === 'strong' ? 'green' : progressClass === 'medium' ? 'orange' : 'red',
                  },
                }}
              />
            </ProgressContainer>
            <div style={{ marginTop: '8px' }}>
              <ul>
                {feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <SnackbarContainer>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
                  {alertSeverity === 'success' ? <CheckCircle sx={{ mr: 1 }} /> : <Cancel sx={{ mr: 1 }} />}
                  {alertMessage}
                </Alert>
              </Snackbar>
            </SnackbarContainer>
          </form>
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}
