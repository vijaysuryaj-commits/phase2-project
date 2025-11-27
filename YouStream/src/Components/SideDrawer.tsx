import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from '@mui/material';
import logo from "../assets/YouStream.jpg";
import { Stack } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const SideDrawer = ({ open, onClose, onCategorySelect }) => {
    const categories = [
        "Shopping",
        "Music",
        "Movies",
        "Gaming",
        "News",
        "Sports",
        "Courses",
        "Fashion & Beauty",
        "Podcasts",
    ];
    return (
        <div>

            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        background: "white",
                        backdropFilter: "blur(12px)",
                        color: "black",
                    },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "70vw", sm: "40vw", md: "20vw" },
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        flexWrap: 'nowrap'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.3,
                            justifyContent: "space-around",
                            p: 2,
                        }}
                    >
                        <IconButton onClick={onClose} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                        <Stack direction={'row'} gap={0.5} justifyContent={'center'} alignItems={'center'}>
                            <Avatar
                                src={logo}
                                alt="YouStream logo"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    // border: "2px solid rgba(255,165,0,0.5)",
                                    // boxShadow: "0 0 10px rgba(255,165,0,0.4)",
                                }}
                            />

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: 'black',
                                    // textShadow: "0 0 10px rgba(255,165,0,0.6)",
                                }}
                            >
                                YouStream
                            </Typography>
                        </Stack>
                    </Box>
                    <Divider sx={{ borderColor: "lightgrey" }} />


                    <List>
                        <ListItem
                            // onClick={() => this.handleNavigation("/favorites")}
                            sx={{
                                "&:hover": { backgroundColor: "lightgrey" },
                                transition: "0.3s",
                                cursor: 'pointer'
                            }}
                            onClick={
                                async () => {
                                    // await setSelectedGenre(cat);
                                    // console.log("Selected category:" + selectedGenre);
                                    onClose();
                                }}
                        >
                            <ListItemIcon sx={{ color: "#FFA500" }}>
                                {/* <FavoriteBorderIcon /> */}
                            </ListItemIcon>
                            <ListItemText primary="Favorites" />
                        </ListItem>

                        {/* {user ? (
                            <>
                                <ListItem
                                    onClick={() => this.handleNavigation("/profile")}
                                    sx={{
                                        "&:hover": { backgroundColor: "rgba(255,165,0,0.1)" },
                                        transition: "0.3s",
                                        cursor: 'pointer'
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "#FFA500" }}>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Hi, ${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`} />
                                </ListItem>

                                <ListItem
                                    onClick={this.handleLogout}
                                    sx={{
                                        "&:hover": { backgroundColor: "rgba(255,0,0,0.1)" },
                                        transition: "0.3s",
                                        cursor: 'pointer'
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "#FF5555" }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </>
                        ) : (
                            <ListItem
                                onClick={() => this.handleNavigation("/login")}
                                sx={{
                                    "&:hover": { backgroundColor: "rgba(255,165,0,0.1)" },
                                    transition: "0.3s",
                                    cursor: 'pointer'
                                }}
                            >
                                <ListItemIcon sx={{ color: "#FFA500" }}>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                        )} */}
                    </List>

                    <Divider sx={{ borderColor: "lightgrey" }} />

                    <Typography
                        variant="subtitle2"
                        sx={{
                            textAlign: "center",
                            // mt: 1,
                            mb: 1,
                            letterSpacing: 1.5,
                            color: "rgba(255,255,255,0.7)",
                        }}
                    >
                        EXPLORE
                    </Typography>

                    <List>
                        {categories.map((cat) => (
                            <ListItem
                                sx={{
                                    "&:hover": { backgroundColor: "lightgrey" },
                                    transition: "0.3s",
                                    cursor: 'pointer'
                                }}
                                key={cat}
                                onClick={
                                    async () => {
                                        // await setSelectedGenre(cat);
                                        // console.log("Selected category:" + selectedGenre);
                                        onClose();
                                    }}
                            // sx={{
                            //     borderLeft:
                            //         selectedGenre === cat
                            //             ? "3px solid #FFA500"
                            //             : "3px solid transparent",
                            //     backgroundColor:
                            //         selectedGenre === cat
                            //             ? "rgba(255,165,0,0.1)"
                            //             : "transparent",
                            //     "&:hover": {
                            //         backgroundColor: "rgba(255,165,0,0.1)",
                            //     },
                            //     transition: "0.3s",
                            //     cursor: 'pointer'
                            // }}
                            >
                                {/* <ListItemIcon
                                    sx={{
                                        color: selectedGenre === cat ? "#FFA500" : "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    {this.getCategoryIcon(cat)}
                                </ListItemIcon> */}
                                <ListItemText
                                    primary={cat}
                                // primaryTypographyProps={{
                                //     fontSize: "0.95rem",
                                //     fontWeight: selectedGenre === cat ? "bold" : "normal",
                                //     color: selectedGenre === cat ? "#FFA500" : "#fff",
                                // }}
                                />
                            </ListItem>
                        ))}

                        {/* <ListItem
                            onClick={() => setSelectedGenre("")}
                            sx={{
                                borderLeft:
                                    selectedGenre === ""
                                        ? "3px solid #00BFFF"
                                        : "3px solid transparent",
                                backgroundColor:
                                    selectedGenre === ""
                                        ? "rgba(0,191,255,0.1)"
                                        : "transparent",
                                "&:hover": {
                                    backgroundColor: "rgba(0,191,255,0.1)",
                                },
                                transition: "0.3s",
                                cursor: 'pointer'
                            }}
                        > */}
                        {/* <ListItemIcon
                                sx={{
                                    color:
                                        selectedGenre === "" ? "#00BFFF" : "rgba(255,255,255,0.8)",
                                }}
                            >
                                {this.getCategoryIcon("All Games")}
                            </ListItemIcon> */}
                        {/* <ListItemText
                                primary="All Games"
                                primaryTypographyProps={{
                                    fontSize: "0.95rem",
                                    fontWeight: selectedGenre === "" ? "bold" : "normal",
                                    color: selectedGenre === "" ? "#00BFFF" : "#fff",
                                }}
                            />
                        </ListItem> */}
                    </List>
                </Box>
            </Drawer>
        </div >
    );

}

export default SideDrawer