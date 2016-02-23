angular.module("gameApp", [])

    .controller("appController", ["$scope", "keyPressHandlerService", "gameStateService", "globalSettings", "gameState", function($scope, keyPressHandlerService, gameStateService, globalSettings, gameState) {
		
		var todoList = this;
		
        $scope.keydown = function(keyEvent) {
            if (!$scope.instructionsDisplayed) {
                $scope.instructionsDisplayed = true;
                return;
            }

            keyPressHandlerService.keyPress(keyEvent.keyCode);
        };

        $scope.keyup = function(keyEvent) {
            keyPressHandlerService.keyRelease(keyEvent.keyCode);
			
			if(gameStateService.lives == 0){
				
				todoList.resetPowerUps();
			}
        };
		
		
		//SHOP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		
		todoList.todos = [{text:"Double-Shot", done:false, cost: "5000 pts"}, {text:"Extra Life", done:false, cost:"10000 pts"}];
		todoList.RESETtodos = [{text:"Double-Shot", done:false, cost: "5000 pts"}, {text:"Extra Life", done:false,  cost:"10000 pts"}];
		
		//supposed to reset the powerup list at gameover
		todoList.resetPowerUps = function(){
			//alert("reset Shop!");
			/*var oldTodos = todoList.RESETtodos;
			todoList.todos = [];
			angular.forEach(oldtodos, function(todo) {
				if (!todo.done) todoList.todos.push(todo);
			});*/
			todoList.todos = todoList.RESETtodos;
			
		};

		todoList.addTodo = function() {
		  todoList.todos.push({text:todoList.todoText, done:false});
		  todoList.todoText = '';
		};

		todoList.remaining = function() {
		  var count = 0;
		  angular.forEach(todoList.todos, function(todo) {
			count += todo.done ? 0 : 1;
		  });
		  return count;
		};

		todoList.archive = function() {//THE FUNCTION TO GET RID OF THE ELEMENTS!!!!!!!
		  
			//check all the power ups and then check the points. If not, assign to not done
			var oldTodoss = todoList.todos;
			var num = gameStateService.score;
		    angular.forEach(oldTodoss, function(todo) {
			if(todo.done){
				if(todo.text == "Double-Shot" && num < 5000){
					//figure out how to change
					alert("You don't have enough points to buy the Double-Shot!!\nPlease click on the game after clicking OK.");
					todo.done = !todo.done;


				}
				if(todo.text == "Extra Life" && num < 10000){
					//figure out how to change
					alert("You don't have enough points to buy the Extra Life!!\nPlease click on the game after clicking OK.");
					todo.done = !todo.done;

				}
			}
		  });
			
		  var oldTodos = todoList.todos;
		  todoList.todos = [];
		  angular.forEach(oldTodos, function(todo) {
			if (!todo.done) todoList.todos.push(todo);
			if(todo.done){
				if(todo.text == "Double-Shot"){
					//figure out how to change
					alert("Thank you! You got the Double-Shot!!");
					gameStateService.doubleshot = 1;
					globalSettings.maxBulletsOnScreen *= 2;
				}
				if(todo.text == "Extra Life"){
					//figure out how to change
					alert("Thank you! You got the Extra Life!!");
					gameStateService.lives += 1;
					//globalSettings.maxBulletsOnScreen *= 2;
				}
			}
		  });
		}; //end archive function
    }])

    .directive("centipedeGame", ["$interval", "gameService", "renderService", "graphicsEngineService", function($interval, gameService, renderService, graphicsEngineService) {
        return {
            restrict: 'A',
            template: '<canvas id="gameCanvas" width="600" height="640" style="border:1px solid #000000;"></canvas>',

            link: function(scope, element) {
                var intervalPromise;
                var animation = 0;
                var canvas = element.find('canvas')[0].getContext("2d");

                graphicsEngineService.initialise(canvas, 'App/img/graphics.png');
                gameService.initialise();

                function gameLoop() {
                    animation++;

                    if (animation == 4) {
                        animation = 0;
                    }

                    gameService.update(animation);
                    renderService.draw(animation);
                }

                intervalPromise = $interval(gameLoop, 50);

                scope.$on("$destroy", function() {
                    if (intervalPromise) {
                        $interval.cancel(intervalPromise);
                        intervalPromise = undefined;
                    }
                });
            }
        }
    }])

	/*.controller('TodoListController', function() {
		var todoList = this;
		todoList.todos = [{text:"powerup", done:false}, {text:"powerup2", done:false}];

		todoList.addTodo = function() {
		  todoList.todos.push({text:todoList.todoText, done:false});
		  todoList.todoText = '';
		};

		todoList.remaining = function() {
		  var count = 0;
		  angular.forEach(todoList.todos, function(todo) {
			count += todo.done ? 0 : 1;
		  });
		  return count;
		};

		todoList.archive = function() {//THE FUNCTION TO GET RID OF THE ELEMENTS!!!!!!!
		  var oldTodos = todoList.todos;
		  todoList.todos = [];
		  angular.forEach(oldTodos, function(todo) {
			if (!todo.done) todoList.todos.push(todo);
			if(x.done){
				if(x.text == "Double-Shot"){
					//figure out how to change
				}
			}
		  });
		}; //end archive function
	  });*/
