const mainContainer = document.getElementById("container");


const baseUrl = "https://opentdb.com/api.php?amount=10"

// const buttonAction = (event) => {
//     const e = event.target;
//     alert(`Button with ${e} was clicked `)

// }

// Using Fetch() to grab all the Data from the Trivia API----------------------------
fetch(baseUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(
            "Data", data
        )
        //----------------------------------------------------------------------------------

        let questionCount = 1;
        // Main For Loop for the Webpage----------------------------------------------
        for (let result of data.results) {
            /* Print out the question & correct answer in the console --------*/

            console.log("Question: ", result.question)
            console.log("Answer: ", result.correct_answer)

            let incorrectAns = result.incorrect_answers.map(inc => {
                console.log("INC => ", inc);
            })
            //--------------------------------------------------------------------------

            // Display the 10 Questions on the WebPage ---------------------------------
            const questionsSection = document.createElement("div");
            questionsSection.className = "question_container";

            const questionItem = document.createElement("h6");

            questionItem.innerHTML = `${questionCount}. ${result.question}`;
            questionCount++;

            questionsSection.append(questionItem)

            mainContainer.append(questionsSection)
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
                const ansItem = document.createElement("li");
                ansItem.innerHTML = ansArray[ans];
                ansSection.append(ansItem);
                buttonContainer.appendChild(ansSection)
                mainContainer.append(buttonContainer);
            }
            //-----------------------------------------------------------------------------

            mainContainer.append(document.createElement("hr"))
        }
    })