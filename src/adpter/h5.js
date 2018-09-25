import Letter from "../fund/letter";
import { Level } from "chalk";

class H5 {
    constructor() {
        this.buttonlayout = {}
        this.copyVpl = []
        this.disInd = ''
        this.negation = false
        this.disabledArrLetters = {
            // 民航
            0: ['航'],
            // WJ
            1: ['J'],
            // 新能源第三位/第八位
            2: ['D', 'F']
        }
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
        this.container.setAttribute("style", "display: inline-flex")
    }

    //关闭键盘
    close() {
        this.container.setAttribute("style", "display:none")
    }

    //点击操作
    input(value) {
        this.op = value
    }

    //删除操作
    delete() {

    }

    // 获取禁用按钮数组
    getDisabledLettersArr(val) {
        return this.disabledArrLetters[val]
    }

    // 构建键盘按钮
    buildKeys(letters) {
        let map = new Array();
        let disabledArr = new Set(this.getDisabledLettersArr(this.disInd));
        letters.forEach((item, index) => {
            // 禁用时，是否与传入值取反
            let negation = this.negation ? !disabledArr.has(item) : disabledArr.has(item)
            map[index] = {
                key: item,
                disabled: negation || item ===  'I'
            }
        });
        return map;
    }
    
    //设置内容区域
    setContainerContent(layoutType, type) {
        let template = `<${this.wrap()} id="irain-plate-keyboard">`
        let prefix = "irain-keyborad"
        let itemValues = this.buildKeys(Letter[layoutType]());
        itemValues.map((item, index) => {
            let value = item.key
            if (layoutType === 'getProvinces' && (index === 20 || index === 28)) {
                template += ` <${this.item()} class="key ${prefix}-${layoutType}-${index}" style="visibility:hidden;"><span></span></${this.item()}>`
            }
            if(item.disabled) {
                template += ` <${this.item()} class="key ${prefix}-${layoutType}-${index} ${prefix}-disabled"><span>${value}</span></${this.item()}>`
            } else {
                template += ` <${this.item()} class="key ${prefix}-${layoutType}-${index}"><span>${value}</span></${this.item()}>`
            }
        })

        switch (type) {
            case 0:
                template += ` <${this.item()} class="key operate ${prefix}-${layoutType} ${prefix}-more"><span>更多</span></${this.item()}>`
                template += ` <${this.item()} class="key operate ${prefix}-${layoutType} ${prefix}-delete"><span>删除</span></${this.item()}>`
                template += ` <${this.item()} class="key operate ${prefix}-${layoutType} ${prefix}-sure"><span>确定</span></${this.item()}>`
                break
            case 1:
                template += ` <${this.item()} class="key operate  ${prefix}-${layoutType} ${prefix}-back"><span>返回</span></${this.item()}>`
                template += ` <${this.item()} class="key operate  ${prefix}-${layoutType} ${prefix}-delete"><span>删除</span></${this.item()}>`
                template += ` <${this.item()} class="key operate  ${prefix}-${layoutType} ${prefix}-sure"><span>确定</span></${this.item()}>`
                break;
            default:
                template += ` <${this.item()} class="key operate  ${prefix}-${layoutType} ${prefix}-delete"><span>删除</span></${this.item()}>`
                template += ` <${this.item()} class="key operate  ${prefix}-${layoutType} ${prefix}-sure"><span>确定</span></${this.item()}>`
                break;
        }
        template += `</${this.wrap()}>`
        document.getElementById("box").innerHTML = template

        this.container = document.querySelector("#irain-plate-keyboard")

        // 移除事件
        if(document.querySelector(`.${prefix}-more`)) {
            document.querySelector(`.${prefix}-more`).removeEventListener('click', function() {});
        }
        //绑定监听事件，剔除禁用按钮
        let _this = this
        for (let index in itemValues) {
            let classList = document.querySelector(`.${prefix}-${layoutType}-${index}`).classList;
            if(classList.contains(`${prefix}-disabled`)==false) {
                let item = document.querySelector(`.${prefix}-${layoutType}-${index}`).addEventListener("click", function () {
                    _this.input(itemValues[index].key)
                })
            }
        }

        // 更多、返回事件绑定
        this.boundEventList(layoutType, prefix);

        // 点击删除按钮
        document.querySelector(`.${prefix}-delete`).addEventListener("click", function () {
            _this.delete();
        })
    }

    // 更多、返回
    boundEventList(layoutType, prefix) {
        let _this = this;
        let moreDom = document.querySelector(`.${prefix}-more`);
        let backDom = document.querySelector(`.${prefix}-back`);

        // 更多按钮事件
        if (moreDom) {
            switch (layoutType) {
                case 'getProvinces':
                    moreDom.addEventListener("click", function () {
                        _this.setContainerContent('getMore', 1);
                    });
                    break;
                // 最后一位：更多按钮
                case 'getNumberAndLetterHasI':
                    moreDom.addEventListener("click", function () {
                        _this.setContainerContent('getStudy', 1);
                    });
                    break;
                default: ;
            }
        }

        // 返回按钮事件
        if (backDom) {
            switch (layoutType) {
                case 'getMore':
                    backDom.addEventListener("click", function () {
                        _this.setContainerContent('getProvinces', 0);
                    });
                    break;
                // 最后一位：返回按钮
                case 'getStudy':
                    backDom.addEventListener("click", function () {
                        _this.setContainerContent('getNumberAndLetterHasI', 0);
                    });
                    break;
                default: ;
            }
        }
    }

}

export default H5