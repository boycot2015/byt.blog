
type LoadingProps = {
    container?: HTMLElement
    style?: string
    class?: string
    text?: string
    delay?: number
    fullscreen?: boolean
    icon?: string
}
class Loading {
    messageEl!: any
    progressEl!: HTMLDivElement
    options: LoadingProps
    constructor(props: LoadingProps = {
        container: document.body,
        text: '正在上传，请稍后...',
        fullscreen: true,
        delay: 10
    }) {
        this.options = props
    }

    show(options?:LoadingProps) {
        options = options || this.options
        options.container = options.container || document.body
        let messageEl = document.createElement('div') as HTMLDivElement
        messageEl.setAttribute('class', `z-999 ${options.fullscreen?'fixed top-0 left-0 bg-[rgba(255,255,255,.8)] w-full h-full':''} flex items-center justify-center text-[var(--color-accent)] text-md ${options.class}`)
        messageEl.setAttribute('style', options.style || '')
        let icon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
            <path fill="currentColor" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(275.098 25 25)">
            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>`
        messageEl.innerHTML = `<span>${options.icon||icon}</span><span class="flex">${options.text}</span>`
        this.messageEl = messageEl
        options.container.appendChild(messageEl)
        options.container.style.overflow = 'hidden'
        
    }
    onprogress (data: {
        loaded: number
        total: number
        percent: number
    }) {
        this.progressEl && this.messageEl.removeChild(this.progressEl)
        let progressEl = document.createElement('div') as HTMLDivElement
        progressEl.innerHTML = `<div class="text-xl text-[var(--color-accent)]">${data.percent.toFixed(0)}%</div>`
        this.progressEl = progressEl
        this.messageEl.append(progressEl)
    }
    hide() {
        setTimeout(() => {
            this.messageEl.remove()
            this.options.container && (this.options.container.style.overflow = '')
            this.messageEl = null
        }, this.options.delay)
    }
}
export default Loading