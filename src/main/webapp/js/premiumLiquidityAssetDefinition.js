//bootstrapTable columns
var columns = [{
	field: 'id',
	title: '编号',
	align: 'center'
}, {
	field: 'assetsName',
	title: '资产名称',
	align: 'center'
}, {
	field: 'assetsClass',
	title: '资产类别',
	align: 'center'
}, {
	field: 'fetchLogic',
	title: '取数逻辑',
	align: 'center'
}, {
	field: 'option',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var d = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="编辑"></i></a> ';
		var f = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-remove" title="删除"></i></a> ';
		return d + f;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/premiumLiquidityAssetDefinition.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
}

//新增优质流动性资产资产
$('#assetsAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#assetsAddContent'),
		title: ['新增优质流动性资产', 'color:rgb(99,102,104)'],
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
