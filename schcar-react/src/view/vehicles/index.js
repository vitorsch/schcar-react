import React from 'react'
import { index } from '../../store/actions/vehicles.action'
import { Link } from 'react-router-dom'
import { CircularProgress, Button, IconButton, Menu, MenuItem, Slide, Fade } from '@material-ui/core'
import { FaPlus, FaEllipsisV, FaClipboard, FaUser, FaLink, FaPencilAlt, FaTrash, FaShare } from 'react-icons/fa'
import { SCROLL, rootUrl } from '../../config/App'

import Header from '../header'
import { useDispatch, useSelector } from 'react-redux'

export default function Vehicles() {
    const dispatch = useDispatch()
    const vehicles = useSelector(state => state.vehiclesReducer.vehicles)
    const [isLoading, setLoading] = React.useState(true)
    const [isLoadMore, setLoadMore] = React.useState(false)
    const [query, setQuery] = React.useState({ page: 1 })
    const [state, setState] = React.useState({
        isDeleted: null,
        menuEl: null,
        confirmEl: null
    })

    React.useEffect(() => {
        document.addEventListener('scroll', _handleScroll);
        _index();
    }, []) // sempre passar array vazio como dependência 
    // para que quando houver uma alteração ele rodará novamente este comando

    //função para detectar se há necessidade de carregar mais itens no scroll inf.
    const _handleScroll = (event) => {
        let scrollTop = event.srcElement.body.scrollHeight - (event.srcElement.body.offsetHeight + event.srcElement.body.scrollTop)
        if (scrollTop < SCROLL) {
            if (!isLoadMore && _handleLoadMore());
        }
    }

    const _handleLoadMore = () => {
        if (vehicles.current_page < vehicles.last_page) {
            setQuery({
                ...query,
                page: query.page + 1
            }, () => {
                _index(true);
            })
        }
    }

    const _index = (LoadMore) => {
        dispatch(index(query, LoadMore)).then(res => {
            if (res) {
                setLoading(false);
                if (isLoadMore && setLoadMore(false));
            }
        })
    }

    const Transition = React.forwardRef((props, ref) => {
        return <Slide direction="up" ref={ref} {...props}/>
    })

    const _handleMenu = (event) => {
        setState({ menuEl: event.currentTarget })
    }

    return (
        <>
            <Header title="Veículos" />
            <div className="container mt-4 pt-3">
                {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress /></div> :
                    <>
                        <div className="d-flex mb-4">
                            <h3 className="font-weight-normal">Veículos</h3>
                            <Link to="/vehicles/create" className="ms-auto">
                                <Button variant="contained" color="primary">
                                    <FaPlus size="1.5em" className="me-2" />
                                Cadastrar
                            </Button>
                            </Link>
                        </div>

                        <div className="card">
                            {(vehicles.data.length > 0) &&
                                <div className="card-header">
                                    <h6 className="m-0">Veículos {vehicles.total}</h6>
                                </div>
                            }

                            <div className="p-2 p-md-3">
                                {vehicles.data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="d-flex">
                                            <div className="vehicle-img d-flex justify-content-center align-items-center">
                                                {(state.isDeleted === item.id) ?
                                                    <CircularProgress color="secondary" /> :
                                                    (item.cover && <img alt="" className="shadow rounded" src={rootUrl + 'thumb/vehicles/' + item.cover.img + '?u=' + item.cover.user_id + '&s=' + item.cover.vehicle_id + '&w=180&h=135'} />)
                                                }
                                            </div>
                                            <div className="vehicle-detail ps-3 ps-md-4">
                                                <h6>{item.vehicle_brand.label} {item.vehicle_model.label}</h6>
                                                <strong className="d-block">{item.vehicle_version.label}</strong>
                                                {(item.vehicle_price) &&
                                                    <strong className="text-danger h5 d-block">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.vehicle_price)}</strong>
                                                }
                                            </div>

                                            <div className="ms-auto">
                                                <IconButton id={index} onClick={_handleMenu}>
                                                    <FaEllipsisV />
                                                </IconButton>

                                                {(Boolean(state.menuEl)) &&
                                                    <Menu
                                                        anchorEl={state.menuEl}
                                                        getContentAnchorEl={null}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right'
                                                        }}
                                                        TransitionComponent={ window.innerWidth < 577 ? Transition : Fade } // mudar animação pra celular ou desktop
                                                        open={(index === parseInt(state.menuEl.id))}
                                                        onClose={() => setState({ menuEl: null })}
                                                        onClick={() => setState({ menuEl: null })}
                                                    >
                                                        <MenuItem>
                                                            <FaClipboard size="1.2em" className="me-4"/> Notas
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <FaUser size="1.2em" className="me-4"/> Proprietário
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <FaLink size="1.2em" className="me-4"/> Visualizar
                                                        </MenuItem>

                                                        <div className="dropdown-divider"/>

                                                        <MenuItem>
                                                            <FaPencilAlt size="1.2em" className="me-4"/> Editar
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <FaTrash size="1.2em" className="me-4"/> Apagar
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <FaShare size="1.2em" className="me-4"/> Compartilhar
                                                        </MenuItem>
                                                    </Menu>
                                                }
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                    </>
                }
            </div>
        </>
    )
}
