document.addEventListener("DOMContentLoaded", () => {
  // 1. Atualização automática do ano no rodapé
  const yearSpan = document.querySelector(".y");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Destacar automaticamente o link da página atual na navegação
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("header a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") && currentPath.includes(link.getAttribute("href"))) {
      link.setAttribute("aria-current", "page");
    }
  });

  // 3. Envio formatado e profissional para o WhatsApp
  const form = document.querySelector("form[data-send]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nomeField = form.querySelector("[name='nome']");
      const telefoneField = form.querySelector("[name='telefone']");
      const mensagemField = form.querySelector("[name='mensagem']");

      if (!nomeField || !telefoneField || !mensagemField) return;

      const nome = nomeField.value.trim();
      const telefone = telefoneField.value.trim();
      const mensagem = mensagemField.value.trim();

      // Número de WhatsApp da serralheria (altere se necessário)
      const whatsappNumero = "5511999999999"; 

      const textoFormatado = 
        `*Orçamento / Contato - Space Metal Serralheria* 🛠️\n\n` +
        `*Nome:* ${nome}\n` +
        `*Telefone:* ${telefone}\n\n` +
        `*Mensagem/Projeto:*\n${mensagem}`;

      const url = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(textoFormatado)}`;

      window.open(url, "_blank");
    });
  }
});