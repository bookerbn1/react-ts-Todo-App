import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faCirclePlus,
  faCircleXmark,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
//import Popup from 'Popup';

export default function App() {
  // tasks state
  const [toDo, setToDo] = useState([
    {
      id: 1,
      Title: 'Task 1',
      Description: 'Description of Task 1',
      Deadline: '01/01/2022',
      Priority: 'Low',
      checkbox: <input type="checkbox" />,
      IsComplete: false,
    },
    {
      id: 2,
      Title: 'Task 2',
      Description: 'Description of Task 1',
      Deadline: '01/01/2022',
      Priority: 'Low',
      IsComplete: false,
    },
  ]);

  // Temp States
  const [newTitle, setNewTitle] = useState();
  const [newDeadline, setNewDeadline] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newPriority, setNewPriority] = useState();

  const [updateTitle, setUpdateTitle] = useState();
  const [updateDeadline, setUpdateDeadline] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [updatePriority, setUpdatePriority] = useState();

  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupUpdate, setButtonPopupUpdate] = useState(false);

  // function to add task
  const addTask = () => {
    setButtonPopup(false);

    if (newTitle) {
      let num = toDo.length + 1;
      let newEntry = {
        id: num,
        Title: newTitle,
        Description: newDescription,
        Deadline: newDeadline,
        Priority: newPriority,
        IsComplete: false,
      };
      setToDo([...toDo, newEntry]);
      setNewTitle();
      setNewDeadline();
      setNewDescription();
      setNewPriority();
    }
  };
  // function to delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };
  // function to mark task as done
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, IsComplete: !task.IsComplete };
      }
      return task;
    });
    setToDo(newTask);
  };

  // change task
  const changeTask = () => {
    let newEntry = {
      id: updateData.id,
      Title: UpdateTitle,
      Description: updateDescription,
      Deadline: updateDeadline,
      Priority: updatePriority,
      IsComplete: updateData.IsComplete ? true : false,
    };
    setUpdateDate(newEntry);
    updateTask();
  };
  // prepopulate form with data to be updated
  const editTask = (id) => {
    setButtonPopupUpdate(true);
    id: toDo.filter((task) => task.id === id).map(({ id }) => id).id;
    setUpdateTitle({
      updateTitle: toDo.filter((task) => task.id === id).Title,
    });
    setUpdateDescription({
      updateDescription: toDo
        .filter((task) => task.id === id)
        .map(({ Description }) => Description).Description,
    });
    setUpdateDeadline({
      updateDeadline: toDo
        .filter((task) => task.id === id)
        .map(({ Deadline }) => Deadline).Deadline,
    });
    setUpdatePriority({
      updatePriority: toDo
        .filter((task) => task.id === id)
        .map(({ Priority }) => Priority).Priority,
    });
  };

  // update task
  const updateTask = () => {
    setButtonPopupUpdate(false);

    let filteredRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedRecords = [...filteredRecords, updateData];
    setToDo(updatedRecords);
  };

  // function to cancel update
  const cancelUpdate = (e) => {
    setButtonPopupUpdate(false);
    setUpdateTitle();
    setUpdateDeadline();
    setUpdateDescription();
    setUpdatePriority();
  };

  // popup function
  const Popup = (props) => {
    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner">{props.children}</div>
      </div>
    ) : (
      ''
    );
  };

  return (
    <div className="container App">
      <br />
      <h2>
        <FontAwesomeIcon icon={faBars} />
        FRAMEWORKS
        {/* add task */}
        <div className="col">
          <button
            onClick={() => setButtonPopup(true)}
            className="btn btn-md btn-primary"
          >
            <FontAwesomeIcon icon={faCirclePlus} /> Add
          </button>
        </div>
      </h2>

      {/* Display ToDo List*/}
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Is Complete</th>
            <th>Action</th>
          </tr>
        </tbody>
      </table>
      <hr></hr>
      {toDo && toDo.length ? '' : 'No Tasks...'}
      {toDo &&
        toDo
          .sort((a, b) => (a.Deadline > b.Deadline ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <table>
                    <tbody>
                      <td>{task.Title} </td>
                      <td>{task.Description} </td>
                      <td>{task.Deadline} </td>
                      <td>{task.Priority} </td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) => markDone(task.id)}
                        />
                      </td>
                      <td>
                        <div className="deleteButton">
                          <span
                            title="Delete"
                            onClick={() => deleteTask(task.id)}
                          >
                            <button className="btn btn-sm btn-danger">
                              <FontAwesomeIcon icon={faCircleXmark} /> DELETE
                            </button>
                          </span>
                        </div>
                        <div className="upDateButton">
                          <span>
                            {task.IsComplete ? null : (
                              <span
                                title="Edit"
                                onClick={() => editTask(task.id)}
                              >
                                <button className="btn btn-sm btn-primary">
                                  <FontAwesomeIcon icon={faPen} /> UPDATE
                                </button>
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                    </tbody>
                  </table>
                </div>

                {/* Buttonpop up trigger */}
                <Popup trigger={buttonPopup}>
                  <form onSubmit={(e) => addTask()}>
                    <div class="card-header text-white bg-primary">
                      <FontAwesomeIcon icon={faCirclePlus} /> Add Task
                    </div>
                    <div class="card-body">
                      <div class="form-group row">
                        <div class="col">
                          <input
                            id="Title"
                            name="Title"
                            placeholder="Title"
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required="required"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-group row">
                        <div class="col">
                          <input
                            id="Description"
                            name="Description"
                            placeholder="Description"
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            class="form-control"
                            required="required"
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="row">
                        <div class="col">
                          <div class="form-date">
                            <br />
                            <input
                              id="Deadline"
                              type="date"
                              value={newDeadline}
                              onChange={(e) => setNewDeadline(e.target.value)}
                              class="form-control"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label class="form-label">Priority:</label>
                        <div class="form-group row">
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              name="Priority"
                              id="Priority_0"
                              type="radio"
                              class="custom-control-input"
                              value="low"
                              required="required"
                            />
                            <label
                              for="Priority_0"
                              class="custom-control-label"
                            >
                              Low
                            </label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              name="Priority"
                              id="Priority_1"
                              type="radio"
                              class="custom-control-input"
                              value="med"
                              required="required"
                            />
                            <label
                              for="Priority_1"
                              class="custom-control-label"
                            >
                              Med
                            </label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              name="Priority"
                              id="Priority_2"
                              type="radio"
                              class="custom-control-input"
                              value="high"
                              required="required"
                            />
                            <label
                              for="Priority_2"
                              class="custom-control-label"
                            >
                              High
                            </label>
                          </div>
                          <hr></hr>
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <div class="d-grid d-md-flex-content-between">
                              <button
                                type="submit"
                                className="btn btn-primary btn-md"
                              >
                                <FontAwesomeIcon icon={faCirclePlus} /> Add
                              </button>
                              <button
                                className="btn btn-danger btn-md"
                                onClick={() => setButtonPopup(false)}
                              >
                                <FontAwesomeIcon icon={faCircleXmark} /> Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Popup>

                {/* Update Task */}
                {/* Buttonpop up trigger */}
                <Popup trigger={buttonPopupUpdate}>
                  <form onsubmit={(e) => updateTask()}>
                    <div class="card-header text-white bg-primary">
                      <FontAwesomeIcon icon={faCirclePlus} /> Add Task
                    </div>
                    <div class="card-body">
                      <div class="form-group row">
                        <div class="col">
                          <input
                            id="Title"
                            name="Title"
                            type="text"
                            value={updateTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                            required="required"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="form-group row">
                        <div class="col">
                          <input
                            id="Description"
                            name="Description"
                            placeholder="Description"
                            type="text"
                            value={updateDescription}
                            onChange={(e) =>
                              setUpdateDescription(e.target.value)
                            }
                            class="form-control"
                            required="required"
                          />
                        </div>
                      </div>
                      <br></br>
                      <div class="row">
                        <div class="col">
                          <div class="form-date">
                            <br />
                            <input
                              id="Deadline"
                              type="date"
                              value={updateDeadline}
                              onChange={(e) =>
                                setUpdateDeadline(e.target.value)
                              }
                              class="form-control"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label class="form-label">Priority:</label>
                        <div class="form-group row">
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              name="Priority"
                              id="Priority_0"
                              type="radio"
                              class="custom-control-input"
                              value="low"
                              required="required"
                            />
                            <label
                              for="Priority_0"
                              class="custom-control-label"
                            >
                              Low
                            </label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              name="Priority"
                              id="Priority_1"
                              type="radio"
                              class="custom-control-input"
                              value="med"
                              required="required"
                            />
                            <label
                              for="Priority_1"
                              class="custom-control-label"
                            >
                              Med
                            </label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              name="Priority"
                              id="Priority_2"
                              type="radio"
                              class="custom-control-input"
                              value="high"
                              required="required"
                            />
                            <label
                              for="Priority_2"
                              class="custom-control-label"
                            >
                              High
                            </label>
                          </div>
                          <hr></hr>
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <div class="d-grid d-md-flex-content-between">
                              <button
                                type="submit"
                                className="btn btn-primary btn-md"
                              >
                                <FontAwesomeIcon icon={faCirclePlus} /> Update
                              </button>
                              <button
                                className="btn btn-danger btn-md"
                                onClick={(e) => cancelUpdate(e)}
                              >
                                <FontAwesomeIcon icon={faCircleXmark} /> Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Popup>
              </React.Fragment>
            );
          })}
    </div>
  );
}

/* setUpdateData( id: task.id, Title: task.Title,
                          Description: task.Description, Deadline:
                          task.Deadline, Priority: task.Priority, IsComplete:
                          task.IsComplete ? true : false); } */
