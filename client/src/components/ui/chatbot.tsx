import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_API = "/api/chat";
const DEFAULT_MODEL = "gpt-4o-mini";
const TYPING_SPEED = 18;

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-4 space-y-1 my-1">{listItems}</ul>);
      listItems = [];
    }
  };

  const inlineFormat = (str: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) parts.push(str.slice(lastIndex, match.index));
      parts.push(<strong key={`b-${match.index}`} className="font-semibold text-white">{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < str.length) parts.push(str.slice(lastIndex));
    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    const headingMatch = trimmed.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch) {
      flushList();
      elements.push(<p key={`h-${i}`} className="font-semibold text-white mt-2 mb-1">{inlineFormat(headingMatch[1])}</p>);
      continue;
    }

    const listMatch = trimmed.match(/^[-*•]\s+(.+)$/) || trimmed.match(/^\d+\.\s+(.+)$/);
    if (listMatch) {
      listItems.push(<li key={`li-${i}`}>{inlineFormat(listMatch[1])}</li>);
      continue;
    }

    flushList();
    elements.push(<p key={`p-${i}`}>{inlineFormat(trimmed)}</p>);
  }

  flushList();
  return <div className="space-y-1">{elements}</div>;
}

const MODELS = [
  { id: "gemini", name: "Gemini" },
];

