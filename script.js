const mainContainer = document.getElementById("container");


const baseUrl = "https://opentdb.com/api.php?amount=10"

// const buttonAction = (event) => {
//     const e = event.target;
//     alert(`Button with ${e} was clicked `)

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

let globalCounter = 0;

const DisplayQuestionsAndAnswers = async (data) => {
    if (!data) {
        console.log("NO DATA;")
        return
    }
    console.log(
        "MY RESULTS", data.results
    )
    //The two variables are used to check question index and to print each question one at a time
    // POSSIBLE BUG:: ON HARD REFRESH THE COUNTER MAY NOT RETURN TO 0---------------------
    let d = data;
    // questionCount is used to number the question as their displayed on the webpage-----
    let questionCount = 1;
    console.log("IN FUNC: data => ", d);

    // let ansSection;
    // if (ansSection) {
    //     ansSection.addEventListener('click', buttonAction);

    // }

    for (let [idx, result] of d.results.entries()) {
        if (idx === globalCounter) {
            //Console logs the question and all the answer choices-------------------------------
            console.log("Question: ", result.question);
            console.log("Answer: ", result.correct_answer);
            let incorrectAns = result.incorrect_answers.map(inc => {
                console.log("IncAns: ", inc);
            })
            //-----------------------------------------------------------------------------------
            // Prints questions on the webpage---------------------------------------------------

            const questionContainer = document.createElement("div");
            questionContainer.className = "question_container";

            questionsSection = document.createElement("ul");
            const questionItem = document.createElement("h6");

            questionItem.innerHTML = `${idx + 1}. ${result.question}`;
            questionCount++;

            questionsSection.append(questionItem)
            questionContainer.appendChild(questionsSection)
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
            buttonContainer.className = "button_container"

            for (var ans in ansArray) {
                const ansSection = document.createElement("button");
                ansSection.id = idx;
                ansSection.addEventListener('click', (e) => { buttonAction(e, result, d) })
                const ansItem = document.createElement("li");
                ansItem.innerHTML = ansArray[ans];
                ansSection.append(ansItem);
                buttonContainer.appendChild(ansSection)
                mainContainer.append(buttonContainer);
            }
            //-----------------------------------------------------------------------------------

            mainContainer.append(document.createElement("hr"));

        }

    }

}

const decodeHTMLEntities = (text) => {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

const buttonAction = (event, currentQuestion, all) => {
    // console.log("EVWENT => ", event);
    // const inner_text = event.target.innerText;
    // event.target.className = inner_text;
    // let myCurrentButton = document.getElementsByClassName(inner_text);
    // let myButton;
    // if (myCurrentButton.length) {
    //     myButton = myCurrentButton[0];
    //     myButton.style.cssText = "border: 1px solid blue; color: red;"
    //     event.target.className = "";
    //     console.log("CHANGING BUTTON SUCCESS", event.target.innerText);
    // }

    // This stands for the index of the QuestionAnswer Array
    console.log("Current question objs => ", currentQuestion);

    console.log("ALL =-> ", all);
    // Logic

    const decodedHTMLCorrectAnswer = decodeHTMLEntities(currentQuestion.correct_answer)
    if (event.target.innerText === decodedHTMLCorrectAnswer) {

        alert("CORRECT!!!!!!");
        globalCounter++;
        if (all) {
            DisplayQuestionsAndAnswers(all, null);

        }

        // verifyQuestionIamOn++
    } else {
        alert("YOU SUCK!!!");
    }

}

const mainDriver = async () => {
    const questionsAndAnswers = await fetchUrl(baseUrl);
    let lenQuestions = questionsAndAnswers.length;


    DisplayQuestionsAndAnswers(questionsAndAnswers);

    console.log("Q/A => ", questionsAndAnswers);

}

mainDriver()




// Using Fetch() to grab all the Data from the Trivia API----------------------------
const testOriginalCode = () => {
    fetch(baseUrl)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(
                "Data", data
            )
            //----------------------------------------------------------------------------------

            let questionIAmOn = 0;
            let verifyQuestion = 0;
            let questionCount = 1;
            // Main For Loop for the Webpage----------------------------------------------
            for (let result of data.results) {
                // If statement used to print one question at a time--------------------------
                // Stops the for loop if the variables don't match each other------------------
                if (questionIAmOn === verifyQuestion) {

                    /* Print out the question & correct answer in the console --------*/
                    console.log("Question: ", result.question)
                    console.log("Answer: ", result.correct_answer)

                    let incorrectAns = result.incorrect_answers.map(inc => {
                        console.log("INC => ", inc);
                    })
                    //--------------------------------------------------------------------------

                    // Display the 10 Questions on the WebPage ---------------------------------
                    const questionContainer = document.createElement("div");
                    questionContainer.className = "question_container";

                    questionsSection = document.createElement("ul");
                    const questionItem = document.createElement("h6");

                    questionItem.innerHTML = `${questionCount}. ${result.question}`;
                    questionCount++;

                    questionsSection.append(questionItem)
                    questionContainer.appendChild(questionsSection)
                    mainContainer.append(questionContainer)
                    //--------------------------------------------------------------------------

                    //Appending all answer choices to a dictionary ------------------------------
                    correctAns = result.correct_answer
                    var ansDict = {

                    }
                    ansDict[correctAns] = "1";

                    let incAns = result.incorrect_answers.map(inc => {
                        ansDict[inc] = "0";
                    })
                    //-------------------------------------------------------------------------------

                    //Randomly Shuffles the Dictionary Keys------------------------------------------
                    var ansArray = Object.keys(ansDict);
                    ansArray = ansArray.sort(() => Math.random() - 0.5);
                    console.log(ansArray)

                    //-------------------------------------------------------------------------------

                    // Iterates through the dictionary and Displays all the answer choices----------
                    const buttonContainer = document.createElement("div");
                    buttonContainer.className = "button_container"

                    for (var ans in ansArray) {
                        const ansSection = document.createElement("button");
                        // ansSection.addEventListener('click', verifyAnsChoice(ansArray[ans], ansDict, result.question));
                        const ansItem = document.createElement("li");
                        ansItem.innerHTML = ansArray[ans];
                        ansSection.append(ansItem);
                        buttonContainer.appendChild(ansSection)
                        mainContainer.append(buttonContainer);
                    }
                    //-----------------------------------------------------------------------------

                    mainContainer.append(document.createElement("hr"))

                    questionIAmOn++;
                }
            }
        })
}

// testOriginalCode()

// const verifyAnsChoice = (ansChoice, ansDict, question) => {
//     console.log("Event: ", ansChoice);
// }