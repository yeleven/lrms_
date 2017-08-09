package com.tianjian.lrms.mainconfig;

import com.jfinal.handler.Handler;
import com.jfinal.kit.HandlerKit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by yequancai on 2017/7/25.
 */
public class ResourceHandler extends Handler {
    @Override
    public void handle(String s, HttpServletRequest req, HttpServletResponse resp, boolean[] isHandled) {
        if (s.endsWith(".html")) {
            HandlerKit.renderError404("404.html", req, resp, isHandled);
        } else {
            next.handle(s, req, resp, isHandled);
        }
    }
}
