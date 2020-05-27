function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start : function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
  slides.pretrial = slide({
    name : "pretrial",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
    slides.one_slider_practice = slide({
    name : "one_slider_practice",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present : [
    {type: "practice", item: "practice1"},
    {type: "practice", item: "practice2"}
    ],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
    // $(".err").hide();
    $(".hidden").hide();
    // $(".option").unbind("click");
    // $(".option").empty();
    $(".option").hide();


    this.stim = stim; //I like to store this information in the slide so I can record it later.

      exp.item = stim["item"]

      exp.video = '/<source src = "videos/' + exp.item + '.mp4" type="video/mp4"></source>'

      $("#practiceVideo").html(exp.video);
      $("#practiceVideo").load();
      document.getElementById("practiceVideo").onended = function() {     
          exp.startTrialDate = new Date();
          exp.startTrialTime = exp.startTrialDate.getTime()
        right()};
      function right() {
      $(".hidden").show()
      $(".option").show()
      }

     var order = _.shuffle(["True", "False"]);
     var response = {practiceOption1: order[0], practiceOption2: order[1]}
     var versionOrder = ["practiceOption1", "practiceOption2"];
        for (var i=0; i<2; i++) {
          var version = versionOrder[i]

          $("#" + versionOrder[i]).html('<img src="images/' + exp.item + order[i] + '.jpeg"" width = "220"></img>')
          $("#" + versionOrder[i]).html('<img src="images/' + exp.item + order[i] + '.jpeg"" width = "220"></img>')
          $("#" + version).hover(
                  function(){
                    $(this).fadeTo(10,0.5);   
                    },
                  function(){
                    $(this).fadeTo(10,1);       
                    });
          $('#' + version).click(function(choice) {
            return function() {
              $(".option").unbind("click");
              $(".option").empty();
              this.endTrialDate = new Date();
              this.endTrialTime = this.endTrialDate.getTime()
              exp.data_trials.push({
                "choice": choice,
                "response" : response[choice],
                "type" : "practice",
                "trialType" : stim["type"],
                "item" : exp.item,
                "slide_number" : exp.phase,
                "startTime" : exp.startTrialTime,
                "endTime" : this.endTrialTime,
                "responseTime" : this.endTrialTime - exp.startTrialTime
              });
              $(this).fadeTo(10,1) // unfade clicked image
              setTimeout(function(){
              _stream.apply(_s);
            }, 500); // lag after clicking
            }
          }(version));
    }
    }

  });
  
  


  slides.one_slider = slide({
    name : "one_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present : _.shuffle([
    {type: "test", item: "games", quantifierPosition: "subject"},
    {type: "test", item: "princesses", quantifierPosition: "object"},
    {type: "test", item: "iceCream", quantifierPosition: "subject"},
    {type: "test", item: "toys", quantifierPosition: "object"},
    {type: "test", item: "fish", quantifierPosition: "subject"},
    {type: "test", item: "puppies", quantifierPosition: "object"},
    {type: "control", item: "control1", quantifierPosition: "control"},
    {type: "control", item: "control2", quantifierPosition: "control"},
    {type: "control", item: "control3", quantifierPosition: "control"},
    {type: "control", item: "control4", quantifierPosition: "control"},
    {type: "control", item: "control5", quantifierPosition: "control"},
    {type: "control", item: "control6", quantifierPosition: "control"}
    ]),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
		// $(".err").hide();
		$(".hidden").hide();
    // $(".option").unbind("click");
    // $(".option").empty();
    $(".option").hide();


		this.stim = stim; //I like to store this information in the slide so I can record it later.

      exp.objectType = _.sample(["Set","Individual"]);
      exp.topicType = _.sample(["SubjectTopic","ObjectTopic"]);
      exp.item = stim["item"]
	  //exp.number = _.sample(["two"]);

      // exp.condition = exp.number + exp.context

      // exp.item = stim[exp.condition]["item"]

      frameCondition = "frame" + exp.objectType + exp.topicType

      exp.question = stim["question"]

      if (stim["type"] == "test") {
        exp.video = '/<source src = "videos/' + exp.item + exp.objectType + exp.topicType + '.mp4" type="video/mp4"></source>'
      } else {
        exp.video = '/<source src = "videos/' + exp.item + '.mp4" type="video/mp4"></source>'
      }

      

      $("#expVideo").html(exp.video);
  	  $("#expVideo").load();
  	  document.getElementById("expVideo").onended = function() {     
          exp.startTrialDate = new Date();
          exp.startTrialTime = exp.startTrialDate.getTime()
        right()};
  		function right() {
  			$(".hidden").show()
        $(".option").show()
  		}
      // this.init_sliders();
      // exp.sliderPost = null;	  //erase current slider value

      if (stim["type"] == "test") {
        var order = _.shuffle(["Surface", "Inverse"]);
      } else {
        var order = _.shuffle(["True", "False"]);
      }

	   
     var response = {option1: order[0], option2: order[1]}
     var versionOrder = ["option1", "option2"];
        for (var i=0; i<2; i++) {
          var version = versionOrder[i]

          $("#" + versionOrder[i]).html('<img src="images/' + exp.item + order[i] + '.jpeg"" width = "220"></img>')
          $("#" + versionOrder[i]).html('<img src="images/' + exp.item + order[i] + '.jpeg"" width = "220"></img>')
          $("#" + version).hover(
                  function(){
                    $(this).fadeTo(10,0.5);   
                    },
                  function(){
                    $(this).fadeTo(10,1);       
                    });
          $('#' + version).click(function(choice) {
            return function() {
              $(".option").unbind("click");
              $(".option").empty();
              this.endTrialDate = new Date();
              this.endTrialTime = this.endTrialDate.getTime()
              exp.data_trials.push({
                "choice": choice,
                "response" : response[choice],
                "type" : "trial",
                "objectType" : exp.objectType,
                "topicType" : exp.topicType,
                "trialType" : stim["type"],
                "quantifierPosition" : stim["quantifierPosition"],
                "item" : exp.item,
                "slide_number" : exp.phase,
                "startTime" : exp.startTrialTime,
                "endTime" : this.endTrialTime,
                "responseTime" : this.endTrialTime - exp.startTrialTime
              });
              $(this).fadeTo(10,1) // unfade clicked image
              setTimeout(function(){
              _stream.apply(_s);
            }, 500); // lag after clicking
            }
          }(version));
    }
    } //use exp.go() if and only if there is no "present" data.
  });
  

 

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        assess : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
		// selfreport : $("#selfreport").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
		  "justification" : exp.justify,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  repeatWorker = false;
  (function(){
      var ut_id = "scopeTVJT-fixed";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  //exp.condition = _.sample(["Cond 1"]); //can randomize between subject conditions here
  //exp.condition = _.sample(["Cond 1, Cond 2, Cond 3, Cond 4"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width,
    };
  //blocks of the experiment:
  // exp.structure=["i0", "instructions", "one_slider_practice", "pretrial", "one_slider", 'subj_info', 'thanks'];
  exp.structure=[
                "i0",
                "instructions",
                "one_slider_practice",
                "pretrial",
                "one_slider", 
                'subj_info', 
                'thanks'
                ];
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);
	
	//exp.nQs = 2;
  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
