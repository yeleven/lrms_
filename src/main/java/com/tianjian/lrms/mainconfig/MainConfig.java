package com.tianjian.lrms.mainconfig;

import com.jfinal.config.*;
import com.jfinal.template.Engine;

import com.tianjian.lrms.hello.HelloController;

/**
 * Created by yequancai on 2017/7/19.
 */
public class MainConfig extends JFinalConfig{

    //常量值
    public void configConstant(Constants constants) {

        constants.setDevMode(true);//开启开发模式
    }

    //访问路由
    public void configRoute(Routes routes) {
        routes.setBaseViewPath("appWeb");//设置视图渲染的基础路径
        routes.add("hello",HelloController.class);//路由测试
    }

    @Override
    public void configEngine(Engine engine) {

    }

    @Override
    public void configPlugin(Plugins me) {

    }

    @Override
    public void configInterceptor(Interceptors me) {

    }

    @Override
    public void configHandler(Handlers me) {

    }
}
