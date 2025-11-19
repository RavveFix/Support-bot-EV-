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
        const phoneRegex = /(\d{3}[-\s]?\d{3}[-\s]?\d{4})|(\d{2,4}[-\s]?\d{2,4}[-\s]?\d{2,4})/;

        if (emailRegex.test(userMessage) || (phoneRegex.test(userMessage) && userMessage.length > 8)) {
            return "⚠️ <b>Säkerhetsvarning:</b> Jag ser att du skrev in personuppgifter (mejl/telefon). Tänk på att inte dela känslig information här. Jag sparar inget, men för din egen säkerhet! 🔒";
        }

        // 1. Payment Methods & Options
        if (msg.includes('betalsätt') || msg.includes('betala med') || msg.includes('apple pay') || msg.includes('google pay') || msg.includes('swish') || msg.includes('vipps')) {
            return "Du kan betala på massor av sätt med Monta! 💸<br><br>📱 <b>I appen:</b> Kort, Apple Pay, Google Pay, MobilePay/Vipps eller Monta Wallet.<br>💳 <b>På plats:</b> Vissa laddare har kortterminal för blipp.<br>🏷️ <b>RFID/Laddbricka:</b> Koppla din bricka till Monta Wallet för smidig start.<br><br>Välj det som passar dig bäst! 🚀";
        }

        // 2. Reserved Amount (Reservationer)
        if (msg.includes('reservera') || msg.includes('reserverat') || msg.includes('dragit pengar') || msg.includes('reservation')) {
            return "Ingen panik! 😅 Det är bara en <b>tillfällig reservation</b> för att säkerställa att det finns täckning för laddningen.<br><br>När laddningen är klar dras <b>bara</b> det faktiska beloppet för elen du laddade. Resten släpps direkt tillbaka till ditt konto (det kan ta några bankdagar beroende på din bank). 🏦✨";
        }

        // 3. Pricing & Costs
        if (msg.includes('pris') || msg.includes('kostar') || msg.includes('dyrt') || msg.includes('taxa') || msg.includes('avgift')) {
            return "Priset bestäms av den som <b>äger laddaren</b> (inte av Monta). 🏠🏢<br><br>💡 <b>Tips:</b> Kolla alltid priset i appen precis innan du startar. Där ser du exakt vad det kostar per kWh just nu, inklusive eventuella avgifter. Inga överraskningar! 🧐";
        }

        // 4. Refunds & Wallet Management
        if (msg.includes('återbetalning') || msg.includes('ta ut') || msg.includes('saldo') || msg.includes('wallet') || msg.includes('pengar tillbaka')) {
            return "Dina pengar i Monta Wallet är dina! 💰<br><br>Vill du ta ut dem? Inga problem:<br>1. Gå till din <b>Wallet</b> i appen.<br>2. Välj <b>'Withdraw'</b> (Ta ut).<br>3. Pengarna skickas tillbaka till ditt kort/konto utan avgift.<br><br>Gäller det en återbetalning för en felaktig laddning? Kontakta supporten i appen så hjälper de dig! 🤝";
        }

        // 5. Troubleshooting: Cable Stuck
        if (msg.includes('sitter fast') || msg.includes('kabel') || msg.includes('låst') || msg.includes('får inte loss')) {
            return "Sitter kabeln fast? Testa detta: 🔒<br><br>1. 🔑 <b>Lås upp bilen:</b> Ofta låser bilen kabeln. Lås och lås upp med nyckeln några gånger.<br>2. 🔌 <b>Tryck inåt:</b> Tryck in kabeln hårt i bilen och dra sedan ut.<br>3. 📱 <b>Avsluta i appen:</b> Se till att laddningen verkligen är stoppad i Monta-appen.<br><br>Funkar inget? Leta efter nödöppning (emergency release) i bilens manual eller bagageutrymme. ⚠️";
        }

        // 6. Troubleshooting: Slow Charging
        if (msg.includes('långsamt') || msg.includes('sakta') || msg.includes('låg effekt') || msg.includes('kw')) {
            return "Går det segt? 🐢 Det kan bero på flera saker:<br><br>1. ❄️ <b>Kallt batteri:</b> Kyla gör laddningen långsammare.<br>2. 🔋 <b>Hög batterinivå:</b> Över 80% går det ofta mycket långsammare.<br>3. ⚡️ <b>Laddarens maxeffekt:</b> Bilen kan inte ta emot mer än vad laddaren (eller bilen själv) klarar av.<br>4. ⚖️ <b>Lastbalansering:</b> Om många laddar samtidigt kan effekten delas.<br><br>Kolla i appen vilken effekt du får just nu! 📊";
        }

        // Payment Terminals (Physical)
        if (msg.includes('apollo') || (msg.includes('payter') && msg.includes('skärm'))) {
            return "Aha, Payter Apollo! 🖥️ Den har en smidig pekskärm. Så här gör du:<br><br>1. 🔌 <b>Koppla in bilen:</b> Sätt i kabeln först.<br>2. 👆 <b>Följ skärmen:</b> Den visar instruktioner (t.ex. 'Present Card').<br>3. 💳 <b>Blippa/Sätt i kortet:</b> Använd blipp eller chip. Slå PIN-kod på skärmen om det behövs.<br>4. ✅ <b>Klart!</b> Skärmen visar 'Approved' och laddningen startar.<br><br>Kvitto? Det får du digitalt via Monta! 📧";
        }

        if (msg.includes('kortläsare') || msg.includes('terminal') || msg.includes('fysisk') || msg.includes('nayax') || msg.includes('payter') || msg.includes('cpi') || msg.includes('blipp')) {
            return "Jajamän! 💳 Monta funkar galant med terminaler som Nayax och Payter. Så här gör du för att slippa krångel:<br><br>1. 🔌 <b>Plugga in kabeln först!</b> Se till att den sitter ordentligt i både bilen och laddaren.<br>2. 📱 <b>Blippa kortet</b> (eller mobilen) på terminalen.<br>3. ⚡️ <b>Laddningen startar!</b><br><br>Enkelt va? Inga appar behövs om du inte vill! 😉";
        }

        // How to charge (General)
        if ((msg.includes('hur') && msg.includes('ladda')) || msg.includes('starta laddning')) {
            return "Härligt! Så här laddar du med Monta-appen som ett proffs: 📱⚡️<br><br>1. <b>Ladda ner & Skapa konto:</b> Hämta Monta-appen och lägg in ditt kort (Visa/Mastercard) eller koppla Apple/Google Pay.<br>2. 📍 <b>Hitta laddare:</b> Sök upp laddplatsen i kartan.<br>3. 👆 <b>Välj uttag:</b> Klicka på 'Go to payment' (Gå till betalning).<br>4. 🚀 <b>Svep för att starta!</b><br><br>Du kan också använda <b>Monta Wallet</b> för att tanka på pengar i förväg. Smart va? 😉";
        }

        // Payment General & App
        if (msg.includes('betal') || msg.includes('kort') || msg.includes('kvitto') || msg.includes('pengar') || msg.includes('qr') || msg.includes('gäst')) {
            if ((msg.includes('kvitto') || msg.includes('hitta')) && msg.includes('hur')) {
                return "Inga problem! Du hittar dina kvitton digitalt. 🧾<br><br><b>I appen:</b><br>Gå till 'Mina laddningar' i din profil.<br><br><b>Utan app (Gäst):</b><br>Gå till <b>monta.com/receipts</b> (eller sök 'Monta kvitto').<br>Du kan söka på:<br>1. 💳 <b>Kortuppgifter:</b> Sista 4 siffrorna + datum.<br>2. 📍 <b>Plats:</b> Namnet på laddplatsen + datum.<br><br>Smidigt va? 🌱";
            }

            // QR / Guest Payment
            if (msg.includes('qr') || msg.includes('gäst') || msg.includes('utan app') || msg.includes('drop-in')) {
                return "Självklart! Du kan ladda utan att skapa konto. 🚀<br><br>1. 📷 <b>Skanna QR-koden</b> på laddaren med din mobilkamera.<br>2. 🌐 <b>Välj betalsätt:</b> Du kommer till en webbsida där du kan betala direkt med kort, Apple Pay eller Google Pay.<br>3. ⚡️ <b>Starta laddning!</b><br><br>Kvitto? Det kan du ladda ner direkt efteråt eller hitta på monta.com/receipts senare. Enkelt och smidigt! ✨";
            }

            if (msg.includes('hur') || msg.includes('steg') || msg.includes('app')) {
                return "Härligt! Så här laddar du med Monta-appen som ett proffs: 📱⚡️<br><br>1. <b>Ladda ner & Skapa konto:</b> Hämta Monta-appen och lägg in ditt kort (Visa/Mastercard) eller koppla Apple/Google Pay.<br>2. 📍 <b>Hitta laddare:</b> Sök upp laddplatsen i kartan.<br>3. 👆 <b>Välj uttag:</b> Klicka på 'Go to payment' (Gå till betalning).<br>4. 🚀 <b>Svep för att starta!</b><br><br>Du kan också använda <b>Monta Wallet</b> för att tanka på pengar i förväg. Smart va? 😉";
            }

            if (msg.includes('kvitto') || msg.includes('hitta')) {
                return "Inga problem! Du hittar dina kvitton digitalt. 🧾<br><br><b>I appen:</b><br>Gå till 'Mina laddningar' i din profil.<br><br><b>Utan app (Gäst):</b><br>Gå till <b>monta.com/receipts</b> (eller sök 'Monta kvitto').<br>Du kan söka på:<br>1. 💳 <b>Kortuppgifter:</b> Sista 4 siffrorna + datum.<br>2. 📍 <b>Plats:</b> Namnet på laddplatsen + datum.<br><br>Smidigt va? 🌱";
            }
            return "Du har massor av valmöjligheter! 💸<br><br>📱 <b>Appen:</b> Betala med kort, Apple/Google Pay eller Monta Wallet.<br>📷 <b>QR-kod:</b> Skanna koden på laddaren för drop-in betalning (inget konto krävs!).<br>💳 <b>Terminal:</b> På vissa platser kan du blippa kortet direkt på en terminal.<br><br>Oavsett hur du betalar får du kvitto digitalt. Inget pappersstrul här inte! 🌳";
        }

        // App Usage General
        if (msg.includes('app') || msg.includes('ladda ner') || msg.includes('konto') || msg.includes('använda')) {
            return "Monta-appen är din bästa vän på vägarna! 🚗💨 Ladda ner den, skapa ett konto och vips så har du tillgång till massor av laddare. Du kan starta, stoppa, betala och se all din historik direkt i luren. Smidigt värre! 😎";
        }

        // Support & Contact
        if (msg.includes('support') || msg.includes('kontakt') || msg.includes('kundtjänst') || msg.includes('ringa')) {
            return "Behöver du prata med oss? 📞<br><br>Du når Montas support snabbast direkt i appen:<br>1. Öppna <b>Monta-appen</b>.<br>2. Gå till <b>'Mig'</b> (profilen).<br>3. Klicka på <b>'Support'</b>.<br><br>Där kan du chatta med oss eller starta ett ärende dygnet runt! 🕒";
        }

        // Troubleshooting (General)
        if (msg.includes('problem') || msg.includes('fel') || msg.includes('funkar inte') || msg.includes('startar inte') || msg.includes('hjälp')) {
            return "Aj då, teknikstrul? 😅 Ingen fara, vi löser det!<br><br>1. 🔌 <b>Kolla kabeln:</b> Sitter den i ordentligt? Tryck till den!<br>2. 🔄 <b>Starta om:</b> Har du behörighet? Testa starta om laddaren i appen.<br>3. 📞 <b>Support:</b> Funkar det fortfarande inte? Hör av dig till supporten direkt i appen så hjälper de dig vidare!";
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
