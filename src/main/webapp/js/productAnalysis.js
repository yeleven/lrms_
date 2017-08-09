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
//全局节点对象,临时存取节点值
var node_temp = {
	id: null,
	name: null
}
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
//初始化机构树,把机构树填充到隐藏的div
function initOrgTree() {
	$.ajax({
		url: './demo/org.json',
		data: {},
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function(data) {
			if (data) {
				console.log("机构树加载成功");
				zTreeObj = $.fn.zTree.init($("#tree"), setting, data);
				zTreeObj.expandAll(true);
			} else {
				console.log("机构树加载失败");
			}
		},
		error: function() {
			alert("异常！");
		}
	});
}
//加载机构树容器
$('#orgLoad').click(function() {
	layer.open({
		type: 1,
		content: $('#treeContent'),
		title: ['选择机构', 'color:rgb(99,102,104)'],
		area: ['400px', '300px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			$('#orgId').val(node_temp.id);
			$('#orgName').val(node_temp.name);
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
});

//初始化当前日期和当前日期的前一天到表单
function initCurrentDate() {
	var curDate = new Date();
	var curYear = curDate.getFullYear(); //year
	var curMonth = curDate.getMonth() + 1; //month
	var curDay = curDate.getDate(); //date
	var now1 = curYear + '-' + p(curMonth) + "-" + p(curDay); //result
	$('#datePicker1').val(now1);
	
	//当前日期的前一天
	var preDate = new Date(curDate.getTime() - 24*60*60*1000);
	var preYear = preDate.getFullYear();
	var preMonth = preDate.getMonth() + 1;
	var preDay = preDate.getDate();
	var now2 = preYear + '-' + p(preMonth) + "-" + p(preDay); 
	$('#datePicker2').val(now2);
}

//把月份和天数处理成标准的两位数
function p(s) {
	return s < 10 ? '0' + s : s;
}

//日期选择
$('#datePicker1').datetimepicker({
	minView: "month",
	format: 'yyyy-mm-dd',
	autoclose: true,
	language: 'zh-CN'
});
$('#datePicker2').datetimepicker({
	minView: "month",
	format: 'yyyy-mm-dd',
	autoclose: true,
	language: 'zh-CN'
});


var columns = [{
			field: 'orgName',
			title: '机构名称',
			align: 'center'
		},{
			field: 'productCode',
			title: '产品编号',
			align: 'center'
		},{
			field: 'productName',
			title: '产品名称',
			align: 'center'
		},{
			field: 'correspondingBalanceOfInquiryDay',
			title: '查询日对应期限余额',
			align: 'center'
		},{
			field: 'contrastTheDailyBalanceOfThePeriod',
			title: '对比日对应期限余额',
			align: 'center'
		},{
			field: 'contrastTheRelativeBalanceOfThePeriodChange',
			title: '对比日对应期限变动余额',
			align: 'center'
		},{
			field: 'lessThanTheSamePeriod',
			title: '比同期少增',
			align: 'center'
		},{
			field: 'variableProportion',
			title: '变动比例',
			align: 'center'
		},{
			field: 'balanceAtTheEndOfTheCorrespondingPeriod',
			title: '上月末对应期限余额',
			align: 'center'
		},{
			field: 'fromTheEndOfLastMonth',
			title: '比上月末%',
			align: 'center'
		},{
			field: 'correspondingPeriodBalanceAtTheEndOfLastYear',
			title: '上年末对应期限余额',
			align: 'center'
		},{
			field: 'fromTheEndOfLastYear',
			title: '比上年末%',
			align: 'center'
		},{
			field: 'correspondingPeriodBalance',
			title: '同期对应期限余额',
			align: 'center'
		},{
			field: 'overTheSamePeriod',
			title: '比同期%',
			align: 'center'
		},];
//初始化表格
function initTable(){
	$('#table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/productAnalysis.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
}

//Chart x轴显示参数
var labels = [];
//生成1~30
for(var i=1; i<=30; i++){
	labels.push(i+'');
}
//30天对应期限余额
var cpb = [20000000,10000000,5000000,8000000,13000000,15000000,9000000,25000000,8500000,25000000,20000000,10000000,5000000,8000000,13000000,15000000,9000000,25000000,8500000,25000000,20000000,10000000,5000000,8000000,13000000,15000000,9000000,25000000,17000000,20000000];
//Chart data
var data = {
	labels: labels,

	datasets: [{
		label:'对应期限余额',
		data:cpb,
		borderColor: 'rgb(255,172,155)'
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

//初始化chart
function initChart() {
	var ctx = $("#chart").get(0).getContext("2d");
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: options
	});
}

//点击数据链接
function chartView(){
	$("#chartContent").css("display","block");
}

//search
$('#search').click(function(){
	$("#tableContent").css("display","block");
})

$('#reset').click(function(){
	$("#tableContent").css("display","none");
	$("#chartContent").css("display","none");
})


