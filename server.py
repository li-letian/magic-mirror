import base64
import hashlib
import json
import time
import urllib
import urllib.request
from urllib.parse import urlencode

from fastapi import FastAPI
import uvicorn

from fastapi import FastAPI
import sys
import json
import time
from pydantic import BaseModel

IS_PY3 = sys.version_info.major == 3

if IS_PY3:
    from urllib.request import urlopen
    from urllib.request import Request
    from urllib.error import URLError
    from urllib.parse import urlencode
    timer = time.perf_counter


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:1420"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/split')
def split(text: str=""):
    url = "http://ltpapi.xfyun.cn/v1/cws"
    x_appid = "80ee5d5e"
    api_key = "8dcce27303ea01f03d87733840f92716"


    body = urllib.parse.urlencode({'text': text}).encode('utf-8')
    param = {"type": "dependent"}
    x_param = base64.b64encode(json.dumps(param).replace(' ', '').encode('utf-8'))
    x_time = str(int(time.time()))
    x_checksum = hashlib.md5(api_key.encode('utf-8') + str(x_time).encode('utf-8') + x_param).hexdigest()

    x_header = {'X-Appid': x_appid,
                'X-CurTime': x_time,
                'X-Param': x_param,
                'X-CheckSum': x_checksum}

    req = urllib.request.Request(url, body, x_header)
    result = urllib.request.urlopen(req)
    result = result.read()
    result = json.loads(result.decode('utf-8'))
    
    result = result['data']['word']
    return result


SCOPE = 'audio_voice_assistant_get'

API_KEY = 'USXDMzPq42YaeZYGCnpZ60oR'
SECRET_KEY = 'UbbtO0kz6vVDVquV1b9GObSSM8Ysadng'
TOKEN_URL = 'http://aip.baidubce.com/oauth/2.0/token'
ASR_URL = 'http://vop.baidu.com/server_api'

class DemoError(Exception):
    pass

def fetch_token():
    params = {'grant_type': 'client_credentials',
              'client_id': API_KEY,
              'client_secret': SECRET_KEY}
    post_data = urlencode(params)
    if (IS_PY3):
        post_data = post_data.encode( 'utf-8')
    req = Request(TOKEN_URL, post_data)
    try:
        f = urlopen(req)
        result_str = f.read()
    except URLError as err:
        print('token http response http code : ' + str(err.code))
        result_str = err.read()
    if (IS_PY3):
        result_str =  result_str.decode()

    print(result_str)
    result = json.loads(result_str)
    print(result)
    if ('access_token' in result.keys() and 'scope' in result.keys()):
        print(SCOPE)
        if SCOPE and (not SCOPE in result['scope'].split(' ')):  # SCOPE = False 忽略检查
            raise DemoError('scope is not correct')
        print('SUCCESS WITH TOKEN: %s  EXPIRES IN SECONDS: %s' % (result['access_token'], result['expires_in']))
        return result['access_token']
    else:
        raise DemoError('MAYBE API_KEY or SECRET_KEY not correct: access_token or scope not found in token response')




class RB(BaseModel):
    speech: str
    file_len: int



@app.post("/speech")
async def speechRecognize(body: RB):
    params = {
        'dev_pid': 1537,
        'format': 'wav',
        'rate':16000,
        'token': fetch_token(),
        'cuid': 'llt',
        'channel': 1,
        'speech': body.speech,
        'len': body.file_len
    }
    post_data = json.dumps(params, sort_keys=False)
    req = Request(ASR_URL, post_data.encode('utf-8'))
    req.add_header('Content-Type', 'application/json')
    try:
        begin = timer()
        f = urlopen(req)
        result_str = f.read()
        print ("Request time cost %f" % (timer() - begin))
    except URLError as err:
        print('asr http response http code : ' + str(err.code))
        result_str = err.read()

    return json.loads(result_str)



@app.get("/translate")
async def translate(content: str):
    APPID = '20221219001502293'
    SK = "B9bEavBTqGmYXdFKb_z1"
    sign = (APPID + content + '1435660288' + SK).encode(encoding='utf-8')
    url = f'https://fanyi-api.baidu.com/api/trans/vip/translate?q={content}&from=zh&to=en&appid={APPID}&salt=1435660288&sign={hashlib.md5(sign).hexdigest()}'
    try:
        response = requests.get(url=url)
        response.encoding='utf-8'
        result_str = response.text
    except URLError as err:
        result_str = err.read()

    return json.loads(result_str)




if __name__ == '__main__':
    uvicorn.run(app='server:app', host="127.0.0.1", port=8000, reload=True)

