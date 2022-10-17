const mainContainer = document.getElementById("container");


const baseUrl = "https://opentdb.com/api.php?amount=10"

// const buttonAction = (event) => {
//     const e = event.target;
//     alert(`Button with ${e} was clicked `)

// }

fetch(baseUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(
            "Data", data
        )

        for (let result of data.results) {
            /* Print out the question & correct answer in the console --------*/
            console.log("Question: ", result.question)
            console.log("Answer: ", result.correct_answer)

            let incorrectAns = result.incorrect_answers.map(inc => {
                console.log("INC => ", inc);
            })
            //--------------------------------------------------------------------------

            // Display the 10 Questions on the WebPage ---------------------------------
            const questionsSection = document.createElement("ul");

            const questionItem = document.createElement("li");

            questionItem.innerHTML = result.question;

            questionsSection.append(questionItem)

            mainContainer.append(questionsSection)
            //--------------------------------------------------------------------------

            //Appending all answer choices to a dictionary ------------------------------
            x = result.correct_answer
            var ansDict = {

            }
            ansDict[x] = "1";

            let incAns = result.incorrect_answers.map(inc => {
                ansDict[inc] = "0";
            })
            //-------------------------------------------------------------------------------
            // Iterates through the dictionary and Displays all the answer choices----------
            for (var ans in ansDict) {
                const ansSection = document.createElement("button");
                const ansItem = document.createElement("li");
                ansItem.innerHTML = ans;
                ansSection.append(ansItem);
                mainContainer.append(ansSection);
            }
            //-----------------------------------------------------------------------------

            mainContainer.append(document.createElement("hr"))
        }
    })