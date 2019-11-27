//定义移动端尺寸
let documentWidth= document.documentElement.clientWidth;//页面dom的宽度
let containerWidth=documentWidth*0.92;//容器宽度
let cellWidth = documentWidth*0.18;//单元格的宽度
let cellSpace = documentWidth*0.04;//单元格间隙宽度
//console.log(documentWidth,containerWidth,cellWidth,cellSpace);



//获取距离上边的位置
//i是行，从0开始
function getPosTop (i) {
	return cellSpace+(cellWidth+cellSpace)*i;
}



//获取距离左边的位置
//j是列，从0开始
function getPosLeft(j){
	return cellSpace+(cellWidth+cellSpace)*j;
}


//获取数字的背景色
function getNumberBackgroundColor(num){

	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//获取数字的颜色
//逻辑：4以下灰色，4以上白色
function getNumberColor(num){

	if(num<=4){
		return "#776e65";//灰色

	}
	else{
		return "#fff";//白色
	}
}


//判断是否还有空间，有，返回false,没有，返回true
function noSpace(nums){

	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}

		}
	}
	return true;

}

//判断是否能够向左移动
function canMoveLeft(nums){
	for(let i=0;i<4;i++){
		for(let j=1;j<4;j++){
			//如果该数字不等于0
			if(nums[i][j]!=0){
				//如果该数字所在行的前一列等于0或者和当前值相同
				if(nums[i][j-1]==0 || nums[i][j-1]==nums[i][j]){

					return true;
				}

			}
		}
	}
	return false;
}

//判断是否能够向右移动
function canMoveRight(nums){
	for(let i=0;i<4;i++){
		for(let j=0;j<3;j++){
			//如果该数字不等于0
			if(nums[i][j]!=0){
				//如果该数字所在行的后一列等于0或者和当前值相同
				if(nums[i][j+1]==0 || nums[i][j+1]==nums[i][j]){

					return true;
				}

			}
		}
	}
	return false;
}

//判断是否能够向下移动
function canMoveDown(nums){
	for(let i=0;i<3;i++){  //最后一行不需要向下移动
		for(let j=0;j<4;j++){
			//如果该数字不等于0
			if(nums[i][j]!=0){
				//如果该数字所在列的下一行等于0或者和当前值相同
				if(nums[i+1][j]==0 || nums[i+1][j]==nums[i][j]){

					return true;
				}

			}
		}
	}
	return false;
}

//判断是否能够向上移动
function canMoveUp(nums){
	for(let i=1;i<4;i++){  //从第二行开始向上移动
		for(let j=0;j<4;j++){
			//如果该数字不等于0
			if(nums[i][j]!=0){
				//如果该数字所在列的前一行等于0或者和当前值相同
				if(nums[i-1][j]==0 || nums[i-1][j]==nums[i][j]){

					return true;
				}

			}
		}
	}
	return false;
}

//判断垂直方向上是否没有障碍物
function noBlockHorizontal(row,col1,col2,nums){
	//依次判断k+1---j-1列之间
	for(let i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;

}

//判断水平方向上是否没有障碍物
function noBlockVertical(col,row1,row2,nums){
	//依次判断row1+1---row2行之间
	for(let i=row1+1;i<row2;i++){
		if(nums[i][col]!=0){
			return false;
		}
	}
	return true;

}

//更新分数
function updateScore(score){
	$('#score').text(score);

}

//判断是否不能移动
function noMove(nums){
	if(canMoveLeft(nums) || canMoveRight(nums) ||canMoveUp(nums) ||canMoveDown(nums)){
		return false;
	}
	return true;

}


//判断游戏是否已经结束,两个条件：1：没有空余的单元格，2：不能移动
function isGameOver(){

	if(noSpace(nums) && noMove(nums)){
		alert('游戏结束!!!');
	}

}