// Lista de amigos (sem repetições)
let amigos = new Set();

// Lista de sorteados (sem repetições)
let sorteados = new Set();

// Guarda o estado anterior para desfazer sorteio
let estadoAnterior = { sorteados: new Set(), resultado: '' };

// Elementos do HTML (DOM)
let input = document.getElementById('amigo');         // Campo de entrada de nomes
let lista = document.getElementById('listaAmigos');   // Lista visual dos nomes adicionados
let resultado = document.getElementById('resultado'); // Local onde mostra o sorteado

// Adiciona um amigo à lista
function adicionarAmigo() {
    // Formata e valida o nome
    let nome = formatarNome(input.value);
    if (!nome) return alert('Digite um nome válido.');      // Se for vazio ou inválido, alerta
    if (amigos.has(nome)) return alert('Nome já adicionado.'); // Se já existir, alerta

    amigos.add(nome);                                // Adiciona o nome ao conjunto
    lista.textContent = Array.from(amigos).join(', '); // Atualiza a lista no HTML
    input.value = '';                                // Limpa o campo
    input.focus();                                   // Foca novamente para digitar mais
}

// Função que capitaliza o nome (ex: "joao" -> "Joao")
function formatarNome(nome) {
    nome = nome.trim();                              // Remove espaços antes/depois
    return nome && isNaN(nome)                       // Se for texto válido
        ? nome[0].toUpperCase() + nome.slice(1).toLowerCase() // Capitaliza
        : '';                                         // Senão, retorna vazio
}

// Sorteia um nome que ainda não foi sorteado
function sortearAmigo() {
    if (!amigos.size) return alert('Lista de amigos está vazia.'); // Lista vazia
    if (sorteados.size === amigos.size) return alert('Todos já foram sorteados.'); // Todos já sorteados

    salvarEstado(); // Salva o estado atual para permitir desfazer depois

    let nome;
    do {
        // Pega um nome aleatório
        let nomes = Array.from(amigos);
        nome = nomes[Math.floor(Math.random() * nomes.length)];
    } while (sorteados.has(nome)); // Repete até achar alguém que ainda não foi sorteado

    sorteados.add(nome); // Marca como sorteado
    resultado.textContent = `🎉 Sorteado: ${nome}`; // Mostra o nome sorteado na tela
}

// Salva os dados atuais para possível "desfazer"
function salvarEstado() {
    estadoAnterior = {
        sorteados: new Set(sorteados),         // Cópia dos sorteados
        resultado: resultado.textContent       // Cópia do texto exibido
    };
}

// Desfaz o último sorteio
function desfazerSorteio() {
    if (!sorteados.size) return alert('Nada para desfazer.'); // Se não houver sorteios ainda

    // Remove o último sorteado
    let ultimo = Array.from(sorteados).pop();
    sorteados.delete(ultimo);

    // Volta ao texto anterior
    resultado.textContent = estadoAnterior.resultado;
}

// Permite adicionar amigo pressionando Enter
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') adicionarAmigo(); // Chama função se tecla for Enter
});