import React, { useContext } from "react";
import moment from "moment";
import MDEditor, {commands,ICommand,EditorContext} from "@uiw/react-md-editor";

export default function AddTaskForm({open, entry, body, handleSubmit, handleUpdate, showBodyValue,setBodyValue, onClose, setIsOpen, plusIcon, task}) {
// const [value, setValue] = useState(task.body);
    if(!open) return null


     if(task._id){  
// {console.log(task.body)}
          let lastUpdate = moment(task.updatedAt).fromNow();
          let arrBody
    if(task.body){
       arrBody = task.body.split(".");
    }

const Button = () => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch({
      preview: preview === "edit" ? "preview" : "edit"
    });
  };
  if (preview === "edit") {
    return (
      <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
      <polygon
        fill="currentColor"
        points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
      />
      <polygon
        fill="currentColor"
        points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
      />
    </svg>
  );
};


const codePreview={
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <Button />
};







        return (
          <div className="editOverlay" onClick={onClose}>
            <div className="modalContainer editModal">
              <div className="showHeader">
                <button className="close editClose" onClick={onClose}>x</button>
                <form className="form showHeader"onSubmit={(evt) => {handleUpdate(evt, task._id);}} >
                  <input
                    className="listTitle"
                    type="text"
                    ref={entry}
                    placeholder="Enter title"
                    defaultValue={task.entry}
                  />
                  <div className="secondaryInfo">
                    <p className="taskStatus">
                      In {task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase()} list</p>

                    <p className="date">Updated: {lastUpdate} </p>
                  </div>
                </form>
              </div>
              <div className="showInfo">
                <form
                  className="form showInfo"
                  onSubmit={(evt) => {
                    handleUpdate(evt, task._id);
                  }}
                >
                  <h3>Instructions:</h3>
                  <div className="instructions" data-color-mode="light">

                  {/* <textarea className="emptyInstructions" type="text" ref={body} placeholder="Enter detailed information or hints here" defaultValue = {task.body}/> */}
                  <MDEditor style={{borderRadius:"5px"}} height={"fit-content"} width={"100%"} value={showBodyValue} onChange={setBodyValue}  preview="edit" extraCommands={[codePreview, commands.fullscreen]}/>

                  <div className="moveBtn">
                    <button type="submit" >
                      Update
                    </button>

                    <button onClick={(e) => {e.preventDefault();setIsOpen(false);}}>
                      Cancel
                    </button>
                  </div>
                  </div>
                </form>
              </div>

              <div className="pseudo"></div>

            </div>
          </div>
        );

     } else{

      return (
        <div className="overlay" onClick={onClose}>
          <div className="modalContainer ">
            <button className="close" onClick={onClose}>
              x
            </button>
            <h1 className="listTitle">Add Ticket</h1>
            <form className="form showHeader" onSubmit={handleSubmit}>
              <input type="text" ref={entry} placeholder="Enter title" />

              <textarea
                type="text"
                ref={body}
                placeholder="Enter user storie, check list or detailed information or hints here"
              />

              <button type="submit" className="singleBtn">
                {plusIcon}
              </button>
            </form>
            <div className="pseudo"></div>
          </div>
        </div>
      );
    }
}
