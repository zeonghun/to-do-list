// 유저가 값을 입력한다.
// '+' 버튼을 누르면 할일이 추가된다.
// 'delete' 버튼을 누르면 할일이 삭제된다.
// 'check' 버튼을 누르면 할일이 완료되고 밑줄이 쳐진다.
// '진행중', '완료' 탭을 누르면 언더바가 이동한다.
// '진행중' 탭을 누르면 완료되지 않은 아이템이 출력된다.
// '완료' 탭을 누르면 완료된 아이템이 출력된다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = "tab-all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

function addTask() {
  // 할일을 추가
  let task = {
    id: randomIDGenerator(), // 각각의 아이템을 구별하기 위해 id 정의
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  // task-board 출력
  let resultHTML = "";
  list = [];
  if (mode == "tab-all") {
    list = taskList;
  } else if (mode == "tab-not-done" || mode=="tab-done") {
    list = filterList;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div class="button-box">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div class="button-box">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id; // 클릭한 tab을 mode에 저장
  filterList = [];
  if (mode == "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerator() {
  // task 객체에 랜덤한 id 부여
  return "_" + Math.random().toString(36).substr(2, 9);
}
