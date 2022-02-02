from typing import Optional
from fastapi import FastAPI, Request
import mysql.connector
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "null"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/cinema/backend_ajouter_bd")
async def ajouter(req: Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "cinema")
    mycursor = mydb.cursor() 
    body = json.loads(await req.body())
    mycursor.execute(f"INSERT INTO `film` (`nom`, `realisateur`, `genre`, `annee`) VALUES ( '{body['nom']}', '{body['realisateur']}' , '{body['genre']}' , {body['annee']});")
    mydb.commit()   
    return {"done"}

@app.get("/cinema/backend_recherche_bd")
def recherche(nom: str , annee: str , genre: str):
    db = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "cinema")
    cursor = db.cursor() 
    cursor.execute(f"SELECT * FROM film WHERE nom = '{nom}' and annee = '{annee}' and genre = '{genre}' ;")
    row_headers=[x[0] for x in cursor.description]
    cf = cursor.fetchall()
    json_data=[]
    for result in cf:
        json_data.append(dict(zip(row_headers,result)))
    return json_data