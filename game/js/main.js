//定义一个数组，该数组用于存储上层数字棋盘
let nums = new Array();

//定义分数变量
let score=0;

//定义变量，用于解决单元格重复叠加的问题
let hasConflicted=new Array();

let startX=0;
let startY=0;
let endX=0;
let endY=0;

$(function () {
	//alert(1);
	newGame();
});


//开始游戏
function newGame(){

	//console.log(documentWidth);
	if(documentWidth>500){
		containerWidth=500;
		cellWidth=100;
		cellSpace=20;

	}
	else{
		//适配移动端尺寸
		settingForMobile();
		
	}

	//初始初始化棋盘
	init();
	//在随机的两个单元格中生成数字
	generateOneNumber();
	generateOneNumber();

	//console.log(nums);
	
}

function settingForMobile(){  //适配移动端
	$('#header .wrapper').css('width',containerWidth);


	$('.grid-container').css('width',containerWidth-cellSpace*2);
	$('.grid-container').css('height',containerWidth-cellSpace*2);
	$('.grid-container').css('padding',cellSpace);
	$('.grid-container').css('border-radius',containerWidth*0.02);

	$('.grid-container .grid-cell').css('width',cellWidth);
	$('.grid-container .grid-cell').css('height',cellWidth);
	$('.grid-container .grid-cell').css('border-radius',cellWidth*0.06);


}


function init(){

	//初始化下层单元格的位置
	//遍历行
	for(let i=0;i<4;i++){
		//遍历列
		for(let j=0;j<4;j++){
			//找到每一个单元格
			let $gridCell=$('#grid-cell-'+i+'-'+j);		
			//设置该单元格的左上角坐标
			$gridCell.css('top',getPosTop(i));
			$gridCell.css('left',getPosLeft(j));
			


		}

		

	}

	//初始化数组
	for(let i=0;i<4;i++){
		nums[i]=new Array();
		hasConflicted[i]=new Array();
		for(let j=0;j<4;j++){
			nums[i][j]=0;
			//初始化hasConflicted，默认false,表示未曾叠加过，true表示已经叠加过
			hasConflicted[i][j]=false;
		}
	}

	//手动设置该数组的值
	/*nums[3][1]=12;
	nums[0][1]=4;
	nums[2][2]=32;*/

	//动态创建上层单元格并初始化
	updateView();

	score=0;
	updateScore(score);





}

//更新上层单元格视图
function updateView(){

	//将上层单元格清空，然后重新初始化
	$('.number-cell').remove();
	

	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){

			//动态创建这16个数字棋盘，特点：如果该位置上值不为0，显示该数字棋盘，设置宽高为100px，否则，显示该数字棋盘，设置宽高为0px
            $('.grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            //找到这每一个数字单元格
            let numberCell=$('#number-cell-'+i+'-'+j);
            //如果该位置上值不为0，显示该数字棋盘，设置宽高为100px，否则，显示该数字棋盘，设置宽高为0px
            if(nums[i][j]==0){

            	numberCell.css('width','0px');
            	numberCell.css('height','0px');
            	numberCell.css('top',getPosTop(i)+cellWidth*0.5);
            	numberCell.css('left',getPosLeft(j)+cellWidth*0.5);


            }
            else{
				numberCell.css('width',cellWidth);
            	numberCell.css('height',cellWidth);
            	numberCell.css('top',getPosTop(i));
            	numberCell.css('left',getPosLeft(j));
            	numberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
            	numberCell.css('color',getNumberColor(nums[i][j]));544
            	//将字写入该数字单元格
            	numberCell.text(nums[i][j]);
            	


            }

            //将hasConflicted重置，这样下一次又可以叠加了
            hasConflicted[i][j]=false;

            //适配移动端端尺寸
            $('.number-cell').css('border-radius',cellWidth*0.06);
            $('.number-cell').css('font-size',cellWidth*0.5);
            $('.number-cell').css('line-height',cellWidth+'px');
            



		}
	}


}


/*
    逻辑：
    在随机的两个单元格中生成数字
    0:判断是否还有空间，如果没有空间，游戏结束，直接返回
    1:在空余的单元格中生成一个随机数
    2:随机生成2或者4

 */
