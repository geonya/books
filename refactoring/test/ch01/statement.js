import createStatementData from "./createStatementData.js";

const invoice = {
	customer: "BigCo",
	performances: [
		{
			playID: "hamlet",
			audience: 55,
		},
		{
			playID: "as-like",
			audience: 35,
		},
		{
			playID: "othello",
			audience: 40,
		},
	],
};

const plays = {
	hamlet: { name: "Hamlet", type: "tregedy" },
	"as-like": { name: "As You Like It", type: "comedy" },
	othello: { name: "Othello", type: "tregedy" },
};

//
//
//
//

function usd(aNumber) {
	return new Intl.NumberFormat("en-Us", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(aNumber / 100);
}

function statement(invoice, plays) {
	return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
	let result = `청구 내역 ( 고객명 : ${data.customer}\n`;
	for (let perf of data.performances) {
		result += ` ${perf.play.name} : ${usd(perf.amount)} ${
			perf.audience
		} 석 \n`;
	}
	result += `총액 : ${usd(data.totalAmount)} \n`;
	result += `적립 포인트 : ${data.totalVolumeCredits}점 \n`;

	return result;
}

console.log(statement(invoice, plays));
