(function () {
  var TEL = "5511900000000",
    MAIL = "contato@seudominio.com.br";
  var $ = function (s) {
      return document.querySelector(s);
    },
    $$ = function (s) {
      return [].slice.call(document.querySelectorAll(s));
    };
  var cur = location.pathname.split("/").pop() || "index.html";
  $$("header a, footer a").forEach(function (a) {
    if (a.getAttribute("href").split("/").pop() === cur) a.setAttribute("aria-current", "page");
  });
  $$(".y").forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });
  $$("img").forEach(function (i) {
    var f = function () {
      var d = document.createElement("div");
      d.className = "ph";
      d.textContent = i.alt;
      i.replaceWith(d);
    };
    if (i.complete && !i.naturalWidth) f();
    else i.addEventListener("error", f);
  });
  $$("input[type=tel]").forEach(function (i) {
    i.addEventListener("input", function () {
      var d = i.value.replace(/\D/g, "").slice(0, 11);
      i.value =
        d.length > 10
          ? d.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
          : d.length > 6
            ? d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
            : d.replace(/(\d{2})(\d*)/, "($1) $2");
    });
  });
  $$("input[name=cep]").forEach(function (i) {
    i.addEventListener("input", function () {
      var d = i.value.replace(/\D/g, "").slice(0, 8);
      i.value = d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
    });
  });
  $$("form[data-send]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.value) || "wa",
        t = "Olá, vim pelo site da Space Metal.\n";
      new FormData(f).forEach(function (v, k) {
        if (v && k !== "aceite") t += k + ": " + v + "\n";
      });
      var url =
        via === "mail"
          ? "mailto:" +
            MAIL +
            "?subject=" +
            encodeURIComponent("Pedido de orçamento - site") +
            "&body=" +
            encodeURIComponent(t)
          : "https://wa.me/" + TEL + "?text=" + encodeURIComponent(t);
      window.open(url, via === "mail" ? "_self" : "_blank");
      var m =
        f.querySelector(".msg") ||
        f.appendChild(
          Object.assign(document.createElement("p"), { className: "msg", role: "status" }),
        );
      m.textContent =
        "Abrimos " +
        (via === "mail" ? "seu e-mail" : "o WhatsApp") +
        " com o seu pedido. É só confirmar o envio.";
      f.reset();
    });
  });
})();

(function () {
  var $ = function (s) {
      return document.querySelector(s);
    },
    $$ = function (s) {
      return [].slice.call(document.querySelectorAll(s));
    };
  var q = new URLSearchParams(location.search);
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (navigator.clipboard)
        navigator.clipboard.writeText(b.dataset.copy).then(function () {
          b.textContent = "Copiado!";
        });
    });
  });
  var sel = $("select[name=servico]");
  if (sel && q.get("item")) sel.value = q.get("item");
  var PEDIDOS = {
    "SM-0001": { etapa: 3 },
  }; /* EDITE: adicione os pedidos reais. etapa = indice da etapa atual (0 a 5) */
  var ET = [
    "Orçamento aprovado",
    "Contrato e sinal de 30% pagos",
    "Compra de materiais",
    "Fabricação",
    "Instalação",
    "Concluído",
  ];
  function mostrar(c) {
    var o = $("#resultado"),
      p = PEDIDOS[c.trim().toUpperCase()];
    if (!p) {
      o.innerHTML =
        '<p class="msg">Pedido não encontrado. Confira o código ou <a href="contato.html">fale conosco</a>.</p>';
      return;
    }
    o.innerHTML =
      "<h2>Status do pedido</h2><ol>" +
      ET.map(function (e, i) {
        return (
          '<li class="' +
          (i < p.etapa ? "done" : i === p.etapa ? "now" : "") +
          '">' +
          e +
          (i < p.etapa ? " ✔" : i === p.etapa ? " (em andamento)" : "") +
          "</li>"
        );
      }).join("") +
      "</ol>";
  }
  var fc = $("#consulta");
  if (fc) {
    fc.addEventListener("submit", function (e) {
      e.preventDefault();
      mostrar(fc.codigo.value);
    });
    if (q.get("codigo")) {
      fc.codigo.value = q.get("codigo");
      mostrar(q.get("codigo"));
    }
  }
  var ff = $("#fb"),
    L = $("#lista"),
    K = "sm_depoimentos";
  function load() {
    try {
      return JSON.parse(localStorage.getItem(K) || "[]");
    } catch (e) {
      return [];
    }
  }
  function draw() {
    L.textContent = "";
    load().forEach(function (d) {
      var a = document.createElement("div");
      a.className = "card";
      a.textContent = "★".repeat(d.n) + " " + d.nome + ": " + d.txt;
      L.appendChild(a);
    });
  }
  if (ff) {
    draw();
    ff.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(ff),
        l = load();
      l.push({ n: +f.get("nota"), nome: f.get("nome"), txt: f.get("texto") });
      try {
        localStorage.setItem(K, JSON.stringify(l));
      } catch (x) {}
      draw();
      ff.reset();
    });
  }
  $$("video source").forEach(function (s) {
    s.addEventListener("error", function () {
      var v = s.parentNode,
        p = document.createElement("p");
      p.className = "ph";
      p.textContent = "Vídeo em breve (adicione assets/video/processo.mp4).";
      v.replaceWith(p);
    });
  });
})();
