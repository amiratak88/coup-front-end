const API = "https://localhost:3000/"

class Adapter {
	static signUp(name) {
		return fetch(API + "users", {
			method: "POST",
			headers = {"Content-Type": "application/json"},
			body: JSON.stringify({ username: name })
		})
		.then(console.log)
	}
}