import React,{useState,useEffect} from "react"
import { Button,FormControl,InputLabel,Input,List ,ListItem,ListItemText} from '@material-ui/core';
import './App.css';
import axios from 'axios';
function App() {

  
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  useEffect(() => {
    fetch("http://localhost:8000/list")
            .then((response) => response.json())
            .then((data) => {
              setTodos(data);
            });
  },[]);

  const addTodo =(event) => {
    event.preventDefault(); //will stop refresh

    var payload = {
      "task":input,
      "done":false
     }
    var url = "http://localhost:8000/create/''";
    axios.post(url,payload)
    .then(response =>{
    setTodos(response.data)
     }).catch(err =>{
    console.log(err);
  })

    setTodos([...todos,input]);
    setInput(''); //clear up the input after clicking add todo button

  }

  function taskCompleted(key){
    var url = "http://localhost:8000/upd/"+key;
    axios.post(url)
    .then(response =>{
    setTodos(response.data)
     }).catch(err =>{
    console.log(err);
  })
}

function deleteTodo(key){
    var url = "http://localhost:8000/delete/"+key;
    axios.post(url)
    .then(response =>{
    setTodos(response.data)
     }).catch(err =>{
    console.log(err);
  })
}

  return (
    <div className="App">
      <h1>Task  🚀!</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write A Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary">
        Add Todo
        </Button>
      </form>


      <div>
        
      <List type="none" className="todo_list"   >
                    {
                        todos?todos.map(function(data){
                            return<>
                            <ListItem  key={data.id} >
                                <input type="checkbox" onChange={()=>{taskCompleted(data.id)}} checked={data.done} />
                                {
                                  data.done? <ListItemText style={{textDecoration:"line-through"}} primary ={data.task}/>
                                  :<ListItemText primary={data.task}  />
                                }
                                <Button onClick={()=>{deleteTodo(data.id)}}>❌ Delete</Button>
                            </ListItem>
                            </>
                        }):
                        " "
                    }
                </List>
      
      </div>
      


      
    </div>
  );
}

export default App;  
