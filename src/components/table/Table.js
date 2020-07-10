import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
		})
	}

	onClick() {
		console.log('click')
	}

	onMousedown() {
		console.log('mousedown')
	}

	onMousemove() {
		console.log('mousemuve')
	}

	onMouseup() {
		console.log('mouseup')
	}

	toHTML() {
	  return createTable(20)
	}
}
