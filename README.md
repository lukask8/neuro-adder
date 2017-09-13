# Neuro Adder

# Content

- [Neuro sum calculator](#neuro-sum-calculator)
- [Content](#content)
- [Intro](#intro)
  * [Notes](#notes)
- [Getting Started](#getting-started)
  * [Quick run](#quick-run)
- [Usage](#usage)
  * [Train your neural network](#train-your-neural-network)
  * [Test your neural network](#test-your-neural-network)
- [Transcoding](#transcoding)
  * [Transcoding model](#transcoding-model)
    + [Input model](#input-model)
    + [Output](#output)
    + [Transcoding model examples](#transcoding-model-examples)
- [Conclusion](#conclusion)
- [Misc](#misc)
  * [CSV file and training data](#csv-file-and-training-data)
  * [Hello world (XOR Demo)](#hello-world-xor-demo)

# Intro

An "are you crazy" & useless sum calculator example/demo code for  [*Brain JS*](https://github.com/BrainJS/brain.js) (https://brain.js.org/).

With this code you can build a neural network (NN) that can sum up two integers (each one in range [0..9]). You can use this code as starting point for you own experiments.

A trainer and test code example is provided with some in line comments.

Trainer application "builds" one or more NN starting from the same data-training-set. NN are saved as json files to be used later.

Tester application loads one or more NN from json files and it executes all NN on the same query.

## Notes

**BrainJS**

I use [Brainjs](https://github.com/BrainJS/brain.js) (https://brain.js.org/) as neural network library because I like it. It's fast, easy to use and is written in javascript. I have tried other libraries like DN2A, Synaptic and Convnetjs but I feel better with this one. Give them a try and get the best for your needs.
Note that original [*brain*.js](https://github.com/harthur/brain) library is no more maintained even if I get better result (???).

**About demo**

When you look at "transcoding model" you understand why this example is "crazy & useless". Well this is the first excercise (hello world) I usually did at university when playing with a new neural network system. With this exercise you test the library in a real world example (or something better than a simple XOR example). Then you can understand how much transcoding model alter neural network results.


# Getting Started

Clone or download codes. Go to root directory (where js files are).

    $ cd  /your/path/to/neuro-adder-root-dir/

Execute ```npm install``` to install required modules or manually:

    $ npm install brain.js
    $ npm install inquirer

## Quick run

Train some neural networks with default dataset

    $ npm run train

Test neural networks with:

    $ npm run test


# Usage

## Train your neural network

```
                Training

              +------------+                        
Input    +---->   Neural   | 
              |   Network  +----> Neural network tuning
Output   +---->   (Train)  |
              +------------+
```
             
Here's an example of app-trainer.js training three neural networks (feed forward neural networks). A CSV file is used to get some data for training. CSV is a file with input cols and output cols. An header row is also expected.
First 20 columns are provided as input, next 20 columns as output.

Console output:

    $ node app-trainer.js

or

    $ npm run train

    > Useless-sum-calculator@1.0.0 train /Programming/JS/node/neuro-adder
    > nodejs app-trainer.js

    Training set from file: data-training-set-cutted.csv

    Training NN : h44-90kloop.nn

    0) Error = 0.07276339827488591
    30000) Error = 0.0027198196721421133
    60000) Error = 0.0027185259689174123
    90000) Error = 0.0027181216450378833

    Training NN : h80-90kloop.nn
    0) Error = 0.06979347547171388
    30000) Error = 0.0027192393321887305
    60000) Error = 0.0027182611376247107
    90000) Error = 0.0027179537660956183

    Training NN : h30-h30-90kloop.nn
    0) Error = 0.0727447542789047
    30000) Error = 0.002177433716144597
    60000) Error = 0.002175614097143767
    90000) Error = 0.002175029423456511

    NN saved on file : h44-90kloop.nn
    NN saved on file : h80-90kloop.nn
    NN saved on file : h30-h30-90kloop.nn
    Enjoy!

Neural networks are saved in three different files with extension ".nn".
Play with code to add more NN or change training options.

## Test your neural network

```
                    Testing

                 +----------+
   Input  +----> | Neural   | +----->  Output
                 | Network  |
                 +----------+
```

Here's an example of app-tester.js testing three neural networks saved.
User types two integer values and neural networks calc the sum.

Console output:

    $ node app-tester.js

or

    $ npm run test


    Testing NN from user input

    ? Insert a number :  8
    ? Insert a number :  6

    C = A + B. Computed by h44-90kloop.nn
    A =  8 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ] ]
    B =  6 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ] ]
    C =  14 [ Transcoded from  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ] [ 0, 0, 0.002, 0, 0.998, 0, 0.001, 0, 0, 0 ] ]

    C = A + B. Computed by h80-90kloop.nn
    A =  8 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ] ]
    B =  6 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ] ]
    C =  14 [ Transcoded from  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ] [ 0.002, 0, 0.001, 0, 0.998, 0, 0.001, 0, 0, 0 ] ]

    C = A + B. Computed by h30-h30-90kloop.nn
    A =  8 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ] ]
    B =  6 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ] ]
    C =  14 [ Transcoded from  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ] [ 0, 0, 0, 0.003, 0.995, 0.003, 0, 0, 0, 0 ] ]

