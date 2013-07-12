//Use the beget code to clone elements, like the todo item objects
//this avoids using 'new' on a constructor function, for reference see ch3 of Douglas Crockford's "JavaScript: The Good Parts"
if (typeof Object.beget !== 'function') {
	Object.beget = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}

//It's useful to keep an object that represents our todo app
//'separation of concerns' lets us combine all the relevant methods in one place
var todoApp = {
	//this method will retrieve for us a DOM list of todo items
	todo_tasks: function(){
		return document.getElementById('todo-items');
	},
	//this method will retrieve for us a DOM list of completed items
	completed_tasks: function(){
		return document.getElementById('completed-items');
		//possile place to store items
	},
	//this method is called when a user wants to add a new todo item
	append_item: function(){
		//first it makes a clone of the todoItem using the beget() method we defined above
		var newTask = Object.beget(todoItem);
		//next it sets the task using newTask's setTaskText() method
		newTask.setTaskText();
		//we don't want to add blank tasks
		if(newTask.task_name.length!==0){
			//newTask's render() method returns a DOM element representing a new task, which we append to the end of the DOM list of todo items
			this.todo_tasks().appendChild(newTask.render());
		}
	}
}

//todoItem is an object that we are going to clone every time the user hits the 'add-item' button
//keeping all the relevant methods together under one roof will allow us to keep track of all the DOM manipulation logic for rendering new DOM objects to represent new tasks, as well as implement 'complete' and 'delete' functionality for those tasks
var todoItem = {
	//this method prompts the user to enter a task but doesn't yet write it to anything in the DOM, instead it stores the returned string in the 'task' attribute for later
	setTaskText: function(){
		this.task_name = prompt("new task:");
	},
	//this method builds and returns a DOM element that will represent the new task
	//it's used by the todoApp object to append this DOM element every time a user clicks the 'add-item' button
	render: function(){
		//create all the necessary elements
		var new_task = document.createElement('li');
		var text = document.createElement('div');
		var actions = document.createElement('div');
		var meta_data = document.createElement('span');
		//give them all the right CSS classes for styling
		text.className = "items";
		actions.className = "actions";
		meta_data.className = "meta-data";

		//fill in the data and assemble the tasks's DOM element

		//add some useful meta data
		var date = new Date();
		meta_data.innerHTML = "Created on: "+date.toLocaleDateString()+" ";
		actions.appendChild(meta_data);

		//create the complete and delete buttons
		actions.appendChild(this.completedButton());
		actions.appendChild(this.deleteButton());

		//fill in and assemble the text object with task's text, some meta data, and the complete & delete buttons
		text.innerHTML = this.task_name;
		text.appendChild(actions);
		//add the text object to the task
		new_task.appendChild(text);

		//return the task DOM object
		return new_task;
	},
	//this method returns the DOM element representing the 'complete' button
	completedButton: function(){
		//create a new button
		var button = document.createElement('button');
		//set the CSS class name for styling
		button.className="complete";
		//insert the text 'completed' into the <button></button> tags to label our button
		button.innerHTML = "completed";
		//store the reference to the todoItem object in a variable 'that' because js inner functions loose context, for reference see ch4 of Douglas Crockford's "JavaScript: The Good Parts"
		var that = this;
		//bind the click event to a function that will be called when the user clicks 'complete'
		//in this function we define all the steps that would implement the completion feature
		button.onclick = function(event){
			//we set up a bunch of useful variables
			var button = event.target;
			//todoItem object has a getTask() method designed find and return the task DOM element for a given click event
			//once we have the task object we want to remove it from the list of todo items and store it in a temporary variable
			//removeChild() returns the DOM object we just removed
			var task = todoApp.todo_tasks().removeChild(that.getTask(event));
			//here we find the meta data object and update it's contents to store the completion date
			var meta_data = that.getMetaData(event);
			var date = new Date();
			meta_data.innerHTML = "Completed on: "+date.toLocaleDateString()+" ";
			//once the task is complete we don't want to show the complete button
			button.parentNode.removeChild(button);
			//lastly we append the task DOM object to the list of completed items
			todoApp.completed_tasks().appendChild(task);
		};
		//return the button DOM element
		return button;
	},
	//this method returns the DOM element representing the 'delete' button
	deleteButton: function(){
		//create a new button
		var button = document.createElement('button');
		//set the CSS class name for styling
		button.className="delete";
		//insert the text 'delete' into the <button></button> tags to label our button
		button.innerHTML = "delete";
		//store the reference to the todoItem object in a variable 'that' because js inner functions loose context, for reference see ch4 of Douglas Crockford's "JavaScript: The Good Parts"
		var that = this;
		//bind the click event to a function that will be called when the user clicks 'delete'
		//in this function we define all the steps that would implement the deletion feature
		button.onclick = function(event){
			//todoItem object has a getTask() method designed find and return the task DOM element for a given click event
			var task = that.getTask(event);
			//once the task is complete we remove it from the DOM tree
			task.parentNode.removeChild(task);
		};
		return button;
	},
	//keeping our code clean and HTML pretty means making useful methods that do all the legwork
	//in this case the DOM structure requires lots of repetitive .parentNode calls to get to the task object itself
	//by passing the click event object to the getTask() method we can return the task object we might want elsewhere
	getTask: function(event){
		return event.target.parentNode.parentNode.parentNode;
	},
	//this method finds the meta data 'span' element
	getMetaData: function(event){
		return event.target.parentNode.getElementsByTagName("span")[0];
	}
}

//after all the setup above it's time to add an event listener to the 'add-button'
window.onload = function(){
	document.getElementById('add-item').onclick = function(){
		//when the user clicks on the 'add-item' button we make a call to todoApp's append_item() method that will clone  our todoItem object, create the right DOM element, and append it to the 'todo-items' list
		todoApp.append_item();
	}
}	