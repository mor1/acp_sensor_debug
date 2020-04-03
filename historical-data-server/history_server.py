from flask import Flask, request, render_template
from os import listdir
import json
from collections import defaultdict
import sys

app = Flask(__name__)

#cors = CORS(app)

basePath = "/media/acp/mqtt_ttn/data_bin/"
basePath = "../../ttn_data/mnt/tfc_data/tfc/csn_ttn/data_bin/"
DEBUG = True

def date_to_path(selecteddate):
    data = selecteddate.split('-')
    return(data[0]+'/'+data[1]+'/'+data[2]+'/')

@app.route('/history')
def historical():
    return render_template('history.html')


@app.route('/')
def offline_data():
    if DEBUG:
        print('Requested')
    workingDir = basePath+'2020/03/15/'
    sensor = "ijl20-sodaq-ttn"
    feature = "temperature"
    rdict = defaultdict(float)
    try:
        selecteddate = request.args.get('date')
        sensor = request.args.get('sensor')
        feature = request.args.get('feature')
        workingDir = basePath+date_to_path(selecteddate)
    except:
        if DEBUG:
            print(sys.exc_info())
        pass
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

app.run(host='127.0.0.1',port=5000,debug=DEBUG)