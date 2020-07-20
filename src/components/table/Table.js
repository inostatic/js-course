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
import * as actions from "@/redux/actions";
import {defaultStyles} from "@/constants";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(30, this.$getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectSell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', style => {
            this.selection.applyStyle(style)
        })
    }

    selectSell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        console.log($cell.getStyles(Object.keys(defaultStyles)))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }

    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectSell($target)
            }

        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
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
        this.updateTextInStore($(event.target).text())
    }
}


