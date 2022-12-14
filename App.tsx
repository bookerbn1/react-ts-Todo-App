import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faCirclePlus,
  faCircleXmark,
  faBars,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  // create empty array for task list
  const [toDo, setToDo] = useState([{}]);

  // Temp States for entry
  const [newTitle, setNewTitle] = useState();
  const [newDeadline, setNewDeadline] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newPriority, setNewPriority] = useState();

  // temp state for popup form
  const [buttonPopup, setButtonPopup] = useState(false);
  const [windowText, setWindowText] = useState();
  const [windowIcon, setWindowIcon] = useState();

  // function to delete task
  const deleteTask = (newTitle) => {
    let newTasks = toDo.filter((task) => task.Title !== newTitle);
    // Calling toast method for task deletion
    toast.error('Deleted Task');
    // exporting array
    setToDo(newTasks);
  };

  // function to mark task as done
  const markDone = (newTitle) => {
    let newTask = toDo.map((task) => {
      if (task.Title === newTitle) {
        return { ...task, IsComplete: !task.IsComplete };
      }
      return task;
    });
    setToDo(newTask);
  };

  // function when the update button is clicked
  const editTask = (Title, Description, Deadline, Priority) => {
    setWindowText('Edit');
    setNewTitle(Title);
    setNewDescription(Description);
    setNewDeadline(Deadline);
    setNewPriority(Priority);
    setButtonPopup(true);
    toast.warning('Updating' + ' ' + Title);
    setWindowIcon(<FontAwesomeIcon icon={faPenToSquare} />);
  };

  // function for when the add button is clicked
  const PopupAdd = () => {
    setWindowText('Add');
    setButtonPopup(true);
    setWindowIcon(<FontAwesomeIcon icon={faCirclePlus} />);
  };

  // function to cancel
  const cancelPopup = (e) => {
    setButtonPopup(false);
    setNewTitle();
    setNewDeadline();
    setNewDescription();
    setNewPriority();
  };

  // popup function
  const Popup = (props) => {
    return props.trigger ? (
      <div className="popup">
        <div className="Popup-overlay"></div>
        <div className="popup-inner">{props.children}</div>
      </div>
    ) : (
      ''
    );
  };

  // function to add task
  const addTask = () => {
    setButtonPopup(false);
    if (!toDo.some((toDo) => toDo.Title == newTitle)) {
      // Calling toast method for adding a task
      toast.success('Task was added succesfully');
      // creating a new array entry
      let newEntry = {
        Title: newTitle,
        Description: newDescription,
        Deadline: newDeadline,
        Priority: newPriority,
        IsComplete: false,
      };
      // inserting the new array entry
      setToDo([...toDo, newEntry]);
    } else {
      let newTask = toDo.map((task) => {
        if (task.Title === newTitle) {
          return {
            ...task,
            Description: newDescription,
            Deadline: newDeadline,
            Priority: newPriority,
            IsComplete: false,
          };
        }
        return task;
      });
      setToDo(newTask);
      toast.warning('Successfully Updated a task');
    }
    // reset the states back to empty
    setNewTitle();
    setNewDeadline();
    setNewDescription();
    setNewPriority();
  };

  // render the app
  return (
    <div className="container App">
      <br />
      <h2>
        <FontAwesomeIcon icon={faBars} />
        FRAMEWORKS
        {/* add task */}
        <span className="addButton">
          <button onClick={() => PopupAdd()} class="btn btn-md btn-primary">
            <FontAwesomeIcon icon={faCirclePlus} /> Add
          </button>
        </span>
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
      {toDo && toDo.length ? '' : 'Please Refresh Page'}
      {toDo &&
        toDo
          .sort((a, b) => (a.Deadline > b.Deadline ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.Title}>
                <div className="col taskBg">
                  <table className="reactTable">
                    <th></th>
                    <tbody>
                      <td>{task.Title} </td>
                      <td>{task.Description} </td>
                      <td>{task.Deadline} </td>
                      <td>{task.Priority} </td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) => markDone(task.Title)}
                        />
                      </td>
                      <td>
                        <div className="deleteButton">
                          <span
                            title="Delete"
                            onClick={() => deleteTask(task.Title)}
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
                                onClick={() =>
                                  editTask(
                                    task.Title,
                                    task.Description,
                                    task.Deadline,
                                    task.Priority
                                  )
                                }
                              >
                                <button className="btn btn-sm btn-primary">
                                  <FontAwesomeIcon icon={faPenToSquare} />{' '}
                                  UPDATE
                                </button>
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                    </tbody>
                  </table>
                </div>
                <ToastContainer
                  closeButton={false}
                  theme="dark"
                  position="bottom-right"
                />

                {/* popup form on trigger */}
                <Popup-overlay trigger={buttonPopup}></Popup-overlay>
                <Popup trigger={buttonPopup}>
                  <div class="card mb-3">
                    <form onSubmit={(e) => addTask()}>
                      <div class="card-header text-white bg-primary">
                        {windowIcon}
                        {windowText} Task
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
                              onBlur={(e) => setNewTitle(e.target.value)}
                              required="required"
                              class="form-control"
                              editable={true}
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
                              defaultValue={newDescription}
                              onBlur={(e) => setNewDescription(e.target.value)}
                              class="form-control"
                              required="required"
                              editable={true}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-date">
                              <br />
                              <input
                                id="Deadline"
                                type="date"
                                defaultValue={newDeadline}
                                onBlur={(e) => setNewDeadline(e.target.value)}
                                class="form-control"
                                required="required"
                              />
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <radioGroup row="true" defaultValue={newPriority}>
                          <div class="form-group row">
                            <div class="custom-control custom-radio custom-control-inline">
                              <label class="form-label">Priority: </label>
                              <input
                                name="Priority"
                                id="Priority_0"
                                type="radio"
                                class="custom-control-input"
                                value="Low"
                                onChange={(e) => setNewPriority(e.target.value)}
                                required="required"
                              />
                              <label
                                for="Priority_0"
                                class="custom-control-label"
                              >
                                Low
                              </label>
                              <input
                                name="Priority"
                                id="Priority_1"
                                type="radio"
                                class="custom-control-input"
                                value="Med"
                                onChange={(e) => setNewPriority(e.target.value)}
                                required="required"
                              />
                              <label
                                for="Priority_1"
                                class="custom-control-label"
                              >
                                Med
                              </label>
                              <input
                                name="Priority"
                                id="Priority_2"
                                type="radio"
                                class="custom-control-input"
                                value="High"
                                onChange={(e) => setNewPriority(e.target.value)}
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
                                <span>
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-md"
                                  >
                                    {windowIcon}
                                    {windowText}
                                  </button>
                                  <button
                                    className="btn btn-danger btn-md"
                                    onClick={(e) => cancelPopup(e)}
                                  >
                                    <FontAwesomeIcon icon={faBan} /> Cancel
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </radioGroup>
                      </div>
                    </form>
                  </div>
                </Popup>
              </React.Fragment>
            );
          })}
    </div>
  );
}
