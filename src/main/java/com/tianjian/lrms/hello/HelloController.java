package com.tianjian.lrms.hello;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;

import java.util.List;

/**
 * Created by yequancai on 2017/7/19.
 */
public class HelloController extends Controller{
    HelloService helloService = new HelloService();
    public void index(){
//        renderText("Hello JFinal World....GitCommitPushTest111...");
        render("/index2.html");
    }

    public void staticCashFlow() {
        List<Record> users = helloService.getUser();
        renderJson(users);
    }
}
