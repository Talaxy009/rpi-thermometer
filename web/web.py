#!/usr/bin/python
from bottle import route, run, static_file, template


@route('/asset/js/<filename>')
def js_file(filename):
    return static_file(filename, root='./asset/js/')


@route('/asset/css/<filename>')
def css_files(filename):
    return static_file(filename, root='./asset/css/')


@route('/data/<filename>')
def data_files(filename):
    return static_file(filename, root='./data/')


@route('/')
def index():
    return template('index.html')


run(host='0.0.0.0', port=80)
