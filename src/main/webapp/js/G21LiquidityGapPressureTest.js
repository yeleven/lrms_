//bootstrapTable columns
var columns = [{
	field: 'pressureTestName',
	title: '压力测试名称',
	align: 'center'
}, {
	field: 'reporteriod',
	title: '报表期次',
	align: 'center'
}, {
	field: 'org',
	title: '机构',
	align: 'center'
}, {
	field: 'initiator',
	title: '发起人',
	align: 'center'
},{
	field: 'launchTime',
	title: '发起时间',
	align: 'center'
},{
	field: 'describe',
	title: '描述',
	align: 'center'
},{
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		var d = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-remove" title="删除"></i></a> ';
		var f = '<a href="#" class="btn btn-default" onclick="onTest(\'' + index + '\')">执行测试</i></a> ';
		var g = '<a href="#" class="btn btn-default" onclick="onSearch(\'' + index + '\')">查看报告</i></a> ';
		return e + d + f + g;
	}
}];
var columns2 = [{
	checkbox:true
},{
	field: 'conditionDescribe',
	title: '情景描述',
	align: 'center'
},{
	field: 'light',
	title: '轻度',
	align: 'center'
},{
	field: 'moderate',
	title: '中度',
	align: 'center'
},{
	field: 'severe',
	title: '重度',
	align: 'center'
},{
	field: 'rpLine',
	title: '报表项目行次',
	align: 'center'
},{
	field: 'rpCol',
	title: '报表项目列次',
	align: 'center'
},{
	field: 'opt',
	title: '操作',
	align: 'center',
	formatter: function(value, row, index) {
		var e = '<a href="#" class="btn btn-default" onclick=""><i class="glyphicon glyphicon-edit" title="修改"></i></a> ';
		return e;
	}
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#conditionSettingsTable').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/G21LiquidityGapPressureTest.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
	$('#conditionSettingsTable').bootstrapTable({
		url: './demo/conditionSettings.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns2
	});
}

//新增压力测试
$('#pressTestAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#pressureTestContent'),
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
})

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
//	layer.closeAll();
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

//情景设置
$('#conditionSettings').click(function(){
	layer.open({
		type: 1,
		content: $('#conditionSettingsContent'),
		title: ['情景设置', 'color:rgb(99,102,104)'],
		area: ['1000px', '400px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
//			$('#orgId').val(node_temp.id);
//			$('#orgName').val(node_temp.name);
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
})

//新增情景
$('#conditionSettingsAdd').click(function(){
	layer.open({
		type: 1,
		content: $('#conditionSettingsAddContent'),
		title: ['新增情景', 'color:rgb(99,102,104)'],
		area: ['400px', '400px'],
		maxmin: false,
		btn: ['确定', '取消'],
		yes: function(index, layero) {
//			$('#orgId').val(node_temp.id);
//			$('#orgName').val(node_temp.name);
			layer.close(index);
		},
		btn2: function(index, layero) {}
	});
})

//执行测试
function onTest(index){
	layer.msg('执行成功');
}
//查看报告
function onSearch(index){
	layer.open({
		type: 1,
		content: $('#testReport'),
		title: ['现金流缺口表', 'color:rgb(99,102,104)'],
		area: ['1000px', '700px'],
		maxmin: false,
		btn: ['导出Excel','关闭'],
		yes: function(index, layero) {
//			$('#orgId').val(node_temp.id);
//			$('#orgName').val(node_temp.name);
			layer.close(index);
		},
		btn2:function(index, layero){}
	});
}
