function createPerformanceCalculator(aPerformance, aPlay) {
	if (aPlay.type === "tregedy") {
		return new TregedyCaclulator(aPerformance, aPlay);
	} else if (aPlay.type === "comedy") {
		return new ComedyCaclulator(aPerformance, aPlay);
	}
	throw new Error(`알 수 없는 장르 : ${aPlay.type}`);
}

class PerformanceCalculator {
	constructor(aPerformance, aPlay) {
		this.performance = aPerformance;
		this.play = aPlay;
	}
	get amount() {
		throw new Error("서브 클래스에서 처리하도록 설계됨");
	}
	get volumeCredits() {
		return Math.max(this.performance - 30, 0);
	}
}

class TregedyCaclulator extends PerformanceCalculator {
	get amount() {
		let result = 40000;
		if (this.performance.audience > 30) {
			result += 1000 * (this.performance.audience - 30);
		}
		return result;
	}
}
class ComedyCaclulator extends PerformanceCalculator {
	get amount() {
		let result = 30000;
		if (this.performance.audience > 20) {
			result += 10000 + 500 * (this.performance.audience - 20);
		}
		result += 300 * this.performance.audience;
		return result;
	}
	get volumeCredits() {
		return super.volumeCredits + Math.floor(this.performance.audience / 5);
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
		const calculator = createPerformanceCalculator(
			aPerformance,
			playFor(aPerformance)
		);
		const result = { ...aPerformance };
		result.play = calculator.play;
		result.amount = calculator.amount;
		result.volumeCredits = calculator.volumeCredits;
		return result;
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
