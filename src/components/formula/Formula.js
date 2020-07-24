import {ExcelComponent} from '@core/ExcelComponent'
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
	static className = 'excel__formula'

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options
		})
	}

	storeChanged({currentText}) {
	// после ввода в ячейку срабатывает на ресайз
		this.$formula.text(currentText)
	}

	toHTML() {
		return `<div class="info">fx</div>
            <div 
            id="formula" 
            class="input" 
            contenteditable 
            spellcheck="false"
            ></div>`
	}

	init() {
		super.init();
		this.$formula = this.$root.find('#formula')
		const eventsNames = ['table:select']
		this.$on('table:select', $cell => {
			this.$formula.text($cell.data.value)
		})
	}

	onInput(event) {
		this.$emit('formula:input', $(event.target).text())
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab']
		if (keys.includes(event.key)) {
			event.preventDefault()
			this.$emit('formula:done')

		}
	}
}
