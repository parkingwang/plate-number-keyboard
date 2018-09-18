import Letter from './fund/letter'
import H5 from './adpter/h5'
import MiniApp from './adpter/mini-app'

export default class IrainPlateKeyboard {
    constructor(type, container) {
        switch (type) {
            case 'h5':
                this.appType = new H5(container)
                break;
            default:
                this.appType = new MiniApp(container)
        }
        this.vpl = []
        this.container = container
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

    /**
     * 返回键盘初始化视图
     * @returns {*}
     */
    view() {
        this.appType.getButtonLayout("getProvinces", 0)

        return this.appType.getButtonLayout("getProvinces", 0)
    }

    /**
     * 按钮点击时候调用方法
     * @param value
     */
    click(value) {
        //根据不同value做不同操作赋值操作
        //todo
    }

    /**
     * 键盘初始化视图数据绑定
     */
    init() {
        let _this = this
        this.appType.setContainerContent(this.view());
        Object.defineProperty(this.appType, "op", {
            set: function (value) {
                //当设置值的时候触发的函数,设置的新值通过参数value拿到
                _this.vpl = _this.click(value)
            }
        });
    }


}

window.IrainPlateKeyboard = IrainPlateKeyboard