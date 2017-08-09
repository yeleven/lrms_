//bootstrapTable columns
var columns = [{
	field: 'sceneName',
	title: '情景名称',
	align: 'center'
}, {
	field: 'influenceFactor',
	title: '影响因素',
	align: 'center'
}, {
	field: 'sceneDescribe',
	title: '情景描述',
	align: 'center'
}, {
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		var d = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-remove" title="删除"></i></a> ';
		return e + d;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/stressScenarios.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
}

//新增压力情景预设
$('#pressConditionAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#pressConditionAddContent'),
		title: ['新增压力测试', 'color:rgb(99,102,104)'],
		area: ['500px', '500px'],
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
