// Monta Support Bot - Embeddable Widget
// Usage: Add this script to your Wix site via Custom Code or Embed element
// <script src="https://your-vercel-url.vercel.app/embed.js"></script>

(function () {
    'use strict';

    // Prevent multiple instances
    if (window.MontaChatWidgetLoaded) return;
    window.MontaChatWidgetLoaded = true;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        .monta-chat-widget-container * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .monta-chat-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .monta-chat-launcher {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            position: relative;
        }

        .monta-chat-launcher:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
        }

        .monta-chat-launcher svg {
            color: white;
        }

        .monta-chat-window {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 380px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 140px);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .monta-chat-window.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        .monta-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 20px 20px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .monta-chat-header-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .monta-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 18px;
        }

        .monta-chat-header h3 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 2px;
        }

        .monta-status {
            font-size: 12px;
            opacity: 0.9;
        }

        .monta-close-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            opacity: 0.8;
            transition: opacity 0.2s;
        }

        .monta-close-btn:hover {
            opacity: 1;
        }

        .monta-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .monta-message {
            display: flex;
            flex-direction: column;
            max-width: 80%;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .monta-message.user {
            align-self: flex-end;
        }

        .monta-message.bot {
            align-self: flex-start;
        }

        .monta-message-content {
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.5;
        }

        .monta-message.user .monta-message-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-bottom-right-radius: 4px;
        }

        .monta-message.bot .monta-message-content {
            background: rgba(102, 126, 234, 0.1);
            color: #333;
            border-bottom-left-radius: 4px;
        }

        .monta-message-time {
            font-size: 11px;
            opacity: 0.6;
            margin-top: 4px;
            padding: 0 4px;
        }

        .monta-chat-input-area {
            padding: 16px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .monta-chat-form {
            display: flex;
            gap: 8px;
        }

        .monta-chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 24px;
            font-size: 14px;
            font-family: inherit;
            outline: none;
            transition: border-color 0.2s;
        }

        .monta-chat-input:focus {
            border-color: #667eea;
        }

        .monta-send-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }

        .monta-send-btn:hover {
            transform: scale(1.1);
        }

        @media (max-width: 480px) {
            .monta-chat-widget-container {
                bottom: 20px;
                left: 50%;
                right: auto;
                transform: translateX(-50%);
            }

            .monta-chat-window {
                bottom: 0;
                right: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                max-height: 100vh;
                border-radius: 0;
            }

            .monta-chat-header {
                border-radius: 0;
            }

            .monta-chat-launcher {
                margin: 0 auto;
            }
        }
    `;
    document.head.appendChild(style);

    // Create widget HTML
    const widgetHTML = `
        <div class="monta-chat-widget-container">
            <div class="monta-chat-window" id="montaChatWindow">
                <div class="monta-chat-header">
                    <div class="monta-chat-header-info">
                        <div class="monta-avatar">M</div>
                        <div>
                            <h3>Monta Support</h3>
                            <span class="monta-status">Online</span>
                        </div>
                    </div>
                    <button class="monta-close-btn" id="montaCloseBtn" aria-label="Stäng chatt">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="monta-chat-messages" id="montaChatMessages">
                    <div class="monta-message bot">
                        <div class="monta-message-content">
                            Hej! Jag är din Monta-expert. Fråga mig om laddning, betalning eller appen! ⚡️
                        </div>
                        <div class="monta-message-time">Just nu</div>
                    </div>
                    <div class="monta-message bot">
                        <div class="monta-message-content">
                            👋 Obs! Jag är en automatisk assistent och sparar inga personuppgifter om dig. (GDPR) 🔒
                        </div>
                        <div class="monta-message-time">Just nu</div>
                    </div>
                </div>

                <div class="monta-chat-input-area">
                    <form class="monta-chat-form" id="montaChatForm">
                        <input type="text" class="monta-chat-input" id="montaMessageInput" placeholder="Skriv ett meddelande..." autocomplete="off">
                        <button type="submit" class="monta-send-btn" aria-label="Skicka">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <button class="monta-chat-launcher" id="montaLauncherBtn" aria-label="Öppna chatt">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        </div>
    `;

    // Inject widget into page
    document.addEventListener('DOMContentLoaded', function () {
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        document.body.appendChild(container.firstElementChild);

        initWidget();
    });

    // If DOM already loaded
    if (document.readyState === 'loading') {
        // Already handled above
    } else {
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        document.body.appendChild(container.firstElementChild);
        initWidget();
    }

    function initWidget() {
        const chatWindow = document.getElementById('montaChatWindow');
        const launcherBtn = document.getElementById('montaLauncherBtn');
        const closeBtn = document.getElementById('montaCloseBtn');
        const chatForm = document.getElementById('montaChatForm');
        const messageInput = document.getElementById('montaMessageInput');
        const chatMessages = document.getElementById('montaChatMessages');

        function toggleChat(shouldFocus = true) {
            const isOpen = chatWindow.classList.contains('open');

            if (isOpen) {
                chatWindow.classList.remove('open');
            } else {
                chatWindow.classList.add('open');
                if (shouldFocus !== false) {
                    setTimeout(() => messageInput.focus(), 300);
                }
            }
        }

        launcherBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // Auto-open after 1 second
        setTimeout(() => {
            if (!chatWindow.classList.contains('open')) {
                toggleChat(false);
            }
        }, 1000);

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value.trim();

            if (message) {
                addMessage(message, 'user');
                messageInput.value = '';

                setTimeout(() => {
                    const response = getMontaResponse(message);
                    addMessage(response, 'bot');
                }, 1000);
            }
        });

        function getMontaResponse(userMessage) {
            const msg = userMessage.toLowerCase();

            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            const phoneRegex = /(\d{3}[-\s]?\d{3}[-\s]?\d{4})|(\d{2,4}[-\s]?\d{2,4}[-\s]?\d{2,4})/;

            if (emailRegex.test(userMessage) || (phoneRegex.test(userMessage) && userMessage.length > 8)) {
                return "⚠️ <b>Säkerhetsvarning:</b> Jag ser att du skrev in personuppgifter (mejl/telefon). Tänk på att inte dela känslig information här. Jag sparar inget, men för din egen säkerhet! 🔒";
            }

            if (msg.includes('apollo') || (msg.includes('payter') && msg.includes('skärm'))) {
                return "Aha, Payter Apollo! 🖥️ Den har en smidig pekskärm. Så här gör du:<br><br>1. 🔌 <b>Koppla in bilen:</b> Sätt i kabeln först.<br>2. 👆 <b>Följ skärmen:</b> Den visar instruktioner (t.ex. 'Present Card').<br>3. 💳 <b>Blippa/Sätt i kortet:</b> Använd blipp eller chip. Slå PIN-kod på skärmen om det behövs.<br>4. ✅ <b>Klart!</b> Skärmen visar 'Approved' och laddningen startar.<br><br>Kvitto? Det får du digitalt via Monta! 📧";
            }

            if (msg.includes('kortläsare') || msg.includes('terminal') || msg.includes('fysisk') || msg.includes('nayax') || msg.includes('payter') || msg.includes('cpi') || msg.includes('blipp')) {
                return "Jajamän! 💳 Monta funkar galant med terminaler som Nayax och Payter. Så här gör du för att slippa krångel:<br><br>1. 🔌 <b>Plugga in kabeln först!</b> Se till att den sitter ordentligt i både bilen och laddaren.<br>2. 📱 <b>Blippa kortet</b> (eller mobilen) på terminalen.<br>3. ⚡️ <b>Laddningen startar!</b><br><br>Enkelt va? Inga appar behövs om du inte vill! 😉";
            }

            if (msg.includes('betal') || msg.includes('kort') || msg.includes('kvitto') || msg.includes('pengar')) {
                if ((msg.includes('kvitto') || msg.includes('hitta')) && msg.includes('hur')) {
                    return "Inga problem! Du hittar dina kvitton digitalt. 🧾<br><br><b>I appen:</b><br>Gå till 'Mina laddningar' i din profil.<br><br><b>Utan app (Gäst):</b><br>Gå till <b>monta.com/receipts</b> (eller sök 'Monta kvitto').<br>Du kan söka på:<br>1. 💳 <b>Kortuppgifter:</b> Sista 4 siffrorna + datum.<br>2. 📍 <b>Plats:</b> Namnet på laddplatsen + datum.<br><br>Smidigt va? 🌱";
                }
                if (msg.includes('hur') || msg.includes('steg') || msg.includes('app')) {
                    return "Okej, häng med nu! Så här betalar du smidigast i appen: 📱💨<br><br>1. Öppna kartan och hitta din laddare.<br>2. Tryck på <b>'Gå till betalning'</b>.<br>3. Välj ditt kort (eller Apple/Google Pay).<br>4. <b>Svep för att ladda!</b> 🚀<br><br>Psst! Du kan också betala direkt med kortterminalen på plats om det finns en sån. Glöm inte att plugga in kabeln först bara! 🔌";
                }
                if (msg.includes('kvitto') || msg.includes('hitta')) {
                    return "Inga problem! Du hittar dina kvitton digitalt. 🧾<br><br><b>I appen:</b><br>Gå till 'Mina laddningar' i din profil.<br><br><b>Utan app (Gäst):</b><br>Gå till <b>monta.com/receipts</b> (eller sök 'Monta kvitto').<br>Du kan söka på:<br>1. 💳 <b>Kortuppgifter:</b> Sista 4 siffrorna + datum.<br>2. 📍 <b>Plats:</b> Namnet på laddplatsen + datum.<br><br>Smidigt va? 🌱";
                }
                return "Cash is king? Nja, inte här! 😉 Du betalar smidigt via Monta-appen (kort, Apple/Google Pay) eller direkt med kortterminaler på plats (blippa bara!). Kvittot? Det landar digitalt, så du slipper pappersstrul! 🌱";
            }

            if (msg.includes('app') || msg.includes('ladda ner') || msg.includes('konto') || msg.includes('använda')) {
                return "Monta-appen är din bästa vän på vägarna! 🚗💨 Ladda ner den, skapa ett konto och vips så har du tillgång till massor av laddare. Du kan starta, stoppa, betala och se all din historik direkt i luren. Smidigt värre! 😎";
            }

            if (msg.includes('problem') || msg.includes('fel') || msg.includes('funkar inte') || msg.includes('startar inte') || msg.includes('hjälp')) {
                return "Aj då, teknikstrul? 😅 Ingen fara, vi löser det!<br><br>1. 🔌 <b>Kolla kabeln:</b> Sitter den i ordentligt? Tryck till den!<br>2. 🔄 <b>Starta om:</b> Har du behörighet? Testa starta om laddaren i appen.<br>3. 📞 <b>Support:</b> Funkar det fortfarande inte? Hör av dig till supporten direkt i appen så hjälper de dig vidare!";
            }

            if (msg.includes('pris') || msg.includes('kostar') || msg.includes('taxa')) {
                return "Priset sätts av den som äger laddaren, så det kan variera lite. 💸 Men du ser alltid <b>exakt pris per kWh</b> i appen innan du börjar ladda. Inga dolda avgifter här inte! 🧐";
            }

            if (msg.includes('hej') || msg.includes('tja') || msg.includes('hallå')) {
                return "Tjena! 👋 Din Monta-expert här! Vad har du på hjärtat idag? Laddning, betalning eller bara lite elbils-snack? ⚡️";
            }

            return "Jag är din personliga Monta-guru! 🧘‍♂️ Fråga mig om allt från betalning och kortläsare till hur appen funkar. Jag har koll på läget! ⚡️";
        }

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('monta-message', sender);

            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const content = sender === 'user' ? escapeHtml(text) : text;

            messageDiv.innerHTML = `
                <div class="monta-message-content">${content}</div>
                <div class="monta-message-time">${time}</div>
            `;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
})();
