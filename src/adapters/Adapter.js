const API = "https://coup-server.herokuapp.com/"

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
<<<<<<< HEAD
=======
		.then(res => {
			console.log(res)
			return res
		})
>>>>>>> 6b5a20f07b391a13cec692338995ad6ebe79ee0c
		.then(res => res.json())
	}
	
}