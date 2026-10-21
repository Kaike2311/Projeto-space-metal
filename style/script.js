document.querySelector(".menu")?.addEventListener("click", (e) => {
  const nav = document.querySelector("nav");
  const open = nav.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelector("#quote")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  const msg = [
    "Solicitação de orçamento",
    ...["nome", "email", "telefone", "servico", "medidas", "descricao"].map(
      (k) => k + ": " + (d.get(k) || "Não informado"),
    ),
  ].join("\n");
  document.querySelector("#quote-result").textContent =
    "Seu aplicativo de e-mail será aberto. Revise o destinatário oficial antes de enviar.";
  location.href =
    "mailto:?subject=" +
    encodeURIComponent("Solicitação de orçamento") +
    "&body=" +
    encodeURIComponent(msg);
});
document.querySelector("#tracking")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const code = new FormData(e.currentTarget).get("codigo").trim().toUpperCase();
  document.querySelector("#tracking-result").textContent =
    code === "DEMO123"
      ? "Pedido de demonstração DEMO123: em fabricação (informação fictícia)."
      : "Pedido não encontrado nesta demonstração. Somente DEMO123 está disponível.";
});
document.querySelector("#feedback")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.currentTarget),
    box = document.querySelector("#feedback-preview");
  box.replaceChildren();
  const h = document.createElement("h2");
  h.textContent = d.get("nome") + " — " + d.get("nota");
  const p = document.createElement("p");
  p.textContent = d.get("comentario");
  box.append(h, p);
  document.querySelector("#feedback-result").textContent =
    "Prévia criada somente neste navegador.";
});
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const blocks = document.querySelectorAll(".intro,.panel,.card,details");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  blocks.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
document.querySelectorAll("nav a").forEach((a) => {
  if (a.href === location.href) a.setAttribute("aria-current", "page");
});
