import Letter from './fund/letter'
import H5 from './adpter/h5'
import MiniApp from './adpter/mini-app'

export default class IrainPlateKeyboard {
    constructor(type,container) {
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


    //显示键盘
    show (){
        this.appType.show()
    }

    //关闭键盘
    close (){
        this.appType.close()
    }

    view(){
        this.appType.getButtonLayout("getProvinces",0)

        return this.appType.getButtonLayout("getProvinces",0)
    }

    click(value){
        //根据不同value做不同操作赋值操作dom等等
    }

    init() {
        let _this = this
        this.appType.setContainerContent(this.view());
        Object.defineProperty(this.appType,"op",{
            get:function (){
                return _this.vpl
            },
            set:function (value){
                //当设置值的时候触发的函数,设置的新值通过参数value拿到
               _this.vpl = _this.click(value)
            }
        });
    }


}

window.IrainPlateKeyboard = IrainPlateKeyboard