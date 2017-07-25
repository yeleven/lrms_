package com.tianjian.lrms.mainconfig;

import com.jfinal.config.*;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.CaseInsensitiveContainerFactory;
import com.jfinal.plugin.activerecord.dialect.OracleDialect;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.template.Engine;
import com.tianjian.lrms.hello.HelloController;

/**
 * Created by yequancai on 2017/7/19.
 */
public class MainConfig extends JFinalConfig {

    //配置常量值
    public void configConstant(Constants constants) {
        constants.setDevMode(true);//开启开发模式
    }

    //配置访问路由
    public void configRoute(Routes routes) {
        routes.add("/hello", HelloController.class);//路由测试
    }

    //配置模板引擎
    public void configEngine(Engine engine) {

    }

    //配置插件
    public void configPlugin(Plugins plugins) {
        C3p0Plugin c3p0Plugin = new C3p0Plugin("jdbc:oracle:thin:@172.168.171.250:1521:appdev",
                "tjrpm", "tjrpm");//c3p0数据源插件
        c3p0Plugin.setDriverClass("oracle.jdbc.driver.OracleDriver");//配置Oracle驱动
        plugins.add(c3p0Plugin);
        ActiveRecordPlugin activeRecordPlugin = new ActiveRecordPlugin(c3p0Plugin);//ActiveRecord支持插件
        plugins.add(activeRecordPlugin);
        activeRecordPlugin.setDialect(new OracleDialect());//配置Oracle方言
        activeRecordPlugin.setContainerFactory(new CaseInsensitiveContainerFactory());//配置字段名大小写不敏感容器工厂
    }

    //配置全局拦截器(只能拦截对action的请求,对静态资源无法感知.)
    public void configInterceptor(Interceptors interceptors) {
        interceptors.add(new GlobalInterceptor());
    }

    //配置Handler(会接管所有请求,包括静态请求,如:localhost/index2.html)
    public void configHandler(Handlers handlers) {
        handlers.add(new ResourceHandler());
    }
}
