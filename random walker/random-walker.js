const walkerCanvas = document.getElementById('walkerCanvas');
const walkerCtx = walkerCanvas.getContext('2d');

const histogramCanvas = document.getElementById('histogramCanvas');
const histogramCtx = histogramCanvas.getContext('2d');

const directions = [
    'Cima',        // 0
    'Baixo',       // 1
    'Esquerda',    // 2
    'Direita',     // 3
    'Cima Esquerda', // 4
    'Cima Direita',  // 5
    'Baixo Esquerda', // 6
    'Baixo Direita'  // 7
];

const totalDirections = directions.length;
let directionCounts = new Array(totalDirections).fill(0);

// Posição e configuração do random walker
let x = walkerCanvas.width / 2;
let y = walkerCanvas.height / 2;
const stepSize = 5;

// Função para atualizar a posição do random walker
function updateWalker() {
    const moves = [
        {dx: 0, dy: -stepSize}, // Cima
        {dx: 0, dy: stepSize},  // Baixo
        {dx: -stepSize, dy: 0}, // Esquerda
        {dx: stepSize, dy: 0},  // Direita
        {dx: -stepSize, dy: -stepSize}, // Cima Esquerda
        {dx: stepSize, dy: -stepSize},  // Cima Direita
        {dx: -stepSize, dy: stepSize},  // Baixo Esquerda
        {dx: stepSize, dy: stepSize}    // Baixo Direita
    ];

    // Escolhe uma direção aleatória
    const directionIndex = Math.floor(Math.random() * moves.length);
    const move = moves[directionIndex];

    // Atualiza a posição do walker
    x = (x + move.dx + walkerCanvas.width) % walkerCanvas.width;
    y = (y + move.dy + walkerCanvas.height) % walkerCanvas.height;

    // Atualiza a contagem para a direção escolhida
    directionCounts[directionIndex]++;
}

// Função para desenhar o random walker e o gráfico
function draw() {
    // Desenha o random walker
    // walkerCtx.clearRect(0, 0, walkerCanvas.width, walkerCanvas.height);
    walkerCtx.fillStyle = 'black';
    walkerCtx.fillRect(x, y, 5, 5); // Desenha o walker como um ponto pequeno

    // Atualiza a posição do walker
    updateWalker();

    // Desenha o gráfico
    histogramCtx.clearRect(0, 0, histogramCanvas.width, histogramCanvas.height);
    histogramCtx.strokeStyle = 'black';
    histogramCtx.fillStyle = 'gray';
    histogramCtx.font = '12px Arial'; // Define a fonte para os rótulos
    histogramCtx.textAlign = 'center'; // Alinha o texto ao centro

    const barWidth = histogramCanvas.width / directionCounts.length;

    for (let i = 0; i < directionCounts.length; i++) {
        histogramCtx.fillRect(i * barWidth, histogramCanvas.height - directionCounts[i], barWidth - 1, directionCounts[i]);
        histogramCtx.strokeRect(i * barWidth, histogramCanvas.height - directionCounts[i], barWidth - 1, directionCounts[i]);

        // Adiciona o rótulo acima da barra
        histogramCtx.fillText(directions[i], i * barWidth + (barWidth / 2), histogramCanvas.height - directionCounts[i] - 5);
    }
}

// Atualiza os canvas a cada 100ms
setInterval(draw, 50);
