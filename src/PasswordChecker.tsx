"use client"

import { useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Snackbar, Alert as MuiAlert } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Alert = MuiAlert;

const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Asegurar que ocupe al menos la altura de la viewport
    padding: '0 32px',
    boxSizing: 'border-box',
  });

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; isStrong: boolean } | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isPasswordStrong = (password: string) => {
    // La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isStrong = isPasswordStrong(password);
    setMessage({
      text: isStrong ? 'La contraseña es robusta!' : 'La contraseña no es robusta. Intenta de nuevo.',
      isStrong,
    });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <CenteredContainer>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardHeader title="Verificador de Contraseña" />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
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
          </form>
          {message && (
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={message.isStrong ? 'success' : 'error'}>
                {message.isStrong ? (
                  <>
                    <CheckCircle sx={{ mr: 1 }} />
                    {message.text}
                  </>
                ) : (
                  <>
                    <Cancel sx={{ mr: 1 }} />
                    {message.text}
                  </>
                )}
              </Alert>
            </Snackbar>
          )}
        </CardContent>
      </Card>
    </CenteredContainer>
  );
}
