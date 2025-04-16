async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const messages = [{ role: "user", content: input }];

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });

  const data = await res.json();
  alert(data.reply);
}
