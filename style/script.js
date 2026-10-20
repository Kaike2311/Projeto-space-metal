/* ========================================= SPACE METAL SERRALHERIA JavaScript principal Ficheiro: style/script.js ========================================= */

"use strict";

/*

CONFIGURAÇÃO DO WHATSAPP
Substitua o número abaixo pelo número REAL
da empresa, incluindo o código do país e o
DDD, apenas com algarismos.
Exemplo fictício: 5511999999999
Não utilize espaços, parênteses, hífens ou "+". */ const WHATSAPP_NUMBER = "5500000000000";

/* 1. Inicialização */ document.addEventListener("DOMContentLoaded", () => { atualizarAno(); configurarFormularioWhatsApp(); configurarImagens(); });

/* 2. Atualizar automaticamente o ano do rodapé */ function atualizarAno() { const elementosAno = document.querySelectorAll(".y"); const anoAtual = new Date().getFullYear();

elementosAno.forEach((elemento) => { elemento.textContent = String(anoAtual); }); }

/* 3. Configurar o formulário de contacto */ function configurarFormularioWhatsApp() { const formulario = document.querySelector("form[data-send]");

if (!formulario) { return; }

formulario.addEventListener("submit", (evento) => { evento.preventDefault();

if (!formulario.reportValidity()) {
  return;
}

/*
 * Não permite tentar enviar mensagens enquanto
 * o número de destino não estiver configurado.
 */
if (
  !/^\d{12,15}$/.test(WHATSAPP_NUMBER) ||
  WHATSAPP_NUMBER === "5500000000000"
) {
  alert(
    "Configure o número real do WhatsApp da empresa " +
    "no ficheiro style/script.js antes de utilizar o formulário."
  );

  return;
}

const dados = new FormData(formulario);

const nome = String(dados.get("nome") || "").trim();
const telefone = String(dados.get("telefone") || "").trim();
const mensagem = String(dados.get("mensagem") || "").trim();

/* Validação adicional dos campos */
if (!nome || !telefone || !mensagem) {
  alert("Preencha todos os campos antes de continuar.");
  return;
}

/*
 * O telefone informado pelo visitante é incluído
 * na mensagem para facilitar o contacto posterior.
 */
const textoWhatsApp = [
  "Olá! Gostaria de entrar em contacto com a Space Metal Serralheria.",
  "",
  "*Dados do cliente*",
  `Nome: ${nome}`,
  `Telefone: ${telefone}`,
  "",
  "*Mensagem*",
  mensagem
].join("\n");

const urlWhatsApp =
  "https://wa.me/" +
  WHATSAPP_NUMBER +
  "?text=" +
  encodeURIComponent(textoWhatsApp);

/*
 * Abre o WhatsApp numa nova aba.
 * O visitante ainda precisa de confirmar o envio
 * dentro do WhatsApp.
 */
const novaJanela = window.open(
  urlWhatsApp,
  "_blank",
  "noopener,noreferrer"
);

/*
 * Se o navegador bloquear a nova aba, apresenta
 * uma alternativa para o utilizador.
 */
if (!novaJanela) {
  alert(
    "O navegador bloqueou a abertura do WhatsApp. " +
    "Permita a abertura de novas abas e tente novamente."
  );
}


}); }

/* 4. Melhorar a apresentação das imagens da galeria */ function configurarImagens() { const imagens = document.querySelectorAll( ".galeria-obras .card-obra img" );

imagens.forEach((imagem) => { /* * A imagem continua a apresentar o texto alternativo * definido no HTML se não puder ser carregada. */ imagem.addEventListener("error", () => { imagem.classList.add("imagem-indisponivel"); imagem.setAttribute("data-erro-imagem", "true"); });

imagem.addEventListener("load", () => {
  imagem.classList.remove("imagem-indisponivel");
  imagem.removeAttribute("data-erro-imagem");
});


}); }