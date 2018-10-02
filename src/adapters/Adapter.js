const API = "https://localhost:3000/"

export default class Adapter {

	// ----------------------- POSTS -----------------------
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
	
}