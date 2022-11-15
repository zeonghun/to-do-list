// 유저가 값을 입력한다.
// '+' 버튼을 누르면 할일이 추가된다.
// 'delete' 버튼을 누르면 할일이 삭제된다.
// 'check' 버튼을 누르면 할일이 완료되고 밑줄이 쳐진다.
// '진행중', '완료' 탭을 누르면 언더바가 이동한다.
// '진행중' 탭을 누르면 완료되지 않은 아이템이 출력된다.
// '완료' 탭을 누르면 완료된 아이템이 출력된다.

let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let taskList=[]
addButton.addEventListener("click",addTask);

function addTask(){ // 할일을 추가
    let taskContent=taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render(){  // 추가된 할일을 출력
    let resultHTML='';
    for(let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
          <button>Check</button>
          <button>Delete</button>
        </div>
      </div>`;
    }
    document.getElementById("task-board").innerHTML=resultHTML
}