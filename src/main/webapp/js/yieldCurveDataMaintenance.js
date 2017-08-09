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
		var d = '<a href="#" class="btn btn-default" onclick="onDataMain(\'' + index + '\')">数据维护</a> ';
		//		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-remove" title="删除"></i></a> ';
		return d;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/yieldCurveDef.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
}

//数据维护
function onDataMain(index) {
	layer.open({
		type: 1,
		content: $('#onDataMainContent'),
		title: ['收益率数据维护', 'color:rgb(99,102,104)'],
		area: ['1000px', '500px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
}


$('#datePicker').click(function() {
	//日期选择
	$(this).datetimepicker({
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: true,
		language: 'zh-CN'
	});
})