import AccountCircle from '@mui/icons-material/AccountCircle'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { NavLink, useNavigate } from 'react-router-dom'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { Authentication } from '../services/Authentication'

type NavBarProps = {
    authentication: Authentication
}

const pages: string[] = ['Home', 'Profile', 'Books', 'Add Book']

export default function NavBar({ authentication }: NavBarProps): JSX.Element {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [userName, setUserName] = useState<string>(
        authentication.getUserName()
    )
    const navigate = useNavigate()

    function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>): void {
        if (userName) {
            setAnchorElUser(event.currentTarget)
        }
    }

    function handleCloseUserMenu(): void {
        setAnchorElUser(null)
    }

    function handleNavPg(event: React.MouseEvent<HTMLElement>): void {
        let navPg = event.currentTarget.innerText.toLowerCase()
        if (navPg === 'home') {
            navPg = ''
        } else if (navPg === 'add book') {
            navPg = 'createBook'
        }
        navigate(`/${navPg}`)
    }

    function handleLogout(): void {
        setAnchorElUser(null)
        authentication.logout()
        setUserName('')
        navigate('/')
    }

    return (
        <AppBar position="static" sx={{ bgcolor: 'green' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LibraryBooksIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleNavPg}
                                sx={{
                                    my: 2,
                                    mx: 3,
                                    color: 'white',
                                    display: 'block',
                                    fontSize: 'large',
                                }}
                                size="large"
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                {userName ? (
                                    <AccountCircle fontSize="large" />
                                ) : (
                                    <NavLink to={'/login'}> Login </NavLink>
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
