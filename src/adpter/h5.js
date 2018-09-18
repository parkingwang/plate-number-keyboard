import Letter from "../fund/letter";


class H5 {
    constructor(container) {
        this.buttonlayout = {}
        this.container = document.querySelector(container)
    }

    //外层包裹元素
    wrap() {
        return 'div';
    }

    //按钮元素
    item() {
        return 'div'
    }

    //显示键盘
    show() {
        this.container.setAttribute("style", "display:block")
    }

    //关闭键盘
    close() {
        this.container.setAttribute("style", "display:none")
    }

    //点击操作
    input(value) {
        return value
    }

    //删除操作
    delete() {

    }

    //设置内容区域
    setContainerContent(content) {
        this.container.innerHTML = content
    }

    //获取单个页面布局
    getButtonLayout(layoutType, type = 1) {
        let prefix = "irain-keyborad"
        if (this.buttonlayout[layoutType]) {
            return this.buttonlayout
        }

        let itemValues = Letter[layoutType]()

        console.log(itemValues)


        let template = `<${this.wrap()} class="${prefix}-${layoutType}-external">`
        for (let index in itemValues) {
            let value = itemValues[index]
            template += ` <${this.item()} class="${prefix}-${layoutType}-${index}" onclick="this.input()">${value}</${this.item()}>`
        }

        switch (type) {
            case 0:
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-more">更多</${this.item()}>`
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-close"></${this.item()}>`
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-sure">确定</${this.item()}>`
                break
            case 1:
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-back">返回</${this.item()}>`
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-close"></${this.item()}>`
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-sure">确定}</${this.item()}>`
                break;
            default:
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-close"></${this.item()}>`
                template += ` <${this.item()} class="${prefix}-${layoutType} ${prefix}-sure">确定}</${this.item()}>`
                break;
        }


        return template

        template += `</${this.wrap()}>`

    }
}

export default H5