const player1 = { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 };
const player2 = { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 };

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
}

async function playRaceEngine(p1, p2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round}`);
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let dice1 = await rollDice();
        let dice2 = await rollDice();

        let totalTest1 = 0;
        let totalTest2 = 0;

        if (block === "RETA") {
            totalTest1 = dice1 + p1.VELOCIDADE;
            totalTest2 = dice2 + p2.VELOCIDADE;
        } else if (block === "CURVA") {
            totalTest1 = dice1 + p1.MANOBRABILIDADE;
            totalTest2 = dice2 + p2.MANOBRABILIDADE;
        } else {
            let power1 = dice1 + p1.PODER;
            let power2 = dice2 + p2.PODER;
            console.log(`🥊 Confronto: ${p1.NOME} (${power1}) vs ${p2.NOME} (${power2})`);
            if (power1 > power2 && p2.PONTOS > 0) p2.PONTOS--;
            if (power2 > power1 && p1.PONTOS > 0) p1.PONTOS--;
            continue;
        }

        console.log(`${p1.NOME}: ${dice1} + ${totalTest1 - dice1} = ${totalTest1}`);
        console.log(`${p2.NOME}: ${dice2} + ${totalTest2 - dice2} = ${totalTest2}`);

        if (totalTest1 > totalTest2) {
            console.log(`${p1.NOME} marcou um ponto!`);
            p1.PONTOS++;
        } else if (totalTest2 > totalTest1) {
            console.log(`${p2.NOME} marcou um ponto!`);
            p2.PONTOS++;
        }
    }
}

async function declareWinner(p1, p2) {
    console.log("\n--- Resultado Final ---");
    console.log(`${p1.NOME}: ${p1.PONTOS} ponto(s)`);
    console.log(`${p2.NOME}: ${p2.PONTOS} ponto(s)`);

    if (p1.PONTOS > p2.PONTOS) console.log(`\n🏆 ${p1.NOME} VENCEU!`);
    else if (p2.PONTOS > p1.PONTOS) console.log(`\n🏆 ${p2.NOME} VENCEU!`);
    else console.log("\n🤝 EMPATE!");
}

(async function main() {
    console.log(`🏎️ Corrida entre ${player1.NOME} e ${player2.NOME} começando...`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();