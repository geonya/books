import createStatementData from "./createStatementData.js";
import { invoice, plays } from "./data.js";
function statement(invoice, plays) {
	return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
	let statementData = `청구 내역 ( 고객명 : ${data.customer})\n`;
	for (let perf of data.performances) {
		statementData += ` ${perf.play.name} : ${usd(perf.amount)} ${
			perf.audience
		} 석 \n`;
	}
	statementData += `총액 : ${usd(data.totalAmount)} \n`;
	statementData += `적립 포인트 : ${data.totalVolumeCredits}점 \n`;

	return statementData;
}

function htmlStatement(invoice, plays) {
	return renderHTML(createStatementData(invoice, plays));
}

function renderHTML(data) {
	let result = `<h1>청구 내역 ( 고객명 : ${data.customer} ) </h1>\n`;
	result += "<table>\n";
	result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
	for (let aPerformance of data.performances) {
		result += `<tr><td>${aPerformance.play.name}</td><td>${aPerformance.audience} 석</td>`;
		result += `<td>${usd(aPerformance.amount)}</td></tr>`;
	}
	result += "</table>\n";
	result += `<p> 총액 : <em>${usd(data.totalAmount)}</em></p>\n`;
	result += `<p>적립 포인트 : <em>${data.totalVolumeCredits}</em>점</p>\n`;
	return result;
}

function usd(aNumber) {
	return new Intl.NumberFormat("en-Us", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(aNumber / 100);
}
htmlStatement(invoice, plays);
