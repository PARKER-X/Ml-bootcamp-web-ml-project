import re
from flask import Flask, render_template , redirect, request, url_for , jsonify
import pickle
import numpy as np
import math

app = Flask(__name__)

model=pickle.load(open('model.pkl','rb'))
model1 = pickle.load(open('model1.pkl','rb'))
model2= pickle.load(open('model2.pkl','rb'))
model3 = pickle.load(open('model3.pkl','rb'))
model4 = pickle.load(open('model4.pkl','rb'))

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

@app.route('/ml')
def ml():
    return render_template("ml.html")
@app.route('/linear')
def linear():
    return render_template("linear.html")

@app.route('/tut1')
def tutl():
    return render_template("tut1.html")

@app.route('/tut2')
def tut2():
    return render_template("tut2.html")

@app.route('/multiple')
def multiple():
    return render_template("multiple.html")

@app.route('/multilinear')
def multilinear():
    return render_template("multilinear.html")

@app.route('/gradient')
def gradient():
    return render_template("gradient.html")

@app.route('/onehot')
def onehot():
    return render_template("onehot.html")

@app.route('/logistic')
def logistic():
    return render_template("logistic.html")

@app.route('/mnist')
def mnist():
    return render_template("mnist.html")
    
@app.route('/logistic2')
def logistic2():
    return render_template("logistic2.html")

@app.route('/tree')
def tree():
    return render_template("tree.html")

@app.route('/predict3', methods=['post'])
def predict3():
    int_features=[int(x) for x in request.form.values()]
    

    final = [np.array(int_features)]
    prediction = model3.predict(final)
    output = prediction
    if output >(0.5):
        return render_template('logistic.html',pred3='The person buy Insurance Hurray!. The probability of buy insurance is more than 0.5')
    else:
        return render_template('logistic.html', pred3='the probability of buy insurance is {}. so the Person will not buy your insurance ').format(output)

    


@app.route('/predict2', methods=['POST'])
def predict2():
    int_features=[int(x) for x in request.form.values()]
    final = [np.array(int_features)]
    prediction = model2.predict(final)
    output = prediction
    return render_template('onehot.html',pred2 = '.    The price of home is {}$ '.format(output))


@app.route('/predict1', methods=['POST'])
def predict1():
    int_features=[int(x) for x in request.form.values()]
    final = [np.array(int_features)]
    prediction = model1.predict(final)
    output = prediction
    return render_template('multiple.html',pred1 = '.     The price of home is {}$ '.format(output))
    

@app.route('/predict', methods= ['POST'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final = [np.array(int_features)]
    #print(int_features)
    #print(final)
    prediction = model.predict(final)
    output = round(prediction[0],1)

    if output >(0.5):
        return render_template('linear.html',pred='The person buy Insurance Hurray!. The probability of buy insurance is more than 0.5')
    else:
        return render_template('linear.html', pred='the probability of buy insurance is {}. so the Person will not buy your insurance ').format(output)


if __name__=='__main__':
    app.run(debug=True, use_reloader=False)