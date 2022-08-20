import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/ todolist-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '',
            order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '',
            order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, status, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTitleStatusAC(id, newTitle, todolistId))
    }



    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolists(changeTodolistTitleAC(id, title))
    }
    function changeFilter(filter: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeFilterAC(todolistId, filter))
    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default AppWithReducer;
