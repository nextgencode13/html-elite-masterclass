window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');

    // Navbar Scroll Effect
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Progress Bar Logic
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
});

// Smooth Scroll for Section Links
document.querySelectorAll('.toc-list a, .nav-links a, .cta-button').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Highlight Active TOC link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.toc-list a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.style.color = '#6366f1';
            link.style.paddingLeft = '5px';
        } else {
            link.style.color = '';
            link.style.paddingLeft = '';
        }
    });
});
// Reward Reveal Interaction
document.querySelectorAll('.reward-reveal').forEach(box => {
    box.addEventListener('click', function () {
        const secret = this.getAttribute('data-secret');
        this.innerHTML = `<span style="color: #10b981; font-weight: bold;">Unlocked: ${secret} 🏆</span>`;
        this.style.background = 'rgba(16, 185, 129, 0.1)';
        this.style.border = '1px solid #10b981';

        // Simple scale pop effect
        this.style.transform = 'scale(1.05)';
        setTimeout(() => this.style.transform = 'scale(1)', 200);
    });
});

// Add Copy Buttons to Code Blocks
document.querySelectorAll('.code-container').forEach(container => {
    const pre = container.querySelector('pre');
    if (!pre) return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';

    container.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
        const code = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.textContent = 'Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
});

// Certificate Logic
function initiateCertificate() {
    const overlay = document.getElementById('cert-overlay');
    overlay.style.display = 'flex';
}

function generateCertificate() {
    const nameInput = document.getElementById('student-name');
    const name = nameInput.value.trim();

    if (name.length < 2) {
        alert("Please enter your full name to generate the certificate!");
        return;
    }

    // Prepare Display
    document.getElementById('display-name').textContent = name;
    document.getElementById('name-prompt').style.display = 'none';

    const certWrapper = document.getElementById('certificate-wrapper');
    const certDisplay = document.getElementById('certificate-display');

    certWrapper.style.display = 'flex';
    certDisplay.style.display = 'block';
    certDisplay.classList.add('show-cert');
}

// Close cert on escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('cert-overlay');
        if (overlay) overlay.style.display = 'none';
    }
});

