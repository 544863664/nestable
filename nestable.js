var partstreeData = [{"id":1,"img":"logo.png","name":"转轴","item":"rw-234erw-werw","space":"16X14"},{"id":1,"img":"logo.png","name":"零转轴名称","item":"rw-234erw-werw","space":"16X14"},{"id":1,"img":"logo.png","name":"零9件名称","item":"rw-234erw-werw","space":"16X14"},{"id":2,"img":"logo.png","name":"jieb","item":"rw-234erw-werw","space":"16X14"},{"id":3,"img":"logo.png","name":"零3件名称","item":"rw-234erw-werw","space":"16X14"},{"id":4,"img":"logo.png","name":"零4件名称","item":"rw-234erw-werw","space":"16X14"},{"id":3,"img":"logo.png","name":"零3件名称","item":"rw34erw-werw","space":"16X14"},{"id":5,"img":"logo.png","name":"零件名称","item":"rw-234erw-werw","space":"16X14"}];
var treeData = [{"id":0,"img":"logo.png","name":"零9件名称","item":"GTXssdaa","space":"","children":[{"id":1,"img":"logo.png","name":"零1件名称","item":"erw-werw","space":"16X14","children":[{"id":2,"img":"logo.png","name":"零2件名称","item":"(da)-werw","space":"16X14"}]}]},{"id":3,"img":"logo.png","name":"零3件名称","item":"rw34erw-werw","space":"16X14"},{"id":4,"img":"logo.png","name":"零4件名称","item":"rw-234erw-werw","space":"16X14","children":[{"id":1,"img":"logo.png","name":"零4-1件名称","item":"erw-werw","space":"16X14","children":[{"id":2,"img":"logo.png","name":"零4-1-1件名称","item":"(da)-werw","space":"16X14","children":[{"id":2,"img":"logo.png","name":"零4-1-1-1件名称","item":"(da)-werw","space":"16X14","children":[{"id":2,"img":"logo.png","name":"零4-1-1-1-1件名称","item":"(da)-werw","space":"16X14"}]}]}]}]},{"id":6,"img":"logo.png","name":"转轴","item":"31-32-433","space":"16X14"},{"id":5,"img":"logo.png","name":"旋转销","item":"rw-234erw-werw","space":"16X14"}];
var searchpartstreeData = [];


$(document).ready(function() {

	$('#nestable').append(rendertree(partstreeData, 1));
	$('#nestable2').append(rendertree(treeData, 1));
	$('#nestable3').append(rendertree(partstreeData, 2));
	$('#nestable4').append(rendertree(treeData, 2));

});





// activate Nestable 每个模块的拖动事件，执行更新JSON
$('#nestable').nestable({ group: 1 }).on('change', function() {
	updateOutput($('#nestable').data('output', $('#nestable-output')));
});
$('#nestable2').nestable({ group: 1 }).on('change', function() {
	updateOutput($('#nestable2').data('output', $('#nestable2-output')));
});
$('#nestable3').nestable({ group: 1 }).on('change', function() {
	updateOutput($('#nestable3').data('output', $('#nestable3-output')));
});
$('#nestable4').nestable({ group: 1 }).on('change', function() {
	updateOutput($('#nestable4').data('output', $('#nestable4-output')));
});






// 顶部点击按钮  折叠、展开
$('.nestable-menu1').on('click', function(e) {

	var target = $(e.target), action = target.data('action');

	if (action === 'expand-all') $('.dd1').nestable('expandAll');

	if (action === 'collapse-all') $('.dd1').nestable('collapseAll');

});
$('.nestable-menu2').on('click', function(e) {

	var target = $(e.target), action = target.data('action');

	if (action === 'expand-all') $('.dd2').nestable('expandAll');

	if (action === 'collapse-all') $('.dd2').nestable('collapseAll');

});
$('.nestable-menu3').on('click', function(e) {

	var target = $(e.target), action = target.data('action');

	if (action === 'expand-all') $('.dd3').nestable('expandAll');

	if (action === 'collapse-all') $('.dd3').nestable('collapseAll');

});
$('.nestable-menu4').on('click', function(e) {

	var target = $(e.target), action = target.data('action');

	if (action === 'expand-all') $('.dd4').nestable('expandAll');

	if (action === 'collapse-all') $('.dd4').nestable('collapseAll');

});


// 每次拖动更新JSON数据
function updateOutput(e) {
	var list = e.length ? e : $(e.target),
		output = list.data('output');
	if (window.JSON) {
		output.val(window.JSON.stringify(list.nestable('serialize')));
	} else {
		output.val('JSON browser support required for this demo.');
	}
};

