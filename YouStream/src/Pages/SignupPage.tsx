import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupLocal, loginGoogle } from "../redux/auth/authThunk";
import { startSignIn, initGoogle } from "../api/googleAuth";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode'

export default function SignupPage() {
  const dispatch = useDispatch<any>();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      initGoogle(() => { });
    } catch { }
  }, []);

  const handleGoogleSuccess = async (res) => {
    const token = res.credential;
    const decoded = jwtDecode(token)
    try {
      setLoading(true);
      const res = await dispatch(loginGoogle(decoded.email, token));
      setLoading(false);
      if (res) {
        setErr(res || "Login failed");
      }
      else
        nav("/");
    } catch (error: any) {
      setLoading(false);
      setErr(error?.message || "Login failed");
    }

  }
  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErr(null);
    if (!email.trim()) return setErr("Please enter email");
    if (!pass.trim()) return setErr("Please enter password");
    if (pass !== confirm) return setErr("Passwords do not match");

    try {
      setLoading(true);
      await dispatch(signupLocal(email.trim(), pass));
      const key = "youstream_local_user:" + email.trim();
      const user = localStorage.getItem(key);
      if (user) {
        try {
          const u = JSON.parse(user);
          u.name = name || u.name || email.split("@")[0];
          localStorage.setItem(key, JSON.stringify(u));
          await dispatch(signupLocal(email.trim(), pass));
        } catch { }
      }
      setLoading(false);
      nav("/");
    } catch (e: any) {
      setLoading(false);
      setErr(e?.message || "Signup failed");
    }
  };

  const google = () => {
    try {
      startSignIn();
    } catch (e) {
      setErr("Google sign-in not ready. Try refreshing.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
        p: 2,
      }}
    >
      <Paper sx={{ width: 460, maxWidth: "95%", p: 4 }} elevation={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Create an account
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Join YouStream — sign up with email or use Google to continue.
        </Typography>

        <form onSubmit={submit} >
          <TextField
            label="Name (optional)"
            size="small"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            size="small"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            size="small"
            fullWidth
            margin="normal"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <TextField
            label="Confirm password"
            size="small"
            fullWidth
            margin="normal"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {err && (
            <Typography color="error" fontSize={13} mt={1}>
              {err}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.6, borderRadius: 6 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>

        <Box textAlign="center" mt={3} mb={1} color="text.secondary">
          <Typography variant="body2">or continue with</Typography>
        </Box>

        {/* <Button
          onClick={google}
          variant="outlined"
          fullWidth
          sx={{
            textTransform: "none",
            borderRadius: 6,
            py: 1.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #eee",
              fontWeight: 700,
            }}
          >
            G
          </Box>
          <span>Continue with Google</span>
        </Button> */}
        <GoogleLogin onSuccess={handleGoogleSuccess}
          // width="100%"
          shape="rectangular"
          type="standard"
          size="large"
          theme="outline" />

        <Box mt={2} display="flex" justifyContent="center" gap={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Typography variant="body2">Already have an account?</Typography>
          <Button component={Link} to="/login" variant="text" size="small">
            Sign in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}