describe("Beget",function(){
	it("should clone the object",function(){
		var o = {name:"bob"};
		var o2 = Object.beget(o);
		expect(o2.name).toBe("bob");
	});
});

describe("todoItem",function(){
	var task = todoItem;
	task.setTaskText("Buy Food");

	it("should be set task_name to user's input",function(){
		expect(task.task_name).toBe("Buy Food");
	});
	it("should have a method completeButton that returns a button",function(){
		expect(todoItem.completedButton().nodeName).toBe("BUTTON");
	});
	it("should have a method deleteButton method that returns a button",function(){
		expect(todoItem.completedButton().nodeName).toBe("BUTTON");
	});
	it("should have a method render that returns a list element",function(){
		expect(todoItem.render().nodeName).toBe("LI")
	});
})

describe("New task creation",function(){

	  beforeEach(function() {
	  	var todo_items = document.getElementById('todo-items').childNodes.length;
	    spyOn(todoApp, 'new_task');
	    spyOn(todoApp, 'create_task');
	    var button = document.getElementById('add-item').click();
	  });

	it("should have an Add Task button that calls todoApp create_task method when clicked",function(){
		expect(todoApp.new_task).toHaveBeenCalled();
	});
	it("should have an input field",function(){
		var user_input = document.getElementById("new-task-field");
		alert(user_input);
		expect(user_input.nodeName).toBe("INPUT");
	});
	it("should have an submit button",function(){
		var button = document.getElementById("task-submit");
		expect(button.nodeName).toBe("BUTTON");
	});
		it("should have a new task appended to the DOM",function(){
			var user_input = document.getElementById("new-task-field");
			user_input.innerHTML = "Buy Food"
			var button = document.getElementById("task-submit");
			button.click();
		expect(document.getElementById('todo-items').childNodes.length).toBe(todo_items+1);
	});
})