/* 渲染树开始   5层 */
function rendertree(tree, type) {
	var newEle1 = '', newEle2 = '', newEle3 = '', newEle4 = '', newEle5 = '';

	tree.map(function(item1) {
		// 第一层
		if (item1.children && item1.children.length) {
			newEle2 = '';
			item1.children.map(function(item2) {
				// 第三层
				if (item2.children && item2.children.length) {
					newEle3 = '';
					item2.children.map(function(item3) {
						// 第四层
						if (item3.children && item3.children.length) {
							newEle4 = '';
							item3.children.map(function(item4) {
								// 第五层
								if (item4.children && item4.children.length) {
									newEle5 = '';
									item4.children.map(function(item5) {
										newEle5 += parentEleDemo(item5, type);
									})
									newEle4 += childEleDemo(item4, newEle5, type);
								} else {
									newEle4 += parentEleDemo(item4, type);
								}
								// 
							})
							newEle3 += childEleDemo(item3, newEle4, type);
						} else {
							newEle3 += parentEleDemo(item3, type);
						}
						// 
					})
					newEle2 += childEleDemo(item2, newEle3, type);
				} else {
					newEle2 += parentEleDemo(item2, type);
				}
				// 
			})
			newEle1 += childEleDemo(item1, newEle2, type);
		} else {
			newEle1 += parentEleDemo(item1, type);
		}
		// 
	})
	var newEle = '<ol class="dd-list">' + newEle1 + '</ol>';
	return newEle;
}

/* Demo 模板  没有子级 */
function parentEleDemo(demo, type) {
	if (type == 1) {
		return `
			<li class="dd-item" 
				data-id="` + demo.id + `" 
				data-img="logo.png"
				data-name="` + demo.name + `" 
				data-item="` + demo.item + `"
				data-space="` + demo.space + `">
				<div class="dd-handle"></div>
				<div class="dd-content">
					<div class="box">
						<span>` + demo.name + `</span><span>` + demo.item + `</span><span>` + demo.space + `</span>
					</div>
				</div>
			</li>
		`;
	} else {
		return `
			<li class="dd-item" 
				data-id="` + demo.id + `" 
				data-img="logo.png"
				data-name="` + demo.name + `" 
				data-item="` + demo.item + `"
				data-space="` + demo.space + `">
				<div class="dd-handle">
					<img src="logo.png" alt="" width="60" height="60">
				</div>
				<div class="dd-content">
					<div class="box">
						<div class="text">
							<div class="name">` + demo.name + `</div>
							<div class="item">` + demo.item + `</div>
							<div class="space">` + demo.space + `</div>
						</div>
					</div>
				</div>
			</li>
		`;
	}
};

/* Demo模板  有子级 */
function childEleDemo(demo, childEle, type) {
	if (type == 1) {
		return `
			<li class="dd-item" 
				data-id="` + demo.id + `"
				data-img="logo.png"
				data-name="` + demo.name + `" 
				data-item="` + demo.item + `"
				data-space="` + demo.space + `">
				<button data-action="collapse" type="button">Collapse</button>
				<button data-action="expand" type="button" style="display: none;">Expand</button>
				<div class="dd-handle"></div>
				<div class="dd-content">
					<div class="box">
						<span>` + demo.name + `</span><span>` + demo.item + `</span><span>` + demo.space + `</span>
					</div>
				</div>
				<ol class="dd-list">` + childEle + `</ol>
			</li>
		`;
	} else {
		return `
			<li class="dd-item" 
				data-id="` + demo.id + `"
				data-img="logo.png"
				data-name="` + demo.name + `" 
				data-item="` + demo.item + `"
				data-space="` + demo.space + `">
				<button data-action="collapse" type="button">Collapse</button>
				<button data-action="expand" type="button" style="display: none;">Expand</button>
				<div class="dd-handle">
					<img src="logo.png" alt="" width="60" height="60">
				</div>
				<div class="dd-content">
					<div class="box">
						<div class="text">
							<div class="name">` + demo.name + `</div>
							<div class="item">` + demo.item + `</div>
							<div class="space">` + demo.space + `</div>
						</div>
					</div>
				</div>
				<ol class="dd-list">` + childEle + `</ol>
			</li>
		`;
	}
};
/* 树  结束 */

// 零件模糊搜索
function searchtextfn(event, type) {
	var searchval = event.target.value;
	console.log(type);
	if (type == 1) {
		if (searchval) {
			searchpartstreeData = [];
			$('#nestable').find('.dd-list').remove();
			partstreeData.map(function(item,index) {
				if (item.name.indexOf(searchval) >= 0 || item.item.indexOf(searchval) >= 0 || item.space.indexOf(searchval) >= 0) searchpartstreeData.push(item);
			})
			$('#nestable').append(rendertree(searchpartstreeData));
		} else {
			searchpartstreeData = [];
			$('#nestable').find('.dd-list').remove();
			$('#nestable').append(rendertree(partstreeData));
		}
	} else {
		if (searchval) {
			searchpartstreeData = [];
			$('#nestable3').find('.dd-list').remove();
			partstreeData.map(function(item,index) {
				if (item.name.indexOf(searchval) >= 0 || item.item.indexOf(searchval) >= 0 || item.space.indexOf(searchval) >= 0) searchpartstreeData.push(item);
			})
			$('#nestable3').append(rendertree(searchpartstreeData));
		} else {
			searchpartstreeData = [];
			$('#nestable3').find('.dd-list').remove();
			$('#nestable3').append(rendertree(partstreeData));
		}
	}
	

};

















/*  */
