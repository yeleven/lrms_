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
public class MainConfig extends JFinalConfig{

    //配置常量值
    public void configConstant(Constants constants) {
        constants.setDevMode(true);//开启开发模式
    }

    //访问路由
    public void configRoute(Routes routes) {
//        routes.setBaseViewPath("/lrmsWeb");//设置视图渲染的基础路径
        routes.add("/hello",HelloController.class);//路由测试
    }

    @Override
    public void configEngine(Engine engine) {

    }

    @Override
    public void configPlugin(Plugins plugins) {
        C3p0Plugin c3p0Plugin = new C3p0Plugin("jdbc:oracle:thin:@172.168.171.250:1521:appdev",
                "tjrpm","tjrpm");//c3p0数据源插件
        c3p0Plugin.setDriverClass("oracle.jdbc.driver.OracleDriver");//配置Oracle驱动
        plugins.add(c3p0Plugin);
        ActiveRecordPlugin activeRecordPlugin = new ActiveRecordPlugin(c3p0Plugin);//ActiveRecord支持插件
        plugins.add(activeRecordPlugin);
        activeRecordPlugin.setDialect(new OracleDialect());//配置Oracle方言
        activeRecordPlugin.setContainerFactory(new CaseInsensitiveContainerFactory());//配置字段名大小写不敏感容器工厂
    }

    @Override
    public void configInterceptor(Interceptors me) {

    }

    @Override
    public void configHandler(Handlers me) {

    }
}
