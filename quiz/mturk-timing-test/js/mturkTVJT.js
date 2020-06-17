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

slides.q1_1 = slide({
    name : "q1_1",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
slides.q1_2 = slide({
    name : "q1_2",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  slides.q1_3 = slide({
      name : "q1_3",
      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    });
    slides.q1_4 = slide({
        name : "q1_4",
        button : function() {
          exp.go(); //use exp.go() if and only if there is no "present" data.
        }
      });
      slides.q1_5 = slide({
          name : "q1_5",
          button : function() {
            exp.go(); //use exp.go() if and only if there is no "present" data.
          }
        });

  slides.instructions2 = slide({
    name : "instructions2",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.q2_1 = slide({
      name : "q2_1",
      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    });
  slides.q2_2 = slide({
      name : "q2_2",
      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    });
    slides.q2_3 = slide({
        name : "q2_3",
        button : function() {
          exp.go(); //use exp.go() if and only if there is no "present" data.
        }
      });
      slides.q2_4 = slide({
          name : "q2_4",
          button : function() {
            exp.go(); //use exp.go() if and only if there is no "present" data.
          }
        });
        slides.q2_5 = slide({
            name : "q2_5",
            button : function() {
              exp.go(); //use exp.go() if and only if there is no "present" data.
            }
          });



  slides.instructions3 = slide({
    name : "instructions3",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.q3_1 = slide({
      name : "q3_1",
      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    });
  slides.q3_2 = slide({
      name : "q3_2",
      button : function() {
        exp.go(); //use exp.go() if and only if there is no "present" data.
      }
    });
    slides.q3_3 = slide({
        name : "q3_3",
        button : function() {
          exp.go(); //use exp.go() if and only if there is no "present" data.
        }
      });
      slides.q3_4 = slide({
          name : "q3_4",
          button : function() {
            exp.go(); //use exp.go() if and only if there is no "present" data.
          }
        });
        slides.q3_5 = slide({
            name : "q3_5",
            button : function() {
              exp.go(); //use exp.go() if and only if there is no "present" data.
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
				        "q1_1","q1_2", "q1_3", "q1_4", "q1_5",
				        "instructions2",
                "q2_1","q2_2", "q2_3", "q2_4", "q2_5",
                "instructions3",
                "q3_1","q3_2", "q3_3", "q3_4", "q3_5",
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
//function hideR() {
//    var y = document.getElementById("scoreDIV");
//    var z = document.getElementById("continueDIV");
//    y.style.display = "none";
//    z.style.display = "none";
//}
function hideQ_showR1_1() {
  var x = document.getElementById("questionDIV");
//  var y = document.getElementById("scoreDIV");
//  var z = document.getElementById("continueDIV");

 x.style.display = "none";
// y.style.display = "block";
 //z.style.display = "block";

}
function hideQ_showR1_2() {
  var x = document.getElementById("questionDIV1_2");

 x.style.display = "none";

}
function hideQ_showR1_3() {
  var x = document.getElementById("questionDIV1_3");

 x.style.display = "none";

}
function hideQ_showR1_4() {
  var x = document.getElementById("questionDIV1_4");

 x.style.display = "none";

}
function hideQ_showR1_5() {
  var x = document.getElementById("questionDIV1_5");

 x.style.display = "none";

}


// second exercise hide-function //
function hideQ_showR2_1() {
  var x = document.getElementById("questionDIV2_1");

 x.style.display = "none";

}
function hideQ_showR2_2() {
  var x = document.getElementById("questionDIV2_2");

 x.style.display = "none";

}
function hideQ_showR2_3() {
  var x = document.getElementById("questionDIV2_3");

 x.style.display = "none";

}
function hideQ_showR2_4() {
  var x = document.getElementById("questionDIV2_4");

 x.style.display = "none";

}
function hideQ_showR2_5() {
  var x = document.getElementById("questionDIV2_5");

 x.style.display = "none";

}

// third exercise hide-function //
function hideQ_showR3_1() {
  var x = document.getElementById("questionDIV3_1");

 x.style.display = "none";

}
function hideQ_showR3_2() {
  var x = document.getElementById("questionDIV3_2");

 x.style.display = "none";

}
function hideQ_showR3_3() {
  var x = document.getElementById("questionDIV3_3");

 x.style.display = "none";

}
function hideQ_showR3_4() {
  var x = document.getElementById("questionDIV3_4");

 x.style.display = "none";

}
function hideQ_showR3_5() {
  var x = document.getElementById("questionDIV3_5");

 x.style.display = "none";

}



/// exercise 1 ///
function myFunctionClick(){
  var button = document.getElementById("showAnswer");
   button.disabled = false;
}
function myFunctionClick1_2(){
  var button = document.getElementById("showAnswer1_2");
   button.disabled = false;
}
function myFunctionClick1_3(){
  var button = document.getElementById("showAnswer1_3");
   button.disabled = false;
}
function myFunctionClick1_4(){
  var button = document.getElementById("showAnswer1_4");
   button.disabled = false;
}
function myFunctionClick1_5(){
  var button = document.getElementById("showAnswer1_5");
   button.disabled = false;
}
var Score = 0;
function myFunctionAnswer1_1() {
  var answer = document.getElementById("D: ORATION is to CHAT as BANQUET is to snack");
  var cont = document.getElementById("continue");

  if (answer.checked == true){
    text1_1.style.display = "block";
	Score = Score + 1;
  } else {
     textf1_1.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer1_2(){
	var answer = document.getElementById("C: INCLEMENT is to CLEAR as PERTINENT is to irrelevant");
  var cont = document.getElementById("continue1_2");

  if (answer.checked == true){
    text1_2.style.display = "block";
	Score = Score + 1;
  } else {
     textf1_2.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer1_3(){
	var answer = document.getElementById("C: WHEAT is to FLOUR as GRAPE is to wine");
  var cont = document.getElementById("continue1_3");

  if (answer.checked == true){
    text1_3.style.display = "block";
	Score = Score + 1;
  } else {
     textf1_3.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer1_4(){
	var answer = document.getElementById("D: COMMON is to IRON as RARE is to diamond");
  var cont = document.getElementById("continue1_4");

  if (answer.checked == true){
    text1_4.style.display = "block";
	Score = Score + 1;
  } else {
     textf1_4.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer1_5(){
	var answer = document.getElementById("D: VICTORY is to CONTEST as KNOWLEDGE is to study");
  var cont = document.getElementById("continue1_5");

  if (answer.checked == true){
    text1_5.style.display = "block";
	Score = Score + 1;
  } else {
     textf1_5.style.display = "block";
  }
  cont.disabled = false;
}

/// exercise 2 ///
function myFunctionClick2_1(){
  var button = document.getElementById("showAnswer2");
   button.disabled = false;
}
function myFunctionClick2_2(){
  var button = document.getElementById("showAnswer2_2");
   button.disabled = false;
}
function myFunctionClick2_3(){
  var button = document.getElementById("showAnswer2_3");
   button.disabled = false;
}
function myFunctionClick2_4(){
  var button = document.getElementById("showAnswer2_4");
   button.disabled = false;
}
function myFunctionClick2_5(){
  var button = document.getElementById("showAnswer2_5");
   button.disabled = false;
}
var Score2 = 0;
function myFunctionAnswer2_1() {
  var answer = document.getElementById("B: STOVE:KITCHEN :: sink:bathroom");
  var cont = document.getElementById("continue2");

  if (answer.checked == true){
    text2_1.style.display = "block";
	Score2 = Score2 + 1;
  } else {
     textf2_1.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer2_2(){
	var answer = document.getElementById("C: CELEBRATE:MARRIAGE :: lament:bereavement");
  var cont = document.getElementById("continue2_2");

  if (answer.checked == true){
    text2_2.style.display = "block";
	Score2 = Score2 + 1;
  } else {
     textf2_2.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer2_3(){
	var answer = document.getElementById("C: MARIGARINE:BUTTER :: nylon:silk");
  var cont = document.getElementById("continue2_3");

  if (answer.checked == true){
    text2_3.style.display = "block";
	Score2 = Score2 + 1;
  } else {
     textf2_3.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer2_4(){
	var answer = document.getElementById("B: NEGLIGENT:REQUIREMENT :: remiss: duty");
  var cont = document.getElementById("continue2_4");

  if (answer.checked == true){
    text2_4.style.display = "block";
	Score2 = Score2 + 1;
  } else {
     textf2_4.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer2_5(){
	var answer = document.getElementById("C: GAZELLE:SWIFT :: swan:graceful");
  var cont = document.getElementById("continue2_5");

  if (answer.checked == true){
    text2_5.style.display = "block";
	Score2 = Score2 + 1;
  } else {
     textf2_5.style.display = "block";
  }
  cont.disabled = false;
}


/// exercise 3 ///
function myFunctionClick3_1(){
  var button = document.getElementById("showAnswer3");
   button.disabled = false;
}
function myFunctionClick3_2(){
  var button = document.getElementById("showAnswer3_2");
   button.disabled = false;
}
function myFunctionClick3_3(){
  var button = document.getElementById("showAnswer3_3");
   button.disabled = false;
}
function myFunctionClick3_4(){
  var button = document.getElementById("showAnswer3_4");
   button.disabled = false;
}
function myFunctionClick3_5(){
  var button = document.getElementById("showAnswer3_5");
   button.disabled = false;
}
var Score3 = 0;
function myFunctionAnswer3_1() {
  var answer = document.getElementById("C: Option C");
  var cont = document.getElementById("continue3");

  if (answer.checked == true){
    text3_1.style.display = "block";
	Score3 = Score3 + 1;
  } else {
     textf3_1.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer3_2(){
	var answer = document.getElementById("D: Option D");
  var cont = document.getElementById("continue3_2");

  if (answer.checked == true){
    text3_2.style.display = "block";
	Score3 = Score3 + 1;
  } else {
     textf3_2.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer3_3(){
	var answer = document.getElementById("D: Option D");
  var cont = document.getElementById("continue3_3");

  if (answer.checked == true){
    text3_3.style.display = "block";
	Score3 = Score3 + 1;
  } else {
     textf3_3.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer3_4(){
	var answer = document.getElementById("B: Option B");
  var cont = document.getElementById("continue3_4");

  if (answer.checked == true){
    text3_4.style.display = "block";
	Score3 = Score3 + 1;
  } else {
     textf3_4.style.display = "block";
  }
  cont.disabled = false;
}
function myFunctionAnswer3_5(){
	var answer = document.getElementById("C: Option C");
  var cont = document.getElementById("continue3_5");

  if (answer.checked == true){
    text3_5.style.display = "block";
	Score3 = Score3 + 1;
  } else {
     textf3_5.style.display = "block";
  }
  cont.disabled = false;
}



/// Score ///
var numQues = 5;
var numChoi = 4;
var answers = new Array(5);

answers[0] = "D: ORATION is to CHAT as BANQUET is to snack";
answers[1] = "C: INCLEMENT is to CLEAR as PERTINENT is to irrelevant";
answers[2] = "C: WHEAT is to FLOUR as GRAPE is to wine";
answers[3] = "D: COMMON is to IRON as RARE is to diamond";
answers[4] = "D: VICTORY is to CONTEST as KNOWLEDGE is to study";

var answers2 = new Array(5);
answers2[0] = "B: STOVE:KITCHEN :: sink:bathroom";
answers2[1] = "C: CELEBRATE:MARRIAGE :: lament:bereavement";
answers2[2] = "C: MARIGARINE:BUTTER :: nylon:silk";
answers2[3] = "B: NEGLIGENT:REQUIREMENT :: remiss: duty";
answers2[4] = "C: GAZELLE:SWIFT :: swan:graceful";

var answers3 = new Array(5);
answers3[0] = "C: Option C";
answers3[1] = "D: Option D";
answers3[2] = "D: Option D";
answers3[3] = "B: Option B";
answers3[4] = "C: Option C";

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
