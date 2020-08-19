import json
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/lsat_calc', methods=['POST'] )
def lsat_calc():
    potential_schools = []

    with open ('lawSchoolsDB.json') as lsat_file:
        file_data = json.load(lsat_file)
    
    request_json = request.json

    if (request_json.get("userProvince") == 'any'):
         potential_schools = fillWithAllSchools(file_data )
    else:
        potential_schools = narrowByProvince( request_json.get("userProvince"), file_data)

    potential_schools = narrowByGPALSAT(request_json.get("gpa"), request_json.get("lsatScore") , potential_schools)
    if ( request_json.get('tuitionBudget') != ''):
        potential_schools = narrowByTuition( request_json.get('tuitionBudget'), potential_schools)
    
    listOfNames = getListOfNames(potential_schools)
    return  jsonify(  listOfNames) 

@app.route('/mcat_calc', methods=['POST'])
def mcat_calc():
    potential_schools = []

    with open('medSchoolsDB.json') as lsat_file:
        file_data = json.load(lsat_file)

    request_json = request.json

    if (request_json.get("userProvince") == 'any'):
        potential_schools = fillWithAllSchools(file_data)
    else:
        potential_schools = narrowByProvince(
            request_json.get("userProvince"), file_data)

    potential_schools = narrowByGPAMCAT(request_json.get(
        "gpa"), request_json.get("mcatScore"), potential_schools)
    if (request_json.get('tuitionBudget') != ''):
        potential_schools = narrowByTuition(
            request_json.get('tuitionBudget'), potential_schools)

    listOfNames = getListOfNames(potential_schools)
    return jsonify(listOfNames)


def narrowByProvince(preferred_province, full_school_list):
    potential_schools = []

    for school in full_school_list:
        if school.get("province") == preferred_province:
            potential_schools.append(school)

    return potential_schools

def fillWithAllSchools(full_school_list):
    potential_schools = []

    for school in full_school_list:
        potential_schools.append(school)
    
    return potential_schools


def narrowByGPAMCAT(userGPA, mcat, potential_schools):

    floatGPA = float(userGPA)
    intMCAT = int(mcat)
    narrowedSchools = []

    for school in potential_schools:
        if (floatGPA < float(school.get('gpa'))):
            potential_schools.remove(school)
        elif (intMCAT < float(school.get('mcat'))):
            potential_schools.remove(school)
        else:
            narrowedSchools.append(school)

    return narrowedSchools

def narrowByGPALSAT (userGPA, lsat, potential_schools):
    
    floatGPA = float(userGPA)
    intLSAT = int(lsat)
    narrowedSchools = []

    print(floatGPA , intLSAT)
    for school in potential_schools:
        if (floatGPA < float(school.get('gpa') )):
            potential_schools.remove(school)
        elif (intLSAT < float(school.get('lsat') )  ) :
            potential_schools.remove(school)
        else:
            narrowedSchools.append(school)
    
    return narrowedSchools


def narrowByTuition(tuitionCap, potential_schools):
    floatTuitionCap = float(tuitionCap)
    i = len(potential_schools)
    narrowedSchools = []

    while i!= 0 :
        if (floatTuitionCap < float(potential_schools[i].tuition)):
            potential_schools.splice(i)
        
        else:
            narrowedSchools.append(potential_schools[i])

    return narrowedSchools

def getListOfNames(potential_schools):
    names = []
    for school in potential_schools:
        names.append( school.get("name") )
    return names