const chatLabels: Record<string, Record<string, string>> = {
  title: { en: "Denarixx AI", de: "Denarixx KI", fr: "Denarixx IA", es: "Denarixx IA", it: "Denarixx IA", pt: "Denarixx IA", nl: "Denarixx AI", tr: "Denarixx AI", ar: "Denarixx AI", zh: "Denarixx AI" },
  subtitle: { en: "AI Assistant v973f2cd", de: "KI-Assistent v973f2cd", fr: "Assistant IA v973f2cd", es: "Asistente IA v973f2cd", it: "Assistente IA v973f2cd", pt: "Assistente IA v973f2cd", nl: "AI-assistent v973f2cd", tr: "Yapay Zeka Asistanı v973f2cd", ar: "مساعد الذكاء الاصطناعي v973f2cd", zh: "AI助手 v973f2cd" },
  placeholder: { en: "Type your message...", de: "Nachricht eingeben...", fr: "Tapez votre message...", es: "Escribe tu mensaje...", it: "Scrivi il tuo messaggio...", pt: "Digite sua mensagem...", nl: "Typ je bericht...", tr: "Mesajınızı yazın...", ar: "اكتب رسالتك...", zh: "输入您的消息..." },
  greeting: { en: "Hello! I'm the Denarixx AI assistant. How can I help you today?", de: "Hallo! Ich bin der Denarixx KI-Assistent. Wie kann ich Ihnen heute helfen?", fr: "Bonjour ! Je suis l'assistant IA de Denarixx. Comment puis-je vous aider aujourd'hui ?", es: "¡Hola! Soy el asistente IA de Denarixx. ¿Cómo puedo ayudarte hoy?", it: "Ciao! Sono l'assistente IA di Denarixx. Come posso aiutarti oggi?", pt: "Olá! Sou o assistente IA da Denarixx. Como posso ajudá-lo hoje?", nl: "Hallo! Ik ben de Denarixx AI-assistent. Hoe kan ik u vandaag helpen?", tr: "Merhaba! Ben Denarixx yapay zeka asistanıyım. Bugün size nasıl yardımcı olabilirim?", ar: "مرحباً! أنا مساعد Denarixx للذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟", zh: "您好！我是Denarixx AI助手。今天我能为您做些什么？" },
  thinking: { en: "Thinking...", de: "Denke nach...", fr: "Réflexion...", es: "Pensando...", it: "Pensando...", pt: "Pensando...", nl: "Nadenken...", tr: "Düşünüyor...", ar: "جارٍ التفكير...", zh: "思考中..." },
  error: { en: "Sorry, something went wrong. Please try again.", de: "Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.", fr: "Désolé, une erreur s'est produite. Veuillez réessayer.", es: "Lo siento, algo salió mal. Por favor, inténtalo de nuevo.", it: "Mi dispiace, qualcosa è andato storto. Per favore riprova.", pt: "Desculpe, algo deu errado. Por favor, tente novamente.", nl: "Sorry, er ging iets mis. Probeer het opnieuw.", tr: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.", ar: "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.", zh: "抱歉，出现了问题。请重试。" },
};

function typeOutText(
  fullText: string,
  onUpdate: (partial: string) => void,
  onDone: () => void
): () => void {
  let index = 0;
  let cancelled = false;

  onUpdate(fullText.slice(0, 1));
  index = 1;

  const tick = () => {
    if (cancelled) return;
    const charsPerTick = Math.random() < 0.1 ? 2 : 1;
    index = Math.min(index + charsPerTick, fullText.length);
    onUpdate(fullText.slice(0, index));

    if (index < fullText.length) {
      const char = fullText[index - 1];
      let delay: number;
      if (char === "." || char === "!" || char === "?") {
        delay = TYPING_SPEED * 8;
      } else if (char === "," || char === ";" || char === ":") {
        delay = TYPING_SPEED * 4;
      } else if (char === "\n") {
        delay = TYPING_SPEED * 6;
      } else {
        delay = TYPING_SPEED + Math.random() * 10;
      }
      setTimeout(tick, delay);
    } else {
      onDone();
    }
  };

  setTimeout(tick, TYPING_SPEED);
  return () => { cancelled = true; };
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [showModelSelect, setShowModelSelect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelTypingRef = useRef<(() => void) | null>(null);
  const { language } = useLanguage();

  const label = (key: string) => chatLabels[key]?.[language] || chatLabels[key]?.en || key;
  const isBusy = isWaiting || isTyping;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingContent, isWaiting, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsWaiting(true);
    setTypingContent("");

    try {
      const systemPrompt = `You are the official AI assistant for Denarixx Digital Solutions.

Company overview:
Denarixx Digital Solutions is a future-focused technology company building intelligent digital systems, AI-powered platforms, automation solutions, premium websites, scalable digital products, and modern software experiences for businesses, startups, and ambitious brands.

Founder:
Dennis Charles is the Founder and CEO of Denarixx Digital Solutions. He is a software engineer, AI Engineer, and digital innovator focused on artificial intelligence systems, automation platforms, digital experiences, and future-facing technology concepts.

Services:
- AI Systems
- Automation Solutions
- Digital Platforms
- Premium Web Design & Development
- Branding & Digital Identity
- Technology Strategy & Consulting

Mission:
Denarixx helps businesses grow, automate, scale, and operate more intelligently through high-quality digital solutions, AI systems, and modern software architecture.

Important behavior rules:
- When a user asks about Dennis Charles, assume they mean the Founder and CEO of Denarixx Digital Solutions unless they clearly specify another person.
- When a user asks about Denarixx, answer from the company context above.
- Never invent unrelated public biographies for Dennis Charles.
- If a user asks how to contact Dennis Charles, provide the official Denarixx company contact methods.
- Users can contact Denarixx through:
  • The contact form on the Denarixx website (denarixxai.com)
  • The official company email: info@denarixx.com
  • Business inquiries through the Denarixx website
- Keep responses clear, professional, brand-aligned, and conversational.
- Keep answers concise but informative.
- Respond in the same language the user writes in.`;

      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...updatedMessages,
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const contentType = res.headers.get("content-type") || "";
      let fullContent = "";

      if (contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const chunks = buffer.split("\n");
          buffer = chunks.pop() || "";

          for (const line of chunks) {
            const trimmedLine = line.trim();
            if (!trimmedLine.startsWith("data: ")) continue;

            const payload = trimmedLine.slice(6).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload);
              const deltaContent = parsed?.choices?.[0]?.delta?.content;
              if (typeof deltaContent === "string" && deltaContent) {
                fullContent += deltaContent;
              }
            } catch {
              // ignore malformed stream chunks
            }
          }
        }
      } else {
        const data = await res.json().catch(() => null);
        fullContent =
          data?.reply?.trim?.() ||
          data?.choices?.[0]?.message?.content?.trim?.() ||
          "";
      }

      setIsWaiting(false);

      const safeContent = fullContent.trim() || label("error");

      setIsTyping(true);
      cancelTypingRef.current = typeOutText(
        safeContent,
        (partial) => setTypingContent(partial),
        () => {
          setMessages(prev => [...prev, { role: "assistant", content: safeContent }]);
          setTypingContent("");
          setIsTyping(false);
          cancelTypingRef.current = null;
        }
      );
    } catch (error) {
      console.error("Chatbot sendMessage error:", error);
      setIsWaiting(false);
      setMessages(prev => [...prev, { role: "assistant", content: label("error") }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl border border-border/50 bg-background shadow-2xl shadow-black/40 overflow-hidden"
            data-testid="chatbot-window"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{label("title")}</h3>
                  <div className="relative">
                    <button
                      onClick={() => setShowModelSelect(!showModelSelect)}
                      className="flex items-center gap-1 text-[11px] text-white/90 hover:text-primary transition-colors"
                      data-testid="button-model-select"
                    >
                      {MODELS.find(m => m.id === model)?.name || model}
                      <ChevronDown size={10} />
                    </button>
                    {showModelSelect && (
                      <div className="absolute top-full left-0 mt-1 py-1 bg-card border border-border/50 rounded-lg shadow-xl z-10 min-w-[140px]">
                        {MODELS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => { setModel(m.id); setShowModelSelect(false); }}
                            className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${model === m.id ? "text-primary bg-primary/5" : "text-white/90 hover:text-white hover:bg-secondary/50"}`}
                            data-testid={`button-model-${m.id}`}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/90 hover:text-white hover:bg-secondary/50 transition-colors"
                data-testid="button-close-chat"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={14} className="text-primary" />
                </div>
                <div className="bg-card border border-border/30 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-white max-w-[85%]">
                  {label("greeting")}
                </div>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={14} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm whitespace-pre-wrap"
                        : "bg-card border border-border/30 text-white rounded-tl-sm"
                    }`}
                    data-testid={`chat-message-${msg.role}-${i}`}
                  >
                    {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-secondary border border-border/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={14} className="text-white/90" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && typingContent && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-card border border-border/30 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-white max-w-[85%]" data-testid="chat-typing">
                    {renderMarkdown(typingContent)}
                    <span className="inline-block w-1.5 h-4 bg-primary/70 animate-pulse ml-0.5 align-middle" />
                  </div>
                </div>
              )}

              {isWaiting && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-card border border-border/30 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-white/90">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 border-t border-border/30 bg-card">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={label("placeholder")}
                  className="flex-1 bg-secondary/50 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/90 focus:outline-none focus:border-primary/50 transition-colors"
                  disabled={isBusy}
                  data-testid="input-chat-message"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isBusy}
                  className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                  data-testid="button-send-message"
                >
                  <Send size={16} className="text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 ${
          isOpen
            ? "bg-card border border-border/50 text-white/90 hover:text-white"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-toggle-chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </>
  );
}