let precoBase = 0;
const embalagem = 0.99;

function playSound() {
  document.getElementById("somClick").play();
}

function selecionarCopo(tamanho, preco) {
  playSound();
  precoBase = preco;
  calcularTotal();
}

function calcularTotal() {
  let total = precoBase + embalagem;

  // Adicionais pagos
  document.querySelectorAll(".pago:checked").forEach(item => {
    total += parseFloat(item.dataset.preco);
  });

  document.getElementById("total").innerText = "R$" + total.toFixed(2);
}

document.querySelectorAll(".gratis").forEach(item => {
  item.addEventListener("change", () => {
    playSound();
    const selecionados = document.querySelectorAll(".gratis:checked");
    if (selecionados.length > 4) {
      alert("Você pode escolher no máximo 4 adicionais grátis.");
      item.checked = false;
    }
  });
});

document.querySelectorAll(".pago").forEach(item => {
  item.addEventListener("change", () => {
    playSound();
    calcularTotal();
  });
});

function enviarPedido() {
  playSound();
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;

  let adicionaisGratis = [];
  document.querySelectorAll(".gratis:checked").forEach(item => adicionaisGratis.push(item.value));

  let adicionaisPagos = [];
  document.querySelectorAll(".pago:checked").forEach(item => adicionaisPagos.push(item.value));

  const total = document.getElementById("total").innerText;

  const mensagem = `📌 *Novo Pedido de Açaí* 📌
👤 Nome: ${nome}
🏠 Endereço: ${endereco}
💳 Pagamento: ${pagamento}

🥤 Copo: R$${precoBase}
➕ Adicionais Grátis: ${adicionaisGratis.join(", ")}
💰 Adicionais Pagos: ${adicionaisPagos.join(", ")}
📦 Embalagem: R$0,99

💵 Total: ${total}`;

  const numero = "5567998283248"; // seu número
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