function generateOneNumber(){

	//判断是否还有空间，如果没有空间，游戏结束，直接返回
	if(noSpace(nums)){

		return;
	}

	//在空余的单元格中生成一个随机数
	//1:随机一个位置
	let temp = new Array();
	let count=0;
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			//当该单元格为空，将该单元格对应的坐标转成一维索引，存入一维数组
			if(nums[i][j]==0){

				temp[count]=i*4+j;
				count++;
			}

		}

	}

	//获取一维数组中的索引
	let pos=Math.floor(Math.random()*count);      //[0,1)*6=[0,5]
	//从一维数组中还原对应的空余棋盘的坐标：i,j
	let randX=Math.floor(temp[pos]/4);
	let randY=Math.floor(temp[pos]%4);
	
	//2:随机值
	let randNum=Math.random()<0.5?2:4;
	nums[randX][randY]=randNum;
    
    //通过动画显示棋盘上的数字
    //console.log(randX,randY,randNum);
    showNumberWithAnimation(randX,randY,randNum);

}

//实现键盘响应
$(document).keydown(function(event){

	//取消事件的默认动作
	event.preventDefault();

	//alert(1);
	//console.log(event);
	switch (event.keyCode) {

		
		case 37:    //left
		 	//判断是否可以向左移动
		 	if(canMoveLeft(nums)){
		 		//向左移动
		 		moveLeft();
		 		//在空余棋盘中随机生成2或者4
		 		setTimeout(generateOneNumber,200);
		 		//判断游戏是否结束
		 		setTimeout(isGameOver,500);

		 	}

			break;
		case 38:    //up
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				//判断游戏是否结束
		 		setTimeout(isGameOver,500);
			}
			break;

		case 39:    //right
			//判断是否可以向右移动
		 	if(canMoveRight(nums)){
		 		//向右移动
		 		moveRight();
		 		//在空余棋盘中随机生成2或者4
		 		setTimeout(generateOneNumber,200);
		 		//判断游戏是否结束
		 		setTimeout(isGameOver,500);

		 	}
			break;
		case 40:    //down
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				//判断游戏是否结束
		 		setTimeout(isGameOver,500);
			}
		    break;
		default:
			// statements_def
			break;
	}
});
/*
	逻辑:
		需要对每一个数字进行判断，选择落脚点，落脚点分成2种情况
	 	1:落脚点没有数字，并且移动路径中没有障碍物
	 	2:落脚点数字和自己相同，并且移动路径中没有障碍物

 */
function moveLeft(){
	for(let i=0;i<4;i++){  //i代表行
		for(let j=1;j<4;j++){  //j代表列，从第二列开始，第一列不需要移动
			if(nums[i][j]!=0){
				for(let k=0;k<j;k++){
					//如果当前单元格为0，并且第i行的第k-j列之间没有障碍物
					if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums)){

						//执行移动操作
						showMoveAnimation(i,j,i,k);//将值从i行j列，移动到i行k列,显示移动效果
						//将值真正移动过去
						nums[i][k]=nums[i][j];
						//将原位置值置0
						nums[i][j]=0;
                        //跳出循环，后面的数字不再判断
						break;
					}
					//落脚点数字和自己相同，并且移动中没有障碍物,并且未曾叠加过
					else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]*=2;
						nums[i][j]=0;

						//统计分数
						score+=nums[i][k];
						//更新页面中的分数
						updateScore(score);

						//将该单元格设置为已经叠加过
						hasConflicted[i][k]=true;
						break;


					}
					
				}

			}

		}
	}
	//更新页面上的数字单元格,200ms以后，更新棋盘
    setTimeout(updateView,200);


}

//向右移动
function moveRight(){
	for(let i=0;i<4;i++){  //i代表行
		for(let j=2;j>=0;j--){  //j代表列，从第二列开始，第一列不需要移动
			if(nums[i][j]!=0){
				for(let k=3;k>j;k--){
					//如果当前单元格为0，并且第i行的第k-j列之间没有障碍物
					if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums)){

						//执行移动操作
						showMoveAnimation(i,j,i,k);//将值从i行j列，移动到i行k列,显示移动效果
						//将值真正移动过去
						nums[i][k]=nums[i][j];
						//将原位置值置0
						nums[i][j]=0;
                        //跳出循环，后面的数字不再判断
						break;




					}
					//落脚点数字和自己相同，并且移动中没有障碍物,并且未曾叠加过
					else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]*=2;
						nums[i][j]=0;

						//统计分数
						score+=nums[i][k];
						//更新页面中的分数
						updateScore(score);

						//将该单元格设置为已经叠加过
						hasConflicted[i][k]=true;
						break;


					}
					
				}

			}

		}
	}
	//更新页面上的数字单元格,200ms以后，更新棋盘
    setTimeout(updateView,200);


}

