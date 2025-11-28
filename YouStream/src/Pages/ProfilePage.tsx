import React, { useEffect} from "react";
import { Box, Avatar, Typography, Button, Card, CardContent } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/rootReducer";
import { useNavigate } from "react-router-dom";
import { signOutAll } from "../redux/auth/authThunk";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const auth = useSelector((s: RootState) => s.auth);
  const user = auth?.user;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  
  if (!user) return null;

  const email = user?.email || "";
  const name = user?.name || user?.email || "You";
  const avatar = user?.avatar || "";

  const handleSignOut = async () => {
    try {
      await dispatch(signOutAll());
      navigate("/");
    } catch (e) {
      console.error("Sign out failed", e);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 2 }}>
      <Card>
        <CardContent sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          <Avatar src={avatar} sx={{ width: 84, height: 84, bgcolor: "primary.main" }}>
            {!avatar && (name || email).charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ minWidth: 0, flex: "1 1 auto" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button variant="outlined" color="inherit" onClick={() => navigate("/settings")}>
              Settings
            </Button>
            <Button variant="contained" color="primary" onClick={handleSignOut}>
              Sign out
            </Button>
          </Box>
        </CardContent>
      </Card>

      
    </Box>
  );
};

export default ProfilePage;