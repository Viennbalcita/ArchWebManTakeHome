# ArchWebManTakeHome (Backend Challenge)

## Frameworks
- NodeJs
- Express

## Database
- MongoDB

## Prerequisites
 A MongoDB database must be created before running the program. Please edit the const variable "mongoDBConnectionString" in server.mjs (line 20) to your connection URI

## Installation
 Run the following command to install dependencies:

```bash
npm install
```

## Running the Application
Kindly run either of the following commands in the terminal from the root directory:

```bash
 npm start
```
       or
```bash
 node src/server.mjs
```

You may test the routes using third party applications such as **Postman** or you may test the routes through the terminal

Sample commands:

```bash
curl -X POST http://localhost:5000/routes/video/create -H "Content-Type: application/json" -d "{\"title\":\"My Test Video\",\"date\":\"2025-01-12T10:30:00.000Z\",\"description\":\"This is a test video\",\"link\":\"https://youtube.com/watch?v=test123\",\"series\":\"seARCHlight\"}"
```
```bash
curl http://localhost:5000/routes/video/get/VIDEO_ID_HERE
```
```bash
curl -X PUT http://localhost:5000/routes/video/update/VIDEO_ID_HERE -H "Content-Type: application/json" -d "{\"title\":\"Updated Video Title\",\"date\":\"2025-01-15T14:30:00.000Z\",\"description\":\"Updated description\",\"link\":\"https://youtube.com/updated\",\"series\":\"Archers Recap\"}"
```
```bash
curl -X DELETE http://localhost:5000/routes/video/delete/VIDEO_ID_HERE
```
```bash
curl http://localhost:5000/routes/video/select-all/seARCHlight
```
```bash
curl http://localhost:5000/routes/video/get-latest/NCA
```