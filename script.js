let x=document.querySelectorAll(".box");
function check(arr){
    for(let i=0;i<3;i++)if(arr[0+3*i]!="" && arr[0+3*i]==arr[3*i+1] && arr[1+3*i]==arr[2+3*i]){
        return true;}
    for(let i=0;i<3;i++)if(arr[0+i]!="" && arr[0+i]==arr[3+i] && arr[3+i]==arr[6+i]){
        return true;}
    if(arr[0]!="" && arr[0]==arr[4] && arr[4]==arr[8]){
        return true;}
    if(arr[2]!="" && arr[2]==arr[4] && arr[4]==arr[6]){
        return true;
    }
    return false;
}
function checkq(arr){
    for(let i=0;i<3;i++)if(arr[0+3*i]!="" && arr[0+3*i]==arr[3*i+1] && arr[1+3*i]==arr[2+3*i]){
        x[0+3*i].style.background="black";
        x[1+3*i].style.background="black";
        x[2+3*i].style.background="black";
        return true;}
    for(let i=0;i<3;i++)if(arr[0+i]!="" && arr[0+i]==arr[3+i] && arr[3+i]==arr[6+i]){
        x[0+i].style.background="black";
        x[3+i].style.background="black";
        x[6+i].style.background="black";
        return true;}
    if(arr[0]!="" && arr[0]==arr[4] && arr[4]==arr[8]){
        x[0].style.background="black";
        x[4].style.background="black";
        x[8].style.background="black";
        return true;}
    if(arr[2]!="" && arr[2]==arr[4] && arr[4]==arr[6]){
        x[2].style.background="black";
        x[4].style.background="black";
        x[6].style.background="black";
        return true;
    }
    return false;
}
function draw(arr){
    if(check(arr))return false;
    for(let i=0;i<9;i++){if(arr[i]=="")return false;}
    return true;
}
function play(arr,turn,depth){
    if(7-depth<0)return 0;
    if(check(arr) && turn==0 && depth<=2)return -100000;
    if(check(arr) && turn==0)return -1*(7-depth);
    if(check(arr) && turn==1)return 1*(7-depth);
    if(draw(arr))return 0;
   let score=0;
      if(turn==0){
          for(let i=0;i<9;i++)if(arr[i]==""){
            arr[i]="O";
            score+=play(arr,1,depth+1);
            arr[i]="";
            
        }
      }
      else{
        for(let i=0;i<9;i++)if(arr[i]==""){
            arr[i]="X";
            score+=play(arr,0,depth+1);
            arr[i]="";
            
        }
      }
      return score;
}

function runs(arr){
let max_val=-1000000;
let ind=-1;
for(let i=0;i<9;i++)if(arr[i]==""){
    arr[i]="O";
    let r=play(arr,1,0);
    arr[i]="";
    if(r>max_val){ind=i;max_val=r;}
}
return ind;
}
function clear(arr){for(let i=0;i<9;i++){arr[i].textContent="";arr[i].style.background="rgb(185, 62, 62)"}}
function solve(){
let arr=[];
for(let i=0;i<9;i++)arr.push(x[i].textContent);
if(check(arr)){checkq(arr);return 1;}
if(draw(arr)){checkq(arr);return 0;}
let ind=runs(arr);
x[ind].textContent="O";
arr[ind]="O"
if(check(arr)){checkq(arr);return -1;}
return 10;
}
function f(){
    if(this.textContent==""){
        this.textContent="X";
        let r=solve();
        if(r==1){
            setTimeout(function() {
                document.querySelector("#mode").style.color="blue";
                document.querySelector("#mode").style.transform="scale(3.5,3.5)";
                document.querySelector("#mode").textContent="You Win";
              }, 100);
              setTimeout(function() {
                document.querySelector("#mode").style.color="white";
                document.querySelector("#mode").style.transform="scale(1,1)";
                document.querySelector("#mode").textContent="Not-So-Dumb-Tic-Tac-Toe";
                clear(x);
              }, 1000);
        }
        if(r==0){
            setTimeout(function() {
                document.querySelector("#mode").style.color="wheat";
                document.querySelector("#mode").style.transform="scale(3.5,3.5)";
                document.querySelector("#mode").textContent="Draw";
              }, 100);
              setTimeout(function() {
                document.querySelector("#mode").style.color="white";
                document.querySelector("#mode").style.transform="scale(1,1)";
                document.querySelector("#mode").textContent="Not-So-Dumb-Tic-Tac-Toe";
                clear(x);
              }, 1000);
        }
        else if(r==-1){
            setTimeout(function() {
                document.querySelector("#mode").style.color="red";
                document.querySelector("#mode").style.transform="scale(3.5,3.5)";
                document.querySelector("#mode").textContent="You Lose";
              }, 100);
              setTimeout(function() {
                document.querySelector("#mode").style.color="white";
                document.querySelector("#mode").style.transform="scale(1,1)";
                document.querySelector("#mode").textContent="Not-So-Dumb-Tic-Tac-Toe";
                clear(x);
              }, 1000);
        }

    }
    else alert("Press A valid cell");
    
}
for(let i=0;i<9;i++)x[i].addEventListener("click",f);

