const mainContainer = document.getElementById("container");

const baseUrl = "https://opentdb.com/api.php?amount=10"

fetch(baseUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(
            "Data", data
        )
        for (let result of data.results) {
            console.log("Question: ", result.question)

            const questionsSection = document.createElement("ul");
            const answerSection = document.createElement("button");

            const questionItem = document.createElement("li");
            const answerItem = document.createElement("li");

            questionItem.innerHTML = result.question;
            answerItem.innerHTML = result.correct_answer;

            questionsSection.append(questionItem)
            answerSection.append(answerItem)

            //Appends the Questions and Answers to the Webpage
            mainContainer.append(questionsSection, answerSection)
            //Creates a Border between every Question
            mainContainer.append(document.createElement("hr"))




        }
    })