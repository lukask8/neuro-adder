/**
 * Tester for one or more NN.
 *
 * Get a query from user and test the results with one or more NN.
 *
 * User input should be transcoded for NN format before NN execution.
 * Output from NN should be transcoded too.
 *
 * Use app-trainer.js for training one or more NN.
 *
 *
 * Todo
 * - More docs
 * - Error management
 *
 *
 * Version 1.0
 * - User input. Ask for two number to be added
 *
 * Version 0.3
 * - Better transcoding functions
 * - Pretty print
 *
 * Version 0.2
 * - From Brain to BrainJS
 * - Inquirer module
 *
 * Versione 0.1
 * - Some test
 */

/*******************************************************************************
 REQUIRED MUDULES
*******************************************************************************/
const brain = require('brain.js');      // NN library
const inquirer = require("inquirer");   // Prompt to user
const fs = require('fs');               // Read files

/*******************************************************************************
 Globals
*******************************************************************************/


/*******************************************************************************
 Functions
*******************************************************************************/
/**
 * transcodeToBinary
 * Transcode user input number to NN input format.
 * Transcode from a single numeric digit [0..9] to a binary rappresentation.
 *
 * Ex:
 *
 *  Input number = 3
 *
 *                        3
 *            0   1   2   |   4   5   6   7   8   9
 *            |   |   |       |   |   |   |   |   |
 *  Output = [0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0]
 *
 *
 * @param  {[number]} input_number a number from 0 to 9
 * @return {[array]}              an array []
 */
function transcodeToBinary(input_number){
  var transcoded = [];
  for (var i = 0 ; i<10; i++){
    transcoded[i] = (input_number == i) ? 1 : 0;
  }
  return transcoded;
}

/**
 * transcodeToDecimal
 * Transcode NN format to digit number
 * Normalized function = MAX(Input)
 *
 * Ex:
 *
 *  Input = [0.23, 0.1, 0.98, 0.1, 0.2, 0.02, 0.03, 0.05, 0.1, 0.1]
 *                       |
 *  MAX(Input)          0.98
 *                       |
 *  Input = [0   , 0  ,  1  , 0  , 0  , 0   , 0   , 0   , 0  , 0  ]
 *           |     |          |    |    |     |     |     |    |
 *           0     1     |    3    4    5     6     7     8    9
 *                       2
 *
 *  Output = 2
 *
 * Note:
 *  If you get an error on "..." token update your nodejs.
 *
 * @param  {[array]} input_binary an array of [description]
 * @return {[number]}              return a number
 */
function transcodeToDecimal(input_binary){
  var transcoded = 0;
  for (var i = 0 ; i<10; i++){
    transcoded = (input_binary[i] == Math.max(...input_binary)) ? i : transcoded;
  }
  return transcoded;
}

/*******************************************************************************
 MAIN
*******************************************************************************/
console.log("Testing NN from user input");

// Define one or more NN. Filename is used to load the NN from a json file.
var net_array = [];
net_array.push({ filename : 'h44-90kloop.nn', net : new brain.NeuralNetwork({ hiddenLayers: [40] })});
net_array.push({ filename : 'h80-90kloop.nn', net : new brain.NeuralNetwork({ hiddenLayers: [80] })});
net_array.push({ filename : 'h30-h30-90kloop.nn', net : new brain.NeuralNetwork({ hiddenLayers: [30,30] })});

// Load a NN from file
net_array.forEach(function(item){
  item.net.fromJSON(JSON.parse(fs.readFileSync(item.filename)));
});

// Ask for input with inquirer.
//
// First define a "prompt".  A "validate" function is applied to input.
var prompts = [
  {
    type: 'input',
    name: 'input1',
    message: 'Insert a number : ',
    validate: function (input) {
      var user_input = parseInt(input);
      if ((isNaN(user_input)) || (user_input<0) || (user_input>9)) {
        // Wrong input
        return 'You need to provide a number between 0 and 9';
      } else {
        // All right
        return true;
      }
    }
  }
]

// Execute a prompt. Notes that inquirer is an async library.

inquirer.prompt(prompts).then(function (answers) {
  // Read input from user and transcode to NN format
  var input_a =  parseInt(answers.input1);
  var input_a_transcoded = transcodeToBinary(input_a);

  inquirer.prompt(prompts).then(function (answers) {
    // Read another input from user and transcode to NN format
    var input_b = parseInt(answers.input1);
    var input_b_transcoded = transcodeToBinary(input_b);

    net_array.forEach(function(item){
      console.log("C = A + B. Computed by " + item.filename);
      console.log("A = ",input_a,"[ Transcoded as ", input_a_transcoded,"]");
      console.log("B = ",input_b,"[ Transcoded as ", input_b_transcoded,"]");

      // Execute NN
      var output_c = item.net.run(input_a_transcoded.concat(input_b_transcoded));

      // split output in two digit
      var output_c_binary_0 = output_c.slice(0,10) ;
      var output_c_binary_1 = output_c.slice(10) ;

      // Transcode output to "human".
      // Note that if first digit == 0 then don't print it at all.
      var output_digit_0 = (transcodeToDecimal(output_c_binary_0)== 0) ? "": 1;
      var output_digit_1 = transcodeToDecimal(output_c_binary_1);

      // Apply "toFixed" for pretty output
      for (var i=0;i<output_c_binary_0.length;i++) {output_c_binary_0[i]=parseFloat(output_c_binary_0[i].toFixed(3));}
      for (var i=0;i<output_c_binary_1.length;i++) {output_c_binary_1[i]=parseFloat(output_c_binary_1[i].toFixed(3));}

      // Print result
      console.log("C = ",output_digit_0  + "" +  output_digit_1,"[ Transcoded from ", output_c_binary_0,output_c_binary_1,"]");
      console.log("");
    });
  });
});


// All done
