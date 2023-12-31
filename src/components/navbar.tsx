"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getUser } from "@/app/auth/authUtils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/Redux/store";
import { log } from "console";
import { loginRedux } from "@/Redux/features/authSlice";

const ResponsiveAppBar: React.FC = () => {
    const [username, setUsername] = useState("");
    const [isAuth, setisAuth] = useState(false);
    const [initials, setInitials] = useState("");
    const router = useRouter();

    const [settings, setSettings] = useState([
        { name: "Login", link: "/auth/login" },
        { name: "Register", link: "/auth/register" },
    ]);

    const userRedux = useAppSelector((state) => state.authReducer.user);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        (async () => {
            try {
                const { user } = await getUser();

                if (user) {
                    setUsername(user.username);
                    setisAuth(true);
                    dispatch(loginRedux(user));
                    setInitials(
                        user.firstName.charAt(0) + user.lastName.charAt(0)
                    );
                } else {
                    setisAuth(false);
                }
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);
    const [pages, setPages] = useState([
        {
            name: "Home",
            link: "/",
        },
    ]);
    useEffect(() => {
        if (!isAuth) {
            setSettings([
                { name: "Login", link: "/auth/login" },
                { name: "Register", link: "/auth/register" },
            ]);
            setPages([
                {
                    name: "Home",
                    link: "/",
                },
            ]);
        } else {
            setSettings([
                { name: "Profile", link: "/profile" },
                { name: "Dashboard", link: "/dashboard" },
                { name: "Logout", link: "/auth/logout" },
            ]);
            setPages([
                {
                    name: "Home",
                    link: "/",
                },
                {
                    name: "Dashboard",
                    link: "/dashboard",
                },
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userRedux]);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xffffff);
        let color = "#" + hex.toString(16);

        return color;
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    component="a"
                                    href={page.link}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                                component="a"
                                href={page.link}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                {isAuth && (
                                    <Avatar
                                        style={{
                                            backgroundColor: randomColor(),
                                            fontSize: 15,
                                        }}
                                    >
                                        {initials}
                                    </Avatar>
                                )}
                                {!isAuth && (
                                    <Avatar
                                        style={{
                                            backgroundColor: randomColor(),
                                            fontSize: 15,
                                        }}
                                    ></Avatar>
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={handleCloseUserMenu}
                                    component={Link}
                                    href={setting.link}
                                >
                                    <Typography textAlign="center">
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
