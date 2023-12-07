const http = require("http");
const path = require("path");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb+srv://praveen4921:prav1234@cluster0.e6whtoh.mongodb.net/");

async function fetchPlayers() {
    
    try {
        await client.connect();
        console.log("connected to Mongo!!")

        const database = client.db("playerdatabase"); 
        const collection = database.collection("player"); 

        const players = await collection.find({}).toArray();

        return players;
    } finally {
        await client.close();
    }
}
const server = http.createServer(async (req, res) => {
    
 
  
      
  if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname,  'Portfolio.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname,  'Portfolio.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api')
    {
        try {
            const players = await fetchPlayers();

            res.writeHead(200, { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify(players));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end("Internal Server Error");
        }
    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/
});

// it will first try to look for
// environment variable, if not found then go for 5959
const PORT= process.env.PORT || 7173;

// port, callback
server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));
