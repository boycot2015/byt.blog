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
        success: 'bg-[#67C23A]',
        error: 'bg-[#F56C6C]',
        default: 'bg-[#409EFF]',
        info: 'bg-[#909399]',
        warning: 'bg-[#E6A23C]',
    }
    constructor(props: MessageProps = {
        text: '温馨提示',
        delay: 1000
    }) {
        this.options = props
    }

    show(options?:MessageProps) {
        options = options || this.options
        let messageEl = document.createElement('div') as HTMLDivElement
        messageEl.setAttribute('class', `fixed top-[5vh] left-[50%] z-999 text-[white]`)
        messageEl.innerHTML = `<div class="flex rounded-md items-center p-2 justify-center ${options.class} ${this.typeClass[options.type || 'default']}" style="${options.style}"><span>${options.icon||''}</span><span class="flex">${options.text}</span></div>`
        document.body.appendChild(messageEl)
        this.messageEl = messageEl
        this.options = options
        this.hide()
    }
    hide() {
        setTimeout(() => {
            document.body.removeChild(this.messageEl)
            this.messageEl = null
        }, this.options.delay || 1000)
    }
}
export default Message