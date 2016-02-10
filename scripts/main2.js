$('h1').addClass('animated slideInDown');

var player = {
	audiogreen: $('audio')[0],
	audiored: $('audio')[1],
	audioblue: $('audio')[2],
	audioyellow: $('audio')[3],

	sequence: function(event){
    var clickValue = event.target.id;

	  if(clickValue === 'green'){
			player.audiogreen.play();
			this.arrayResults.push(clickValue);
		} else if(clickValue === 'red'){
			player.audiored.play();	
			this.arrayResults.push(clickValue);	
		} else if(clickValue === 'blue'){
			player.audioblue.play();	
			this.arrayResults.push(clickValue);	
		} else if(clickValue === 'yellow'){
			player.audioyellow.play();	
			this.arrayResults.push(clickValue);
		}
	},
};

var simon = {
	onoff: 'off',
	strict: 'off',
  roundsCount: 0,
  display: this.step,
  path: [],
  speed: 170,
  step: 0, 
  cliks: 0,
  velocity: 0,


  activateButtons: function(){
  	$('a').on('focus', function(event){
  		if(event.target.id === 'green'){
			player.audiogreen.play();
			} else if(event.target.id === 'red'){
			player.audiored.play();
			} else if(event.target.id === 'blue'){
			player.audioblue.play();
			} else if(event.target.id === 'yellow'){
			player.audioyellow.play();
			}
  	});
  },

  sequence: function(){
  	simon.step += 1;
  	var random = 0;
  	var avaliable = ['green','red','blue','yellow'];
  	var arr = simon.path;

  	if (simon.step >= 15) {
  		simon.velocity = 600;
  	} else if (simon.step >= 9) {
  		simon.velocity = 800;
  	} else if (simon.step >= 5){
  		simon.velocity = 1100;
  	} else {
  		simon.velocity = 1400;
  	}

    if (simon.path === 5){
      simon.step = 0;
      simon.path = [];
      player.arrayResults = [];
      arr = simon.path;
    };

  	random = Math.floor(Math.random() * 4) + 0;
  	
		simon.path.push(avaliable[random]);

  	$('.display').html('<p>' + simon.step + '</p>');
  	$('.display p').addClass('animated flash');
  	$('.display p').addClass('displayone');

  	setTimeout(function(){
  		for (var i = arr.length - 1; i >= 0; i--) {
  		  simon.playColor(arr[i], i * simon.velocity);
  	  };
  	}, 3000); 
  },

  playColor: function(color, delay){
    player.arrayResults = [];
  	var audio = 0;
  	var cssClass = '';
  	var del = 50;

    if (color === 'green') {
    	audio = 0;
    	cssClass = 'greenActive';
    } else if (color === 'red') {
    	audio = 1;
    	cssClass = 'redActive';
    } else if (color === 'blue') {
    	audio = 2;
    	cssClass = 'blueActive';
    } else if (color === 'yellow') {
    	audio = 3;
    	cssClass = 'yellowActive';
    }

   	$('a#green, a#blue, a#yellow, a#red').addClass('unclickable');
		
		setTimeout(function(){
			$('a#green, a#blue, a#yellow, a#red').removeClass('unclickable');
		}, simon.velocity * simon.step);
    
		
    var sound = setTimeout(function(){
	    $('.big-button.' + color).addClass(cssClass);
	  	$('audio')[audio].play();
	  	setTimeout(function(){
    	  $('.big-button.' + color).removeClass(cssClass);
      }, 400);    
    }, del += delay); 
  },

  presentation: function(){
  	setTimeout(function(){
  		var sequence = ['green','red','blue','yellow'];
  		var random = 0 		
  		for (var i = 0; i < 4; i++) {
  			random = Math.floor(Math.random() * (sequence.length) + 0);  			 			
  			simon.playColor(sequence[random], i * 150);
  		};

  		$('.display').html('<p>' + simon.step + '</p>');
  	  $('.display p').addClass('animated flash');
  	  $('.display').css('background-color', '#09D7FF');
  	}, this.speed);
  },

  swichGame: function(onOrOff){
  	var status = 'off';
  	onOrOff === 'on' ? status = 'left' : status = 'right'; 
  	$('a .selector').css('float', status);
  },

 	game: function(){	
 		//as soon as on is clicked
 		$('a#onoff').click(function(){
      simon.clicks = 0;
 			simon.activateButtons();
      if (simon.onoff === 'off') {
	 		  simon.onoff = 'on';
	 		  simon.swichGame('on');
	 		  simon.step = 0;
	 		  player.status = '';
	 		  simon.presentation();
	 		  $('a#strict').click(function(){
	 		  	if($('.title h1').hasClass('strictMode')){
	 		  		simon.strict = 'off';
	 		  	  $('.title h1').removeClass('strictMode');
	 		  	} else {
	 		  	  simon.strict = 'on';
	 		  	  $('.title h1').addClass('strictMode');
	 		  	}
	 		  });
	 			$('a#start').on('click', function(){
          $(this).addClass('unclickable');
          simon.step = 0;
          simon.path = [];
          simon.sequence();
		      $('a').on('click', function(event){	
            if ((simon.step === 19)||(event.target.id === 'title' )){
              simon.presentation();
              simon.step = 0;
              simon.path = [];
              simon.sequence();
            }
		      	var goNext = []; 
	      	  player.sequence(event);  

            player.arrayResults.map(function(_ , idx){
              if (simon.path[idx] === player.arrayResults[idx]){
                goNext.push(true);
              } else {
                goNext.push(false);
              }
            });
            console.log(simon.path, player.arrayResults, goNext);
            if ((simon.path.length === player.arrayResults.length)&&(simon.path.length === goNext.length)&&
               (goNext.indexOf(false) === -1)){
              simon.sequence();

            } else if (((goNext.indexOf(false) !== -1))||((simon.path.length === 1)&&(goNext.indexOf(false) !== -1))){
              if (simon.strict === 'on') {
                simon.step = 0;
                simon.path = [];
                simon.sequence();
              } else {
                simon.presentation();
                setTimeout(function(){
                  for (var i = simon.path.length - 1; i >= 0; i--) {
                    simon.playColor(simon.path[i], i * simon.velocity); 
                  };
                }, 3000);
              }                
            } else {
              console.log('something went wrong!!!!!!!!!'); 
            }
          });     
        });
      } else {
        simon.step = 0;
        simon.onoff = 'off';
        $('a#start').removeClass('unclickable');
        $('.display').css('background-color', '#A3ADC2');
        $('.display p').html('<p>' + ' ' + '</p>');
        simon.swichGame('off');
        history.go(0);
      }
    });
  },
};

simon.game();

