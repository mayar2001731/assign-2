



const path = require("path");
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");
const zlib = require("zlib");
const http = require("http");
const { pipeline } = require("stream");

// ============================================================
// Part 1: Node.js Core Modules
// ============================================================

/*
Question 1:
Write a function that logs the current file path and directory.
Output Example:
{ File: "/home/user/project/index.js", Dir: "/home/user/project" }
*/
function logCurrentFileAndDirectory() {
  console.log({
    File: __filename,
    Dir: __dirname,
  });
}

// Example:
// logCurrentFileAndDirectory();


/*
Question 2:
Write a function that takes a file path and returns its file name.
Input Example:
/user/files/report.pdf

Output Example:
"report.pdf"
*/
function getFileName(filePath) {
  return path.basename(filePath);
}

// Example:
// console.log(getFileName("/user/files/report.pdf"));


/*
Question 3:
Write a function that builds a path from an object.
Input Example:
{ dir: "/folder", name: "app", ext: ".js" }

Output Example:
"/folder/app.js"
*/
function buildPathFromObject(pathObject) {
  return path.format(pathObject);
}

// Example:
// console.log(
//   buildPathFromObject({
//     dir: "/folder",
//     name: "app",
//     ext: ".js",
//   })
// );


/*
Question 4:
Write a function that returns the file extension from a given file path.
Input Example:
/docs/readme.md

Output Example:
".md"
*/
function getFileExtension(filePath) {
  return path.extname(filePath);
}

// Example:
// console.log(getFileExtension("/docs/readme.md"));


/*
Question 5:
Write a function that parses a given path and returns its name and ext.
Input Example:
/home/app/main.js

Output Example:
{ Name: "main", Ext: ".js" }
*/
function parseNameAndExtension(filePath) {
  const parsedPath = path.parse(filePath);

  return {
    Name: parsedPath.name,
    Ext: parsedPath.ext,
  };
}

// Example:
// console.log(parseNameAndExtension("/home/app/main.js"));


/*
Question 6:
Write a function that checks whether a given path is absolute.
Input Example:
/home/user/file.txt

Output Example:
true
*/
function checkAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

// Example:
// console.log(checkAbsolutePath("/home/user/file.txt"));


/*
Question 7:
Write a function that joins multiple segments.
Input:
"src", "components", "App.js"

Output Example:
src/components/App.js
*/
function joinMultipleSegments(...segments) {
  return path.join(...segments);
}

// Example:
// console.log(joinMultipleSegments("src", "components", "App.js"));


/*
Question 8:
Write a function that resolves a relative path to an absolute one.
Input Example:
./index.js

Output Example:
/home/user/project/src/index.js
*/
function resolveRelativePath(relativePath) {
  return path.resolve(relativePath);
}

// Example:
// console.log(resolveRelativePath("./index.js"));


/*
Question 9:
Write a function that joins two paths.
Input Example:
/folder1, folder2/file.txt

Output Example:
/folder1/folder2/file.txt
*/
function joinTwoPaths(firstPath, secondPath) {
  return path.join(firstPath, secondPath);
}

// Example:
// console.log(joinTwoPaths("/folder1", "folder2/file.txt"));


/*
Question 10:
Write a function that deletes a file asynchronously.
Input Example:
/path/to/file.txt

Output Example:
The file.txt is deleted.
*/
function deleteFileAsync(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    console.log(`${path.basename(filePath)} is deleted.`);
  });
}

// Example:
// deleteFileAsync("./file.txt");


/*
Question 11:
Write a function that creates a folder synchronously.

Output Example:
"Success"
*/
function createFolderSync(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  console.log("Success");
}

// Example:
// createFolderSync("./new-folder");


/*
Question 12:
Create an event emitter that listens for a "start" event
and logs a welcome message.

Output Example:
Welcome event triggered!
*/
const startEmitter = new EventEmitter();

startEmitter.on("start", () => {
  console.log("Welcome event triggered!");
});

// Example:
// startEmitter.emit("start");


/*
Question 13:
Emit a custom "login" event with a username parameter.
Input Example:
"Ahmed"

Output Example:
"User logged in: Ahmed"
*/
const loginEmitter = new EventEmitter();

loginEmitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});

// Example:
// loginEmitter.emit("login", "Ahmed");


