const { exec } = require("child_process");
const chokidar = require("chokidar");

let server;

function startServer() {
  if (server) server.kill();
  console.log("🔄 Reiniciando php artisan serve...\n");

  server = exec("php artisan serve", (error, stdout, stderr) => {
    if (error) console.error(`❌ Erro: ${error.message}`);
    if (stderr) console.error(`⚠️ STDERR: ${stderr}`);
    if (stdout) console.log(`📢 STDOUT:\n${stdout}`);
  });
}

startServer();

chokidar
  .watch(["app", "routes", "resources", "config", ".env"], {
    ignored: /node_modules|storage|vendor/,
    persistent: true,
  })
  .on("change", (path) => {
    console.log(`📝 Alteração detectada em: ${path}`);
    startServer();
  });
