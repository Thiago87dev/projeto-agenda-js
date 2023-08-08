const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    dataCriacao: {type: Date, default: Date.now},
    usuario:{type: String},
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body){
    this.body = body
    this.errors = []
    this.contato = null
}

Contato.prototype.register = async function () {
    this.valida()
    if(this.errors.length > 0 ) return
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function () {
    this.cleanUp()
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.')
    if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um cantato precisa ser enviado: email ou telefone')
}

Contato.prototype.cleanUp = function () {
    for (let k in this.body) {
        if (typeof this.body[k] !== 'string') {
            this.body[k] = ''
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
        usuario: this.body.usuario
    }
}

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return
    this.valida()
    if(this.errors.length > 0) return
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
}

// Metodos estaticos
Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return
    const contato = await ContatoModel.findById(id)
    return contato
}

Contato.buscaContatos = async function(userId){
    const contat = await ContatoModel.find({usuario: userId}).sort({dataCriacao: -1})
    return contat
}

Contato.delete = async function(id){
    if(typeof id !== 'string') return
    const contato = await ContatoModel.findOneAndDelete({_id: id})
    return contato
}

module.exports = Contato