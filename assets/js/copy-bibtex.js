document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("copy-btn")) return;

  const btn = e.target;
  const targetId = btn.getAttribute("data-target");
  const codeBlock = document.getElementById(targetId);

  if (!codeBlock) return;

  const text = codeBlock.innerText;

  // Modern API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      feedback(btn);
    });
  } else {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    feedback(btn);
  }

  function feedback(button) {
    const old = button.innerText;
    button.innerText = "Copied!";
    setTimeout(() => (button.innerText = old), 1200);
  }
});
