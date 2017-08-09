//日期选择
$('#datePicker1').datetimepicker({
	minView: "month",
	format: 'yyyy-mm-dd',
	autoclose: true,
	language: 'zh-CN'
});
//日期选择
$('#datePicker2').datetimepicker({
	minView: "month",
	format: 'yyyy-mm-dd',
	autoclose: true,
	language: 'zh-CN'
});

//zTree初始化对象
var zTreeObj;
//全局节点对象,临时存取节点值
var node_temp = {
		id: null,
		name: null
	}
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
//Chart data
var data = {
	labels: ['2017-07-01','2017-07-02','2017-07-03','2017-07-04','2017-07-05','2017-07-06','2017-07-07'],

	datasets: [{
		label:'',
		data:[76.33,76.59,70.67,75.79,65.21,55.01,40.00],
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderColor: 'rgb(99,179,142)',
		borderWidth: 1
	}]
}
var barData = {
	labels: ['当前期','上一期','年初','去年同期'],

	datasets: [{
		label:'',
		data:[0.56,0.6,0.66,0.55],
		backgroundColor: 'rgba(75, 192, 192, 0.2)',
		borderColor: 'rgb(96,196,183)',
		borderWidth: 1
	}]
}
//初始化chart
function initChart() {
	var ctx = $("#chart").get(0).getContext("2d");
	var barCtx = $("#barChart").get(0).getContext("2d");
	var myChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: options
	});
	var myBarChart = new Chart(barCtx, {
		type: 'bar',
		data: barData,
		options: options
	});
}

//bootstrapTable columns
var columns = [{
	field: 'indexName',
	title: '指标名称',
	align: 'center'
}, {
	field: 'org',
	title: '机构',
	align: 'center'
}, {
	field: 'currentValue',
	title: '当前值',
	align: 'center'
}, {
	field: 'preTerm',
	title: '上一期',
	align: 'center'
}, {
	field: 'beginYear',
	title: '年初',
	align: 'center'
}, {
	field: 'preYearTerm',
	title: '去年同期',
	align: 'center'
}];
//init bootstrapTable
function initTable() {
	$('#table').bootstrapTable('destroy');
	$('#table').bootstrapTable({
		url: './demo/indexAnalysis.json',
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		columns: columns
	});
}

$('#search').click(function(){
	$('#searchContent').css('display','block');
})
