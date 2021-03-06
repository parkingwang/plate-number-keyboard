import Letter from "../fund/letter";
import { Level } from "chalk";

class H5 {
    constructor() {
        this.buttonlayout = {}
        // 禁用规则取反标志
        this.negation = false
        // 禁用数组
        this.disabledArrLetters = []
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
    delete(value) {
        this.op = value;
    }

    // 更多操作
    more(value) {
        this.op = value;
    }

    // 返回操作
    back(value) {
        this.op = value;
    }

    // 确定操作
    sure(value) {
        this.op = value;
    }
    // 获取禁用按钮数组
    getDisabledLettersArr(val, tag) {
        return {
            disArr: val,
            isNegation: tag
        };
    }

    // 构建键盘按钮
    buildKeys(letters) {
        let map = new Array();
        let disabledArr = new Set(this.disabledArrLetters);
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
            // 生成占位元素
            if (layoutType === 'getProvinces' && (index === 20 || index === 28)) {
                template += ` <${this.item()} class="key" style="visibility:hidden;"></${this.item()}>`
            }
            if(item.disabled) {
                template += ` <${this.item()} class="key ${prefix}-${layoutType}-${index} ${prefix}-disabled"><span>${value}</span></${this.item()}>`
            } else {
                template += ` <${this.item()} class="key ${prefix}-${layoutType}-${index}"><span>${value}</span></${this.item()}>`
            }
        })
        // 最后一行占位元素
        template += ` <${this.item()} class="key" style="visibility:hidden;flex: 1;width: auto;"></${this.item()}>`

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
        document.getElementById("irain-keyboard").innerHTML = template

        this.container = document.querySelector("#irain-plate-keyboard")

        //绑定监听事件，剔除禁用按钮
        let _this = this
        for (let index in itemValues) {
			let button = document.querySelector(`.${prefix}-${layoutType}-${index}`);
			if(button==null){
				continue;
			}
            let classList = button.classList;
            if(classList.contains(`${prefix}-disabled`)==false) {
                let item = document.querySelector(`.${prefix}-${layoutType}-${index}`).addEventListener("click", function () {
                    _this.input(itemValues[index].key)
                })
            }
        }

        // 点击更多按钮
        let moreDom = document.querySelector(`.${prefix}-more`);
        if (moreDom) {
            moreDom.addEventListener("click", function () {
                _this.more('more');
            })
        }

        // 点击返回按钮
        let backDom = document.querySelector(`.${prefix}-back`);
        if (backDom) {
            backDom.addEventListener("click", function () {
                _this.back('back');
            })
        }

        // 点击删除按钮
        document.querySelector(`.${prefix}-delete`).addEventListener("click", function () {
            _this.delete('delete');
        })

        // 点击确定按钮
        document.querySelector(`.${prefix}-sure`).addEventListener("click", function () {
            _this.sure('sure');
        })
		
		 //阻止冒泡事件
        document.querySelector(`#irain-plate-keyboard`).addEventListener("click", function (event) {
             event.stopPropagation();
              event.cancelBubble = true;
        })
		
		// 点击确定按钮
        document.querySelector(`body`).addEventListener("click", function () {
           _this.close()
        })
		
		
		
    }
}

export default H5