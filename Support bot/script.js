document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.chat-widget-container');
    const launcherBtn = document.getElementById('launcherBtn');
    const closeBtn = document.getElementById('closeBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle Chat Window
    // Toggle Chat Window
    function toggleChat(shouldFocus = true) {
        const isOpen = container.classList.contains('active');

        if (isOpen) {
            container.classList.remove('active');
            chatWindow.classList.remove('open');
            launcherBtn.setAttribute('aria-label', 'Öppna chatt');
        } else {
            container.classList.add('active');
            chatWindow.classList.add('open');
            launcherBtn.setAttribute('aria-label', 'Stäng chatt');

            // Only focus if not explicitly disabled (prevents keyboard popup on auto-open)
            if (shouldFocus !== false) {
                setTimeout(() => messageInput.focus(), 300);
            }
        }
    }

    launcherBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Auto-open chat on load (mobile friendly: no auto-focus)
    setTimeout(() => {
        if (!container.classList.contains('active')) {
            toggleChat(false);
        }
    }, 1000);

    // Handle Message Submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();

        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';

            // Simulate bot typing/response
            setTimeout(() => {
                const response = getMontaResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    });

    // Monta Expert Logic
    function getMontaResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        // GDPR / Personal Data Safety Check
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /(\d{3}[-\s]?\d{3}[-\s]?\d{4})|(\d{2,4}[-\s]?\d{2,4}[-\s]?\d{2,4})/; // Simple check for phone-like patterns

        if (emailRegex.test(userMessage) || (phoneRegex.test(userMessage) && userMessage.length > 8)) {
            return "⚠️ <b>Säkerhetsvarning:</b> Jag ser att du skrev in personuppgifter (mejl/telefon). Tänk på att inte dela känslig information här. Jag sparar inget, men för din egen säkerhet! 🔒";
        }

        // Payment Terminals (Physical)
        if (msg.includes('apollo') || (msg.includes('payter') && msg.includes('skärm'))) {
            return "Aha, Payter Apollo! 🖥️ Den har en smidig pekskärm. Så här gör du:<br><br>1. 🔌 <b>Koppla in bilen:</b> Sätt i kabeln först.<br>2. 👆 <b>Följ skärmen:</b> Den visar instruktioner (t.ex. 'Present Card').<br>3. 💳 <b>Blippa/Sätt i kortet:</b> Använd blipp eller chip. Slå PIN-kod på skärmen om det behövs.<br>4. ✅ <b>Klart!</b> Skärmen visar 'Approved' och laddningen startar.<br><br>Kvitto? Det får du digitalt via Monta! 📧";
        }

        if (msg.includes('kortläsare') || msg.includes('terminal') || msg.includes('fysisk') || msg.includes('nayax') || msg.includes('payter') || msg.includes('cpi') || msg.includes('blipp')) {
            return "Jajamän! 💳 Monta funkar galant med terminaler som Nayax och Payter. Så här gör du för att slippa krångel:<br><br>1. 🔌 <b>Plugga in kabeln först!</b> Se till att den sitter ordentligt i både bilen och laddaren.<br>2. 📱 <b>Blippa kortet</b> (eller mobilen) på terminalen.<br>3. ⚡️ <b>Laddningen startar!</b><br><br>Enkelt va? Inga appar behövs om du inte vill! 😉";
        }

        // Payment General & App
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

        // App Usage General
        if (msg.includes('app') || msg.includes('ladda ner') || msg.includes('konto') || msg.includes('använda')) {
            return "Monta-appen är din bästa vän på vägarna! 🚗💨 Ladda ner den, skapa ett konto och vips så har du tillgång till massor av laddare. Du kan starta, stoppa, betala och se all din historik direkt i luren. Smidigt värre! 😎";
        }

        // Troubleshooting
        if (msg.includes('problem') || msg.includes('fel') || msg.includes('funkar inte') || msg.includes('startar inte') || msg.includes('hjälp')) {
            return "Aj då, teknikstrul? 😅 Ingen fara, vi löser det!<br><br>1. 🔌 <b>Kolla kabeln:</b> Sitter den i ordentligt? Tryck till den!<br>2. 🔄 <b>Starta om:</b> Har du behörighet? Testa starta om laddaren i appen.<br>3. 📞 <b>Support:</b> Funkar det fortfarande inte? Hör av dig till supporten direkt i appen så hjälper de dig vidare!";
        }

        // Pricing
        if (msg.includes('pris') || msg.includes('kostar') || msg.includes('taxa')) {
            return "Priset sätts av den som äger laddaren, så det kan variera lite. 💸 Men du ser alltid <b>exakt pris per kWh</b> i appen innan du börjar ladda. Inga dolda avgifter här inte! 🧐";
        }

        // Greetings
        if (msg.includes('hej') || msg.includes('tja') || msg.includes('hallå')) {
            return "Tjena! 👋 Din Monta-expert här! Vad har du på hjärtat idag? Laddning, betalning eller bara lite elbils-snack? ⚡️";
        }

        return "Jag är din personliga Monta-guru! 🧘‍♂️ Fråga mig om allt från betalning och kortläsare till hur appen funkar. Jag har koll på läget! ⚡️";
    }

    // Add Message to DOM
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Only escape user input to prevent XSS, allow HTML in bot responses for formatting
        const content = sender === 'user' ? escapeHtml(text) : text;

        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${time}</div>
        `;

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
