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
        this.maxLen = 7
		this.currIndex = 0;
		this.type = 1;
        // 禁用规则
        this.disabledArrLetters = {
            // 民航
            0: ['航'],
            // WJ
            1: ['J'],
            // 新能源第三位/第八位
            2: ['D', 'F']
        }
		
		let exceptO = Letter.getNumberAndLetterHasI();
		exceptO.splice(exceptO.indexOf('O'),1)
		this.disabledArrLetters[3] = exceptO
	    this.disabledArrLetters[4] = ['D', 'F'].concat(Letter.numbers)
		
        this.updateFunction = options.updateFunction
        this.onSureFunction = options.onSureFunction
        this.complateFunction = options.complateFunction
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

   setUpdateVpl(vpl,index){
        this.currIndex=index
		this.vpl = vpl.split('')
		
		this.getDisabledLetters(this.currIndex, this.vpl)
        this.buildKeyBoard(this.currIndex, this.vpl)
		if((this.vpl.length> 2 && (this.vpl[0]+this.vpl[1])=="WJ") || this.isEnergy==true){
			this.maxLen=8
		}else{
			this.maxLen=7;
		}
	    if(this.vpl.join('').length === this.maxLen){
			this.complateFunction(this.vpl.join(''))
		}
   }

    /* 
    * 切换能源/普通车牌
    */
    changeType() {
        this.isEnergy = !this.isEnergy
        // 切换时，更新规则
        this.getDisabledLetters(this.currIndex, this.vpl)
        this.buildKeyBoard(this.currIndex, this.vpl)
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

    // 获取禁用规则
    getDisabledLettersArr(val) {
        return this.disabledArrLetters[val]
    }

    /**
     * @pageType
     * 返回键盘初始化视图
     * @returns {*}
     */
    view(pageType,type) {
        let template = ""
        // 获取键盘视图
		if(pageType=='getNumberAndLetterHasI'&&this.currIndex!=1){
			this.appType.negation = true;
			this.appType.disabledArrLetters = this.getDisabledLettersArr(3);
		}
		if(this.currIndex==2 && this.isEnergy){
			this.appType.negation = true;
            this.appType.disabledArrLetters = this.getDisabledLettersArr(4);
		}
        template=this.appType.setContainerContent(pageType, type)

        return template
    }

    /**
     * 按钮点击时候调用方法
     * @param value
     */
    click(value) {
        // 已输入的车牌长度
        let currIndex = this.currIndex
        this.maxLen = this.isEnergy ? 8 : 7;
        switch (value) {
			
            case 'delete':
                // 删除
				if(this.type==1){
				    this.delText();
					currIndex-=1
				}else{
					this.vpl.splice(this.vpl.length - 1, 1);
					// 当前输入的位数
					currIndex = this.vpl.length
					this.getDisabledLetters(currIndex, this.vpl)
                    this.buildKeyBoard(currIndex, this.vpl)
					
				}
                this.updateFunction(this.vpl.join(''))
                break;
            case 'more':
                // 更多
                this.getMoreKeyBoard(this.vpl);
                break;
            case 'back':
                // 更多
                this.getBackKeyBoard(this.vpl);
                break;
            case 'sure':
                // 确定
				if(this.vpl.join('').length>= this.maxLen){
					this.onSureFunction(this.vpl.join(''));
				}
                break;
            default: 
				if(this.type>1){
					if(currIndex >= this.maxLen) {
						this.vpl.splice(this.maxLen - 1, 1, value);
						this.updateFunction(this.vpl.join(''))
						this.complateFunction(this.vpl.join(''))
						return;
					};
					//更新某一位置
					// 根据不同value做不同操作赋值操作
					this.vpl[currIndex]=value;
					// 当前输入的位数
					currIndex += 1
					this.currIndex=currIndex;
					this.getDisabledLetters(currIndex, this.vpl)
					this.buildKeyBoard(currIndex, this.vpl)
				}else{
					 this.appendText(value)
				}
                this.updateFunction(this.vpl.join(''))
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
        if(index === 3 || index === 4 || index === 5 ) {
            this.view("getNumberAndLetterHasI", 3)
        }

        // 最后一位显示”更多“
        if (index === this.maxLen - 1) {
            let frontFir = vpl[0];
            let frontSec = vpl[0] + vpl[1];
            if (frontSec === 'WJ' || frontFir === '民' || frontFir === '使') {
                this.view("getNumberAndLetterNotHasI", 3)
            } else {
                this.view("getNumberAndLetterNotHasI", 0)
            } 
        }
    }

    // 获取不可用按钮
    getDisabledLetters(index, vpl) {
        this.appType.negation = false;
        this.appType.disabledArrLetters = [];
        if (!this.isEnergy) {
            if(index === 1) {
                switch(vpl[0]) {
                    case '民':
                        this.appType.negation = true;
                        this.appType.disabledArrLetters = this.getDisabledLettersArr(0);
                        break;
                    case 'W':
                        this.appType.negation = true;
                        this.appType.disabledArrLetters = this.getDisabledLettersArr(1);
                        break;
                    default: ;
					
                }
            }
        } else {
            // 新能源第三/第八位
            if(index === 7) {
                // 只有E、F高亮
			
                this.appType.negation = true;
                this.appType.disabledArrLetters = this.getDisabledLettersArr(4);
            }
        }
    }

    // 获取更多视图
    getMoreKeyBoard(vpl) {
        let Len = this.currIndex;
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
        let Len = this.currIndex;
        let max = this.maxLen;
        switch (Len) {
            case 0: ;
            case 1:
                this.view("getProvinces", 0);
                break;
            case (max - 1): ;
            case max:
                this.view("getNumberAndLetterNotHasI", 0);
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