//bootstrapTable columns
var columns = [{
	field: 'pressTestName',
	title: '压力测试名称',
	align: 'center'
}, {
	field: 'currency',
	title: '币种',
	align: 'center'
}, {
	field: 'dataDate',
	title: '数据日期',
	align: 'center'
},  {
	field: 'initiator',
	title: '发起人',
	align: 'center'
}, {
	field: 'sponsoringOrg',
	title: '发起机构',
	align: 'center'
}, {
	field: 'beDefinedScene',
	title: '情景是否定义',
	align: 'center'
}, {
	field: 'beOnTest',
	title: '测试是否进行',
	align: 'center'
}, {
	field: 'pressTestDescribe',
	title: '压力测试描述',
	align: 'center'
}, {
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		var d = '<a href="#" class="btn btn-default" onclick="onConditionDefinition(\'' + index + '\')">情景定义</a> ';
		var f = '<a href="#" class="btn btn-default" onclick="onSearch(\'' + index + '\')">查看压力测试报告</a> ';
		return e + d + f;
	}
}];
var columns2 = [{
	checkbox:true
},{
	field: 'conName',
	title: '情景名称',
	align: 'center'
}, {
	field: 'influenceFactor',
	title: '影响因素',
	align: 'center'
}, {
	field: 'businessCategory',
	title: '业务种类',
	align: 'center'
},  {
	field: 'conValue',
	title: '情景数值',
	align: 'center'
}, {
	field: 'pressureDuration',
	title: '压力持续时间',
	align: 'center'
}, {
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		return e ;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#conDefContent').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/stressTestDefinition.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
	$('#conDefContent').bootstrapTable({
		url: './demo/conSettings.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns2
	});
}

//新增压力测试定义
$('#pressTestDefinitionAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#pressTestDefinitionAddContent'),
		title: ['新增压力测试定义', 'color:rgb(99,102,104)'],
		area: ['500px', '500px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
})

//情景定义
function onConditionDefinition(index){
	layer.open({
		type: 1,
		content: $('#conditionDefinitionContent'),
		title: ['情景设置', 'color:rgb(99,102,104)'],
		area: ['1000px', '500px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
}

//新增情景定义
$('#conDefinitionAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#conDefinitionAddContent'),
		title: ['情景设置', 'color:rgb(99,102,104)'],
		area: ['500px', '500px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
})

//查看压力测试报告
function onSearch(){
	layer.open({
		type: 1,
		content: $('#pressTestReport'),
		title: ['压力测试结果', 'color:rgb(99,102,104)'],
		area: ['1000px', '700px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
}

//常量
var labels = ["14天", "1个月", "2个月", "3个月", "5个月", "9个月", "1年", "3年", "5年", "5年以上"];
var cashGap = [-71883011.95,-243885726.67,-2992849756.14,-2330354942.17,-5970864659.64,-4312858345.82,-1433243058.62,-1879366097.67,-1585317134.61,-12934721.76];
//Chart模拟数据
var data = {
	labels: labels,

	datasets: [{
		label: '缺口',
		data: cashGap,
		backgroundColor: 'rgba(75, 192, 192, 0.2)',
		borderColor: 'rgb(96,196,183)',
		borderWidth: 1
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
	var myBarChart = new Chart(ctx, {
		type: 'bar',
		data: data,
		options: options
	});
}
