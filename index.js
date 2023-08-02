import path from "path";
import glob from "fast-glob";
import { Worker } from "worker_threads";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function chunkArray(array, chunkSize) {
  var index = 0;
  var arrayLength = array.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    tempArray.push(array.slice(index, index + chunkSize));
  }

  return tempArray;
}

export async function searchDirectory(
  directory,
  filter,
  quick,
  author,
  ignore,
  foundCallback
) {
  const files = await glob("**", {
    cwd: directory,
    ignore: ignore ? ignore.split(",") : [],
  });

  // Number of threads can be tuned for performance
  const numThreads = 4;
  const chunks = chunkArray(files, Math.ceil(files.length / numThreads));

  const workerPromises = chunks.map((chunk, index) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.resolve(__dirname, "./lib/worker.js"), {
        workerData: { chunk, directory, filter, quick, author, ignore },
      });

      worker.on("message", (message) => {
        if (message.error) {
          foundCallback(message.error);
        } else {
          foundCallback(null, message);
        }
      });

      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        } else {
          resolve();
        }
      });
    });
  });

  await Promise.allSettled(workerPromises).then((ex) => {
    console.log(ex);
  });
}