/*
Question 14:
Read a file synchronously and log its contents.
Input Example:
"./notes.txt"

Output Example:
the file content => "This is a note."
*/
function readFileSynchronously(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    console.log(`the file content => "${content}"`);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// Example:
// readFileSynchronously("./notes.txt");


/*
Question 15:
Write asynchronously to a file.

Input:
path: "./async.txt"
content: "Async save"
*/
function writeFileAsynchronously(filePath, content) {
  fs.writeFile(filePath, content, "utf8", (error) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    console.log("File written successfully.");
  });
}

// Example:
// writeFileAsynchronously("./async.txt", "Async save");


/*
Question 16:
Check if a directory exists.

Input Example:
"./notes.txt"

Output Example:
true
*/
function directoryExists(directoryPath) {
  return (
    fs.existsSync(directoryPath) &&
    fs.statSync(directoryPath).isDirectory()
  );
}

// Example:
// console.log(directoryExists("./my-folder"));


/*
Question 17:
Write a function that returns the OS platform and CPU architecture.

Output Example:
{ Platform: "win32", Arch: "x64" }
*/
function getOSPlatformAndArchitecture() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}

// Example:
// console.log(getOSPlatformAndArchitecture());


/*
Question 18:
Use a readable stream to read a file in chunks and log each chunk.

Input Example:
"./big.txt"

Output Example:
log each chunk
*/
function readFileUsingReadableStream(filePath) {
  const readableStream = fs.createReadStream(filePath, {
    encoding: "utf8",
    highWaterMark: 64,
  });

  readableStream.on("data", (chunk) => {
    console.log("Chunk:");
    console.log(chunk);
  });

  readableStream.on("end", () => {
    console.log("Finished reading file.");
  });

  readableStream.on("error", (error) => {
    console.log("Error:", error.message);
  });
}

// Example:
// readFileUsingReadableStream("./big.txt");


/*
Question 19:
Use readable and writable streams to copy content from one file to another.

Input Example:
"./source.txt", "./dest.txt"

Output Example:
File copied using streams
*/
function copyFileUsingStreams(sourcePath, destinationPath) {
  const readableStream = fs.createReadStream(sourcePath);
  const writableStream = fs.createWriteStream(destinationPath);

  readableStream.pipe(writableStream);

  writableStream.on("finish", () => {
    console.log("File copied using streams");
  });

  readableStream.on("error", (error) => {
    console.log("Read Error:", error.message);
  });

  writableStream.on("error", (error) => {
    console.log("Write Error:", error.message);
  });
}

// Example:
// copyFileUsingStreams("./source.txt", "./dest.txt");


/*
Question 20:
Create a pipeline that reads a file, compresses it,
and writes it to another file.

Input Example:
"./data.txt", "./data.txt.gz"
*/
function compressFileUsingPipeline(sourcePath, destinationPath) {
  pipeline(
    fs.createReadStream(sourcePath),
    zlib.createGzip(),
    fs.createWriteStream(destinationPath),
    (error) => {
      if (error) {
        console.log("Pipeline failed:", error.message);
        return;
      }

      console.log("File compressed successfully.");
    }
  );
}

// Example:
// compressFileUsingPipeline("./data.txt", "./data.txt.gz");


// ============================================================
// Part 2: Simple CRUD Operations Using HTTP
// ============================================================

/*
Assignment requirement:
For all APIs, use the fs module to read and write data
from a JSON file such as users.json.

Do not store or manage the users using an in-memory array
as the permanent data source.
*/

const USERS_FILE = path.join(__dirname, "users.json");
const PORT = 3000;


/*
Helper Function:
Create users.json automatically if it does not exist.
*/
function initializeUsersFile() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
}

initializeUsersFile();


/*
Helper Function:
Send JSON response.
*/
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}


/*
Helper Function:
Read all users from users.json.
*/
function readUsers(callback) {
  fs.readFile(USERS_FILE, "utf8", (error, data) => {
    if (error) {
      callback(error);
      return;
    }

    try {
      const users = JSON.parse(data || "[]");
      callback(null, users);
    } catch (parseError) {
      callback(parseError);
    }
  });
}


