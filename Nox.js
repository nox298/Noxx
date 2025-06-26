document.getElementById("commandInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const input = e.target.value.trim();
    e.target.value = "";
    processCommand(input);
  }
});

function processCommand(cmd) {
  const output = document.getElementById("output");
  output.innerHTML += `> ${cmd}\n`;

  if (cmd === "noxcore://unlock-darkness") {
    document.getElementById("terminal").classList.remove("light-mode");
    document.getElementById("terminal").classList.add("dark-mode");
    darkMode = true;
    output.innerHTML += "🕶 Karanlık mod aktif edildi.\n";
  } else if (cmd.startsWith("noxsay:")) {
    const message = cmd.replace("noxsay:", "").trim();
    fetchGPTResponse(message);
  } else {
    output.innerHTML += "Komut tanınmadı.\n";
  }
}
