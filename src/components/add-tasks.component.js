import React, { Component } from "react";
import TasksDataService from "../services/tasks.service";

export default class AddTasks extends Component {
    constructor(props) {
        super(props);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.saveTasks = this.saveTasks.bind(this);
        this.newTasks = this.newTasks.bind(this);

        this.state = {
            taskID: "",
            taskUserID: "",
            taskStatus: "",
            taskTitle: "",
            taskTS: null
        };
    }

    onChangeStatus(e) {
        this.setState({
            taskStatus: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            taskTitle: e.target.value
        });
    }

    saveTasks() {
        var data = {
            taskStatus: this.state.taskStatus,
            taskTitle: this.state.taskTitle,
            taskUserID: this.state.taskUserID,
            taskTS: this.state.taskTS
        };

        TasksDataService.create(data)
            .then(response => {
                this.setState({
                    taskUserID: response.data.taskUserID,
                    taskStatus: response.data.taskStatus,
                    taskTitle: response.data.taskTitle,
                    taskTS: response.data.taskTS,
                    taskID: response.data.taskID,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTasks() {
        this.setState({
            taskUserID: "",
            taskStatus: "",
            taskTitle: "",
            taskTS: null,

            submitted: false
        });
    }

    render() {
        // ...
    }
}


export default class AddTask extends Component {
    // ...

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTask}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskTitle"
                                required
                                value={this.state.taskTitle}
                                onChange={this.onChangeTitle}
                                name="taskTitle"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="taskStatus">Status</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskStatus"
                                required
                                value={this.state.taskStatus}
                                onChange={this.onChangeStatus}
                                name="taskStatus"
                            />
                        </div>

                        <button onClick={this.saveTask} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}