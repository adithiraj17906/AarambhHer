import { useState, useRef, useEffect } from 'react';
import { aiReplies } from '../data/mockData';

// Multilingual Dictionary
const translations = {
  en: {
    greeting: "Namaste! 👋 I'm Priya, your AI Career Advisor. I'm here to help you discover career paths, develop skills, and find opportunities that match your goals. What would you like to explore today?",
    placeholder: "Ask me anything about your career...",
    online: "● Online now",
    prompts: [
      "What career suits a science graduate?",
      "How do I get into tech with no experience?",
      "Suggest skills for remote work",
      "Best courses for data science?",
    ],
    replies: aiReplies // Assuming aiReplies has english default keys mapping to english values
  },
  hi: {
    greeting: "नमस्ते! 👋 मैं प्रिया हूँ, आपकी एआई करियर सलाहकार। मैं आपको करियर विकल्प खोजने, कौशल विकसित करने और आपके लक्ष्यों से मेल खाने वाले अवसर ढूंढने में मदद करने के लिए यहाँ हूँ। आज आप क्या जानना चाहेंगी?",
    placeholder: "Apna sawaal poochein ya type karein...",
    online: "● अभी ऑनलाइन",
    prompts: [
      "विज्ञान स्नातक के लिए कौन सा करियर उपयुक्त है?",
      "बिना अनुभव के टेक में कैसे आएं?",
      "रिमोट वर्क के लिए स्किल्स बताएं",
      "डेटा साइंस के लिए बेस्ट कोर्स?",
    ],
    replies: {
      "विज्ञान स्नातक के लिए कौन सा करियर उपयुक्त है?": "एक विज्ञान स्नातक के रूप में, आपकी विश्लेषणात्मक ताकतें कई दरवाजे खोलती हैं। शीर्ष मार्ग: डेटा साइंस (पायथन + मशीन लर्निंग), बायोटेक रिसर्च, पर्यावरण परामर्श, या विज्ञान संचार। क्या आप इनमें से किसी के लिए व्यक्तिगत सीखने का रोडमैप चाहते हैं?",
      "बिना अनुभव के टेक में कैसे आएं?": "बड़ी खबर - आप बिल्कुल प्रवेश कर सकते हैं! फ्रीकोडकैंप या खान एकेडमी जैसे मुफ्त संसाधनों से शुरुआत करें, 2-3 पोर्टफोलियो प्रोजेक्ट बनाएं, फिर जूनियर भूमिकाओं के लिए आवेदन करें। आपके संचार कौशल हस्तांतरणीय संपत्तियां हैं। 3 महीने का प्लान चाहिए?",
      "रिमोट वर्क के लिए स्किल्स बताएं": "रिमोट सफलता के लिए, इन पर ध्यान दें: अतुल्यकालिक संचार, डिजिटल टूल (स्लैक, नोशन, ट्रेलो), समय प्रबंधन, और क्षेत्र-प्रासंगिक तकनीकी कौशल। रिमोट भूमिकाएं बढ़ रही हैं - स्मार्ट विकल्प! आप किस क्षेत्र को लक्षित कर रहे हैं?",
      "डेटा साइंस के लिए बेस्ट कोर्स?": "मेरी शीर्ष पसंद: 1) गूगल डेटा एनालिटिक्स सर्टिफिकेट (कोर्सेरा), 2) डेटा साइंस के लिए पायथन (फ्रीकोडकैंप - मुफ्त!), 3) एसक्यूएल एसेंशियल ट्रेनिंग (लिंक्डइन लर्निंग)। पायथन से शुरू करें, फिर विश्लेषण पर जाएँ। क्या मैं 3 महीने का प्लान बनाऊँ?"
    }
  },
  te: {
    greeting: "నమస్తే! 👋 నేను ప్రియా, మీ AI కెరీర్ అడ్వైజర్. కెరీర్ మార్గాలను కనుగొనడంలో, నైపుణ్యాలను పెంపొందించడంలో మరియు మీ లక్ష్యాలకు సరిపోయే అవకాశాలను కనుగొనడంలో మీకు సహాయపడటానికి నేను ఇక్కడ ఉన్నాను. ఈ రోజు మీరు దేనిని అన్వేషించాలనుకుంటున్నారు?",
    placeholder: "మీ కెరీర్ గురించి నన్ను ఏదైనా అడగండి...",
    online: "● ఇప్పుడు ఆన్‌లైన్‌లో",
    prompts: [
      "సైన్స్ గ్రాడ్యుయేట్‌కి ఏ కెరీర్ సరిపోతుంది?",
      "అనుభవం లేకుండా టెక్‌లోకి ఎలా ప్రవేశించాలి?",
      "రిమోట్ వర్క్ కోసం నైపుణ్యాలను సూచించండి",
      "డేటా సైన్స్ కోసం బెస్ట్ కోర్సులు?",
    ],
    replies: {
      "సైన్స్ గ్రాడ్యుయేట్‌కి ఏ కెరీర్ సరిపోతుంది?": "ఒక సైన్స్ గ్రాడ్యుయేట్‌గా, మీ విశ్లేషణాత్మక బలాలు అనేక తలుపులు తెరుస్తాయి. టాప్ మార్గాలు: డేటా సైన్స్ (పైథాన్ + ML), బయోటెక్ రీసెర్చ్, ఎన్విరాన్‌మెంటల్ కన్సల్టింగ్ లేదా సైన్స్ కమ్యూనికేషన్. వీటిలో దేనికైనా మీరు వ్యక్తిగతీకరించిన శిక్షణ రోడ్‌మ్యాప్ కావాలా?",
      "అనుభవం లేకుండా టెక్‌లోకి ఎలా ప్రవేశించాలి?": "గొప్ప వార్త - మీరు ఖచ్చితంగా ప్రవేశించవచ్చు! freeCodeCamp లేదా ఖాన్ అకాడమీ వంటి ఉచిత వనరులతో ప్రారంభించండి, 2-3 పోర్ట్‌ఫోలియో ప్రాజెక్ట్‌లను నిర్మించండి, ఆపై జూనియర్ పాత్రల కోసం దరఖాస్తు చేసుకోండి. మీ కమ్యూనికేషన్ నైపుణ్యాలు బదిలీ చేయగల ఆస్తులు. 3-నెలల ప్లాన్ కావాలా?",
      "రిమోట్ వర్క్ కోసం నైపుణ్యాలను సూచించండి": "రిమోట్ విజయానికి, వీటిపై దృష్టి పెట్టండి: అసమకాలిక కమ్యూనికేషన్, డిజిటల్ టూల్స్ (స్లాక్, నోషన్, ట్రెల్లో), టైమ్ మేనేజ్‌మెంట్ మరియు ఫీల్డ్-సంబంధిత టెక్ నైపుణ్యాలు. రిమోట్ పాత్రలు విజృంభిస్తున్నాయి - స్మార్ట్ ఎంపిక! మీరు ఏ ఫీల్డ్‌ని లక్ష్యంగా చేసుకున్నారు?",
      "డేటా సైన్స్ కోసం బెస్ట్ కోర్సులు?": "నా టాప్ ఎంపికలు: 1) గూగుల్ డేటా అనలిటిక్స్ సర్టిఫికేట్ (కొర్సెరా), 2) డేటా సైన్స్ కోసం పైథాన్ (ఫ్రీకోడ్‌క్యాంప్ - ఉచితం!), 3) SQL ఎసెన్షియల్ ట్రైనింగ్ (లింక్డ్‌ఇన్ లెర్నింగ్). పైథాన్‌తో ప్రారంభించండి, ఆపై విశ్లేషణకు వెళ్లండి. నేను 3-నెలల ప్లాన్‌ మ్యాప్ చేయనా?"
    }
  }
};

