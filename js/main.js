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
            name: "",
            score : 0,
            correct: 0
        },

        P : {
            Board : {},
            query : {}
        },

        init : function() {

            // INIT BUTTON CLICK HANDLERS
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

            // SET UP PARSE
            Parse.initialize("hZ0hl9heShCM59t71ycXjmkQzrbL7F8lafLSqmmT", "oND7OhOLY1XSa59D7LlOdMbR46XT5CsLEeimJD1Q");
            JIQ.P.Board = Parse.Object.extend('Scores');
            JIQ.P.query = new Parse.Query(JIQ.P.Board);
            JIQ.P.query.descending('score');
            JIQ.P.query.limit(12);


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
            "1. BEGIN THE TRIVIA!",
            "2. VIEW HIGH SCORE LIST.",
            "3. WHAT IS THIS?",
            "4. CATS."
        ],

        begin : function() {
            this.el.vintageTxt({
                text: JIQ.introText,
                textSpeed: 40,
                linePause: 300,
                promptEnabled: false
            });

            JIQ.setButtonAction(1, 'startGame', true);
            JIQ.setButtonAction(2, 'viewHighScores', false);
            JIQ.setButtonAction(3, 'aboutGame', false);
            JIQ.setButtonAction(4, 'catFact',false);
            //JIQ.setButtonAction(4, 'endQuiz',false);
        },

        startGame : function() {
            JIQ.el.vintageTxt('playMany',[
                ["The object of this game is to",
                 "answer 10 questions as quickly as possible.",
                 "Pick a category from each of",
                 "Jen and Ian's areas of expertise.",
                 "Press 1 to continue."
                ]
            ]);
            JIQ.setButtonAction(1, 'selectJenCategory', true);
        },

        selectJenCategory : function() {
					  JIQ.resetData();
            var choices = ["Jen's Categories:"];
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
            var choices = ["Ian's Categories:"];
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
                JIQ.Data.correct += 1;
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
                "And we're done!",
                "You got " + JIQ.Data.correct + " / 10 correct.",
                "You scored " + JIQ.Data.score.toString(),
                " ",
                "Please Enter Your Name Below",
								"(Tap the screen on mobile devices)",
								"Then press 1 to continue"
            ],
            {
                onFinishedTyping: function(){$('#vtxt_ContentInput').focus()},
                promptEnabled: true,
                onEnterKey: JIQ.acceptFinalScore
            });
            JIQ.setButtonAction(1, 'acceptFinalScore', true);
        },

        acceptFinalScore : function(data) {
            JIQ.Data.name = $('#vtxt_ContentInput').val();
            JIQ.saveScoreToParse();

            JIQ.clearButtonHandlers();
            JIQ.el.vintageTxt('reset',[
                "Thanks " + JIQ.Data.name,
                "Please choose what to do next:",
                "1. View High Scores",
                "2. More Trivia!",
                "3. Main Menu"
            ],
            {
                onFinishedTyping: null,
                promptEnabled: false,
                onEnterKey: null
            });
            JIQ.setButtonAction(1, 'viewHighScores', false);
            JIQ.setButtonAction(2, 'selectJenCategory', false);
            JIQ.setButtonAction(3, 'begin', false);
        },

        saveScoreToParse : function(){
            var gameScore = new JIQ.P.Board();
            gameScore.set('name', JIQ.Data.name);
            gameScore.set('score', JIQ.Data.score);
            gameScore.set('correct', JIQ.Data.correct);
            gameScore.set('ianCategory', JIQ.Data.ianCategory.name);
            gameScore.set('jenCategory', JIQ.Data.jenCategory.name);

            gameScore.save(null, {
                success: function(gameScore) {
                    console.log("Score Saved to Leaderboard");
                },
                error: function(gameScore, error) {
                    console.log("Failed to Save Score. " + error.description);
                }
            });
        },

        /*
         * ******************************************
         *   **************************************
         *              OTHER STUFF
         *   **************************************
         * ******************************************
         */

        aboutGame : function(){
            JIQ.el.vintageTxt('reset',[
                "This game is a fun little",
                "Diversion for friends and family",
                "of Jen Boger and Ian Warrington",
                "to catch a glimpse of what they",
                "find interesting, and also",
                "what they might have learned",
                "when earning that massive pile",
                "of college degrees.",
                " ",
                "1. Return to Main Menu"
            ]);
            JIQ.setButtonAction(1, 'begin', true);
        },

        catFact : function() {
            JIQ.el.vintageTxt('reset',[

                 '             MMMM88&&&&&&&       * ',
                 ' *           MMM88&&&&&&&&         ',
                 '             MMM88&&&&&&&&         ',
                 '             `MMM88&&&&&&`         ',
                 '               `MMM8&&&`      *    ',
                 '      |\\___/|     /\\___/\\       ',
                 '      )     (     )    ~( .        ',
                 '     =\\     /=   =\\~    /=       ',
                 '       )===(       ) ~ (           ',
                 '      /     \\     /     \\        ',
                 '      |     |     ) ~   (          ',
                 '     /       \\   /     ~ \\       ',
                 '     \\       /   \\~     ~/       ',
                 ' _/\\_/\\__  _/_/\\_/\\__~__/_/\\_/',
                 ' |  |  |( (  |  |  | ))  |  |  |  |',
                 ' |  |  | ) ) |  |  |//|  |  |  |  |',
                 ' |  |  |(_(  |  |  (( |  |  |  |  |',
                 ' |  |  |  |  |  |  |\\)|  |  |  |  ',
                 '  *+*+* JEN & IAN 07/13/2013 *+*+* ',
                '1. Return to Main Menu'
            ]);
            JIQ.setButtonAction(1, 'begin', true);
        },

        viewHighScores : function() {
            console.log("View High Scores");
            JIQ.P.query.find({
                success : function(results) {
                    if(results.length > 0) {
                        JIQ.displayHighScores(results);
                    }
                },

                error : function(error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },

        displayHighScores : function(scores) {
            var texts = ["   Name           Correct  Score"];

            scores.forEach(function(el, i){
                var name = JIQ.padOrTruncate(el.get('name'),15);

                texts.push( (i + 1).toString()
                    + ". " + name
                    + "  " + el.get('correct') + "/10    "
                    + " "  + el.get('score')
                );
            });
            texts.push(" ");
            texts.push("Press 1 for Main Menu");

            JIQ.el.vintageTxt('reset',texts);
            JIQ.setButtonAction(1, 'begin', true);
        },

        padOrTruncate : function(word, len) {
            var retWord = '';
            var spaces = '';
            for (var i = 0; i <= len; i++){
                spaces += ' ';
            }

            if(name.length > len) {
                retWord = word.substr(0, len-1);
            } else {
                retWord = (word + spaces).slice(0,len-1);
            }
            return retWord;
        },

        resetData : function() {
            JIQ.Data = {
                jenCategory : {},
                ianCategory : {},
                questions : [],
                currentQuestion: 0,
                answerKey : [],
                answers : [],
                timerStart : 0,
                timerEnd : 0,
                name: "",
                score : 0,
                correct: 0
            };
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
