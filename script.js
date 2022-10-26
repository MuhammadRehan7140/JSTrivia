const mainContainer = document.getElementById("container");


const baseUrl = "https://opentdb.com/api.php?amount=10"

// const buttonAction = (event) => {
//     const e = event.target;
//     alert(`Button with ${e} was clicked `)

// }

// const fetchURL = (URL) => {
//     let ret;
//     fetch(URL)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             // console.log("Data: ", data)
//             ret = data;
//             return data
//         })

//     return ret;
// }

const fetchUrl = async (url) => {
    const response = await fetch(url);
    console.log("RESPONSE +> L>>J", response);
    if (!response) {
        console.log("ERROR WITH URL", url);
        return "ERROR WITH URL"
    }
    const json = await response.json();
    if (json) {
        return json;
    }
    return "ERROR";
}

const DisplayQuestionsAndAnswers = async (data) => {
    if (!data) {
        console.log("NO DATA;")
        return
    }
    //The two variables are used to check question index and to print each question one at a time
    // POSSIBLE BUG:: ON HARD REFRESH THE COUNTER MAY NOT RETURN TO 0---------------------
    let d = data;
    let questionIAmOn = 0;
    let verifyQuestion = 0;
    // questionCount is used to number the question as their displayed on the webpage-----
    let questionCount = 1;
    console.log("IN FUNC: d => ", d);

    for (let result of d.results) {
        if (questionIAmOn === verifyQuestion) {
            //Console logs the question and all the answer choices-------------------------------
            console.log("Question: ", result.question);
            console.log("Answer: ", result.correct_answer);
            let incorrectAns = result.incorrect_answers.map(inc => {
                console.log("IncAns: ", inc);
            })
            //-----------------------------------------------------------------------------------
            // Prints questions on the webpage---------------------------------------------------
            const questionContainer = document.createElement("div");
            questionContainer.classname = "question_container";

            questionSection = document.createElement("ul");
            const questionItem = document.createElement("h6");

            questionItem.innerHTML = `${questionCount}. ${result.question}`;
            questionCount++;

            questionSection.append(questionItem);
            questionContainer.appendChild(questionSection);
            mainContainer.append(questionContainer)
            //-----------------------------------------------------------------------------------

            // Appending all answers for one questions to a dict("1" === correct: "0" === incorrect)
            var ansDict = {}

            ansDict[result.correct_answer] = "1";

            let incAns = result.incorrect_answers.map(inc => {
                ansDict[inc] = "0";
            })
            //-----------------------------------------------------------------------------------
            // Randomly shuffle ansDict using the Keys-------------------------------------------
            var ansArray = Object.keys(ansDict);
            ansArray = ansArray.sort(() => Math.random() - 0.5);
            console.log(ansArray);
            //-----------------------------------------------------------------------------------
            // Creating and appending the answer choices to the webpage--------------------------
            const buttonContainer = document.createElement("div");
            buttonContainer.classname = "button_container"

            for (var ans in ansArray) {
                const ansSection = document.createElement("button");
                const ansItem = document.createElement("li");
                ansItem.innerHTML = ansArray[ans];
                ansSection.append(ansItem);
                buttonContainer.appendChild(ansSection);
                mainContainer.append(buttonContainer);
            }
            //-----------------------------------------------------------------------------------

            mainContainer.append(document.createElement("hr"));

            questionIAmOn++;
        }

    }

}

const mainDriver = async () => {
    const questionsAndAnswers = await fetchUrl(baseUrl);
    DisplayQuestionsAndAnswers(questionsAndAnswers);


    console.log("Q/A => ", questionsAndAnswers);

}

mainDriver()

//Using Fetch() to grab all the Data from the Trivia API----------------------------
// fetch(baseUrl)
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         console.log(
//             "Data", data
//         )
//         //----------------------------------------------------------------------------------

//         let questionIAmOn = 0;
//         let verifyQuestion = 0;
//         let questionCount = 1;
//         // Main For Loop for the Webpage----------------------------------------------
//         for (let result of data.results) {
//             // If statement used to print one question at a time--------------------------
//             // Stops the for loop if the variables don't match each other------------------
//             if (questionIAmOn === verifyQuestion) {

//                 /* Print out the question & correct answer in the console --------*/
//                 console.log("Question: ", result.question)
//                 console.log("Answer: ", result.correct_answer)

//                 let incorrectAns = result.incorrect_answers.map(inc => {
//                     console.log("INC => ", inc);
//                 })
//                 //--------------------------------------------------------------------------

//                 // Display the 10 Questions on the WebPage ---------------------------------
//                 const questionContainer = document.createElement("div");
//                 questionContainer.className = "question_container";

//                 questionsSection = document.createElement("ul");
//                 const questionItem = document.createElement("h6");

//                 questionItem.innerHTML = `${questionCount}. ${result.question}`;
//                 questionCount++;

//                 questionsSection.append(questionItem)
//                 questionContainer.appendChild(questionsSection)
//                 mainContainer.append(questionContainer)
//                 //--------------------------------------------------------------------------

//                 //Appending all answer choices to a dictionary ------------------------------
//                 correctAns = result.correct_answer
//                 var ansDict = {

//                 }
//                 ansDict[correctAns] = "1";

//                 let incAns = result.incorrect_answers.map(inc => {
//                     ansDict[inc] = "0";
//                 })
//                 //-------------------------------------------------------------------------------

//                 //Randomly Shuffles the Dictionary Keys------------------------------------------
//                 var ansArray = Object.keys(ansDict);
//                 ansArray = ansArray.sort(() => Math.random() - 0.5);
//                 console.log(ansArray)

//                 //-------------------------------------------------------------------------------

//                 // Iterates through the dictionary and Displays all the answer choices----------
//                 const buttonContainer = document.createElement("div");
//                 buttonContainer.className = "button_container"

//                 for (var ans in ansArray) {
//                     const ansSection = document.createElement("button");
//                     // ansSection.addEventListener('click', verifyAnsChoice(ansArray[ans], ansDict, result.question));
//                     const ansItem = document.createElement("li");
//                     ansItem.innerHTML = ansArray[ans];
//                     ansSection.append(ansItem);
//                     buttonContainer.appendChild(ansSection)
//                     mainContainer.append(buttonContainer);
//                 }
//                 //-----------------------------------------------------------------------------

//                 mainContainer.append(document.createElement("hr"))

//                 questionIAmOn++;
//             }
//         }
//     })

// // const verifyAnsChoice = (ansChoice, ansDict, question) => {
// //     console.log("Event: ", ansChoice);
// // }