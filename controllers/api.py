import uuid
import datetime
import firebase_admin
import os
from firebase_admin import credentials
from firebase_admin import auth
from firebase import firebase

if (not len(firebase_admin._apps)):
  basePath = os.path.dirname(os.path.dirname(__file__))
  path = os.path.join(basePath, 'private', 'secretFirebaseAccountKey.json')
  cred = credentials.Certificate(str(path))
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
    if (request.vars.information is not None and request.vars.question_set is not None):
      firebase.put('/users/{0}/questionSets/{1}'.format(id, question_set_id), 'title', request.vars.information['title'])
      firebase.put('/users/{0}/questionSets/{1}'.format(id, question_set_id), 'description', request.vars.information['description'])
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
    presentation_id = str(uuid.uuid4()).split('-')[0]
    firebase.put('/users/{0}/questionSets/{1}/presentations'.format(user_id, question_set_id), presentation_id, dict(currentQuestion='q1',date=datetime.datetime.now()))
    firebase.put('/presentations', presentation_id, dict(userID=user_id,questionSetID=question_set_id))
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
    firebase.delete('/users/{0}/questionSets/{1}/presentations/{2}'.format(user_id, question_set_id, presentation_id), 'answer')
  return response.json(dict())

def get_presentation_data():
  if (len(request.args) > 0):
    presentation_id = request.args[0]
    return response.json(firebase.get('/presentations', presentation_id))
  else:
    return response.json(dict())
