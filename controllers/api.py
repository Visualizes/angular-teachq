from firebase import firebase
firebase = firebase.FirebaseApplication('https://teachq-b8f84.firebaseio.com/', None)

def test():
    result = firebase.get('/users', None)
    print result
    return response.json(result)
