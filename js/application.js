var NotesApp = (function(){

	var App = {
		stores: {},
		views: {}

	}

	//Init localStorage Data Store
	App.stores.notes = new Store('notes');

	//Note Model
	var Note = Backbone.Model.extend({
		localStorage: App.stores.notes,
		initialize: function(){
			if(!this.get('title')){
				this.set({title: "Note @ "+ Date() })
			};
			if(!this.get('body')){
				this.set({body: "No Content" })
			};
		}

	})

	//Views
	var NewFormView = Backbone.View.extend({
		
		events:{
			"submit form": "createNote"
		},

		createNote: function(e){
			console.log('createNote called.')
			var attrs = this.getAttributes(),
				note = new Note();

			note.set(attrs);
			note.save();
		},

		getAttributes: function(){
			return {
				title: this.$('form [name=title]').val(),
				body: this.$('form [name=body]').val()
			}
		}
	})



	window.Note = Note;

	$(document).ready(function(){
		App.views.new_form = new NewFormView({
			el: $('#new')
		});
	})

	

	return App;
})()