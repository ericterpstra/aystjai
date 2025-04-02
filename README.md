# Are You Smarter Than Jen & Ian

In July of 2013, my sister-in-law, Jen, got married. To celebrate the occasion, I thought it best to create another family oriented game to commemorate the occasion. Jen and her husband-to-be are well known smarty-pantses, so I figured a quiz game would be highly appropriate. It also gave me a chance to brush up on my responsive CSS, and put my first (and only) jQuery plugin – jQuery VintageTxt – to the test.

The result was fairly successful. The interface is just a vanilla vintageTxt window with a row of buttons below. A smattering of media queries resizes the window and buttons and adjusts the font size. The brushed metal buttons are styled with CSS3 and derived from Simurai’s codepen sample. The game logic basically stemmed from stringing together functions with the onEnterKey or onFinishedTyping callbacks in the vintageTxt plugin, or click handler callbacks from one of the four action buttons. The game logic is pretty much all in aystjai/js/main.js and the data for the questions are stored as vars in aystjai/js/questions.js.

At one point, I had all the question data loaded into Parse.com and was loading it all in via the Parse SDK. I can’t quite recall why I decided to pull everything offline. I still ended up using Parse.com to store high score data (viewable here). The Footable library is used to display the high score data in a nice, responsive table. Everything ended up looking pretty nice on phones and tablets. It was pretty fun to show off at various points throughout the wedding weekend.

Hats of to Jen and Ian as well!

The game can be played at http://jenian.thebogstras.com

VintageTxt can be found at https://github.com/ericterpstra/jqVintageTxt
