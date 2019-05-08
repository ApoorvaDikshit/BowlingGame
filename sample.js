define(["wcm!jquery", "wcm!underscore", "wcm!backbone", "wcm!sf", "context", "plugins", "../config/constants", "text!../templates/sample.html"],
    function($, _, Backbone, sf, context, plugins, constants, template) {
        "use strict";
        return Backbone.View.extend({
            initialize: function() {
                this.startANewBowlingGame();
            },
            render: function() {
                var view = this;
                view.$el.html(template);
                plugins.commons.rivetsconfig.bind(view.$el, {});
                return view;
            },
            startANewBowlingGame: function() {
                this.score = 0;
                this.throwIndex = 0;
                this.frameScore = 0;
            	this.wasStrike = false;
            	this.wasSpare = false;
            },
            roll: function(numberOfPinsKnockedDownInThisThrow) {
                this.throwIndex = this.throwIndex + 1;
                this.numberOfPinsKnockedDownInThisThrow = numberOfPinsKnockedDownInThisThrow;
                this.calculateScore();
            },
            calculateScore: function() {
            	if (this.wasStrike) {
            		if (this.wasLastFrameAStrike) {
            			this.addTheNumberOfPinsKnockedDownInThisThrowToTheScore();
                 	}
                 	else {
            			this.doubleTheNumberOfPinsKnockedDownInThisThrowAndAddToTheScore();
                 	}
            	}
            	else if (this.wasSpare) {
            		if (this.wasLastFrameASpare) {
            			this.addTheNumberOfPinsKnockedDownInThisThrowToTheScore();
                 	}
                 	else {
                 		this.doubleTheNumberOfPinsKnockedDownInThisThrowAndAddToTheScore();
                 	}
            	}
            	else {
        			this.addTheNumberOfPinsKnockedDownInThisThrowToTheScore();
            	}
            	this.prepareForNextThrow();
            },
            prepareForNextThrow: function(){
            	this.calculateFrameScore();
            	this.checkForSpareOrStrike();
            },
            doubleTheNumberOfPinsKnockedDownInThisThrowAndAddToTheScore: function(){
         		this.score += 2*this.numberOfPinsKnockedDownInThisThrow;
            },
            addTheNumberOfPinsKnockedDownInThisThrowToTheScore : function(){
         		this.score += this.numberOfPinsKnockedDownInThisThrow;
            },
            calculateFrameScore: function(){
            	if ( this.throwIndex % 2 !== 0 ){
            		this.firstThrowInAFrame = this.numberOfPinsKnockedDownInThisThrow;
            		this.frameScore = -1;
            	}
            	else if ( this.throwIndex % 2 === 0) {
            		this.secondThrowInAFrame = this.numberOfPinsKnockedDownInThisThrow;
            		this.frameScore = this.firstThrowInAFrame + this.secondThrowInAFrame ; 
            		//Initializing the first and second throws
            		this.firstThrowInAFrame = -1;
            		this.secondThrowInAFrame = -1;
            	}
            },
            checkForSpareOrStrike: function(){
            	this.wasSpare = false;
            	if( this.wasStrike && this.throwIndex % 2 === 0){
            		 this.wasStrike = false; 
            	}
            	
            	if ( this.firstThrowInAFrame === 10){
            		this.wasStrike = true;
           		 	this.throwIndex = this.throwIndex + 1;
           		 	if ( this.throwIndex === 20 ){
           		 		this.wasLastFrameAStrike = true;
           		 	}
            	}
            	else if ( this.frameScore === 10) {
            		this.wasSpare = true;
            		if ( this.throwIndex === 20 ){
           		 		this.wasLastFrameASpare = true;
           		 	}
            	}
            }
        });
    });
