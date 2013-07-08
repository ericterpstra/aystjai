var jenCategories = [
    {name:"Law", index:0},
    {name:"Archeology", index:2},
    {name:"World Travel", index:3},
    {name:"Cats", index:1}
];

var ianCategories = [
    {name:"Health & Medicine", index:5},
    {name:"Stringed Instruments", index:4},
    {name:"New England", index:6},
    {name:"Flying Discs", index:7}
];

var questions =  [
    {
        "Name": "Law",
        "Person": "Jen",
        "Questions": [
            {
                "Question": "How long was People of the State of California v. Orenthal James Simpson from opening statements to final verdict?",
                "1": "11",
                "2": "8",
                "3": "9",
                "4": "15",
                "correctAnswer": "1"
            },
            {
                "Question": "What was the name of the judge on Night Court?",
                "1": "John Larroquette",
                "2": "Harry Crane",
                "3": "Dan Fielding",
                "4": "Judge Mac",
                "correctAnswer": "2"
            },
            {
                "Question": "How many U.S. citizens are either jailed, imprisoned, paroled, or on probation? ",
                "1": "1 in 10",
                "2": "1 in 20",
                "3": "1 in 30",
                "4": "1 in 40",
                "correctAnswer": "3"
            },
            {
                "Question": "What year did the United Nations declare the internet a basic human right?",
                "1": "1998",
                "2": "2004",
                "3": "2008",
                "4": "2011",
                "correctAnswer": "4"
            },
            {
                "Question": "In which country does capital punishment occur most often?",
                "1": "China",
                "2": "The United States of America",
                "3": "Russia",
                "4": "Pakistan",
                "correctAnswer": "1"
            }
        ]
    },
    {
        "Name": "Cats",
        "Person": "Jen",
        "Questions": [
            {
                "Question": "Where are the majority of pet cats obtained?",
                "1": "Professional breeders",
                "2": "Pet stores",
                "3": "An animal shelter",
                "4": "Friends or family members",
                "correctAnswer": "4"
            },
            {
                "Question": "Which of the following is not a well-known feature of a Maine Coon cat?",
                "1": "Pointed ear tufts",
                "2": "Water resistant fur",
                "3": "An orange underbelly",
                "4": "Lionesque neck fur",
                "correctAnswer": "3"
            },
            {
                "Question": "A female cat will breed how many kittens per year, on average?",
                "1": "1 - 3",
                "2": "4 - 7",
                "3": "8 - 12",
                "4": "15 - 18",
                "correctAnswer": "3"
            },
            {
                "Question": "If a male cat is both orange and black, it is likely to be what?",
                "1": "deaf",
                "2": "sterile",
                "3": "feral",
                "4": "mute",
                "correctAnswer": "2"
            },
            {
                "Question": "What is a scientific term for harball?",
                "1": "Bezoar",
                "2": "Folliculous",
                "3": "Pilus Pile",
                "4": "Gastric Alopecia",
                "correctAnswer": "1"
            }
        ]
    },
    {
        "Name": "Archeology",
        "Person": "Jen",
        "Questions": [
            {
                "Question": "What was the first well-known capital of Ancient Egypt?",
                "1": "Giza",
                "2": "Memphis",
                "3": "Cairo",
                "4": "Nile",
                "correctAnswer": "2"
            },
            {
                "Question": "What substance is used for carbon dating?",
                "1": "Carbon-14",
                "2": "Carbon Dioxide",
                "3": "Carbon Fiber",
                "4": "Carbon Monoxide",
                "correctAnswer": "1"
            },
            {
                "Question": "Which of the following is NOT an archeological site in Sicily?",
                "1": "The Valley of the Temples",
                "2": "Syracuse",
                "3": "Selinute",
                "4": "Minoan Palace of Knossos",
                "correctAnswer": "4"
            },
            {
                "Question": "The Mesolithic Period in Europe occurred in which of the following time-spans?",
                "1": "33,000 BCE to 20,000 BCE",
                "2": "1,000 BCE & 1950",
                "3": "10,000 BCE & 5,000 BCE",
                "4": "18,000 BCE to 16,000 BCE",
                "correctAnswer": "3"
            },
            {
                "Question": "Lithic Reduction is used to do what?",
                "1": "Create stone tools",
                "2": "Disolve a variety of stone and minerals",
                "3": "Date artifacts",
                "4": "Cook plant material into and edible stew",
                "correctAnswer": "1"
            }
        ]
    },
    {
        "Name": "World Travel",
        "Person": "Jen",
        "Questions": [
            {
                "Question": "More tourists visit which country more than any other?",
                "1": "The U.S.A.",
                "2": "China",
                "3": "France",
                "4": "Italy",
                "correctAnswer": "3"
            },
            {
                "Question": "What is Uluru?",
                "1": "A rock in Australia",
                "2": "A valley in South Africa",
                "3": "A mountain in Uganda",
                "4": "A waterfall in Indonesia",
                "correctAnswer": "1"
            },
            {
                "Question": "About how many reports of lost luggage occur per year among airlies worldwide?",
                "1": "10 million",
                "2": "25 million",
                "3": "40 million",
                "4": "2 billion",
                "correctAnswer": "2"
            },
            {
                "Question": "What city is known as The Paris of the Middle East?",
                "1": "Dubai",
                "2": "Jerusalem",
                "3": "Ryiadh",
                "4": "Beirut",
                "correctAnswer": "4"
            },
            {
                "Question": "Ferdinand Magellan attempted to circumnavigate the world, but was killed in which country in 1521?",
                "1": "Argentina",
                "2": "South Africa",
                "3": "The Phillipines",
                "4": "Sri Lanka",
                "correctAnswer": "3"
            }
        ]
    },
    {
        "Name": "Stringed Instruments",
        "Person": "Ian",
        "Questions": [
            {
                "Question": "Which one of the following intervals is an example of a diminished fifth?",
                "1": "C - G",
                "2": "C - G#",
                "3": "C♭ - G",
                "4": "C - G♭",
                "correctAnswer": "4"
            },
            {
                "Question": "What is another name for a violin maker?",
                "1": "Stradivari",
                "2": "Luthier",
                "3": "Sommolier",
                "4": "Violinist",
                "correctAnswer": "2"
            },
            {
                "Question": "\"Ode to Joy\" is set to music in which famous piece?",
                "1": "Beethoven's 5th Symphony",
                "2": "Mozart's 40th Symphony",
                "3": "Beethoven's 9th Symphony",
                "4": "Mozart's 41st Symphony",
                "correctAnswer": "3"
            },
            {
                "Question": "Which of the following is NOT a fiddle?",
                "1": "Lyre",
                "2": "Octobass",
                "3": "Baryton",
                "4": "Cello",
                "correctAnswer": "1"
            },
            {
                "Question": "Which of the following is a device that can amplify the sound of a violin?",
                "1": "Inductive filter",
                "2": "Faraday amplifier",
                "3": "Transductive sensor",
                "4": "Piezoelectric pickup",
                "correctAnswer": "4"
            }
        ]
    },
    {
        "Name": "Health & Medicine",
        "Person": "Ian",
        "Questions": [
            {
                "Question": "The average person produces how much saliva in one day?",
                "1": "One cup",
                "2": "One gallon",
                "3": "One liter",
                "4": "One pint",
                "correctAnswer": "3"
            },
            {
                "Question": "Which is NOT a layer of the skin?",
                "1": "Stratum Corneum",
                "2": "Choroid",
                "3": "Squamous Cell",
                "4": "Basal Cell",
                "correctAnswer": "2"
            },
            {
                "Question": "On average, which hair color is associated with the highest density of hair growth on the head?",
                "1": "Brown",
                "2": "Black",
                "3": "Red",
                "4": "Blonde",
                "correctAnswer": "4"
            },
            {
                "Question": "What is the leading cause of blindness in the United States?",
                "1": "The Sun",
                "2": "Diabetes",
                "3": "Cataracts",
                "4": "Masturbation",
                "correctAnswer": "2"
            },
            {
                "Question": "What is the blood type most often requested by hospitals?",
                "1": "Type O",
                "2": "Type AB",
                "3": "Type A+",
                "4": "Type B-",
                "correctAnswer": "1"
            }
        ]
    },
    {
        "Name": "New England",
        "Person": "Ian",
        "Questions": [
            {
                "Question": "Who's family estate originally provided funding for Williams College in Williamstown, MA?",
                "1": "Wyatt Williams",
                "2": "Hank Williams",
                "3": "William Williams",
                "4": "Ephram Williams",
                "correctAnswer": "4"
            },
            {
                "Question": "Who of the following is not buried in the Granary Cemetary in Boston, MA?",
                "1": "Paul Revere",
                "2": "John Hancock",
                "3": "Benjamin Franklin",
                "4": "Samuel Adams",
                "correctAnswer": "3"
            },
            {
                "Question": "William Penn, who founded Pennsylvania, considered himself a: ",
                "1": "Quaker",
                "2": "Baptist ",
                "3": "Puritan",
                "4": "Catholic",
                "correctAnswer": "1"
            },
            {
                "Question": "The ashes of what circus animal are kept in the Tufts University athletic office?",
                "1": "Bear",
                "2": "Horse",
                "3": "Monkey",
                "4": "Elephant",
                "correctAnswer": "4"
            },
            {
                "Question": "Which one of the following sports was invented in Holyoke, Massachusetts?",
                "1": "American Football",
                "2": "Volleyball",
                "3": "Baseball",
                "4": "Tetherball",
                "correctAnswer": "2"
            }
        ]
    },
    {
        "Name": "Flying Disc",
        "Person": "Ian",
        "Questions": [
            {
                "Question": "A regulation Ultimate field is how long?",
                "1": "100 yards",
                "2": "100 feet",
                "3": "120 yards",
                "4": "100 meters",
                "correctAnswer": "3"
            },
            {
                "Question": "The predecessor to the Wham-O Frisbee was called what?",
                "1": "Pluto Platter",
                "2": "Wacky Wheel",
                "3": "Sailing Sammy",
                "4": "Fancy Floater",
                "correctAnswer": "1"
            },
            {
                "Question": "The 2010 World Ultimate Club Championships was held where?",
                "1": "Williamstown, MA",
                "2": "Helsinki, Finland",
                "3": "Atlanta, GA",
                "4": "Prague, Czech Republic",
                "correctAnswer": "4"
            },
            {
                "Question": "Which University hosted the first intercollegiate Ultimate match?",
                "1": "Princeton",
                "2": "Syracuse",
                "3": "Rutgers",
                "4": "Maryland",
                "correctAnswer": "3"
            },
            {
                "Question": "The idea for a mass-produced, flying-disc toy originated from what common object?",
                "1": "Plastic hubcap",
                "2": "Pie tin",
                "3": "Dinner plate",
                "4": "Boomerang",
                "correctAnswer": "2"
            }
        ]
    }
];