---


    Testing NN from user input

    ? Insert a number :  6
    ? Insert a number :  9

    C = A + B. Computed by h44-90kloop.nn
    A =  6 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ] ]
    B =  9 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] ]
    C =  11 [ Transcoded from  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ] [ 0, 0.001, 0, 0, 0, 0, 0, 0, 0.001, 0     ] ]

    C = A + B. Computed by h80-90kloop.nn
    A =  6 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ] ]
    B =  9 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] ]
    C =  13 [ Transcoded from  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ] [ 0, 0, 0, 0.001, 0, 0, 0.001, 0, 0, 0.001 ] ]

    C = A + B. Computed by h30-h30-90kloop.nn
    A =  6 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ] ]
    B =  9 [ Transcoded as  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] ]
    C =  15 [ Transcoded from  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ] [ 0, 0, 0, 0, 0.003, 0.995, 0.003, 0, 0, 0 ] ]


# Transcoding

```
+-----------+    +---------------------+
|User input |    |Neural network input |
|           +---->                     |
|1 3 5 ...  |    |0.1 0.3 0.6 ...      |
+-----------+    +-------+-------------+
                         |
                         |
    +--------------------v-----------------------+
    |                  Neural                    |
    |                  Network                   |
    +--------------------+-----------------------+
                         |
                 +-------v-------------+
                 |Neural network output|
                 |                     |
                 |0.443 0.231 0.01 ... |
                 +-------+-------------+
                         |
                 +-------v-------------+    +-------------+
                 |Filter & Normalize   |    |User output  |
                 |                     +---->             |
                 |0.5 0.2 0.0 ...      |    |10 0 5 ...   |
                 +---------------------+    +-------------+
```

Neural networks use as input one or more numeric values, each in the range 0.0 ... 1.0. Output is also represented by an array of values between 0.0 and 1.0.
When dealing with a problem with NN you need to convert (normalize) the numeric values to match a range of 0.0 ... 1.0.
For example, if the input is an integer value between 0 and 9, an algorithm could be:

    Transcoded input = Input / 100.0

The use of a transcoding system greatly affects the outcome of the neural network.
For example, the above algorithm could become:

    Transcoded input = Input / 9.0

The main difference between the first and the second algorithm is that the first will have all values ​​in the range 0.0 ... 0.09, the second will have all values ​​in the range 0.0 ... 1.0. In the latter case the values ​​are more distributed and therefore more "distinguishable".

Output can also have different interpretations. Let's imagine that the expected output has a value between 0 and 100.0. In this case, for the neural network, it is possible to use a transcoding system for which the output between 0.0 and 1.0 is multiplied by 100:

    (A1) Transcoded output = output * 100.0

