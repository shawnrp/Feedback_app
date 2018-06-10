import { Meteor } from 'meteor/meteor';
import { Questions } from '../models/questions.js' //import the mongoDB collection

Meteor.startup(() => { //triggered when meteor runs
	// code to run on server at startup
	Meteor.methods({ //where you define all functions to be executed from server
		'addAnswers':function(formData) {
			try {

				for(let i = 0, len = formData.length; i < len ; i++) {
					let answer = formData[i].value;
					const qid = new Meteor.Collection.ObjectID(formData[i].name);

          		Questions.update({_id: qid}, {$push: { result: answer }}); //mongoDB collection update operation. 
          		//Find question ID in the collection and push an answer to its result array
          	}

          	return true;

          } catch (e) {
          	return new Meteor.Error(e);
          }	
      },

  });

	//This is where you define a name to a function to retrieve data i.e. getQuestions method
	//Usually publish is used for retrieval of data into a collection. 
	//To achieve the real-time effect or reactivity. 
	//When you change data in MongoDB, it will push it to all the clients!
	Meteor.publish('getQuestions', function() { //provides reactivity effect - when you change data in collection, server will push data to subscribed clients
		return Questions.find({});		
	});
});

//Files in server folder cannot be accessed by importing into client