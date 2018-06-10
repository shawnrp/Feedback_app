import { Meteor } from 'meteor/meteor';
import {Questions} from '../../models/questions.js';

import '../html/feedback.html';
import '../html/body.html';

Template.feedback.helpers({ //where you place functions/methods
  myTitle:function() {      //to be called only in feedback template
  	return "Feedback App";
  },

  questions:function() { //access the Questions data collection obtained from the 'getQuestions' publication
  return Questions.find({});
},
checkType:function(type) {
	return type == "mcq";
}
});

Template.feedback.onCreated(function() { //callback handler, triggered when feedback template is created in body.html   
	Meteor.subscribe('getQuestions'); //subscribes to the getQuestions publication from server

});

Template.feedback.events({ //where to place event-driven codes
	"submit #feedbackForm":function(event,instance) {
		event.preventDefault();
		const formData = $("#feedbackForm").serializeArray();
		Meteor.call("addAnswers",formData,function(error,result){
			if(result) {
				alert("Thank you for your feedback!");
				$('#feedbackForm').trigger('reset');
			}
		});
	},

	/* For meteor.call -- 1st param - name of method in Meteor.methods, 2nd param - data to pass over, 
	3rd param - callback function when Meteor.methods responds. error and result are undefined if no error/result is returned
	call() calls a function defined in Meteor.methods at server side*/
	
});
