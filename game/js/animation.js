//通过动画显示棋盘上的数字
function showNumberWithAnimation(i,j,randNum){

	//alert(1);
	//找到这个空白单元格
	let numCell= $('#number-cell-'+i+'-'+j);
	//设置该单元格的背景色，和文件颜色
	numCell.css('background-color',getNumberBackgroundColor(randNum));
	numCell.css('color',getNumberColor(randNum));

	//将值写回该单元格
	numCell.text(randNum);
	numCell.animate({
		width:cellWidth,
		height:cellWidth,
		top:getPosTop(i),
		left:getPosLeft(j)
	},500);


}

//通过动画显示移动
function showMoveAnimation(fromx,fromy,tox,toy){
	//获取该棋盘单元格
	let $numberCell=$('#number-cell-'+fromx+'-'+fromy);
	$numberCell.animate({
		top:getPosTop(tox),
		left:getPosLeft(toy)
	},200);
}