/*
Helper Function:
Write users back to users.json.
*/
function writeUsers(users, callback) {
  fs.writeFile(
    USERS_FILE,
    JSON.stringify(users, null, 2),
    "utf8",
    callback
  );
}


/*
Helper Function:
Read the JSON request body.
*/
function readRequestBody(req, callback) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    if (!body) {
      callback(null, {});
      return;
    }

    try {
      const parsedBody = JSON.parse(body);
      callback(null, parsedBody);
    } catch (error) {
      callback(new Error("Invalid JSON body"));
    }
  });

  req.on("error", (error) => {
    callback(error);
  });
}


/*
Question 1 - Part 2:
Create an API that adds a new user to users stored in a JSON file.
Ensure that the email of the new user does not already exist.

URL:
POST /user

Example Input:
{
  "name": "User 1",
  "age": 27,
  "email": "user@email.com"
}

Example Success Output:
{
  "message": "User added successfully."
}

Example Duplicate Email Output:
{
  "message": "Email already exists."
}
*/


/*
Question 2 - Part 2:
Create an API that updates an existing user's name, age, or email by ID.
The user ID should be retrieved from the URL.

URL:
PATCH /user/:id

Example Input:
{
  "age": 30
}

Example Success Output:
{
  "message": "User updated successfully."
}

Example Not Found Output:
{
  "message": "User ID not found."
}
*/


/*
Question 3 - Part 2:
Create an API that deletes a User by ID.
The user ID should be retrieved from the URL.
Remember to delete the user from the file.

URL:
DELETE /user/:id

Example Success Output:
{
  "message": "User deleted successfully."
}

Example Not Found Output:
{
  "message": "User ID not found."
}
*/


/*
Question 4 - Part 2:
Create an API that gets all users from the JSON file.

URL:
GET /user
*/


/*
Question 5 - Part 2:
Create an API that gets User by ID.

URL:
GET /user/:id
*/