// Fallback for languages without full translation yet
const defaultTranslation = translations.en;
const getTranslation = (lang) => translations[lang] || defaultTranslation;

export default function Chatbot() {
  const [language, setLanguage] = useState('en');
  const t = getTranslation(language);

  const [messages, setMessages] = useState([
    { from:"bot", text: t.greeting }
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const endRef = useRef(null);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior:"smooth" }); 
  }, [messages, typing]);

  // Update greeting when language changes (if it's the only message)
  useEffect(() => {
    if (messages.length === 1) {
       setMessages([{ from:"bot", text: t.greeting }]);
    }
  }, [language, t.greeting]);

  // Speech Synthesis
  const speakText = (text, langCode) => {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to match broadly based on language 
    // Usually standard BCP 47 tags: en-US, hi-IN, te-IN, ta-IN, kn-IN, mr-IN, bn-IN
    const langMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'kn': 'kn-IN',
      'mr': 'mr-IN',
      'bn': 'bn-IN'
    };
    
    utterance.lang = langMap[langCode] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    
    // Cancel any ongoing speech when user sends a new message
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    setMessages(m => [...m, { from:"user", text:msg }]);
    setInput("");
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      
      // Look up reply in current language dict, fallback to default English, then a generic message
      let reply = "";
      if (t.replies && t.replies[msg]) {
         reply = t.replies[msg];
      } else if (aiReplies[msg]) {
         reply = aiReplies[msg];
      } else {
         reply = language === 'hi' 
           ? "बढ़िया सवाल! क्या आप मुझे अपनी शैक्षिक पृष्ठभूमि के बारे में और बता सकते हैं?" 
           : language === 'te' 
             ? "మంచి ప్రశ్న! దయచేసి మీ విద్యా నేపథ్యం గురించి కొంచెం చెప్పగలరా?" 
             : "Great question! Could you tell me more about your educational background and what kind of work environment you prefer — remote, field, or office?";
      }

      setMessages(m => [...m, { from:"bot", text:reply }]);
      
      // Auto-read bot response
      speakText(reply, language);
      
    }, 1500);
  };

  // Web Speech API for Input
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Microphone feature is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    
    const langMap = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'te': 'te-IN',
        'ta': 'ta-IN',
        'kn': 'kn-IN',
        'mr': 'mr-IN',
        'bn': 'bn-IN'
    };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      // Cancel ongoing speech synthesis so it doesn't get picked up by the mic
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      // Auto-send after a brief moment to allow user to see what matched
      setTimeout(() => {
         send(transcript);
      }, 500);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
       setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex-1 bg-white rounded-2xl border border-pink-100 flex flex-col" style={{height:"560px"}}>
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-pink-100 flex-shrink-0 justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600 to-pink-900 flex items-center justify-center text-xl flex-shrink-0">✨</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Priya — AI Career Advisor</p>
              <p className="text-xs text-teal-600 font-medium">{t.online}</p>
            </div>
        </div>
        
        {/* Language Selector */}
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="text-xs border border-pink-200 rounded-md px-2 py-1 bg-pink-50 text-pink-900 outline-none focus:border-pink-500 cursor-pointer"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="bn">বাংলা (Bengali)</option>
        </select>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex max-w-[80%] ${m.from === "bot" ? "self-start" : "self-end"}`}>
             <div 
               className={`px-4 py-3 text-sm leading-relaxed relative group ${m.from === "bot" ? "bg-pink-50 text-gray-800 rounded-2xl rounded-bl-sm" : "bg-gray-900 text-white rounded-2xl rounded-br-sm"}`}>
               {m.text}
               
               {/* Speaker Icon for Bot Output */}
               {m.from === "bot" && (
                   <button 
                     onClick={() => speakText(m.text, language)}
                     className="absolute -right-7 bottom-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-white rounded-full shadow-sm border border-gray-100"
                     title="Read aloud"
                   >
                     🔊
                   </button>
               )}
             </div>
          </div>
        ))}
        {typing && (
          <div className="bg-pink-50 self-start px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
            {[0,1,2].map(d => <div key={d} className="w-2 h-2 bg-pink-500 rounded-full dot-bounce" style={{animationDelay:`${d*0.15}s`}} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>
      
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-2 px-5 pb-3 flex-shrink-0">
        {t.prompts.map((p, i) => (
          <button key={i} onClick={() => send(p)}
            className="text-xs px-3 py-1.5 rounded-full bg-rose-50 border border-pink-100 text-gray-600 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700 transition-all font-medium cursor-pointer">
            {p.length > 34 ? p.slice(0,32) + "…" : p}
          </button>
        ))}
      </div>
      
      {/* Input */}
      <div className="flex gap-3 items-center px-5 pb-5 flex-shrink-0">
        {/* Mic Button */}
        <button 
          onClick={startListening}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all flex-shrink-0 border-0 cursor-pointer relative ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} `}
          title="Voice input"
        >
            🎤
            {isListening && (
               <span className="absolute w-full h-full rounded-full border-2 border-red-500 animate-ping opacity-75"></span>
            )}
        </button>
        
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder={isListening ? "Listening..." : t.placeholder}
          className="flex-1 border border-pink-100 rounded-full px-4 py-2.5 text-sm bg-rose-50/50 text-gray-800 outline-none focus:border-pink-400 transition-all placeholder-gray-300" 
        />
        
        <button 
          onClick={() => send()}
          className="w-10 h-10 bg-pink-700 hover:bg-pink-800 text-white rounded-full flex items-center justify-center text-sm transition-all hover:scale-105 flex-shrink-0 border-0 cursor-pointer"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
