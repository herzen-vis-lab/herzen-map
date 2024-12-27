import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createToken, checkToken, hashPassword } from "utils";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken && checkToken(authToken)) {
      navigate("/admin");
    } else {
      localStorage.removeItem("authToken");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const storedHash = process.env.REACT_APP_ADMIN_PASSWORD_HASH;

    const hashedPassword = await hashPassword(password);

    if (
      username === process.env.REACT_APP_ADMIN_USERNAME &&
      hashedPassword === storedHash
    ) {
      setError(false);
      const token = createToken(username);
      localStorage.setItem("authToken", token);
      navigate("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Вход
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Неверный логин или пароль!
            </Alert>
          )}

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              label="Логин"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Войти
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;