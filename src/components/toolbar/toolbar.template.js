function toButton(button) {
    const meta = `data-type="button" 
                  data-value='${JSON.stringify(button.value)}'
                  `

    return `
        <div 
        class="button ${button.active ? 'active' : ''}"
        ${meta}
        >
           <i 
           class="material-icons"
           ${meta}
           >${button.icon}</i>
        </div>
    `
}

export function createToolbar(s) {


    const buttons = [

        {
            icon: 'format_align_left',
            value: {textAlign: 'left'},
            active: s['textAlign'] === 'left'
        },
        {
            icon: 'format_align_center',
            value: {textAlign: 'center'},
            active: s['textAlign'] === 'center'
        },
        {
            icon: 'format_align_right',
            value: {textAlign: 'right'},
            active: s['textAlign'] === 'right'
        },
        {
            icon: 'format_bold',
            value: {
                fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'
            },
            active: s['fontWeight'] === 'bold'
        },
        {
            icon: 'format_italic',
            value: {
                fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'
            },
            active: s['fontStyle'] === 'italic'
        },
        {
            icon: 'format_underline',
            value: {
                textDecoration: s['textDecoration'] === 'underline'
                    ? 'none'
                    : 'underline'
            },
            active: s['textDecoration'] === 'underline'
        }
    ]

    return buttons.map(toButton).join('')
}
