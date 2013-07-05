;
$(function(){
    var JIQ = {
        el: $('#vintageTxtContainer'),

        buttons: [ '',
          $('#btn1'),
          $('#btn2'),
          $('#btn3'),
          $('#btn4')
        ],

        buttonHandlers : [ '',
            'noAction',
            'noAction',
            'noAction',
            'noAction'
        ],

        Data: {
            jenCategory : {},
            ianCategory : {},
            questions : [],
            currentQuestion: 0,
            answerKey : [],
            answers : [],
            timerStart : 0,
            timerEnd : 0,
            score : 0
        },

        init : function() {
            for (var i = 1; i < JIQ.buttons.length; i++ ) {
                JIQ.buttons[i].click(function(e, btn){
                    var btnValue =  +$(this).attr('data-value')
                    var action = JIQ.buttonHandlers[btnValue];
                    if(JIQ[action]) {
                        JIQ[action](btnValue)
                    } else {
                        JIQ.noAction(e);
                    }
                });
            }
            JIQ.begin();
        },

        /*
        * ******************************************
        *   **************************************
        *              PREGAME SEQUENCE
        *   **************************************
        * ******************************************
        */

        introText : [
            "WELCOME TO:",
            " ",
            '"ARE YOU SMARTER THAN JEN AND IAN?"',
            "2013 EDITION",
            " ",
            "PLEASE CHOOSE AN OPTION:",
            "1. TEST YOUR MENTAL FORTITUDE.",
            "2. VIEW HIGH SCORE LIST."
        ],

        begin : function() {
            this.el.vintageTxt({
                text: JIQ.introText,
                textSpeed: 1,
                linePause: 10,
                promptEnabled: false
            });

            JIQ.setButtonAction(1, 'startGame', true);
            JIQ.setButtonAction(2, 'viewHighScores', false);
        },

        startGame : function() {
            JIQ.el.vintageTxt('playMany',[
                ["There object of this game is to",
                 "answer 10 questions as quickly as possible.",
                 "Pick a category from each of",
                 "Jen and Ian's areas of expertise.",
                 "Press 1 to continue."
                ]
            ]);
            JIQ.setButtonAction(1, 'selectJenCategory', true);
        },

        selectJenCategory : function() {
            var choices = [];
            $(jenCategories).each(function(i, item){
                choices.push((i+1).toString() + ". " + item.name);
                if(choices.length === jenCategories.length){
                    JIQ.el.vintageTxt('playMany',[choices]);
                    JIQ.setButtonAction(1, 'setJenCategory', true);
                    JIQ.setButtonAction(2, 'setJenCategory', false);
                    JIQ.setButtonAction(3, 'setJenCategory', false);
                    JIQ.setButtonAction(4, 'setJenCategory', false);
                }
            });
        },

        setJenCategory : function(num) {
            JIQ.Data.jenCategory = jenCategories[+num - 1];
            JIQ.selectIanCategory();
        },

        selectIanCategory : function() {
            var choices = [];
            $(ianCategories).each(function(i, item){
                choices.push((i+1).toString() + ". " + item.name);
                if(choices.length === ianCategories.length){
                    JIQ.el.vintageTxt('playMany',[choices]);
                    JIQ.setButtonAction(1, 'setIanCategory', true);
                    JIQ.setButtonAction(2, 'setIanCategory', false);
                    JIQ.setButtonAction(3, 'setIanCategory', false);
                    JIQ.setButtonAction(4, 'setIanCategory', false);
                }
            });
        },

        setIanCategory : function(num) {
            JIQ.Data.ianCategory = ianCategories[+num - 1];
            JIQ.readyPlayerOne();
        },

        readyPlayerOne : function() {
            JIQ.el.vintageTxt('reset',[
                "The categories you chose are:",
                "Jen - " + JIQ.Data.jenCategory.name,
                "Ian - " + JIQ.Data.ianCategory.name,
                " ",
                "Get ready to answer some questions!",
                "Press 1 when ready."
            ]);
            JIQ.setButtonAction(1, 'startQuestioning', true);
        },

        /*
         * ******************************************
         *   **************************************
         *              The Actual Quiz
         *   **************************************
         * ******************************************
         */

        startQuestioning : function() {
            console.log('start questions.');
            var jenQuestions = questions[JIQ.Data.jenCategory.index].Questions;
            var ianQuestions = questions[JIQ.Data.ianCategory.index].Questions;
            JIQ.Data.questions = jenQuestions.concat(ianQuestions);
            $(JIQ.Data.questions).each(function(){
                JIQ.Data.answerKey.push(this.correctAnswer)
            });

            JIQ.askQuestion(0);
        },

        askQuestion : function(qNum) {

            var texts = [];

            JIQ.clearButtonHandlers();

            texts.push(JIQ.Data.questions[qNum].Question);
            texts.push(" ");
            texts.push("1. " + JIQ.Data.questions[qNum]["1"]);
            texts.push("2. " + JIQ.Data.questions[qNum]["2"]);
            texts.push("3. " + JIQ.Data.questions[qNum]["3"]);
            texts.push("4. " + JIQ.Data.questions[qNum]["4"]);

            JIQ.Data.currentQuestion = qNum;

            JIQ.el.vintageTxt('reset'
                ,texts
                ,{onFinishedTyping: JIQ.startAnswerTime}
            );

        },

        startAnswerTime : function(){
            JIQ.setButtonAction(1, 'answerQuestion', true);
            JIQ.setButtonAction(2, 'answerQuestion', false);
            JIQ.setButtonAction(3, 'answerQuestion', false);
            JIQ.setButtonAction(4, 'answerQuestion', false);
            JIQ.Data.timerStart = Date.now();

        },

        answerQuestion : function(aNum) {
            JIQ.Data.timerEnd = Date.now();
            var nextQuestionNum = JIQ.Data.currentQuestion + 1;
            var correctAnswer = JIQ.Data.questions[JIQ.Data.currentQuestion].correctAnswer;
            var answerTime = (JIQ.Data.timerEnd - JIQ.Data.timerStart) / 1000;
            var answerBonus = 0;

            // Tabulate score
            if( aNum.toString() === correctAnswer ) {
                if(answerTime <= 10){
                    answerBonus = (100 / (answerTime / 10 * 4)) | 0;
                }
                JIQ.Data.score += (100 + answerBonus);
            }

            if ( nextQuestionNum >= JIQ.Data.questions.length ) {
                console.log("Quiz is over. Score is " + JIQ.Data.score)
                JIQ.endQuiz();
            } else {
                // Next question
                JIQ.askQuestion(nextQuestionNum);
            }
        },

        endQuiz : function() {
            JIQ.clearButtonHandlers();
            JIQ.el.vintageTxt('reset',[
                "Congratulations!",
                "You scored " + JIQ.Data.score.toString(),
                " ",
                "1. Start Again",
                "2. Main Menu"
            ],{onFinishedTyping: null});
            JIQ.setButtonAction(1, 'selectJenCategory', false);
            JIQ.setButtonAction(2, 'begin', false);
        },

        /*
         * ******************************************
         *   **************************************
         *              OTHER STUFF
         *   **************************************
         * ******************************************
         */

        viewHighScores : function() {
           console.log("View High Scores");
        },

        noAction : function(e) {
            console.log("There is no action for this button.");
        },

        setButtonAction : function(btnNum, action, clearAll) {
            if(clearAll) JIQ.clearButtonHandlers();
            JIQ.buttonHandlers[btnNum] = action;
            console.log('Button ' + btnNum + ' assigned to perform ' + action);
        },

        clearButtonHandlers : function() {
            console.log('Button actions cleared.')
            JIQ.buttonHandlers = [ '',
                'noAction',
                'noAction',
                'noAction',
                'noAction'
            ];
        }
    }

    JIQ.init();
});
