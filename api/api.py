import json
import os
from flask import Flask

app = Flask(__name__)

@app.route('/lsat_calc', methods=['GET' , 'POST'] )
def lsat_calc():
    return { 'Return a school here'}