If we know that solutions to our problem will have an output value in range 0..20, for example, you can always use the above formula or alternatively one below :

    (A2) Transcoded output = output * 20.0

Although the formula (A2) seems better, it is not always true. The formula (A2) gives you always a solution between 0 and 20, which is always a valid solution even when the neural network output is completely wrong. The formula (A1) can also provide solutions in the range 20 to 100. It is therefore possible to detect and discard incorrect solutions in the range [20 .. 100]. It is possible to create very complex transcodification model with the aim of minimizing or detecting divergent errors in neural networks output by exploiting information about the context of the solutions you expect.


## Transcoding model

The concept of numeric value is deliberately overturned both in input and output in our exercise. This makes the job of the neural network much more complicated because the relationship between input and output is not linear even though it is a simple addition.

### Input model
The user type two integers between 0 and 9. The neural network calculate the sum that will obviously be between 0 and 18.

We could use a formula like:

    Transcoded input = input from user / 9.0
    Transcoded output = output from nn * 20

but this should be too easy :)

Well. The two input numbers are instead converted to a binary array and not to a numeric value as shown above.

This is the coding schema we use to identify numbers:

    "0" => "1 0 0 0 0 0 0 0 0 0"
    "1" => "0 1 0 0 0 0 0 0 0 0"
    "2" => "0 0 1 0 0 0 0 0 0 0"
    "3" => "0 0 0 1 0 0 0 0 0 0"
    ...
    "9" => "0 0 0 0 0 0 0 0 0 1"

The neural network will then get a binary array, 20 in length, that identifies two values.

```
+-Input 1-------------+   +-Input 2-------------+
| 1                   |   | 3                   |        <= User input
+---------+-----------+   +---------+-----------+
          |                         |
+---------v-----------+   +---------v-----------+
| 0 1 0 0 0 0 0 0 0 0 |   | 0 0 0 1 0 0 0 0 0 0 |        <= Transcoded input
+---------+-----------+   +---------+-----------+
          |                         |
+---------v-------------------------v-----------+
|   0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0     |        <= NN input (merged)
+----------------------+------------------------+
                       |
               +-------v--------+
               | Neural Network |
               +----------------+
```

### Output

The output is composed of an array of values in the range 0.0 ... 1.0 of length 20.
The first 10 items identify the first digit of the result, the remaining 10 for the second.


                         +---+ Digit 1 +---+  +---+ Digit 2 +---+
                         |                 |  |                 |
                         +                 +  +                 +
    output from NN    = "0 1 0 0 0 0 0 0 0 0  0 0 0 1 0 0 0 0 0 0"

As done for input we use a similar schema to identify each digit:

                        "1 0 0 0 0 0 0 0 0 0" => "0"
                        "0 1 0 0 0 0 0 0 0 0" => "1"
                        "0 0 1 0 0 0 0 0 0 0" => "2"
                        "0 0 0 1 0 0 0 0 0 0" => "3"
                        ...
                        "0 0 0 0 0 0 0 0 0 1" => "9"

A note:
The neural network returns values between 0.0 and 1.0. Therefore, before conversion with the above diagram, you must transform the output into 0/1 binary values.

```
               +----------------+
               | Neural Network |
               +-------+--------+
                       |
+----------------------v------------------------+
|   0.98 0.01 0.04 0.4 0.53 ...                 |        <= NN output
+----------------------+------------------------+
                       | 
+----------------------v------------------------+
|   1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0     |        <= NN output (normalized & filtered)
+---------+-------------------------+-----------+
          |                         |
+---------v-----------+   +---------v-----------+
| 1 0 0 0 0 0 0 0 0 0 |   | 0 0 0 0 1 0 0 0 0 0 |        <= Transcoded & splitted output
+---------+-----------+   +---------+-----------+
          |                         |
+-Digit 1-v-----------+   +-Digit 2-v-----------+
| 0                   |   | 4                   |        <= User output
+---------------------+   +---------------------+


```

