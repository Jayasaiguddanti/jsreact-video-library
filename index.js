var mongoclient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
var constr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/get-admin", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-categories", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-videos", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-users", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblusers").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-users/:userid", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblusers").find({UserId:req.params.userid}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/get-videos/:id", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get("/filter-videos/:catid", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblvideos").find({CategoryId:parseInt(req.params.catid)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.post("/register-user", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        var user = {
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile
        };
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log("User registered successfully");
            res.end();
        });
    });
});

app.post("/add-category", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        var category = {
            CategoryId: parseInt(req.body.CategoryId),
            CategoryName: req.body.CategoryName
        };
        database.collection("tblcategories").insertOne(category).then(()=>{
            console.log("Category added");
            res.end();
        });
    });
});

app.post("/add-video", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
        };
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log("video uploaded");
            res.end();
        });
    });
});

app.put("/edit-video/:id", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
        };
        database.collection("tblvideos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
            console.log("video updated");
            res.end();
        });
    });
});

app.delete("/delete-video/:id", (req, res)=>{
    mongoclient.connect(constr).then((connection)=>{
        var database = connection.db("jsvideodb");
        database.collection("tblvideos").deleteOne({VideoId:parseInt(req.params.id)}).then(()=>{
            console.log("video deleted");
            res.end();
        });
    });
});
app.listen(2025);
console.log("Server started at http://127.0.0.1:2025");