import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
    isCell,
    matrix,
    nextSelector, shouldResize
} from "@/components/table/table.functions"
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectSell($cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectSell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    toHTML() {
        return createTable(30)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
                this.$emit('table:mousedown', $target)
            }

        }
    }

    onKeydown(event) {
        const keys = [
            'Tab',
            'Enter',
            'ArrowUp',
            'ArrowRight',
            'ArrowLeft',
            'ArrowDown'
        ]
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectSell($next)
        }
    }
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}


