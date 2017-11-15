import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl'


class App extends Component {

  state={
    recipes:[
      {name:'',ingredients:[]}

    ],
    showAdd:false,
    showEdit: false,
    currentIndex:0,
    newestRecipe:{name:'', ingredients:[]}
  }

  close=()=>{

    if(this.state.showAdd)
    {
      this.setState({showAdd:false})
    }

    else if(this.state.showEdit)
    {
      this.setState({showEdit:false})
    }
  }

    open=(state,currentIndex)=>{

   
      this.setState({[state]:true});
      this.setState({currentIndex});
  }

  deleteRecipe(index){

    let recipes=this.state.recipes.slice();
    recipes.splice(index,1);
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});

  }

  updateNewRecipe(name, ingredients)
  {

    this.setState({newestRecipe:{name:name, ingredients:ingredients}})
    console.log(this.state.newestRecipe);

  }

  saveNewRecipes()
  {

    let recipes=this.state.recipes.slice();
    recipes.push({name:this.state.newestRecipe.name,ingredients:this.state.newestRecipe.ingredients});
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});
    this.setState({newestRecipe:{name:'', ingredients:[]}});

    console.log("hello",recipes);
    this.close();
  }

  updateRecipeName(name,currentIndex)
  {
      let recipes=this.state.recipes.slice();
      recipes[currentIndex]={name:name, ingredients:recipes[currentIndex].ingredients};
      localStorage.setItem('recipes',JSON.stringify(recipes));
      this.setState({recipes});

  }

    updateRecipeIngredients(ingredients,currentIndex)
  {
      let recipes=this.state.recipes.slice();
      recipes[currentIndex]={name:recipes[currentIndex].name, ingredients:ingredients};
      localStorage.setItem('recipes',JSON.stringify(recipes));
      this.setState({recipes});

  }

componentDidMount()
{
  let recipes=JSON.parse(localStorage.getItem("recipes")) ||  [{name:'',ingredients:[]}];
  this.setState({recipes});
}



  render() {
    const {recipes, newestRecipe,currentIndex}=this.state;
    return (
      <div className="App container">
      <h1> FCC React Recipe Box </h1>
      <h3> Try adding and deleting a recipe. The recipe will remain in local storage, even if you refresh the page!</h3>

      {recipes.length > 0 &&(
      <Accordion>
{recipes.map((recipe,index)=> (
  <Panel header={recipe.name} eventKey={index} key={index}> 
  <ul>
  {recipe.ingredients.map((item)=>(

    (<li key={item}>{item}</li>)
)
      )}
   
  </ul>
  <ButtonToolbar>
  <Button bsStyle='info' onClick={(event)=>this.open("showEdit", index)}>Edit Recipe </Button>
<Button bsStyle='danger' onClick={(event)=>this.deleteRecipe(index)}>Delete Recipe </Button>
  </ButtonToolbar>
  </Panel>

  ))}

      </Accordion>

      ) }


 <Modal show ={this.state.showEdit} onHide={this.close}>
<Modal.Header closeButton>
<Modal.Title> Add Recipe</Modal.Title>



<Modal.Body>
<FormGroup controlId="formBasicText">
<ControlLabel>
Recipe Name
</ControlLabel>
<FormControl
type="text"
value={recipes[currentIndex].name}
placeholder="Enter recipe name"
onChange={(event)=>this.updateRecipeName(event.target.value, currentIndex)}
>


</FormControl>

<FormGroup controlId="formControlsTextArea">
<ControlLabel>
Recipe Ingredients
</ControlLabel>

<FormControl
componentClass="textarea"
placeholder="Enter ingredients (seperate by commas)"
onChange={(event)=>this.updateRecipeIngredients(event.target.value.split(","),currentIndex)}
value={recipes[currentIndex].ingredients}
>
</FormControl>
</FormGroup>
</FormGroup>
</Modal.Body>
</Modal.Header>

<Modal.Footer>

<Button bsStyle='success' onClick={(event)=>this.saveNewRecipes()}> Save Recipe </Button>
</Modal.Footer>
      </Modal>





      <Modal show ={this.state.showAdd} onHide={this.close}>
<Modal.Header closeButton>
<Modal.Title> Add Recipe</Modal.Title>



<Modal.Body>
<FormGroup controlId="formBasicText">
<ControlLabel>
Recipe Name
</ControlLabel>
<FormControl
type="text"
value={newestRecipe.name}
placeholder="Enter recipe name"
onChange={(event)=>this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
>


</FormControl>



<FormGroup controlId="formControlsTextArea">
<ControlLabel>
Recipe Ingredients
</ControlLabel>

<FormControl
type="textarea"
value={newestRecipe.name}
placeholder="Enter ingredients (seperate by commas)"
onChange={(event)=>this.updateNewRecipe(newestRecipe.name,event.target.value.split(","))}
value={newestRecipe.ingredients}
>
</FormControl>
</FormGroup>
</FormGroup>
</Modal.Body>
</Modal.Header>

<Modal.Footer>

<Button bsStyle='success' onClick={(event)=>this.saveNewRecipes()}> Add This Recipe </Button>
</Modal.Footer>
      </Modal>
      <Button bsStyle='primary' onClick={(event)=>this.open("showAdd",currentIndex)}>Add recipe</Button>
      </div>
    );
  }
}

export default App;