function moveDown(){
	for(let j=0;j<4;j++){  //j代表列
		for(let i=2;i>=0;i--){  //i代表行
			if(nums[i][j]!=0){
				for(let k=3;k>i;k--){
					//如果当前单元格为0，并且第i行的第k-j列之间没有障碍物
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){//第j列的第i-k行是否有障碍物

						//执行移动操作
						showMoveAnimation(i,j,k,j);//将值从i行j列，移动到k行j列,显示移动效果
						//将值真正移动过去
						nums[k][j]=nums[i][j];
						//将原位置值置0
						nums[i][j]=0;
                        //跳出循环，后面的数字不再判断
						break;




					}
					//落脚点数字和自己相同，并且移动中没有障碍物,并且未曾叠加过
					else if(nums[k][j]==nums[i][j] && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]*=2;
						nums[i][j]=0;

						//统计分数
						score+=nums[k][j];
						//更新页面中的分数
						updateScore(score);

						//将该单元格设置为已经叠加过
						hasConflicted[k][j]=true;
						break;


					}
					
				}

			}

		}
	}
	//更新页面上的数字单元格,200ms以后，更新棋盘
    setTimeout(updateView,200);


}

//向上移动
function moveUp(){
	for(let j=0;j<4;j++){  //j代表列
		for(let i=1;i<4;i++){  //i代表行
			if(nums[i][j]!=0){
				for(let k=0;k<i;k++){
					//如果当前单元格为0，并且第i行的第k-j列之间没有障碍物
					if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){//第j列的第i-k行是否有障碍物

						//执行移动操作
						showMoveAnimation(i,j,k,j);//将值从i行j列，移动到k行j列,显示移动效果
						//将值真正移动过去
						nums[k][j]=nums[i][j];
						//将原位置值置0
						nums[i][j]=0;
                        //跳出循环，后面的数字不再判断
						break;




					}
					//落脚点数字和自己相同，并且移动中没有障碍物,并且未曾叠加过
					else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]*=2;
						nums[i][j]=0;

						//统计分数
						score+=nums[k][j];
						//更新页面中的分数
						updateScore(score);

						//将该单元格设置为已经叠加过
						hasConflicted[k][j]=true;
						break;


					}
					
				}

			}

		}
	}
	//更新页面上的数字单元格,200ms以后，更新棋盘
    setTimeout(updateView,200);


}


//实现触摸滑动响应(移动端)
document.addEventListener('touchstart',function(event){

	//console.log(event);
	startX=event.touches[0].pageX;
	startY=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){

	//console.log(event);
	endX=event.changedTouches[0].pageX;
	endY=event.changedTouches[0].pageY;

	//判断方向
	let x = endX-startX;
	let y = endY-startY;

    //判断当滑动距离小于一个临界值时不做任何操作
    if(Math.abs(x)<documentWidth*0.08 && Math.abs(y)<documentWidth*0.08){
    	return;
    }

	if(Math.abs(x)>=Math.abs(y)){//水平方向移动
		if(x>0){//向右移动
			if(canMoveRight(nums)){
		 		//向右移动
		 		moveRight();
		 		//在空余棋盘中随机生成2或者4
		 		setTimeout(generateOneNumber,200);
		 		//判断游戏是否结束
		 		setTimeout(isGameOver,500);

		 	}

		}
		//向左移动
        else{
        	if(canMoveLeft(nums)){
		 		//向左移动
		 		moveLeft();
		 		//在空余棋盘中随机生成2或者4
		 		setTimeout(generateOneNumber,200);
		 		//判断游戏是否结束
		 		setTimeout(isGameOver,500);

		 	}


        }


	}
	//垂直方向移动
	else{
		//向下移动
		if(y>0){
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				//判断游戏是否结束
		 		setTimeout(isGameOver,500);
			}

		}
		//向上移动
		else{
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				//判断游戏是否结束
		 		setTimeout(isGameOver,500);
			}

		}
	}
	
});
