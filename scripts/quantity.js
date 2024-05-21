class Quantity {

    constructor(element) {
        this.element = element
        this.input = this.element.querySelector('input')
        this.minus = this.element.querySelector('.minus')
        this.plus = this.element.querySelector('.plus')

        this.minus.addEventListener('click', event => { this.changeValue(false) })
        this.plus.addEventListener('click', event => { this.changeValue(true) })
    }

    changeValue (bool) {
        let currentValue = Number(this.input.value)
        bool ? this.changeInput(currentValue + 1) : this.changeInput(currentValue - 1)
    }

    changeInput (value) {
        let minValue = this.input.getAttribute('min')
        let maxValue = this.input.getAttribute('max')

        if( value < minValue ) { value = minValue } else if( value > maxValue ) { value = maxValue }
        if( value < minValue || value > maxValue ) return
        
        this.input.value = value
    }

}

quantities = document.querySelectorAll('div.quantity')
quantities.forEach( quantity => {
    new Quantity(quantity)
})