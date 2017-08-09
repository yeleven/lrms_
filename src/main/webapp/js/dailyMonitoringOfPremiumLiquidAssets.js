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
	field: 'moneyAmount',
	title: '金额',
	align: 'center'
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/dailyMonitoringOfPremiumLiquidAssets.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
}