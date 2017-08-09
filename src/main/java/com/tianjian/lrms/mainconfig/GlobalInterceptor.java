package com.tianjian.lrms.mainconfig;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

/**
 * Created by yequancai on 2017/7/25.
 */
public class GlobalInterceptor implements Interceptor {

    @Override
    public void intercept(Invocation invocation) {
        invocation.invoke();
    }
}