const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);
  const pathname = requestURL.pathname;

  // ==========================================================
  // POST /user
  // Add a new user
  // ==========================================================
  if (req.method === "POST" && pathname === "/user") {
    readRequestBody(req, (bodyError, body) => {
      if (bodyError) {
        sendJSON(res, 400, {
          message: bodyError.message,
        });
        return;
      }

      const { name, age, email } = body;

      if (!name || age === undefined || !email) {
        sendJSON(res, 400, {
          message: "name, age and email are required.",
        });
        return;
      }

      readUsers((readError, users) => {
        if (readError) {
          sendJSON(res, 500, {
            message: "Could not read users file.",
          });
          return;
        }

        const emailAlreadyExists = users.some(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase()
        );

        if (emailAlreadyExists) {
          sendJSON(res, 409, {
            message: "Email already exists.",
          });
          return;
        }

        const newId =
          users.length === 0
            ? 1
            : Math.max(
                ...users.map((user) => Number(user.id) || 0)
              ) + 1;

        const newUser = {
          id: newId,
          name,
          age,
          email,
        };

        users.push(newUser);

        writeUsers(users, (writeError) => {
          if (writeError) {
            sendJSON(res, 500, {
              message: "Could not save user.",
            });
            return;
          }

          sendJSON(res, 201, {
            message: "User added successfully.",
            user: newUser,
          });
        });
      });
    });

    return;
  }


  // ==========================================================
  // GET /user
  // Get all users
  // ==========================================================
  if (req.method === "GET" && pathname === "/user") {
    readUsers((error, users) => {
      if (error) {
        sendJSON(res, 500, {
          message: "Could not read users file.",
        });
        return;
      }

      sendJSON(res, 200, users);
    });

    return;
  }


  // Match URLs such as:
  // /user/1
  // /user/2
  // /user/99
  const userIdMatch = pathname.match(/^\/user\/(\d+)$/);

  if (userIdMatch) {
    const userId = Number(userIdMatch[1]);


    // ========================================================
    // GET /user/:id
    // Get one user by ID
    // ========================================================
    if (req.method === "GET") {
      readUsers((error, users) => {
        if (error) {
          sendJSON(res, 500, {
            message: "Could not read users file.",
          });
          return;
        }

        const user = users.find(
          (currentUser) =>
            Number(currentUser.id) === userId
        );

        if (!user) {
          sendJSON(res, 404, {
            message: "User ID not found.",
          });
          return;
        }

        sendJSON(res, 200, user);
      });

      return;
    }


    // ========================================================
    // PATCH /user/:id
    // Update user by ID
    // ========================================================
    if (req.method === "PATCH") {
      readRequestBody(req, (bodyError, updates) => {
        if (bodyError) {
          sendJSON(res, 400, {
            message: bodyError.message,
          });
          return;
        }

        const allowedFields = ["name", "age", "email"];

        const fieldsToUpdate = Object.keys(updates).filter(
          (field) => allowedFields.includes(field)
        );

        if (fieldsToUpdate.length === 0) {
          sendJSON(res, 400, {
            message:
              "Please provide name, age, or email to update.",
          });
          return;
        }

        readUsers((readError, users) => {
          if (readError) {
            sendJSON(res, 500, {
              message: "Could not read users file.",
            });
            return;
          }

          const userIndex = users.findIndex(
            (user) => Number(user.id) === userId
          );

          if (userIndex === -1) {
            sendJSON(res, 404, {
              message: "User ID not found.",
            });
            return;
          }

          if (updates.email) {
            const emailAlreadyExists = users.some(
              (user) =>
                Number(user.id) !== userId &&
                user.email.toLowerCase() ===
                  updates.email.toLowerCase()
            );

            if (emailAlreadyExists) {
              sendJSON(res, 409, {
                message: "Email already exists.",
              });
              return;
            }
          }

          fieldsToUpdate.forEach((field) => {
            users[userIndex][field] = updates[field];
          });

          writeUsers(users, (writeError) => {
            if (writeError) {
              sendJSON(res, 500, {
                message: "Could not update user.",
              });
              return;
            }

            sendJSON(res, 200, {
              message: "User updated successfully.",
              user: users[userIndex],
            });
          });
        });
      });

      return;
    }


    // ========================================================
    // DELETE /user/:id
    // Delete user by ID
    // ========================================================
    if (req.method === "DELETE") {
      readUsers((readError, users) => {
        if (readError) {
          sendJSON(res, 500, {
            message: "Could not read users file.",
          });
          return;
        }

        const userIndex = users.findIndex(
          (user) => Number(user.id) === userId
        );

        if (userIndex === -1) {
          sendJSON(res, 404, {
            message: "User ID not found.",
          });
          return;
        }

        users.splice(userIndex, 1);

        writeUsers(users, (writeError) => {
          if (writeError) {
            sendJSON(res, 500, {
              message: "Could not delete user.",
            });
            return;
          }

          sendJSON(res, 200, {
            message: "User deleted successfully.",
          });
        });
      });

      return;
    }
  }


  // If no route matches
  sendJSON(res, 404, {
    message: "Route not found.",
  });
});


/*
Run the CRUD API server:

node assignment2.js

Then test with Postman:

1) Add User
POST http://localhost:3000/user

Body:
{
  "name": "User 1",
  "age": 27,
  "email": "user@email.com"
}


2) Update User
PATCH http://localhost:3000/user/1

Body:
{
  "age": 30
}


3) Delete User
DELETE http://localhost:3000/user/1


4) Get All Users
GET http://localhost:3000/user


5) Get User By ID
GET http://localhost:3000/user/1
*/

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// ============================================================
// Part 3: Bonus
// ============================================================

/*
Bonus Question:
Solve the LeetCode problem:
"kth-missing-positive-number"

Original assignment delivery instruction:
Create a separate file named "bonus.js" and copy the submitted
LeetCode solution into that file.

Because you requested everything in one code file,
the solution is included here.
*/

/*
Example:
Input:
arr = [2, 3, 4, 7, 11]
k = 5

Missing positive numbers are:
1, 5, 6, 8, 9, ...

The 5th missing positive number is:
9
*/
var findKthPositive = function (arr, k) {
  let missingCount = 0;
  let currentNumber = 1;
  let index = 0;

  while (missingCount < k) {
    if (
      index < arr.length &&
      arr[index] === currentNumber
    ) {
      index++;
    } else {
      missingCount++;

      if (missingCount === k) {
        return currentNumber;
      }
    }

    currentNumber++;
  }
};

// Example:
// console.log(
//   findKthPositive([2, 3, 4, 7, 11], 5)
// );
// Output: 9