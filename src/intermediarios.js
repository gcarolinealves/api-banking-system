function verificarSenha (req, res, next) {
    if (req.query.senha_banco || req.method !== "GET"){
        next();
    } else {
        res.status(401);
        res.json({erro: "Senha obrigatória!"})
    }
}

function validarSenha (req, res, next) {
    if (req.query.senha_banco === "123" || req.method !== "GET"){
        next();
    } else {
        res.status(401);
        res.json({erro: "Senha incorreta!"});
    }
}

module.exports = {
    verificarSenha,
    validarSenha
};