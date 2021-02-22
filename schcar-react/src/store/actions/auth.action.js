import { Http } from '../../config/Http'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'

export const actionsTypes = {
    CHANGE: 'AUTH_CHANGE',
    SUCCESS: 'AUTH_SUCCESS'
}

export const change = (payload) => ({
    type: actionsTypes.CHANGE,
    payload
})

export const success = (payload) => ({
    type: actionsTypes.SUCCESS,
    payload
})

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token);
    dispatch( change({
        email: '',
        password: ''
    }))

    dispatch(success(true));
    console.log('passou no success')
}

export const login = credentials => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Autenticando usuário...'
    }))
    
    return Http.post('oauth/token', {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'MiB1NDHKavhJdP5cSPXfshBRlQnx6ckklQc7PeyG',
        username: credentials.email,
        password: credentials.password,
        scope:''
    })
    .then(res => {
        dispatch( changeLoading({ open: false }))
        if(typeof res !== 'undefined'){
            if(res.data.access_token){
                dispatch(setUserToken(res.data.access_token));
            }
        }
    })
    .catch(err => {
        dispatch( changeLoading({ open: false }))

        if(typeof err.response !== 'undefined') {
            if( err.response.status === 401 || err.response.status === 400){
                dispatch( changeNotify({
                    open: true,
                    class: 'error',
                    msg: 'E-mail ou Senha incorretos'
                }))
            }
        } else {
            dispatch( changeNotify({
                open: true,
                class: 'error',
                msg: 'Erro ao se conectar ao servidor'
            }))
        }
    })
}