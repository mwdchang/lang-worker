import { LangWorker } from "./main";

// Initialize workers (optional, depending on how you want to handle them)
const workers: Record<string, LangWorker> = {
    python: new LangWorker('python'),
    ruby: new LangWorker('ruby')
};

const DEFAULT_CODE: Record<string, string> = {
    // python: 'def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nprint(f"Fibonacci(10) is {fib(10)}")',
    python: 'def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nfib(10)',
    ruby: 'def fib(n)\n  a, b = 0, 1\n  n.times { a, b = b, a + b }\n  a\nend\n\nputs "Fibonacci(10) is #{fib(10)}"'
};

/**
 * Adds a new result card to the output pane
 */
function addOutputCard(language: string, code: string, result: any, isError: boolean = false) {
    const container = document.getElementById('output-container');
    const noOutputMsg = document.getElementById('no-output-msg');
    
    if (noOutputMsg) {
        noOutputMsg.style.display = 'none';
    }

    const card = document.createElement('div');
    card.className = `card output-card ${isError ? 'error' : ''}`;
    
    const timestamp = new Date().toLocaleTimeString();

    card.innerHTML = `
        <div class="card-body">
            <div class="output-header">
                <span><strong>${language.toUpperCase()}</strong></span>
                <span>${timestamp}</span>
            </div>
            <div class="output-body">${result !== undefined ? result : 'No output'}</div>
        </div>
    `;

    if (container) {
        container.prepend(card);
    }
}

/**
 * Stub function for code execution.
 * The user will handle the actual execution logic.
 */
async function executeCode(language: string, code: string) {
    
    try {
        // Example of how you might use the LangWorker:
        const worker = workers[language];
        if (worker) {
            const result = await worker.runCode(code);
            addOutputCard(language, code, result);
        } else {
            addOutputCard(language, code, `Error: Worker for ${language} not initialized`, true);
        }
    } catch (error) {
        addOutputCard(language, code, error instanceof Error ? error.message : String(error), true);
    }
}

// UI Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button') as HTMLButtonElement;
    const languageSelect = document.getElementById('language-select') as HTMLSelectElement;
    const codeEditor = document.getElementById('code-editor') as HTMLTextAreaElement;

    // Set initial code
    if (codeEditor && languageSelect) {
        codeEditor.value = DEFAULT_CODE[languageSelect.value] || '';
    }

    // Handle language change
    languageSelect?.addEventListener('change', () => {
        if (codeEditor) {
            codeEditor.value = DEFAULT_CODE[languageSelect.value] || '';
        }
    });

    // Handle run button click
    runButton?.addEventListener('click', async () => {
        const language = languageSelect.value;
        const code = codeEditor.value;
        
        runButton.disabled = true;
        runButton.textContent = 'Running...';
        
        await executeCode(language, code);
        
        runButton.disabled = false;
        runButton.textContent = 'Run Code';
    });
});
