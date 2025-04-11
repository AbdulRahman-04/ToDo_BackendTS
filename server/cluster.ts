// cluster.ts
import cluster from "cluster"
import os from "os";

const totalCPU = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`👑 Primary Process PID: ${process.pid}`);
  console.log(`Total CPU cores: ${totalCPU}`);

  for (let i = 0; i < totalCPU; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Restart worker
  });

} else {
  // 👇 Import app.ts here, so each worker starts the actual server
  import ("./app"); 
}
