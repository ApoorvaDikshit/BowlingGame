define(['wcm!backbone', 'wcm!sf'], function(Backbone, sf) {

    var viewPath = 'main/app/sample/views/sample';
   
    var require = testUtils.buildRequireFor(viewPath);
    var bowlingGame;
    var BowlingGame;

    describe("BowlingGame", function() {
        beforeEach(function() {
            if (!BowlingGame) {
                require([
                    viewPath
                ], function(module) {
                	BowlingGame = module;
                });
                waitsFor(function() {
                    return !!BowlingGame;
                });
                runs(function() {
                	bowlingGame = new BowlingGame();
                });
            }
        });
        
        describe("Score calculation for various scenarios", function(){
        	it("should calculate the correct score when all the pins are not knocked down in a frame - normal throw", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(6);
        		bowlingGame.roll(3);
        		
        		expect(bowlingGame.score).toEqual(9);
        	});
        	
        	it("should calculate the correct score when all the pins are knocked down in the first roll of a frame - strike", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(10);
        		//2
        		bowlingGame.roll(3);
        		bowlingGame.roll(4);
        		
        		expect(bowlingGame.score).toEqual(24);
        	});
        	
        	it("should calculate the correct score when all the pins are knocked down in a frame - spare", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(6);
        		bowlingGame.roll(4);
        		//2
        		bowlingGame.roll(5);
        		bowlingGame.roll(3);
        		//3
        		bowlingGame.roll(3);
        		bowlingGame.roll(3);
        		
        		expect(bowlingGame.score).toEqual(29);
        	});
        	it("should calculate the score as 90 when all frames have a nine and a miss", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//2
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//3
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//4
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//5
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//6
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//7
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//8
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//9
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//10
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		
        		expect(bowlingGame.score).toEqual(90);
        	});
        	it("should calculate the score in a complex situation", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(10);
        		//2
        		bowlingGame.roll(9);
        		bowlingGame.roll(1);
        		//3
        		bowlingGame.roll(5);
        		bowlingGame.roll(5);
        		//4
        		bowlingGame.roll(5);
        		bowlingGame.roll(4);
        		//5
        		bowlingGame.roll(3);
        		bowlingGame.roll(3);
        		//6
        		bowlingGame.roll(3);
        		bowlingGame.roll(3);
        		//7
        		bowlingGame.roll(5);
        		bowlingGame.roll(5);
        		//8
        		bowlingGame.roll(9);
        		bowlingGame.roll(1);
        		//9
        		bowlingGame.roll(10);
        		//10
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		
        		expect(bowlingGame.score).toEqual(138);
        	});

        	it("should calculate the score in another complex situation", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(10);
        		//2
        		bowlingGame.roll(9);
        		bowlingGame.roll(1);
        		//3
        		bowlingGame.roll(5);
        		bowlingGame.roll(5);
        		//4
        		bowlingGame.roll(5);
        		bowlingGame.roll(4);
        		//5
        		bowlingGame.roll(0);
        		bowlingGame.roll(10);
        		//6
        		bowlingGame.roll(3);
        		bowlingGame.roll(3);
        		//7
        		bowlingGame.roll(5);
        		bowlingGame.roll(5);
        		//8
        		bowlingGame.roll(9);
        		bowlingGame.roll(1);
        		//9
        		bowlingGame.roll(10);
        		//10
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		
        		expect(bowlingGame.score).toEqual(145);
        	});


        	it("should calculate the score as 200 when all pins are rolled down in the first throw of every frame - perfect game", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(10);
        		//2
        		bowlingGame.roll(10);
        		//3
        		bowlingGame.roll(10);
        		//4
        		bowlingGame.roll(10);
        		//5
        		bowlingGame.roll(10);
        		//6
        		bowlingGame.roll(10);
        		//7
        		bowlingGame.roll(10);
        		//8
        		bowlingGame.roll(10);
        		//9
        		bowlingGame.roll(10);
        		//10
        		bowlingGame.roll(10);
        		//10
        		bowlingGame.roll(10);
        		
        		expect(bowlingGame.score).toEqual(200);
        	});

        	it("should calculate the score as 0 when no pins are rolled down in any frame - gutter game", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//2
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//3
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//4
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//5
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//6
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//7
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//8
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//9
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		//10
        		bowlingGame.roll(0);
        		bowlingGame.roll(0);
        		
        		expect(bowlingGame.score).toEqual(0);
        	});

        	it("should calculate the score when a spare is hit in the last frame", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//2
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//3
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//4
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//5
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//6
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//7
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//8
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//9
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//10
        		bowlingGame.roll(9);
        		bowlingGame.roll(1);
        		//11
        		bowlingGame.roll(3);
        		
        		expect(bowlingGame.score).toEqual(94);
        	});
        	

        	it("should calculate the score when a strike is hit in the last frame", function(){
        		
        		bowlingGame.startANewBowlingGame();
        		//1
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//2
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//3
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//4
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//5
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//6
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//7
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//8
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//9
        		bowlingGame.roll(9);
        		bowlingGame.roll(0);
        		//10
        		bowlingGame.roll(10);
        		//11
        		bowlingGame.roll(3);
        		bowlingGame.roll(6);
        		
        		expect(bowlingGame.score).toEqual(100);
        	});
        	
        });
    });
});
