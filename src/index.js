import Letter from './fund/letter'
import H5 from './adpter/h5'
import MiniApp from './adpter/mini-app'
import   "./css/keyboard.css"

export default class IrainPlateKeyboard {
    constructor(options) {
        let type = options.type
        switch (type) {
            case 'h5':
                this.appType = new H5()
                break;
            default:
                this.appType = new MiniApp()
        }
        this.vpl = []
        this.isEnergy = false
        this.maxLen = 7;
        this.updateFunction = options.updateFunction
        this.init()
    }

    /**
     * 显示键盘操作
     */
    show() {
        this.appType.show()
    }

    /**
     * 关闭键盘操作
     */
    close() {
        this.appType.close()
    }

    /* 
    * 切换能源/普通车牌
    */
    changeType() {
        this.isEnergy = !this.isEnergy
        // 切换时，更新规则
        this.getDisabledLetters(this.vpl.length, this.vpl)
        this.buildKeyBoard(this.vpl.length, this.vpl)
        if(!this.isEnergy && this.vpl.length === 8) {
            this.vpl = this.vpl.slice(0, 7);
        }
    }

    /* 
     * 删除
    */
    delete() {
        if(this.vpl.length >= 1) {
            this.vpl.splice(0, this.vpl.length);
        }
    }

    /**
     * @pageType
     * 返回键盘初始化视图
     * @returns {*}
     */
    view(pageType,type) {
        let template = ""
        // 获取键盘视图
        template=this.appType.setContainerContent(pageType, type)

        return template
    }

    /**
     * 按钮点击时候调用方法
     * @param value
     */
    click(value) {
        // 已输入的车牌长度
        let currIndex = this.vpl.length;
        this.maxLen = this.isEnergy ? 8 : 7;
        
        switch (value) {
            case 'delete':
                // 删除
                this.vpl.splice(this.vpl.length - 1, 1);
                // 当前输入的位数
                currIndex = this.vpl.length
                this.getDisabledLetters(currIndex, this.vpl)
                this.buildKeyBoard(currIndex, this.vpl)

                this.updateFunction(this.vpl)
                break;
            case 'more':
                // 更多
                this.getMoreKeyBoard(this.vpl);
                break;
            case 'back':
                // 更多
                this.getBackKeyBoard(this.vpl);
                break;
            default: 
                if(currIndex >= this.maxLen) {
                    this.vpl.splice(this.maxLen - 1, 1, value);
                    this.updateFunction(this.vpl)
                    return;
                };
                // 根据不同value做不同操作赋值操作
                this.vpl.push(value);
                // 当前输入的位数
                currIndex = this.vpl.length
                this.getDisabledLetters(currIndex, this.vpl)
                this.buildKeyBoard(currIndex, this.vpl)

                this.updateFunction(this.vpl)
        }
    }

    // 组件键盘
    buildKeyBoard(index, vpl) {
        if(index === 0) {
            this.view("getProvinces", 0)
        }
        if(index === 1) {
            switch(vpl[index - 1]) {
                case '民':
                    this.view("getStudy", 3)
                    break;
                default: 
                    // 第一位： 非'民'
                    this.view("getNumberAndLetterHasI", 3)
            }
        }
        if(index === 2) {
            switch(vpl.join('')) {
                case 'WJ':
                    this.view("getProvinces", 3)
                    break;
                default: 
                    // 前两位： 非'WJ'
                    this.view("getNumberAndLetterHasI", 3)
            }
        }
        if(index === 3 || index === 4 || index === 5) {
            this.view("getNumberAndLetterHasI", 3)
        }

        // 最后一位显示”更多“
        if (index === this.maxLen - 1) {
            let frontFir = vpl[0];
            let frontSec = vpl[0] + vpl[1];
            if (frontSec === 'WJ' || frontFir === '民' || frontFir === '使') {
                this.view("getNumberAndLetterHasI", 3)
            } else {
                this.view("getNumberAndLetterHasI", 0)
            } 
        }
    }

    // 获取不可用按钮
    getDisabledLetters(index, vpl) {
        this.appType.disInd = '';
        this.appType.negation = false;
        if (!this.isEnergy) {
            if(index === 1) {
                switch(vpl[0]) {
                    case '民':
                        this.appType.disInd = 0;
                        this.appType.negation = true;
                        break;
                    case 'W':
                        this.appType.disInd = 1;
                        this.appType.negation = true;
                        break;
                    default: ;
                }
            }
        } else {
            if(index === 2 || index === 7) {
                // 只有E、F高亮
                this.appType.disInd = 2;
                this.appType.negation = true;
            }
        }
    }

    // 获取更多视图
    getMoreKeyBoard(vpl) {
        let Len = vpl.length;
        let max = this.maxLen;
        switch (Len) {
            case 0: 
                this.view("getMore", 1);
                break;
            case (max - 1): ;
            case max:
                this.view("getStudy", 1);
                break;
            default: ;
        }
    }

    // 返回
    getBackKeyBoard(vpl) {
        let Len = vpl.length;
        let max = this.maxLen;
        switch (Len) {
            case 0: ;
            case 1:
                this.view("getProvinces", 0);
                break;
            case (max - 1): ;
            case max:
                this.view("getNumberAndLetterHasI", 0);
                break;
            default: ;
        }
    }

    /**
     * 键盘初始化视图数据绑定
     */
    init() {
        let _this = this
        this.view("getProvinces", 0)
        Object.defineProperty(this.appType, "op", {
            set: function (value) {
                //当设置值的时候触发的函数,设置的新值通过参数value拿到
                _this.click(value)
            }
        });
    }


}

window.IrainPlateKeyboard = IrainPlateKeyboard