package com.tianjian.lrms.hello;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import java.util.List;

/**
 * Created by yequancai on 2017/7/24.
 */
public class HelloService {
    public List<Record> getUser() {
        List<Record> users = Db.find("select * from sys_user_info");
        return users;
    }
}
