const Contato = require('../models/ContatoModel')

exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos(req.session.user)
  res.render('index', { contatos, user: req.session.user })
}
