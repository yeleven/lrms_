package com.tianjian.lrms.hello;

import com.jfinal.core.Controller;

/**
 * Created by yequancai on 2017/7/19.
 */
public class HelloController extends Controller{
    public void index(){
        System.out.print("see urlPara:"+getPara("v0"));
        renderText("Hello JFinal World....GitCommitPushTest");
    }
}
