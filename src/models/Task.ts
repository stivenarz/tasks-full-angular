import { tasks } from '../database';


export class Task {
    tasks = tasks;

    public all(){
        return tasks
    }
    public find(id: any){
        return tasks.find((task)=>{
            return task.id === id
        })
    }
}