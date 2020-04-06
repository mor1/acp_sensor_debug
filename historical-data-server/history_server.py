from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
from os import listdir
import json
from collections import defaultdict
import sys

app = Flask(__name__)

#cors = CORS(app)

basePath = '/media/acp/'
DEBUG = True

def date_to_path(selecteddate):
    data = selecteddate.split('-')
    return(data[0]+'/'+data[1]+'/'+data[2]+'/')

@app.route('/sensors')
def sensors():
    if DEBUG:
        print('sensors')
    workingDir = basePath+'mqtt_ttn/sensors'
    try:
        source = request.args.get('source')
        workingDir = basePath+source+'/sensors'
    except:
        if DEBUG:
            print(sys.exc_info())
        pass
    response = {}
    response['data'] = []    

    for f in listdir(workingDir):
        response['data'].append({'sensor':f})
    json_response = json.dumps(response)
    return(json_response)

@app.route('/features')
def features():
    if DEBUG:
        print('features')
    workingDir = basePath+'mqtt_ttn/sensors'
    try:
        selectedDate = request.args.get('date')
        source = request.args.get('source')
        sensor = request.args.get('sensor')
        workingDir = basePath+source+'/data_bin/'+date_to_path(selectedDate)
    except:
        if DEBUG:
            print(sys.exc_info())
        pass
    response = {}
    response['data'] = []    
    fcount = 0
    for f in listdir(workingDir):
        with open(workingDir+f) as json_file:
            data = json.load(json_file)
            if data['dev_id'] == sensor:
                try:
                    for ftr in data['payload_fields']:
                        if ftr != 'device' and {'feature':ftr} not in response['data']:
                            response['data'].append({'feature':ftr})
                    fcount+=1
                except KeyError:
                    pass
            else:
                continue
        if fcount > 10:
            break
    json_response = json.dumps(response)
    return(json_response)


@app.route('/history')
def historical():
    return render_template('history.html')


@app.route('/')
def offline_data():
    if DEBUG:
        print('Requested')

    sensor = "ijl20-sodaq-ttn"
    feature = "temperature"
    workingDir = basePath+'mqtt_ttn/data_bin/2020/03/15/'
    rdict = defaultdict(float)

    try:
        selecteddate = request.args.get('date')
        source = request.args.get('source')
        sensor = request.args.get('sensor')
        feature = request.args.get('feature')
        workingDir = basePath+source+'/data_bin/'+date_to_path(selecteddate)
    except:
        if DEBUG:
            print(sys.exc_info())
            print(request.args)
        sensor = "ijl20-sodaq-ttn"
        feature = "temperature"
        workingDir = basePath+'mqtt_ttn/data_bin/2020/03/15/'
    response = {}
    response['data'] = []

    for f in listdir(workingDir):
        with open(workingDir+f) as json_file:
            data = json.load(json_file)
            if data['dev_id'] == sensor:
                try:
                    rdict[float(f.split('_')[0])] = data['payload_fields'][feature]
                except KeyError:
                    pass
    
    for k in sorted(rdict.keys()):
        response['data'].append({'ts':str(k), 'val':rdict[k]})

    json_response = json.dumps(response)
    return(json_response)

app.run(port=5000,debug=DEBUG)