import 'core-js/stable'
import 'regenerator-runtime/runtime'

// import './assets/css/style.css'

import Login from './modules/Login'
import Contato from './modules/Contato'

// instancias da classe Login
const cadastro = new Login('.form-cadastro')
const login = new Login('.form-login')

login.init()
cadastro.init()

// instancia da classe Contato
const contato = new Contato('.contato')

contato.init()