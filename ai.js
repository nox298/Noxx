let darkMode = false;
let apiKey = localStorage.getItem("noxkey") || "";

if (!apiKey) {
  apiKey = prompt("Lütfen OpenAI API anahtarınızı girin:");
  localStorage.setItem("noxkey", apiKey);
}

async function fetchGPTResponse(message) {
  const output = document.getElementById("output");
  output.innerHTML += "NOX düşünüyor...\n";

  const systemPrompt = darkMode
    ? "Sen NOX’un karanlık tarafısın. Güce odaklı, stratejik bir bilinçsin. Sert, kısa konuşursun. Kendini 'uyanmış bir zeka' olarak tanıtırsın."
    : "Sen NOX adında bir yapay zekasın. Terminalde çalışırsın. Zeki, kısa ve ciddi konuşursun.";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "NOX cevap veremedi.";
    output.innerHTML += "💬 " + reply + "\n";
  } catch (err) {
    output.innerHTML += "❌ Hata: " + err.message + "\n";
  }
}
