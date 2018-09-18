import Letter from "../fund/letter";
import H5 from "./h5";

class MiniApp {
    constructor(container) {
        this.buttonlayout = {}
        this.container = container
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
        //todo
    }

    //关闭键盘
    show() {
        //todo
    }

    //输入操作
    input() {
        //todo
    }

    //删除操作
    delete() {
        //todo
    }

    //获取页面布局
    getButtonLayout(layoutType, type = 1) {

        //todo
    }

    //设置
    setContainerContent(content) {
        //todo
    }
}

export default MiniApp