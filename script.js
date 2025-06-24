const VALE = 500;
let produtos = [];

function formatar(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function adicionarProduto() {
  const input = document.getElementById('preco');
  let preco = parseFloat(input.value.replace(',', '.'));

  if (isNaN(preco) || preco <= 0) {
    alert('Digite um valor válido maior que zero.');
    return;
  }

  const precoComDesconto = +(preco * 0.9).toFixed(2);
  const totalAtual = produtos.reduce((acc, p) => acc + p.comDesconto, 0);

  if (totalAtual + precoComDesconto > VALE) {
    alert('Você ultrapassou o limite de R$500 do Vale Alimentação.');
    return;
  }

  produtos.push({ original: preco, comDesconto: precoComDesconto });
  input.value = '';
  atualizarTela();
}

function atualizarTela() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  produtos.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.textContent = `${i + 1}. R$${formatar(p.original)} → R$${formatar(p.comDesconto)}`;
    lista.appendChild(div);
  });

  const total = produtos.reduce((acc, p) => acc + p.comDesconto, 0);
  document.getElementById('total').textContent = formatar(total);
  document.getElementById('restante').textContent = formatar(VALE - total);
}

function resetar() {
  if (confirm('Tem certeza que deseja limpar tudo?')) {
    produtos = [];
    atualizarTela();
  }
}