function downloadAsPNG() {
    const certificate = document.getElementById('certificate-display');
    const downloadBtn = document.querySelector('.download-cert-btn');

    // Change button text to show loading
    downloadBtn.textContent = 'Generating...';
    downloadBtn.disabled = true;

    html2canvas(certificate, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `NextGenCode-HTML-Elite-Certificate-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Reset button
        downloadBtn.textContent = 'Download Certificate (PNG)';
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error('Certification generation failed:', err);
        alert('Failed to generate PNG. Please try again or use a modern browser.');
        downloadBtn.textContent = 'Download Certificate (PNG)';
        downloadBtn.disabled = false;
    });
}

// MCQ Quiz Logic
const quizData = [
    {
        q: "What does HTML stand for?",
        a: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Tool Maker Line", "Home Tool Markup Language"],
        correct: 0
    },
    {
        q: "Which tag is used for the largest heading?",
        a: ["<h6>", "<head>", "<h1>", "<heading>"],
        correct: 2
    },
    {
        q: "What is the correct tag for a line break?",
        a: ["<lb>", "<break>", "<br>", "<hr>"],
        correct: 2
    },
    {
        q: "Which attribute is used to provide an alternative text for an image?",
        a: ["title", "src", "alt", "href"],
        correct: 2
    },
    {
        q: "Which HTML element is used to define an unordered list?",
        a: ["<ol>", "<ul>", "<li>", "<list>"],
        correct: 1
    },
    {
        q: "What is the purpose of the <head> element?",
        a: ["To display the main content", "To hold metadata about the document", "To create a footer", "To add images"],
        correct: 1
    },
    {
        q: "Which tag is used to create a hyperlink?",
        a: ["<link>", "<a>", "<href>", "<nav>"],
        correct: 1
    },
    {
        q: "What does the <canvas> element do?",
        a: ["Displays video", "Used to draw graphics via scripting", "Stores database values", "Styles text"],
        correct: 1
    },
    {
        q: "Which element is used to group logically related form controls?",
        a: ["<group>", "<div>", "<fieldset>", "<section>"],
        correct: 2
    },
    {
        q: "What does the 'target=\"_blank\"' attribute do in an <a> tag?",
        a: ["Opens the link in a new window/tab", "Makes the link bold", "Downloads the file", "Links to a blank page"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let userAnswers = [];

function loadQuestion() {
    const qData = quizData[currentQuestion];
    document.getElementById('question-text').textContent = qData.q;
    document.getElementById('quiz-progress').textContent = `Question ${currentQuestion + 1} of 10`;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    qData.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, index);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('next-quiz-btn').style.display = 'none';
    selectedOption = null;
}

function selectOption(btn, index) {
    document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedOption = index;
    document.getElementById('next-quiz-btn').style.display = 'block';
}

function handleNextQuestion() {
    const qData = quizData[currentQuestion];
    const isCorrect = selectedOption === qData.correct;

    userAnswers.push({
        question: qData.q,
        answer: qData.a[selectedOption],
        correct: qData.a[qData.correct],
        isCorrect: isCorrect,
        allOptions: qData.a
    });

    if (isCorrect) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showQuizResult();
    }
}

const escapeHTML = (str) => str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
})[m]);

function showQuizResult() {
    document.getElementById('quiz-section').style.display = 'none';
    const resultArea = document.getElementById('quiz-result');
    resultArea.style.display = 'block';

    const scoreText = document.getElementById('feedback-score');
    const titleText = document.getElementById('feedback-title');
    const descText = document.getElementById('feedback-description');
    const unlockArea = document.getElementById('certificate-unlock-area');
    const retryArea = document.getElementById('retry-area');
    const reviewArea = document.getElementById('quiz-review');

    scoreText.textContent = `${score}/10`;

    // Generate Review HTML
    reviewArea.innerHTML = userAnswers.map((ua, i) => {
        const optionsHtml = ua.allOptions.map((opt, optIdx) => {
            const isUserChoice = opt === ua.answer;
            const isCorrect = opt === ua.correct;
            let statusClass = '';
            if (isCorrect) statusClass = 'review-correct';
            else if (isUserChoice && !ua.isCorrect) statusClass = 'review-wrong';

            return `<div class="review-a ${statusClass}" style="margin-left: 1rem; opacity: ${isUserChoice || isCorrect ? '1' : '0.6'}">
                ${isUserChoice ? '●' : '○'} ${escapeHTML(opt)} ${isCorrect ? ' (Correct ✅)' : (isUserChoice ? ' (Your Choice ❌)' : '')}
            </div>`;
        }).join('');

        return `
            <div class="review-item">
                <div class="review-q">${i + 1}. ${escapeHTML(ua.question)}</div>
                <div style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">Options:</div>
                ${optionsHtml}
                <div class="review-a" style="margin-top: 1rem; font-weight: 600;">
                    Result: <span class="${ua.isCorrect ? 'review-correct' : 'review-wrong'}">${ua.isCorrect ? 'Correct ✅' : 'Incorrect ❌'}</span>
                </div>
            </div>
        `;
    }).join('');

    if (score >= 9) {
        titleText.textContent = "AWESOME! 🌟";
        titleText.style.color = "#10b981";
        descText.textContent = "You are a true HTML Ninja! Your foundational knowledge is flawless.";
        unlockArea.style.display = 'block';
        retryArea.style.display = 'none';
    } else if (score >= 7) {
        titleText.textContent = "EXCELLENT! 🚀";
        titleText.style.color = "#6366f1";
        descText.textContent = "Superb performance! You've mastered almost every aspect of basic web architecture.";
        unlockArea.style.display = 'block';
        retryArea.style.display = 'none';
    } else if (score >= 6) { // More than 5
        titleText.textContent = "GOOD! 👍";
        titleText.style.color = "#f59e0b";
        descText.textContent = "Great job! You have a solid understanding, though there's still room for perfection.";
        unlockArea.style.display = 'block';
        retryArea.style.display = 'none';
    } else {
        titleText.textContent = "FAIL! ❌";
        titleText.style.color = "#ef4444";
        descText.textContent = "Oops! You need a score of 6 or more to earn your certificate. Re-read the chapters and try again!";
        unlockArea.style.display = 'none';
        retryArea.style.display = 'block';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    loadQuestion();
}

function goHome() {
    const overlay = document.getElementById('cert-overlay');
    if (overlay) overlay.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize quiz
window.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});
