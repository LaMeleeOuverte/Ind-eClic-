// Définition des questions du quiz
const questions = [
    {
        question: "Quand tu penses à ton avenir pro, tu te dis plutôt :",
        options: [
            { letter: "A", text: "Je n'ai aucune idée de ce que je veux faire." },
            { letter: "B", text: "J'ai quelques pistes, mais rien de clair." },
            { letter: "C", text: "Je sais ce que je veux, mais je ne sais pas par où commencer." },
            { letter: "D", text: "J'ai un plan, je veux juste passer à l'action." }
        ]
    },
    {
        question: "Question suivante...",
        options: [
            { letter: "A", text: "Option A" },
            { letter: "B", text: "Option B" },
            { letter: "C", text: "Option C" },
            { letter: "D", text: "Option D" }
        ]
    }
    // Ajoutez d'autres questions ici
];

let currentQuestion = 0;

// Sélectionner les éléments du DOM
const questionContainer = document.querySelector('.question p');
const optionsContainer = document.querySelector('.options');

// Initialiser le stockage des réponses
if (!localStorage.getItem('quizResponses')) {
    localStorage.setItem('quizResponses', JSON.stringify({}));
}

// Ajouter les événements click sur les options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        // Ajouter la classe selected à l'option cliquée
        this.classList.add('selected');
        
        // Récupérer la réponse
        const answer = this.getAttribute('data-answer');
        
        // Stocker la réponse
        const responses = JSON.parse(localStorage.getItem('quizResponses'));
        responses['question1'] = answer;
        localStorage.setItem('quizResponses', JSON.stringify(responses));
        
        // Attendre un peu pour montrer la sélection
        setTimeout(() => {
            // Rediriger vers la page suivante
            window.location.href = `jeu2.html`;
        }, 500);
    });
});

// Fonction pour mettre à jour la question
function updateQuestion() {
    const question = questions[currentQuestion];
    
    // Mettre à jour la question
    questionContainer.textContent = question.question;
    
    // Mettre à jour les options
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach((optionElement, index) => {
        const option = question.options[index];
        optionElement.querySelector('.option-letter').textContent = option.letter;
        optionElement.querySelector('.option-text').textContent = option.text;
        optionElement.classList.remove('selected');
    });
}

// Fonction pour afficher les résultats
function showResults() {
    const quizBox = document.querySelector('.quiz-box');
    quizBox.innerHTML = `
        <div class="question-container">
            <h2>Quiz terminé !</h2>
            <p>Merci d'avoir participé au quiz.</p>
        </div>
    `;
} 