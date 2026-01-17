document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatHistory = document.getElementById('chat-history');
    const categoriesContainer = document.getElementById('categories-container');
    const randomQuestionsContainer = document.getElementById('random-questions');
    const refreshRandomButton = document.getElementById('refresh-random');
    const clearChatButton = document.getElementById('clear-chat');

    // Enhanced Knowledge Base organized by categories
    const knowledgeBase = {
        // Basic Greetings & Interactions
        greetings: [
            { question: "hello", answer: "Hello there! 👋 How can I assist you today?" },
            { question: "hi", answer: "Hi! 😊 What can I help you with?" },
            { question: "hey", answer: "Hey! Ready to chat? What's on your mind?" },
            { question: "good morning", answer: "Good morning! ☀️ Hope you're having a great day!" },
            { question: "good evening", answer: "Good evening! 🌙 How can I help you tonight?" },
            { question: "how are you", answer: "I'm doing great, thank you for asking! 😊 How are you doing today?" },
            { question: "what is your name", answer: "I'm your AI Assistant! You can call me whatever you'd like. What should I call you?" },
            { question: "thank you", answer: "You're very welcome! 🙏 Happy to help anytime!" },
            { question: "thanks", answer: "No problem at all! Is there anything else I can help you with?" },
            { question: "bye", answer: "Goodbye! 👋 Have a wonderful day ahead!" },
            { question: "goodbye", answer: "Take care! Feel free to come back anytime you need assistance. 😊" },
            { question: "exit", answer: "Thanks for chatting! Hope to see you again soon! ✨" }
        ],

        // Transportation & Travel
        transportation: [
            { question: "how is traffic", answer: "I don't have access to real-time traffic data, but I recommend checking Google Maps, Waze, or your local traffic apps for current conditions. 🚗" },
            { question: "traffic conditions", answer: "For live traffic updates, try using navigation apps like Google Maps or Waze. They provide real-time traffic information and alternative routes." },
            { question: "best route to work", answer: "I'd suggest using GPS navigation apps that can calculate the best route based on current traffic conditions and your specific location." },
            { question: "public transport", answer: "Public transportation options vary by location. Check your local transit authority's website or apps for schedules and routes. 🚌🚇" },
            { question: "flight status", answer: "For flight information, check your airline's website or apps like FlightAware for real-time flight status updates. ✈️" },
            { question: "train schedule", answer: "Train schedules are best checked on your local railway service's official website or mobile app for the most accurate timing." },
            { question: "gas prices", answer: "Gas prices fluctuate daily. Check apps like GasBuddy or your local gas station websites for current pricing in your area. ⛽" },
            { question: "parking availability", answer: "Many cities have parking apps that show available spots. Try ParkWhiz, SpotHero, or your city's parking app." }
        ],

        // Safety & Security
        safety: [
            { question: "how is safety on the road", answer: "Road safety depends on many factors like weather, traffic, and road conditions. Always drive defensively and follow traffic laws! 🛡️" },
            { question: "road conditions", answer: "For current road conditions, check your local department of transportation website or traffic apps for construction updates and hazards." },
            { question: "emergency contacts", answer: "Always keep emergency contacts handy: 911 for emergencies, local police, fire department, and poison control (1-800-222-1222). 🚨" },
            { question: "weather alerts", answer: "Stay updated with weather alerts through the National Weather Service, Weather.com, or your phone's weather app for safety warnings. ⛈️" },
            { question: "home security", answer: "Home security basics: lock doors/windows, install good lighting, consider security systems, and know your neighbors. 🏠🔒" },
            { question: "online safety", answer: "Online safety tips: use strong passwords, enable 2FA, avoid suspicious links, keep software updated, and be cautious sharing personal info. 💻🛡️" },
            { question: "personal safety", answer: "Personal safety tips: stay aware of surroundings, trust your instincts, carry emergency contacts, and inform someone of your whereabouts. 👤" },
            { question: "food safety", answer: "Food safety essentials: wash hands, cook to proper temperatures, refrigerate promptly, and check expiration dates. 🍽️" }
        ],

        // Technology & Digital
        technology: [
            { question: "how does this website work", answer: "This chatbot uses a knowledge base system to match your questions with pre-programmed responses. It's built with HTML, CSS, and JavaScript! 💻" },
            { question: "website features", answer: "This website features an interactive chatbot, categorized questions, real-time responses, and a clean, user-friendly interface. ✨" },
            { question: "is the website secure", answer: "This is a demonstration website. For production sites, look for HTTPS (🔒) in the URL and check privacy policies for security measures." },
            { question: "mobile app", answer: "This is currently a web-based interface. Many chatbots can be adapted for mobile apps using frameworks like React Native or Flutter. 📱" },
            { question: "artificial intelligence", answer: "AI encompasses machine learning, natural language processing, computer vision, and more. It's rapidly evolving and transforming many industries! 🤖" },
            { question: "internet speed", answer: "Internet speed depends on your provider and plan. You can test your speed using services like Speedtest.net or Fast.com. 🌐" },
            { question: "password manager", answer: "Password managers like 1Password, LastPass, or Bitwarden help create and store strong, unique passwords securely. 🔐" },
            { question: "cloud storage", answer: "Popular cloud storage options include Google Drive, Dropbox, OneDrive, and iCloud for backing up and syncing your files. ☁️" }
        ],

        // Health & Wellness
        health: [
            { question: "healthy eating", answer: "Healthy eating includes lots of fruits, vegetables, whole grains, lean proteins, and staying hydrated. Everything in moderation! 🥗" },
            { question: "exercise tips", answer: "Regular exercise: aim for 150 minutes moderate activity weekly, include strength training, start slowly, and find activities you enjoy! 💪" },
            { question: "mental health", answer: "Mental health is important! Practice self-care, get enough sleep, stay connected with others, and seek professional help when needed. 🧠💚" },
            { question: "sleep hygiene", answer: "Good sleep: consistent schedule, dark/cool room, no screens before bed, comfortable mattress, and avoid caffeine late in the day. 😴" },
            { question: "stress management", answer: "Manage stress through deep breathing, meditation, exercise, time management, talking to friends, and taking breaks. 🧘‍♀️" },
            { question: "hydration", answer: "Stay hydrated! Aim for about 8 glasses of water daily, more if you're active. Listen to your body's thirst signals. 💧" },
            { question: "first aid", answer: "Basic first aid: know CPR, how to treat cuts/burns, recognize emergency signs, and keep a first aid kit handy. Always call 911 for serious injuries! 🏥" },
            { question: "vitamins", answer: "A balanced diet usually provides necessary vitamins, but consult healthcare providers about supplements. Vitamin D and B12 are commonly needed. 💊" }
        ],

        // General Knowledge
        knowledge: [
            { question: "weather", answer: "I can't provide real-time weather, but check Weather.com, your phone's weather app, or local news for current conditions and forecasts! ⛅" },
            { question: "what time is it", answer: "I don't have access to real-time clock information. Check your device's clock or search 'current time' online! ⏰" },
            { question: "capital of france", answer: "The capital of France is Paris! 🇫🇷 It's known for the Eiffel Tower, Louvre Museum, and delicious cuisine." },
            { question: "largest ocean", answer: "The Pacific Ocean is the largest ocean on Earth, covering about one-third of the planet's surface! 🌊" },
            { question: "speed of light", answer: "The speed of light in a vacuum is approximately 299,792,458 meters per second (about 186,282 miles per second). ⚡" },
            { question: "mount everest", answer: "Mount Everest is the world's highest mountain at 29,032 feet (8,849 meters) above sea level, located in the Himalayas. 🏔️" },
            { question: "human body bones", answer: "Adults have 206 bones in their body, while babies are born with about 270 bones that fuse together as they grow! 🦴" },
            { question: "photosynthesis", answer: "Photosynthesis is how plants make food using sunlight, carbon dioxide, and water, producing oxygen as a byproduct. 🌱☀️" }
        ],

        // Entertainment & Hobbies
        entertainment: [
            { question: "movie recommendations", answer: "I'd need to know your preferred genres! Popular recent films span action, comedy, drama, sci-fi, and documentaries. What do you enjoy? 🎬" },
            { question: "music streaming", answer: "Popular music services include Spotify, Apple Music, YouTube Music, and Amazon Music. Each has unique features and playlists! 🎵" },
            { question: "book suggestions", answer: "Book recommendations depend on your interests! Fiction, non-fiction, mystery, romance, sci-fi - what genre speaks to you? 📚" },
            { question: "gaming", answer: "Gaming spans PC, console, mobile, and VR platforms. Popular genres include RPGs, FPS, strategy, and indie games. What do you play? 🎮" },
            { question: "cooking recipes", answer: "Cooking is fun! Start with simple recipes, use fresh ingredients, and don't be afraid to experiment. What cuisine interests you? 👨‍🍳" },
            { question: "travel destinations", answer: "Travel depends on your preferences! Beach, mountains, cities, culture, adventure - where does your wanderlust lead you? ✈️🗺️" },
            { question: "photography tips", answer: "Photography basics: understand lighting, composition (rule of thirds), practice regularly, and experiment with different subjects! 📸" },
            { question: "gardening", answer: "Gardening tips: start small, know your climate zone, water regularly but don't overwater, and choose plants suited to your space! 🌱" }
        ]
    };

    // Flatten knowledge base for search
    const flattenedKB = [];
    Object.keys(knowledgeBase).forEach(category => {
        knowledgeBase[category].forEach(item => {
            flattenedKB.push({ ...item, category });
        });
    });

    // Utility Functions
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', sender === 'user' ? 'justify-end' : 'justify-start', 'message-animation');

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('p-4', 'rounded-2xl', 'max-w-[80%]', 'shadow-sm', 'break-words');

        if (sender === 'user') {
            messageBubble.classList.add('user-message', 'rounded-br-md');
        } else {
            messageBubble.classList.add('bot-message', 'rounded-bl-md');
        }

        // Format message with better typography
        const messageText = document.createElement('p');
        messageText.innerHTML = message.replace(/\n/g, '<br>');
        messageBubble.appendChild(messageText);

        messageDiv.appendChild(messageBubble);
        chatHistory.appendChild(messageDiv);

        // Smooth scroll to bottom
        setTimeout(() => {
            chatHistory.scrollTo({
                top: chatHistory.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.classList.add('flex', 'justify-start');
        
        typingDiv.innerHTML = `
            <div class="bot-message p-4 rounded-2xl rounded-bl-md max-w-[80%] shadow-sm flex items-center space-x-2">
                <span class="text-gray-500">AI is typing</span>
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
                </div>
            </div>
        `;
        
        chatHistory.appendChild(typingDiv);
        chatHistory.scrollTo({
            top: chatHistory.scrollHeight,
            behavior: 'smooth'
        });
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async function getBotResponse(message) {
        const lowerCaseMessage = message.toLowerCase().trim();
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        let response = "I'm sorry, I don't have a specific answer for that question. Try asking about transportation, safety, technology, health, or general knowledge topics! 🤔";
        
        // Search through knowledge base
        const found = flattenedKB.find(item => 
            lowerCaseMessage.includes(item.question.toLowerCase()) ||
            item.question.toLowerCase().includes(lowerCaseMessage) ||
            // More flexible matching
            item.question.toLowerCase().split(' ').some(word => 
                lowerCaseMessage.includes(word) && word.length > 3
            )
        );
        
        if (found) {
            response = found.answer;
        } else {
            // Try partial matching for better results
            const partialMatch = flattenedKB.find(item => {
                const keywords = item.question.toLowerCase().split(' ');
                const messageWords = lowerCaseMessage.split(' ');
                return keywords.some(keyword => 
                    messageWords.some(word => 
                        word.includes(keyword) || keyword.includes(word)
                    ) && keyword.length > 2
                );
            });
            
            if (partialMatch) {
                response = partialMatch.answer;
            }
        }
        
        removeTypingIndicator();
        addMessage('bot', response);
    }

    function populateCategories() {
        categoriesContainer.innerHTML = '';
        
        Object.keys(knowledgeBase).forEach(categoryKey => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-section');
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.classList.add('category-title', 'text-lg', 'font-medium', 'mb-3');
            
            // Category emojis and titles
            const categoryInfo = {
                greetings: { title: '👋 Greetings', icon: '👋' },
                transportation: { title: '🚗 Transportation', icon: '🚗' },
                safety: { title: '🛡️ Safety', icon: '🛡️' },
                technology: { title: '💻 Technology', icon: '💻' },
                health: { title: '🏥 Health', icon: '🏥' },
                knowledge: { title: '🧠 Knowledge', icon: '🧠' },
                entertainment: { title: '🎬 Entertainment', icon: '🎬' }
            };
            
            categoryTitle.textContent = categoryInfo[categoryKey]?.title || categoryKey;
            categoryDiv.appendChild(categoryTitle);
            
            const questionsDiv = document.createElement('div');
            questionsDiv.classList.add('space-y-2');
            
            // Show first 3 questions from each category
            knowledgeBase[categoryKey].slice(0, 3).forEach(item => {
                const questionBtn = document.createElement('button');
                questionBtn.classList.add(
                    'suggested-question-btn', 'w-full', 'text-left', 'bg-white', 'hover:bg-blue-50',
                    'text-gray-700', 'hover:text-blue-700', 'p-3', 'rounded-lg', 'border', 'border-gray-200',
                    'hover:border-blue-300', 'transition-all', 'duration-200', 'text-sm'
                );
                
                questionBtn.textContent = item.question.charAt(0).toUpperCase() + item.question.slice(1);
                questionBtn.addEventListener('click', () => {
                    addMessage('user', item.question);
                    getBotResponse(item.question);
                });
                
                questionsDiv.appendChild(questionBtn);
            });
            
            categoryDiv.appendChild(questionsDiv);
            categoriesContainer.appendChild(categoryDiv);
        });
    }

    function populateRandomQuestions() {
        randomQuestionsContainer.innerHTML = '';
        
        // Get 4 random questions
        const randomQuestions = [];
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * flattenedKB.length);
            const question = flattenedKB[randomIndex];
            if (!randomQuestions.some(q => q.question === question.question)) {
                randomQuestions.push(question);
            }
        }
        
        randomQuestions.forEach(item => {
            const questionBtn = document.createElement('button');
            questionBtn.classList.add(
                'suggested-question-btn', 'w-full', 'text-left', 'bg-blue-50', 'hover:bg-blue-100',
                'text-blue-700', 'p-3', 'rounded-lg', 'border', 'border-blue-200',
                'hover:border-blue-400', 'transition-all', 'duration-200', 'text-sm'
            );
            
            questionBtn.innerHTML = `<span class="font-medium">${item.question.charAt(0).toUpperCase() + item.question.slice(1)}</span>`;
            questionBtn.addEventListener('click', () => {
                addMessage('user', item.question);
                getBotResponse(item.question);
            });
            
            randomQuestionsContainer.appendChild(questionBtn);
        });
    }

    function clearChat() {
        chatHistory.innerHTML = '';
        // Add initial welcome message back
        setTimeout(() => {
            const welcomeDiv = document.createElement('div');
            welcomeDiv.classList.add('flex', 'justify-start', 'message-animation');
            welcomeDiv.innerHTML = `
                <div class="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-bl-md max-w-[80%] shadow-sm">
                    <p class="font-medium text-blue-600 mb-2">👋 Welcome Back!</p>
                    <p>Chat cleared! I'm ready for new questions. What would you like to know?</p>
                </div>
            `;
            chatHistory.appendChild(welcomeDiv);
        }, 300);
    }

    function autoResize() {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            autoResize();
            getBotResponse(message);
        }
    }

    // Event Listeners
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    userInput.addEventListener('input', autoResize);

    clearChatButton.addEventListener('click', clearChat);

    refreshRandomButton.addEventListener('click', populateRandomQuestions);

    // Initialize the chatbot
    populateCategories();
    populateRandomQuestions();

    // Focus on input field
    userInput.focus();

    // Add some helpful keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        // Ctrl/Cmd + K to focus input
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            userInput.focus();
        }
        
        // Ctrl/Cmd + L to clear chat
        if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
            event.preventDefault();
            clearChat();
        }
        
        // Escape to blur input
        if (event.key === 'Escape') {
            userInput.blur();
        }
    });

    // Add some easter eggs and special responses
    const easterEggs = {
        'tell me a joke': "Why don't scientists trust atoms? Because they make up everything! 😄",
        'what is love': "Baby don't hurt me, don't hurt me, no more! 🎵 (But seriously, love is a complex emotion involving care, affection, and connection)",
        'meaning of life': "According to The Hitchhiker's Guide to the Galaxy, it's 42! But in reality, it's whatever gives your life purpose and fulfillment. 🌟",
        'how to be happy': "Happiness comes from gratitude, meaningful relationships, personal growth, helping others, and finding joy in small moments! 😊",
        'best programming language': "That's like asking what's the best tool! It depends on what you're building. Python for beginners, JavaScript for web, etc. 💻",
        'is ai taking over': "AI is a tool to augment human capabilities, not replace humans! We work better together. 🤝🤖",
        'secret of success': "Success = Preparation + Opportunity + Persistence + Learning from failures + Being kind to others! ✨",
        'time travel possible': "According to physics, forward time travel is theoretically possible, but backward time travel faces many paradoxes! ⏰🚀"
    };

    // Enhance getBotResponse with easter eggs
    const originalGetBotResponse = getBotResponse;
    getBotResponse = async function(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Check for easter eggs first
        const easterEgg = Object.keys(easterEggs).find(key => 
            lowerMessage.includes(key) || key.includes(lowerMessage)
        );
        
        if (easterEgg) {
            showTypingIndicator();
            await new Promise(resolve => setTimeout(resolve, 1000));
            removeTypingIndicator();
            addMessage('bot', easterEggs[easterEgg]);
            return;
        }
        
        // Fall back to original response logic
        await originalGetBotResponse(message);
    };

    // Add welcome message with animation delay
    setTimeout(() => {
        console.log('🤖 AI Assistant loaded successfully!');
        console.log('💡 Pro tip: Try asking about transportation, safety, technology, health, or general knowledge!');
        console.log('⌨️ Keyboard shortcuts: Ctrl+K (focus input), Ctrl+L (clear chat), Escape (blur input)');
    }, 1000);
});