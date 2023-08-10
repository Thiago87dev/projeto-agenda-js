import validator from "validator"
export default class Contato{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        const el = e.target
        const nomeInput = el.querySelector('input[name="nome"]')
        const emailInput = el.querySelector('input[name="email"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        console.log(nomeInput, emailInput, telefoneInput);

        let error = false
        if(!nomeInput.value){
            alert('O campo nome é obrigatorio')
            error = true
        }
        if(emailInput.value && !validator.isEmail(emailInput.value)){
            alert('Email invalido')
            error = true
        }
        if(!emailInput.value && !telefoneInput.value){
            alert('É preciso ter pelo menos um contato: email ou telefone')
            error = true
        }
        if(!error) el.submit()
    }
}