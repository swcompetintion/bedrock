use app;


db.createUser(
  {
    user: "swcompetition",
    pwd: "swcompetition",  
    roles: [ 
      { role: "readWrite", db: "app" }
    ]
  }
);



print("MongoDB initialization script finished."); 
