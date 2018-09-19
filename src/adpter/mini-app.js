import Letter from "../fund/letter";
import H5 from "./h5";

class MiniApp {
    constructor() {
        this.buttonlayout = {}
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
    close() {
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

    //设置内容区域
    setContainerContent(pageType, type) {
        //todo
    }
}

export default MiniApp