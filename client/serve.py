from flask import Flask, render_template, request, jsonify
from faker import Faker
import random
import urllib2
import simplejson

fake = Faker()

app = Flask(__name__)


class Programmer(object):

    def __init__(self, name):
        self.name=name
        self.rsvp=self.answer()
        self.image=self.img()
        #self.image="http://"
        self.arrived=False


    def answer(self):
        a = ["yes", "no", "maybe"]
        return random.choice(a)

    def img(self):
        fetcher = urllib2.build_opener()
        searchTerm = self.name
        startIndex = "0"
        searchUrl1 = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + searchTerm + "&start=" + startIndex
        searchUrl = searchUrl1.replace(' ', '%20')
        f = fetcher.open(searchUrl)
        deserialized_output = simplejson.load(f)
        imageUrl = deserialized_output['responseData']['results'][0]['unescapedUrl']
        return imageUrl

    #def imggoo(self):
    #    options = images.ImageOptions()
    #    options.image_type = images.ImageType.FACE
    #    results = google.search_images(self.name, options)
    #    return results
    # INSANELY ugly thing to use



visitors = []

for x in xrange(15):
    programmer = Programmer(fake.name())
    visitors.append(programmer)

vis = []

for v in visitors:
    vis.append({"name" : v.name, "rsvp" : v.rsvp, "image" : v.image, "arrived" : v.arrived});

#ipdb.set_trace()

@app.route('/programmers')
def programmers():
    return(jsonify(results=vis))


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