### Transcoding model examples

    Ex :
    1 + 3 = 4

    User input = "1"
    User input = "3"


                       +---+ Input = 1  +------------+  +---+ Input = "3" +----------+
                       |                             |  |                            |
                       +                             +  +                            +
                            1                                    3  
                         0  |  2  3  4  5  6  7  8  9   0  1  2  |  4  5  6  7  8  9
                         |     |  |  |  |  |  |  |  |   |  |  |     |  |  |  |  |  |            
    Input for NN      = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 1, 0, 0, 0, 0, 0, 0]

                                              +----------------+
                                              | Neural Network |
                                              +----------------+
    
    Output filtered   = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
                            |  |  |  |  |  |  |  |  |   |  |  |  |     |  |  |  |  |
                         |  1  2  3  4  5  6  7  8  9   0  1  2  3  |  5  6  7  8  9
                         0                                          4
                       +                             +  +                            +
                       |                             |  |                            |
                       +---+ Digit 1 = "0"  +--------+  +---+ Digit 2 = "4" +--------+
                        
    Output transcoded =  "0" "4"
    User output = 4

---


    Ex :
    9 + 4 = 13

    User input = "9"
    User input = "4"
    
                       +---+ Input = 9  +------------+  +---+ Input = "4" +----------+
                       |                             |  |                            |
                       +                             +  +                            +
                                                    9               4
                         0  1  2  3  4  5  6  7  8  |   0  1  2  3  |  5  6  7  8  9
                         |     |  |  |  |  |  |  |      |  |  |  |     |  |  |  |  |            
    Input for NN      = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 1, 0, 0, 0, 0, 0, 0]

                                              +----------------+
                                              | Neural Network |
                                              +----------------+
    
    Output filtered   = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
                         |     |  |  |  |  |  |  |  |   |  |  |     |  |  |  |  |  |
                         0  |  2  3  4  5  6  7  8  9   0  1  2  |  4  5  6  7  8  9
                            1                                    3
                       +                             +  +                            +
                       |                             |  |                            |
                       +---+ Digit 1 = "1"  +--------+  +---+ Digit 2 = "3" +--------+
                           
    
    Output transcoded = "1" "3"
    User output = 13

# Conclusion
BrainJS is fast and simple to use. Like any other javascript library you can run your code in nodejs or inside your browser. This is an incredible evolution because you can use neural network for simple but useful real world tasks. There are much more powerful and fast libraries written in Java, C++, python or available as Matlab plugin but you need specific hardware (GPU), build a legacy client application, or manage with a "big" framework. Of course with such powerful tools you can try to resolve really complex problems like, colorizing a gray-scaled photos, make better weather or financial predictions, or identify a cancer from a medical picture.

I think that neural network should also be used in small and simple tasks.

Here are some example of what you can do:

- Match users preferences in GUI like background/foreground color, font size, layout, charts.
- Select predefined choices in a workflow (workflow prediction).
- Suggest better tags cloud (no more statistic formulas).
- Create simple but funny graphics jokes in your pages or web based AI-supported video games.
- Simple AI to detect threats in events logs
- Make your application more "dynamic" without using complex formulas you need to find, test and tune. Just give some example of input/output and leave neural network run.
- ...


# Misc

## CSV file and training data

CSV file used for training is exported from data.ods file. You need Libreoffice or OpenOffice to edit it.
Feel free to change training set. Just as test delete some rows and ask for a sum between two number not available in training set.

## Hello world (XOR Demo)

```javascript
var net = new brain.NeuralNetwork();

net.train([{input: [0, 0], output: [0]},
           {input: [0, 1], output: [1]},
           {input: [1, 0], output: [1]},
           {input: [1, 1], output: [0]}]);

var output = net.run([1, 0]);  // [0.987]
```

Xor is the "Hello world" for NN. Get it from the "unmantained" brain on [github](https://github.com/harthur/brain) .
