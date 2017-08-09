//bootstrapTable columns
var columns = [{
	field: 'yieldId',
	title: '曲线ID',
	align: 'center'
}, {
	field: 'yieldName',
	title: '曲线名称',
	align: 'center'
}, {
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var d = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-remove" title="删除"></i></a> ';
		return d + e;
	}
}];
var columns2 = [{
	field: 'mainPointCode',
	title: '关键点代码',
	align: 'center'
}, {
	field: 'mainPointName',
	title: '关键点名称',
	align: 'center'
}, {
	field: 'term',
	title: '期限(年)',
	align: 'center'
}, {
	field: 'speed',
	title: '清算速度',
	align: 'center'
}, {
	field: 'market',
	title: '市场',
	align: 'center'
}, {
	field: 'dayCount',
	title: '天数计数',
	align: 'center'
}, {
	field: 'interestDateAdjustment',
	title: '付息日调整',
	align: 'center'
}, {
	field: 'interestAdjustment',
	title: '计息期调整',
	align: 'center'
}, {
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var d = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-remove" title="删除"></i></a> ';
		return d + e;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#yieldCurveDefTable').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/yieldCurveDef.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
	$('#yieldCurveDefTable').bootstrapTable({
		url: './demo/yieldCurveDef2.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns2
	});
}

//新增收益率曲线定义
$('#yieldCurveDefinitionAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#yieldCurveDefinitionAddContent'),
		title: ['新增收益率曲线定义', 'color:rgb(99,102,104)'],
		area: ['1000px', '500px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
})

//新增关键点
$('#mainPointAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#mainPointAddContent'),
		title: ['新增关键点', 'color:rgb(99,102,104)'],
		area: ['500px', '500px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
})
