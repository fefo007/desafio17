const os = require('os')

module.exports={
    argDeEntrada:process.argv,
    sistOperativo:process.platform + process.arch,
    vNode:process.version,
    rss:process.memoryUsage.rss(),
    ejecutPath:process.execPath,
    pid:process.pid,
    folder:process.cwd(),
    cpus:os.cpus().length
}