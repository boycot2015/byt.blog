type MessageProps = {
    style?: string
    class?: string
    text?: string
    delay?: number
    type?: string
    icon?: string
}
class Message {
    messageEl!: any
    progressEl!: HTMLDivElement
    options: MessageProps
    typeClass:any = {
        success: 'bg-[green]',
        error: 'bg-[red]',
        default: 'bg-[#ccc]',
        warning: 'bg-[orange]',
    }
    constructor(props: MessageProps = {
        text: '正在上传，请稍后...',
        delay: 1000
    }) {
        this.options = props
    }

    show(options?:MessageProps) {
        options = options || this.options
        let messageEl = document.createElement('div') as HTMLDivElement
        messageEl.setAttribute('class', `fixed top-[5vh] left-[50%] rounded z-999 p-2 text-[white] flex items-center justify-center ${options.class} ${this.typeClass[options.type || 'default']}`)
        messageEl.setAttribute('style', options.style || '')
        messageEl.innerHTML = `<span>${options.icon||''}</span><span class="flex">${options.text}</span>`
        document.body.appendChild(messageEl)
        this.messageEl = messageEl
        this.options = options
        this.hide()
    }
    hide() {
        setTimeout(() => {
            this.messageEl.remove()
            this.messageEl = null
        }, this.options.delay || 1000)
    }
}
export default Message