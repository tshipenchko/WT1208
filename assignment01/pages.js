const loginPage = `
<form action="/login" method="post">
    <input type="text" name="login" placeholder="Login" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="submit" value="Submit">
</form>
<p>
    Don't have an account? <a href="/register">Register</a>
</p>
`;

const registerPage = `
<form action="/register" method="post">
    <input type="text" name="login" placeholder="Login" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="submit" value="Submit">
</form>
<p>
    Already have an account? <a href="/login">Login</a>
</p>
`;

module.exports = {
    loginPage,
    registerPage,
};
