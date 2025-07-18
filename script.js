class HTMLQuiz {
    constructor() {
        this.quizData = [
            {
                question: "HTMLの基本構造で、ページのタイトルを設定するタグはどれですか？",
                options: ["<title>", "<head>", "<header>", "<h1>"],
                correct: 0
            },
            {
                question: "HTMLで段落を作成するために使用するタグはどれですか？",
                options: ["<div>", "<span>", "<p>", "<br>"],
                correct: 2
            },
            {
                question: "HTMLでリンクを作成するために使用する属性はどれですか？",
                options: ["src", "href", "link", "url"],
                correct: 1
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.initializeElements();
        this.bindEvents();
        this.displayQuestion();
    }
    
    initializeElements() {
        this.questionNumberEl = document.getElementById('question-number');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.questionTextEl = document.getElementById('question-text');
        this.optionsContainerEl = document.getElementById('options-container');
        this.nextBtnEl = document.getElementById('next-btn');
        this.quizContentEl = document.getElementById('quiz-content');
        this.resultContainerEl = document.getElementById('result-container');
        this.scoreTextEl = document.getElementById('score-text');
        this.percentageTextEl = document.getElementById('percentage-text');
        this.restartBtnEl = document.getElementById('restart-btn');
        
        this.totalQuestionsEl.textContent = this.quizData.length;
    }
    
    bindEvents() {
        this.nextBtnEl.addEventListener('click', () => this.handleNext());
        this.restartBtnEl.addEventListener('click', () => this.restart());
    }
    
    displayQuestion() {
        const question = this.quizData[this.currentQuestion];
        
        this.questionNumberEl.textContent = this.currentQuestion + 1;
        this.questionTextEl.textContent = question.question;
        
        this.optionsContainerEl.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'quiz-option';
            radioInput.value = index;
            radioInput.id = `option-${index}`;
            
            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
            label.textContent = option;
            
            optionDiv.appendChild(radioInput);
            optionDiv.appendChild(label);
            
            optionDiv.addEventListener('click', () => {
                radioInput.checked = true;
                this.selectOption(optionDiv, index);
            });
            
            radioInput.addEventListener('change', () => {
                this.selectOption(optionDiv, index);
            });
            
            this.optionsContainerEl.appendChild(optionDiv);
        });
        
        this.nextBtnEl.disabled = true;
        this.nextBtnEl.textContent = this.currentQuestion === this.quizData.length - 1 ? '結果を見る' : '次へ';
        
        this.quizContentEl.classList.add('fade-in');
        setTimeout(() => {
            this.quizContentEl.classList.remove('fade-in');
        }, 500);
    }
    
    selectOption(optionDiv, selectedIndex) {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        optionDiv.classList.add('selected');
        this.userAnswers[this.currentQuestion] = selectedIndex;
        this.nextBtnEl.disabled = false;
    }
    
    handleNext() {
        if (this.userAnswers[this.currentQuestion] === undefined) {
            return;
        }
        
        if (this.userAnswers[this.currentQuestion] === this.quizData[this.currentQuestion].correct) {
            this.score++;
        }
        
        this.currentQuestion++;
        
        if (this.currentQuestion < this.quizData.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        this.quizContentEl.classList.add('hidden');
        this.resultContainerEl.classList.remove('hidden');
        
        const percentage = Math.round((this.score / this.quizData.length) * 100);
        
        this.scoreTextEl.textContent = `${this.score} / ${this.quizData.length} 問正解`;
        this.percentageTextEl.textContent = `正答率: ${percentage}%`;
        
        let message = '';
        if (percentage === 100) {
            message = '素晴らしい！完璧です！🎉';
        } else if (percentage >= 67) {
            message = 'よくできました！👏';
        } else if (percentage >= 33) {
            message = 'もう少し頑張りましょう！📚';
        } else {
            message = 'HTMLの基本を復習してみましょう！💪';
        }
        
        const messageEl = document.createElement('p');
        messageEl.textContent = message;
        messageEl.style.fontSize = '1.2rem';
        messageEl.style.color = '#4a5568';
        messageEl.style.marginTop = '15px';
        this.scoreTextEl.parentNode.appendChild(messageEl);
        
        this.resultContainerEl.classList.add('fade-in');
        setTimeout(() => {
            this.resultContainerEl.classList.remove('fade-in');
        }, 500);
    }
    
    restart() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.resultContainerEl.classList.add('hidden');
        this.quizContentEl.classList.remove('hidden');
        
        const messageEl = this.scoreTextEl.parentNode.querySelector('p:last-child');
        if (messageEl && messageEl.textContent.includes('素晴らしい') || messageEl.textContent.includes('よくできました') || messageEl.textContent.includes('もう少し') || messageEl.textContent.includes('HTMLの基本')) {
            messageEl.remove();
        }
        
        this.displayQuestion();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HTMLQuiz();
});
