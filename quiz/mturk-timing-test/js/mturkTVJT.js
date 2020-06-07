/// Slides ///
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

  slides.exercise1 = slide({
    name : "exercise1",
    button : function() {
      exp.go();
    }
  });

  slides.instructions2 = slide({
    name : "instructions2",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.exercise2 = slide({
    name : "exercise2",
    button : function() {
      exp.go();
    }
  });

  slides.instructions3 = slide({
    name : "instructions3",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.exercise3 = slide({
    name : "exercise3",
    button : function() {
      exp.go();
    }
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
                "exercise1",
				        "instructions2",
				        "exercise2",
                "instructions3",
                "exercise3",
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

/// Hide&Show Q&R ///
function hideR() {
    var y = document.getElementById("scoreDIV");
    var z = document.getElementById("continueDIV");
    y.style.display = "none";
    z.style.display = "none";
}
function hideQ_showR() {
  var x = document.getElementById("questionDIV");
  var y = document.getElementById("scoreDIV");
  var z = document.getElementById("continueDIV");

 x.style.display = "none";
 y.style.display = "block";
 z.style.display = "block";

}

//for second quiz
function hideR2() {
	var y = document.getElementById("scoreDIV2");
    var z = document.getElementById("continueDIV2");
    y.style.display = "none";
    z.style.display = "none";
}
function hideQ_showR2() {
  var x = document.getElementById("questionDIV2");
  var y = document.getElementById("scoreDIV2");
  var z = document.getElementById("continueDIV2");

 x.style.display = "none";
 y.style.display = "block";
 z.style.display = "block";

}

//for third quiz
function hideR3() {
	var y = document.getElementById("scoreDIV3");
    var z = document.getElementById("continueDIV3");
    y.style.display = "none";
    z.style.display = "none";
}
function hideQ_showR3() {
  var x = document.getElementById("questionDIV3");
  var y = document.getElementById("scoreDIV3");
  var z = document.getElementById("continueDIV3");

 x.style.display = "none";
 y.style.display = "block";
 z.style.display = "block";

}

/// Score ///
var numQues = 10;
var numChoi = 4;
var answers = new Array(10);

answers[0] = "D: ORATION is to CHAT as BANQUET is to snack";
answers[1] = "C: INCLEMENT is to CLEAR as PERTINENT is to irrelevant";
answers[2] = "C: WHEAT is to FLOUR as GRAPE is to wine";
answers[3] = "D: COMMON is to IRON as RARE is to diamond";
answers[4] = "D: VICTORY is to CONTEST as KNOWLEDGE is to study";
answers[5] = "B: DIAGNOSIS is to ANALYSIS as THESIS is to research";
answers[6] = "B: MARE is to FILLY as KING is to prince";
answers[7] = "C: ARMY is to RECRUIT as RELIGION is to convert";
answers[8] = "A: OPULENCE is to LUXURY as POVERTY is to penury";
answers[9] = "B: WILL is to CODICIL as CONSTITUTION is to amendment";

var answers2 = new Array(10);
answers2[0] = "B: STOVE:KITCHEN :: sink:bathroom";
answers2[1] = "C: CELEBRATE:MARRIAGE :: lament:bereavement";
answers2[2] = "C: MARIGARINE:BUTTER :: nylon:silk";
answers2[3] = "B: NEGLIGENT:REQUIREMENT :: remiss: duty";
answers2[4] = "C: GAZELLE:SWIFT :: swan:graceful";
answers2[5] = "A: IGNOMINY:DISLOYALTY :: fame:heroism";
answers2[6] = "D: SATURNINE:MERCURIAL :: crucial:trivial";
answers2[7] = "C: ORANGE:MARMELADE :: tomatoes:ketchup";
answers2[8] = "B: BANISHED:APOSTATE :: welcome:ally";
answers2[9] = "D: CIRCLE:SPHERE :: wheel:orange";

var answers3 = new Array(10);
answers3[0] = "C: Option C";
answers3[1] = "D: Option D";
answers3[2] = "D: Option D";
answers3[3] = "B: Option B";
answers3[4] = "C: Option C";
answers3[5] = "A: Option A";
answers3[6] = "A: Option A";
answers3[7] = "D: Step D";
answers3[8] = "A: Option A";
answers3[9] = "C: Option C";

function getScore(form) {
  var score = 0;
  var currElt;
  var currSelection;
  for (i=0; i<numQues; i++) {
    currElt = i*numChoi;
    for (j=0; j<numChoi; j++) {
      currSelection = form.elements[currElt + j];
      if (currSelection.checked) {
        if (currSelection.value == answers[i]) {
          score++;
          break;
        }
      }
    }
  }
  score = Math.round(score/numQues*100);
  form.percentage.value = score + "%";
  var correctAnswers = "";
  for (i=1; i<=numQues; i++) {
    correctAnswers += i + ". " + answers[i-1] + "\r\n";
  }
  form.solutions.value = correctAnswers;
}

function getScore1(form) {
  var score = 0;
  var currElt;
  var currSelection;
  for (i=0; i<numQues; i++) {
    currElt = i*numChoi;
    for (j=0; j<numChoi; j++) {
      currSelection = form.elements[currElt + j];
      if (currSelection.checked) {
        if (currSelection.value == answers2[i]) {
          score++;
          break;
        }
      }
    }
  }
  score = Math.round(score/numQues*100);
  form.percentage.value = score + "%";
  var correctAnswers = "";
  for (i=1; i<=numQues; i++) {
    correctAnswers += i + ". " + answers2[i-1] + "\r\n";
  }
  form.solutions.value = correctAnswers;
}

function getScore2(form) {
  var score = 0;
  var currElt;
  var currSelection;
  for (i=0; i<numQues; i++) {
    currElt = i*numChoi;
    for (j=0; j<numChoi; j++) {
      currSelection = form.elements[currElt + j];
      if (currSelection.checked) {
        if (currSelection.value == answers3[i]) {
          score++;
          break;
        }
      }
    }
  }
  score = Math.round(score/numQues*100);
  form.percentage.value = score + "%";
  var correctAnswers = "";
  for (i=1; i<=numQues; i++) {
    correctAnswers += i + ". " + answers3[i-1] + "\r\n";
  }
  form.solutions.value = correctAnswers;
}
