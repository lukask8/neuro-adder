/**
 * Trainer for one or more NN.
 *
 * Get data from a CSV file with columns for input and output.
 *
 * About CSV
 * CSV should be formatted with headers and "," as column separator.
 * Values must be formatted in UK standard (es 1.0)
 * Columns from 1 to "input_cols_len" are used as input for NN
 * Columns from "input_cols_len+1" to output_cols_len are used as output for NN
 *
 * CSV reading is not optimized. Use fast-csv module if you need more.
 *
 * Version 1.0
 * - First public version
 * - All done without fast-csv
 * - Better docs
 * - brain.js module
 * - Remove unnecessary modules
 *
 * Version 0.2
 * - callback for realtime monitoring
 *
 * Version 0.1
 * - brain module
 * - fast-csv module
 */

/*******************************************************************************
 REQUIRED MUDULES
*******************************************************************************/
const brain = require('brain.js');
const fs = require('fs');

/*******************************************************************************
 Globals
*******************************************************************************/
var data_training_set_filename = "data-training-set-cutted.csv";
var input_cols_len = 20;      // number of columns for input
var output_cols_len = 20;     // number of columns for output
var training_data = [];

/*******************************************************************************
 Functions
*******************************************************************************/

/**
 * This is a callback to print logs during training NN
 *
 * @param  {[type]} data {number of interaction and error}
 */
function trainingLog(data){
  console.log(data["iterations"] +") Error = "+ data["error"]);
}

/*******************************************************************************
 MAIN
*******************************************************************************/

console.log("Training set from file: " + data_training_set_filename);

// Read a CSV for training set.
var rows = fs.readFileSync(data_training_set_filename).toString().split('\n');

// Use slice(1,X) to remove headers and last "\n"
var rows = rows.slice(1,rows.length-1);

// Get training data from a CSV file
rows.forEach(function (line) {
    // split input and output cols
    var cells = line.split(',');
    var input_cells = cells.slice(0,input_cols_len);
    var output_cells = cells.slice(input_cols_len,input_cols_len+output_cols_len);

    // convert values from string to number
    for (var i=0;i<input_cells.length;i++) {
      input_cells[i] = parseFloat(input_cells[i]);
    }

    for (var i=0;i<output_cells.length;i++) {
      output_cells[i] = parseFloat(output_cells[i]);
    }

    // NN accept a trainer object like {input: [0.1 , 0.1, ...], output: [0.0 , .. ,0.2]}
    training_data.push({"input" : input_cells , "output" : output_cells});
});

// Now you have all training data

// Define one or more NN. Filename is used to save the NN on a json file.
var net_array = [];
net_array.push({ filename : 'h44-90kloop.nn', net : new brain.NeuralNetwork({ hiddenLayers: [40] })});
net_array.push({ filename : 'h80-90kloop.nn', net : new brain.NeuralNetwork({ hiddenLayers: [80] })});
net_array.push({ filename : 'h30-h30-90kloop.nn', net : new brain.NeuralNetwork({ hiddenLayers: [30,30] })});

// Train all NN with the same training data and same interactions
net_array.forEach(function(item){
  console.log("Training NN : " + item.filename);
  item.net.train(training_data, {
   errorThresh: 0.0000008,    // error threshold to reach
   iterations: 90000,         // maximum training iterations
   log: false,                // console.log() progress periodically
   logPeriod: 1000,           // number of iterations between logging
   learningRate: 0.3,         // learning rate
   callback: trainingLog,     // callback for log
   callbackPeriod: 30000
  })
});

// Save NN on files
net_array.forEach(function(item){
  var p = item.net.toJSON();
  var s = JSON.stringify(p);
  fs.writeFileSync(item.filename,s);
  console.log("NN saved on file :", item.filename)
});

// All done
console.log("Enjoy!")
