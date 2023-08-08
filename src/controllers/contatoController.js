const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    res.render('contato',{ contato: {} })
}


exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        contato.body.usuario = req.session.user._id
        await contato.register()
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }
    
        req.flash('success', 'Contato salvo com sucesso.')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e);
        return res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404')
    const contato = await Contato.buscaPorId(req.params.id)
    if(!contato) return res.render('404')
    res.render('contato', { contato })
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        contato.body.usuario = req.session.user._id
        await contato.edit(req.params.id)
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(`/contato/index/${req.params.id}`))
            return
        }
    
        req.flash('success', 'Contato editado com sucesso.')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e);
        return res.render('404')
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404')
    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404')
    req.flash('success', 'Contato apagado com sucesso')
    req.session.save(() => res.redirect(`/`))
    
}