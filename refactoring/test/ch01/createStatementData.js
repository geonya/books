class PerformanceCalculator {
	constructor(aPerformance, aPlay) {
		this.performance = aPerformance;
		this.play = aPlay;
	}
}
export default function createStatementData(invoice, plays) {
	const result = {};
	result.customer = invoice.customer;
	result.performances = invoice.performances.map(enrichPerformance);
	result.totalAmount = totalAmount(result);
	result.totalVolumeCredits = totalVolumeCredits(result);
	return result;

	function enrichPerformance(aPerformance) {
		const calculator = new PerformanceCalculator(
			aPerformance,
			playFor(aPerformance)
		);
		const result = { ...aPerformance };
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);
		return result;
	}

	function volumeCreditsFor(aPerformance) {
		let result = 0;
		result += Math.max(aPerformance.audience - 30, 0);
		// 희극 관객 5명마다 추가 포인트 제공
		if ("comedy" === aPerformance.play.type)
			result += Math.floor(aPerformance.audience / 5);
		return result;
	}

	function amountFor(aPerformance) {
		let thisAmount = 0;
		switch (aPerformance.play.type) {
			case "tregedy":
				thisAmount = 40000;
				if (aPerformance.audience > 30) {
					thisAmount += 1000 * (aPerformance.audience - 30);
				}
				break;
			case "comedy":
				thisAmount = 30000;
				if (aPerformance.audience > 20) {
					thisAmount += 10000 + 500 * (aPerformance.audience - 20);
				}
				thisAmount += 300 * aPerformance.audience;
				break;

			default:
				throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
		}
		return thisAmount;
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}

	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0);
	}
	function totalVolumeCredits(data) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
	}
}
