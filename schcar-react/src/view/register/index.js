import React from 'react'
import { TextField, Typography, Button } from '@material-ui/core'
import { change, register } from '../../store/actions/register.action'
import { useDispatch, useSelector} from 'react-redux'
import { Redirect, Link } from 'react-router-dom';

export default function Register() {
    const dispatch = useDispatch();
    const { user, error, success } = useSelector( state => state.registerReducer )
    return (
        <div className="d-flex bg-white min-vh-100">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group text-center">
                            <img src="/logo.png" alt="SCH CAR" height="48"/>
                            <Typography 
                                variant="h6"
                                className="mt-3"
                                component="h1">Crie sua conta, aproveite o teste gratuito!
                            </Typography>

                        </div>

                            <TextField
                                error={(error.name) && true}
                                label="Nome"
                                margin="normal"
                                value={user.name}
                                onChange={text => {
                                    dispatch( change( { name: text.target.value }) );
                                    if(error.name && delete error.name);
                                }}
                            />
                            {(error.name) && 
                                <strong className="text-danger">{error.name[0]}</strong>}
                            <TextField
                                error={(error.email) && true}
                                label="Email"
                                margin="normal"
                                type="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={text => {
                                    dispatch( change( { email: text.target.value }) );
                                    if(error.email && delete error.email);
                                }}
                            />
                            {(error.email) && 
                                <strong className="text-danger">{error.email[0]}</strong>}
                            <TextField
                                error={(error.password) && true}
                                label="Senha"
                                margin="normal"
                                type="password"
                                value={user.password}
                                onChange={text => {
                                    dispatch( change( { password: text.target.value }) );
                                    if(error.password && delete error.password);
                                }}
                            />
                            {(error.password) && 
                                <strong className="text-danger">{error.password[0]}</strong>}

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                className="mt-4 mb-4"
                                onClick={() => dispatch( register(user))}
                            >
                                Finalizar Cadastro
                            </Button>
                            {(success) && 
                                <Redirect to="/vehicles"/>
                            }

                            <div className="text-center">
                                <Link to="/login" className="mt-4 text-primary outline">Fazer Login</Link>
                            </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
