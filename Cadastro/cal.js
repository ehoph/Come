// Função para obter o nome do mês em português
function getNomeMes(mes) {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes];
}

// Função principal para renderizar o calendário
function renderCalendario() {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();
    const diaAtual = dataAtual.getDate();

    const headerElement = document.getElementById('mes-ano');
    headerElement.textContent = `${getNomeMes(mesAtual)} ${anoAtual}`;

    const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay();
    const ultimoDiaDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    const tbody = document.getElementById('cal-dia');
    tbody.innerHTML = ''; // Limpa conteúdo anterior

    let linha = document.createElement('tr');
    let diaContador = 1;

    // Adiciona células vazias antes do primeiro dia do mês
    for (let i = 0; i < primeiroDiaDoMes; i++) {
        const celulaVazia = document.createElement('td');
        linha.appendChild(celulaVazia);
    }

    // Renderiza os dias do mês
    while (diaContador <= ultimoDiaDoMes) {
        if (linha.children.length === 7) {
            tbody.appendChild(linha);
            linha = document.createElement('tr');
        }

        const coluna = document.createElement('td');

        // Número do dia
        const numeroDia = document.createElement('div');
        numeroDia.textContent = diaContador;
        numeroDia.style.fontWeight = 'bold';

        // Texto salvo (caso exista)
        const textoSalvo = localStorage.getItem(`dia-${diaContador}`);
        const textoDiv = document.createElement('div');
        textoDiv.classList.add('texto-dia');
        textoDiv.textContent = textoSalvo || '';

        // Adiciona ao td
        coluna.appendChild(numeroDia);
        coluna.appendChild(textoDiv);

        // Ao clicar, abre o modal
        coluna.addEventListener('click', () => showAddModal(diaContador));

        // Estiliza dia atual
        if (diaContador === diaAtual && mesAtual === dataAtual.getMonth()) {
            coluna.classList.add('dia-atual');
        }

        // Fim de semana
        const diaSemana = new Date(anoAtual, mesAtual, diaContador).getDay();
        if (diaSemana === 0 || diaSemana === 6) {
            coluna.classList.add('festa');
        }

        linha.appendChild(coluna);
        diaContador++;
    }

    // Adiciona a última linha se necessário
    if (linha.children.length > 0) {
        tbody.appendChild(linha);
    }
}

// Exibe o modal e carrega o texto do dia selecionado
function showAddModal(dia = 1) {
    document.getElementById('modal').style.display = 'flex';

    const select = document.getElementById('dia-selecionado');
    select.innerHTML = '';

    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

    select.value = dia;

    const textoSalvo = localStorage.getItem(`dia-${dia}`);
    document.getElementById('input-texto').value = textoSalvo || '';
}

// Salva o texto no localStorage e atualiza o calendário
function saveText() {
    const dia = document.getElementById('dia-selecionado').value;
    const texto = document.getElementById('input-texto').value.trim();

    if (texto.length > 0) {
        localStorage.setItem(`dia-${dia}`, texto);
    } else {
        localStorage.removeItem(`dia-${dia}`);
    }

    closeModal();
    renderCalendario();
}

// Exclui o texto do localStorage
function deleteText() {
    const dia = document.getElementById('dia-selecionado').value;
    localStorage.removeItem(`dia-${dia}`);
    closeModal();
    renderCalendario();
}

// Fecha o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Quando a página carregar, renderiza o calendário
document.addEventListener('DOMContentLoaded', renderCalendario);
