import React from 'react'
import { Link } from 'react-router-dom'
import { FaCar, FaUsers, FaLaptop, FaCreditCard, FaWhatsapp, 
    FaSignOutAlt, FaAngleUp, FaAngleDown } from 'react-icons/fa'

import { MenuList, MenuItem, AppBar, Toolbar, IconButton,
    Typography, Drawer, List, ListItem, ListItemText, ListItemIcon,
    Divider, Collapse } from '@material-ui/core'

import { MdMenu } from 'react-icons/md'

export default function Header(props) {
    const [state, setState] = React.useState({
        open: false
    })

    const [ collapse, setCollapse ] = React.useState({
        site: false,
        financeiro: false
    })
    return (
        <>
        {(window.innerWidth < 577 ) ? 
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu" onClick={() => setState({ open: true})}>
                        <MdMenu />
                    </IconButton>
                    <Typography variant="h6">
                        {props.title}
                    </Typography>
                    {props.button}
                </Toolbar>
            </AppBar>
            :
            <nav className="header navbar navbar-expand-lg navbar-light bg-white p-0">
                <div className="container">
                    <Link className="nav-brand" to="/">
                        <img src="/logo.png" alt="SCH CAR" height="40" />
                    </Link>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehicles">
                                <FaCar className="icon-lg me-2"/> Veículos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link bg-white" to="/vehicles">
                                <FaUsers className="icon-lg me-2"/> Proprietário
                            </button>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                                <FaLaptop className="icon-lg me-2"/> Site
                            </Link>
                            <MenuList className="dropdown-menu">
                                <MenuItem className="dropdown-item">
                                    Otimização para o Google
                                </MenuItem>
                                <MenuItem className="dropdown-item">
                                    Unidades e Telefones
                                </MenuItem>
                                <MenuItem className="dropdown-item">
                                    Minha Logo
                                </MenuItem>
                                <MenuItem className="dropdown-item">
                                    Domínio
                                </MenuItem>
                                <MenuItem className="dropdown-item">
                                    Configurações
                                </MenuItem>
                            </MenuList>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                                <FaCreditCard className="icon-lg me-2"/> Financeiro
                            </Link>
                            <MenuList className="dropdown-menu">
                                <MenuItem className="dropdown-item">
                                    Meu Plano
                                </MenuItem>
                                <MenuItem className="dropdown-item">
                                    Minhas Transações
                                </MenuItem>
                            </MenuList>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link bg-white" to="/vehicles">
                                <FaWhatsapp className="icon-lg me-2"/> Suporte
                            </button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link bg-white" to="/vehicles">
                                <FaSignOutAlt className="icon-lg me-2"/> Sair
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        }

        <Drawer anchor="left" open={state.open} onClose={() => setState({open: false})}>
            <div styles={{width: 320, maxWidth: window.innerWidth - 70 }}>
                <List component="nav" className="menu-mobile">
                    <ListItem>
                        <img className="img-fluid logo-mobile" src="/logo.png" alt="SCH CAR" height="40" />
                    </ListItem>

                    <ListItem>
                        teste@gmail.com
                    </ListItem>
                    
                    <Divider className="mt-2 mb-3 divider"/>

                    <ListItem>
                        <ListItemIcon>
                            <FaCar />
                        </ListItemIcon>
                        <ListItemText primary="Veículos"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FaUsers />
                        </ListItemIcon>
                        <ListItemText primary="Proprietários"/>
                    </ListItem>

                    <ListItem button onClick={() => setCollapse({site: !collapse.site})}>
                        <ListItemIcon>
                            <FaLaptop />
                        </ListItemIcon>
                        <ListItemText primary="Site"/>
                        {(collapse.site) ? <FaAngleUp/> : <FaAngleDown/>}
                    </ListItem>

                    <Collapse in={collapse.site} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Otimização para o Google"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Unidades e Telefones"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Minha Logo"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Domínio"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Configurações"></ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                    <Divider className="mt-2 mb-2"/>
                    <ListItem button onClick={() => setCollapse({financeiro: !collapse.financeiro})}>
                        <ListItemIcon>
                            <FaCreditCard />
                        </ListItemIcon>
                        <ListItemText primary="Site"/>
                        {(collapse.financeiro) ? <FaAngleUp/> : <FaAngleDown/>}
                    </ListItem>

                    <Collapse in={collapse.financeiro} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Meu Plano"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className="pl-5" primary="Minhas Transações"></ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem>
                        <ListItemIcon>
                            <FaWhatsapp />
                        </ListItemIcon>
                        <ListItemText primary="Suporte"/>
                    </ListItem>

                    <Divider className="mt-2 mb-2"/>

                    <ListItem>
                        <ListItemIcon>
                            <FaSignOutAlt />
                        </ListItemIcon>
                        <ListItemText primary="Sair"/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
        </>
    )
}
