const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    nome:{type: String, required: true},
    email:{type: String, required: true},
    senha:{type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async login(){
        this.valida()
        if(this.errors.length > 0) return

        this.user = await LoginModel.findOne({email: this.body.email})
        if(!this.user){
            this.errors.push('Usuario e/ou senha inválida')
            return
        } 

        if (!bcryptjs.compareSync(this.body.senha, this.user.senha)){
            this.errors.push('Usuario e/ou senha inválida')
            this.user = null
            return
        }
    }

    async register() {
        this.valida()
        if(this.errors.length > 0) return

        await this.userExists()

        if(this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync()
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
        
        this.user = await LoginModel.create(this.body)
    }

    valida() {
        this.cleanUp()
        // Validando e-mail
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
        // Validando senha
        if(this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
    }
    
    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user) this.errors.push('Usuário ja existe.')
    }
    
    cleanUp() {
        for (let k in this.body) {
            if (typeof this.body[k] !== 'string') {
                this.body[k] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            senha: this.body.senha
        }
    }
}

module.exports = Login