//bootstrapTable columns
var columns = [{
	field: 'indexType',
	title: '指标类别',
	align: 'center'
}, {
	field: 'indexId',
	title: '指标编号',
	align: 'center'
}, {
	field: 'indexName',
	title: '指标名称',
	align: 'center'
}, {
	field: 'indexClass',
	title: '指标细类',
	align: 'center'
}, {
	field: 'stauts',
	title: '状态',
	align: 'center'
}, {
	field: 'option',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick="onSearch(\'' + index + '\')"><i class="fa fa-search" title="查看"></i></a> ';
		var d = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="编辑"></i></a> ';
		var f = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-trash" title="作废"></i></a> ';
		return e + d + f;
	}
}];
var setWarnColumns = [{
	checkbox: true
}, {
	field: 'minValue',
	title: '下限值',
	align: 'center'
}, {
	field: 'maxValue',
	title: '上限值',
	align: 'center'
}, {
	field: 'interval',
	title: '区间开闭',
	align: 'center'
}, {
	field: 'intervalColor',
	title: '区间对应颜色',
	align: 'center'
}, {
	field: 'option',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick="">设置</a> ';
		var f = '<a href="#" class="btn btn-default" onclick="">删除</a> ';
		return e + f;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#setWarn_table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/indexDefinition.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
	$('#setWarn_table').bootstrapTable({
		url: './demo/setWarn.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: setWarnColumns
	});
}

//index details search
function onSearch(index) {
	layer.open({
		type: 1,
		content: $('#indexDetails'),
		title: ['指标明细信息', 'color:rgb(99,102,104)'],
		area: ['1000px', '700px'],
		maxmin: false,
		btn: ['关闭'],
		btn2: function(index, layero) {}
	});
}

//index add
$('#indexAdd').click(function() {
	layer.open({
		type: 1,
		content: $('#indexAddUpdate'),
		title: ['新增指标', 'color:rgb(99,102,104)'],
		area: ['800px', '600px'],
		maxmin: false,
		btn: ['保存', '关闭'],
		yes: function(index, layero) {
			console.log('保存指标');

			//			layer.close(index);
		},
		btn2: function(index, layero) {
			console.log('关闭');
		}
	});
});

//设置指标值预警区间
function setIndexValueWarning(){
	layer.open({
		type: 1,
		area: ['1000px', '400px'],
		content: $('#setWarningIntervalOfIndexValue'),
		title: ['预警区间设置', 'color:rgb(99,102,104)'],
		btn: ['保存', '关闭'],
		yes: function(index, layero) {
			console.log('保存指标值预警区间');
		},
		btn2: function(index, layero) {
			console.log('关闭');
		}
	});
}

//新增预警区间
$('#setWarn_add').click(function(){
	layer.open({
		type: 1,
		area: ['500px', '500px'],
		content: $('#indexValueWarningAdd'),
		title: ['新增预警区间', 'color:rgb(99,102,104)'],
		btn: ['保存', '关闭'],
		yes: function(index, layero) {
			console.log('新增指标预警区间')
		},
		btn2: function(index, layero) {
			console.log('关闭');
		}
	});
});
