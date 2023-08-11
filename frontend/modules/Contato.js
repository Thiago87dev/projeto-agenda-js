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

        let error = false
        const elementoNome = this.form.querySelector('.error-nome')
        const elementoEmail = this.form.querySelector('.error-email')
        if(!nomeInput.value){
            if(elementoNome){
                elementoNome.remove()
            } 
            const div = document.createElement('div')
            div.innerHTML = 'Nome é obrigatorio'
            div.classList.add('text-danger')
            div.classList.add('error-nome')
            nomeInput.insertAdjacentElement('afterend', div)
            error = true
        } else{
            if(elementoNome){
                elementoNome.remove()
            }
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)){
            if(elementoEmail){
                elementoEmail.remove()
            } 
            const div = document.createElement('div')
            div.innerHTML = 'Email invalido'
            div.classList.add('text-danger')
            div.classList.add('error-email')
            emailInput.insertAdjacentElement('afterend', div)
            error = true
        } else {
            if(elementoEmail){
                elementoEmail.remove()
            }
        }
        if(!emailInput.value && !telefoneInput.value){
            alert('É preciso ter pelo menos um contato: email ou telefone')
            error = true
        }
        if(!error){
            el.submit()
            if(elementoNome){
                elementoNome.remove()
            }
            if(elementoEmail){
                elementoEmail.remove()
            }
        } 
    }
}