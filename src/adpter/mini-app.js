import Letter from "../fund/letter";
import H5 from "./h5";

class MiniApp {
    constructor(container) {
        this.buttonlayout = {}
        this.container = container
    }
    
    //外层包裹元素
    wrap (){
        return 'div';
    }

    //按钮元素
    item (){
       return 'div'
    }

    //显示键盘
    show (){

    }

    //关闭键盘
    show (){

    }
    
    //输入操作
    input (){

    }
     
    //删除操作
    delete (){

    }

    //获取页面布局
    getButtonLayout(layoutType,type=1) {


    }

    //设置
    setContainerContent(content){

    }
}

export default MiniApp