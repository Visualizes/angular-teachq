import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase import firebase

if (not len(firebase_admin._apps)):
  cred = credentials.Certificate('C:/Users/RamiK/Desktop/CMPS183/web2py/applications/TeachQ/secrets/secretFirebaseAccountKey.json')
  default_app = firebase_admin.initialize_app(cred)

firebase = firebase.FirebaseApplication('https://teachq-b8f84.firebaseio.com/', None)

response.view = 'generic.json'
response.headers["Access-Control-Allow-Origin"] = '*'
response.headers['Access-Control-Max-Age'] = 86400
response.headers['Access-Control-Allow-Headers'] = '*'
response.headers['Access-Control-Allow-Methods'] = '*'
response.headers['Access-Control-Allow-Credentials'] = 'true'

def create_user():
  user = auth.create_user(
      email=request.vars.email,
      email_verified=False,
      password=request.vars.password,
      display_name=request.vars.display_name,
      disabled=False)
  print('Sucessfully created new user: {0}'.format(user.uid))
  return response.json(dict(id=user.uid))

def save_question_set():
  if len(request.args) > 0:
    id = request.args[0]
    question_set_id = request.args[1] if len(request.args) > 1 else str(uuid.uuid4()).replace('-', '')
    firebase.put('/users/{0}/questionSets'.format(id), question_set_id, request.vars.information)
    firebase.put('/users/{0}/questionSets/{1}'.format(id, question_set_id), 'questions', request.vars.question_set)
    return response.json(dict(id=id))
  else:
    return response.json(dict())

def get_question_sets():
  if (len(request.args) > 0):
    return response.json(firebase.get('/users/{0}'.format(request.args[0]), 'questionSets'))
  else:
    return response.json(dict())

def get_question_set():
  if (len(request.args) > 1):
    return response.json(firebase.get('/users/{0}/questionSets'.format(request.args[0]), request.args[1]))
  else:
    return response.json(dict())

def delete_question_set():
  if (len(request.args) > 1):
    firebase.delete('/users/{0}/questionSets'.format(request.args[0]), request.args[1])
  return response.json(dict())

def present_question_set():
  if (len(request.args) > 1):
    user_id = request.args[0]
    question_set_id = request.args[1]
    presentation_id = str(uuid.uuid4()).replace('-', '')
    firebase.put('/users/{0}/questionSets/{1}/presentations'.format(user_id, question_set_id), presentation_id, dict(currentQuestion='q1'))
    return response.json(dict(id=presentation_id))
  else:
    return response.json(dict())

def update_current_question():
  if (len(request.args) > 2):
    user_id = request.args[0]
    question_set_id = request.args[1]
    presentation_id = request.args[2]
    firebase.put('/users/{0}/questionSets/{1}/presentations/{2}'.format(user_id, question_set_id, presentation_id), 'currentQuestion', request.vars.currentQuestion)
    firebase.put('/users/{0}/questionSets/{1}/presentations/{2}'.format(user_id, question_set_id, presentation_id), 'answer', request.vars.answer)
  return response.json(dict())

def refresh_question():
  if (len(request.args) > 2):
    user_id = request.args[0]
    question_set_id = request.args[1]
    presentation_id = request.args[2]
    firebase.delete('/users/{0}/questionSets/{1}/presentations/{2}'.format(user_id, question_set_id, presentation_id), str(request.vars.currentQuestion))
  return response.json(dict())
