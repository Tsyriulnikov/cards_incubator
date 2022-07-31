import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {CARDS, LOG_OUT, PROFILE, REC_PASSWORD, SING_IN, SING_UP} from "../routes/routes";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ResponseProfileType} from "../../features/profile/profile-reducer";
import userPhoto from "../../assets/img/user.png";
import {LinearProgress} from "@material-ui/core";
import {RequestStatusType} from "../../app/app-reducer";


const pages = ['Sing In', 'Sing Up'];
const settings = ['Profile', 'Cards Pack', 'Recovery Password', 'Logout'];
const pagesRoutes = [SING_IN, SING_UP]
const settingsRoutes = [PROFILE, CARDS, REC_PASSWORD, LOG_OUT]

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const profile = useSelector<AppRootStateType, ResponseProfileType>(state => state.profile)
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
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

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{position: 'relative'}}>
                    <>
                    {/*_______________________LOGO DESKTOP_____________________________________*/}

                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            PROJECT
                        </Typography>

                        {/*__________________________________PAGE ADAPTIVE______________________________________*/}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <NavLink to={pagesRoutes[index]} style={{textDecoration: 'none', color: 'black'}} key={index}><Typography textAlign="center">{page}</Typography></NavLink> {/*menu for adaptive*/}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/*___________________________________LOGO ADAPTIVE_________________________________________*/}

                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            PROJECT
                        </Typography>

                        {/*_____________________________PAGE DESKTOP__________________________________________________*/}

                        {!isLoggedIn && <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', justifyContent: 'flex-end'}}}>
                            {pages.map((page, index) => (
                                <NavLink to={pagesRoutes[index]} style={{textDecoration: 'none'}} key={index}>
                                    <Button
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block', margin: 0}}
                                    >
                                        {page} {/*menu for desktop*/}
                                    </Button></NavLink>
                            ))}
                        </Box>}

                        {/*___________________________________MENU______________________________________*/}

                        {isLoggedIn && <Box sx={{flexGrow: 0, position: 'absolute', right: 0}}>
                            {profile.name + ' '}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src={profile.avatar || userPhoto}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <NavLink to={settingsRoutes[index]}
                                                 style={{textDecoration: 'none', color: 'black'}}
                                                 key={index}><Typography
                                            textAlign="center">{setting}</Typography></NavLink> {/*settings for all*/}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>}
                    </>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </Container>
        </AppBar>
    );
};
export default Header;

