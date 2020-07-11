const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col) {
    return `
        <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
        `
}

function createRow(content, i) {
    const resize = i ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${i ? i : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>    
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols, null))

    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    for (let i = 1; i <= rowsCount; i++) {
        rows.push(createRow(cells, i))
    }
    return rows.join('')
}
