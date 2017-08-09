//zTree初始化对象
var zTreeObj;
// zTree 的参数配置
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: null
        }
    },
    callback: {
        onClick: zTreeOnClick,
        onDblClick: zTreeOnDbClick
    }
};

//常量
var labels = ["1天", "7天", "14天", "1个月", "2个月", "3个月", "6个月", "9个月", "1年", "2年", "3年", "5年", "5年以上"];

//现金流入、流出数据以及缺口计算
var cashIn1 = [2669.32, 1760.36, 571.28, 1436.60, 3223.91, 2758.17, 7460.56, 3761.21, 4536.50, 637.00, 100.00, 0.00, 0.00];
var cashIn2 = [0.60, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
var cashIn3 = [2673.15, 1760.36, 571.28, 1436.60, 3223.91, 2758.17, 7460.56, 3761.21, 4536.50, 637.00, 100.00, 0.00, 0.00];
var cashOut1 = [-12350.00, -293.19, -369.13, -1093.78, -3340.57, -3073.39, -6616.51, -1412.74, -1441.94, -1786.37, -1655.62, -1612.75, -523.24];
var cashOut2 = [-2.63, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
var cashOut3 = [-12371.16, -293.19, -369.13, -1093.78, -3340.57, -3073.39, -6616.51, -1412.74, -1441.94, -1786.37, -1655.62, -1612.75, -523.24];
var cashGap1 = [];
var cashGap2 = [];
var cashGap3 = [];
var cashAccu1 = [-9680.67, 8213.50, -8011.36, -7668.54, -7785.20, -8730.41, -7885.36, -5517.89, -2423.34, -3572.72, -5128.34, -6741.10, -7264.34];
var cashAccu2 = [-2.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
var cashAccu3 = [-9680.01, 8213.50, -8011.36, -7668.54, -7785.20, -8730.41, -7885.36, -5517.89, -2423.34, -3572.72, -5128.34, -6741.10, -7264.34];
for (var i = 0; i < cashIn1.length; i++) {
    var gap1 = cashIn1[i] + cashOut1[i];
    var gap2 = cashIn2[i] + cashOut2[i];
    var gap3 = cashIn3[i] + cashOut3[i];
    cashGap1.push(gap1);
    cashGap2.push(gap2);
    cashGap3.push(gap3);
}

//Chart模拟数据
var data1 = {
    labels: labels,

    datasets: [{
        label: '现金流入',
        data: cashIn1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        stack: 'Stack 0',
        borderColor: 'rgb(96,196,183)',
        borderWidth: 1
    }, {
        label: '现金流出',
        data: cashOut1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        stack: 'Stack 0',
        borderColor: 'rgb(99,179,142)',
        borderWidth: 1
    }, {
        label: '缺口',
        data: cashGap1,
        borderColor: 'rgb(255,172,155)',
        type: 'line'
    }, {
        label: '累计缺口',
        data: cashAccu1,
        borderColor: 'rgb(78,174,209)',
        type: 'line'
    }]
}
var data2 = {
    labels: labels,

    datasets: [{
        label: '现金流入',
        data: cashIn2,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        stack: 'Stack 0',
        borderColor: 'rgb(96,196,183)',
        borderWidth: 1
    }, {
        label: '现金流出',
        data: cashOut2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        stack: 'Stack 0',
        borderColor: 'rgb(99,179,142)',
        borderWidth: 1
    }, {
        label: '缺口',
        data: cashGap2,
        borderColor: 'rgb(255,172,155)',
        type: 'line'
    }, {
        label: '累计缺口',
        data: cashAccu2,
        borderColor: 'rgb(78,174,209)',
        type: 'line'
    }]
}
var data3 = {
    labels: labels,

    datasets: [{
        label: '现金流入',
        data: cashIn3,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        stack: 'Stack 0',
        borderColor: 'rgb(96,196,183)',
        borderWidth: 1
    }, {
        label: '现金流出',
        data: cashOut3,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        stack: 'Stack 0',
        borderColor: 'rgb(99,179,142)',
        borderWidth: 1
    }, {
        label: '缺口',
        data: cashGap3,
        borderColor: 'rgb(255,172,155)',
        type: 'line'
    }, {
        label: '累计缺口',
        data: cashAccu3,
        borderColor: 'rgb(78,174,209)',
        type: 'line'
    }]
}

//Chart操作
var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

//全局节点对象,临时存取节点值
var node_temp = {
    id: null,
    name: null
}

//bootstrapTable columns
var columns = [{
    field: 'header',
    title: '项目名称/期限结构',
    align: 'center'
}, {
    field: 'dateType1d',
    title: '1天',
    align: 'center'
}, {
    field: 'dateType7d',
    title: '7天',
    align: 'center'
}, {
    field: 'dateType14d',
    title: '14天',
    align: 'center'
}, {
    field: 'dateType1m',
    title: '1个月',
    align: 'center'
}, {
    field: 'dateType2m',
    title: '2个月',
    align: 'center'
}, {
    field: 'dateType3m',
    title: '3个月',
    align: 'center'
}, {
    field: 'dateType6m',
    title: '6个月',
    align: 'center'
}, {
    field: 'dateType9m',
    title: '9个月',
    align: 'center'
}, {
    field: 'dateType1y',
    title: '1年',
    align: 'center'
}, {
    field: 'dateType2y',
    title: '2年',
    align: 'center'
}, {
    field: 'dateType3y',
    title: '3年',
    align: 'center'
}, {
    field: 'dateType5y',
    title: '5年',
    align: 'center'
}, {
    field: 'dateTypeUpTo5y',
    title: '5年以上',
    align: 'center'
},];

//单击树节点
function zTreeOnClick(event, treeId, treeNode, clickFlag) {
    node_temp.id = treeNode.id;
    node_temp.name = treeNode.name;

}

//双击树节点
function zTreeOnDbClick(event, treeId, treeNode) {
    $('#orgId').val(treeNode.id);
    $('#orgName').val(treeNode.name);
    layer.closeAll();
}

//日期选择
$('#datePicker').datetimepicker({
    minView: "month",
    format: 'yyyy-mm-dd',
    autoclose: true,
    language: 'zh-CN'
});

//初始化当前日期到表单
function initCurrentDate() {
    var myDate = new Date();
    var year = myDate.getFullYear(); //year
    var month = myDate.getMonth() + 1; //month
    var date = myDate.getDate(); //date
    var now = year + '-' + p(month) + "-" + p(date); //result
    $('#datePicker').val(now);
}

//把月份和天数处理成标准的两位数
function p(s) {
    return s < 10 ? '0' + s : s;
}

//初始化机构树,把机构树填充到隐藏的div
function initOrgTree() {
    $.ajax({
        url: './demo/org.json',
        data: {},
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                console.log("机构树加载成功");
                zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
                zTreeObj.expandAll(true);
            } else {
                console.log("机构树加载失败");
            }
        },
        error: function () {
            alert("异常！");
        }
    });
}

//加载机构树容器
$('#orgLoad').click(function () {
    layer.open({
        type: 1,
        content: $('#treeContent'),
        title: ['选择机构', 'color:rgb(99,102,104)'],
        area: ['400px', '300px'],
        maxmin: false,
        btn: ['确定', '取消'],
        yes: function (index, layero) {
            $('#orgId').val(node_temp.id);
            $('#orgName').val(node_temp.name);
            layer.close(index);
        },
        btn2: function (index, layero) {
        }
    });
});


//初始化chart
function initChart() {
    var ctx1 = $("#chart1").get(0).getContext("2d");
    var myBarChart = new Chart(ctx1, {
        type: 'bar',
        data: data1,
        options: options
    });
    var ctx2 = $("#chart2").get(0).getContext("2d");
    var myBarChart2 = new Chart(ctx2, {
        type: 'bar',
        data: data2,
        options: options
    });
    var ctx3 = $("#chart3").get(0).getContext("2d");
    var myBarChart3 = new Chart(ctx3, {
        type: 'bar',
        data: data3,
        options: options
    });
}

//搜索事件,查看图表和表格
$("#search").click(function () {
    $("#chartContent").css("display", "block");
})
//重置事件,清除图表和表格
$("#reset").click(function () {
    $("#chartContent").css("display", "none");
})

function initTable() {
    $('#table1').bootstrapTable('destroy');
    $('#table2').bootstrapTable('destroy');
    $('#table3').bootstrapTable('destroy');
    $('#table1').bootstrapTable({
        url: './demo/staticCashFlowGapStatistics1.json',
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false, //是否显示分页（*）
        columns: columns
    });
    $('#table2').bootstrapTable({
        url: './demo/staticCashFlowGapStatistics2.json',
        cache: false,
        pagination: false,
        columns: columns
    });
    $('#table3').bootstrapTable({
        url: './demo/staticCashFlowGapStatistics3.json',
        cache: false,
        pagination: false,
        columns: columns
    });
}
