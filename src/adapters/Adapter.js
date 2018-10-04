const API = "https://coup-server.herokuapp.com/"

export default class Adapter {

	// ----------------------- FETCHES -----------------------
	static signUp(name) {
		return fetch(API + "users", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({ username: name })
		})
		.then(res => res.json())
	}

	static joinGame(userId) {
		return fetch(API + "users/join_game", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({ user_id: userId })
		})
		.then(res => res.json()) // Returns match object
	}

	static updateMatch(matchId, body) {
		fetch(API + "matches/" + matchId, {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		})
	}

	static nextTurn(matchId, nextTurnId) {
		fetch(API + "matches/" + matchId, {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				turnId: nextTurnId,
				phase: "take action",
				action: null,
				targetId: null,
				challengerId: null,
				challengedId: null
			})
		})
	}

	static updateWallet(playerId, newWallet) {
		fetch(API + "players/" + playerId, {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({wallet: newWallet})
		})
	}

	static updateHands(handId, body) {
		fetch(API + "hands/" + handId, {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		})
	}

	static setTurnId(matchId, turnId) {
		fetch(API + "matches/" + matchId, {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({turnId: turnId})
		})
	}

	// ------------------------ NON-FETCH FUNCTIONS -----------------------------------

}