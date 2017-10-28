var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.submitEmail = function(){
				scope.makePhoto();
				scope.showPhoto = true;
			};

			scope.makePhoto = function(){
				var thePhoto = $('.thePhoto');
				html2canvas(thePhoto, {
					 onrendered: function(canvasPhoto) {
						 //document.body.appendChild(canvasPhoto);
						 var convertedPhoto = canvasPhoto.toDataURL('image/png');
						 $('#download-photo').attr('href',convertedPhoto);
						 thePhoto.html('<img src="'+convertedPhoto+'" />');
					 }
				 });
			}

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "What you can win in Idea Contest?",
			options: ["Ghanta(Bell)", "$3000", "Trip to Bangkok"],
			answer: 1
		},
		{
			question: "What we call the Contest Organizing Team?",
			options: ["Champions", "Ness ke Launde (Boys of Ness)", "Pathfinders"],
			answer: 0
		},
		{
			question: "With whom you can team up?",
			options: ["Modi Sarkar (Govt. Of India)", "Cricket Team of India", "Nessians"],
			answer: 2
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});
