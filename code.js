const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));


app.get("/",function(req,res){
	res.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo",async function(req,res){
	const videoURL = req.query.videoURL;
	const info = await ytdl.getInfo(videoURL);
	res.status(200).json(info);
});

app.get("/download",function(req,res){
	const videoURL = req.query.videoURL;
	const itag = req.query.itag;
	const format = req.query.format;
	res.header("Content-Disposition",'attachment;\ filename="video.'+format+'"');
	ytdl(videoURL,{
		filter: format => format.itag == itag
	}).pipe(res);
});

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});