import json
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/lsat_calc', methods=['POST'] )
def lsat_calc():
    potential_schools = []

    with open ('lawSchoolsDB.json') as lsat_file:
        file_data = json.load(lsat_file)
    
    req = requests.get().json();

    if (req.data == 'any' ):
        potential_schools = fillWithAllSchools(file_data )
    else:
        potential_schools = narrowByProvince( req.data.province , file_data)

    potential_schools = narrowByGPAScore(req.data.userGPA , req.data.userLSAT , potentialSchools)
    
    return  jsonify( { 'Schools': [1,2,3] }) 


def narrowByProvince(userProvince, schoolList):
    potentialSchools = []
    return remainingSchools

def fillWithAllSchools(schoolList):
    arr = []
    for item in schoolList:
        arr.append(item);
    return arr

def narrowByGPAScore (userGPA, userLSAT, potentialSchools):
    return remainingSchools


def narrowByTuition(tuitionCap, potentialSchools):
    return remainingSchools

def getListOfSchools(potentialSchools):
    return schools
