import os
import md5
import re
import urllib
import datetime
import math

import model

from django.utils import simplejson

from google.appengine.api import urlfetch
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db


"""
  json bigtable show
"""
class JsonDb(webapp.RequestHandler):
  def get(self ):

    #self.response.out.write("hello")
    query = model.Bsmgdl.all()
    query.order('-created')
    
    
    count = query.count()
    #gg = query.get()
    
    
    #self.response.out.write(msgs[6].mgdl)
    #self.response.out.write(msgs[6].created)
    
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    
    #json_obj['titel']['key'] = "key"
    json_obj['titel']['mgdl'] = "mgdl"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(10)
    
    for result in msgs:
      review = {}
      #review['key'] = str(result.key())
      review['mgdl'] = int(result.mgdl)
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)
    

"""
  json bigtable show
"""
class JsonDbBP(webapp.RequestHandler):
  
  def get(self , param):
    backcount = int(param)
    #self.response.out.write("hello")
    query = model.BigModel.all()
    query.filter("senser = ", 1) 
    query.order('-created')
    
    
    count = query.count()
 
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    
    #json_obj['titel']['key'] = "key"
    json_obj['titel']['bp_sys'] = "bp_sys"
    json_obj['titel']['bp_sysT'] = "bp_sysT"
    json_obj['titel']['bp_sysB'] = "bp_sysB"
    json_obj['titel']['bp_dia'] = "bp_dia"
    json_obj['titel']['bp_dia'] = "bp_diaT"
    json_obj['titel']['bp_dia'] = "bp_diaB"
    json_obj['titel']['bp_pul'] = "bp_pul"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(backcount)
    
    for result in msgs:
      review = {}
      #review['key'] = str(result.key())
      review['bp_sys'] = int(result.bp_sys)
      review['bp_sysT'] = 140
      review['bp_sysB'] = 90
      review['bp_dia'] = int(result.bp_dia)
      review['bp_diaT'] = 90
      review['bp_diaB'] = 60
      review['bp_pul'] = int(result.bp_pul)
      review['bp_pulT'] = 100
      review['bp_pulB'] = 60
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)
    

"""
  json bigtable show
"""
class JsonDbPF(webapp.RequestHandler):
  def get(self , param):
    backcount = int(param)
    #self.response.out.write("hello")
    query = model.BigModel.all()
    query.filter("senser = ", 3) 
    query.order('-created')
    
    
    count = query.count()
 
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    json_obj['titel']['pf_pef'] = "pf_pef"
    json_obj['titel']['pf_fevl'] = "pf_fevl"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(backcount)
    
    for result in msgs:
      review = {}
      #review['key'] = str(result.key())
      review['pf_pef'] = int(result.pf_pef)
      review['pf_fevl'] = float(result.pf_fevl)
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)
    

"""
  json bigtable show
"""
class JsonDbFO(webapp.RequestHandler):
  def get(self , param):
    backcount = int(param)
    #self.response.out.write("hello")
    query = model.BigModel.all()
    query.filter("senser = ", 4) 
    query.order('-created')
    
    count = query.count()
 
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    json_obj['titel']['fo_meter'] = "fo_meter"
    json_obj['titel']['fo_meterT'] = "fo_meterT"
    json_obj['titel']['fo_meterB'] = "fo_meterB"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(backcount)
    
    for result in msgs:
      review = {}
      #review['key'] = str(result.key())
      review['fo_meter'] = float(result.fo_meter)
      review['fo_meterT'] = 38.0
      review['fo_meterB'] = 35.8
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)
    

"""
  json bigtable show
"""
class JsonDbBS(webapp.RequestHandler):
  def get(self , param):
    backcount = int(param)
    query = model.BigModel.all()
    query.filter("senser = ", 2) 
    query.order('-created')
    
    count = query.count()
 
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    json_obj['titel']['bs_mgdl'] = "bs_mgdl"
    json_obj['titel']['bs_mgdlT'] = "bs_mgdlT"
    json_obj['titel']['bs_mgdlB'] = "bs_mgdlB"
    json_obj['titel']['created'] = "created"
    msgs = query.fetch(backcount)
    

    
    
    for result in msgs:
      review = {}
      review['bs_mgdl'] = int(result.bs_mgdl)
      review['bs_mgdlT'] = 180
      review['bs_mgdlB'] = 80
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)
    

"""
  json bigtable show
"""
class JsonDbBK(webapp.RequestHandler):
  def get(self , param):
    backcount = int(param)
    query = model.BigModel.all()
    query.filter("senser = ", 11) 
    query.order('-created')
    
    count = query.count()
 
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    json_obj['titel']['bike_calories'] = "bike_calories"
    json_obj['titel']['bike_distance'] = "bike_distance"
    json_obj['titel']['bike_heartbeat'] = "bike_heartbeat"
    json_obj['titel']['bike_totaltime'] = "bike_totaltime"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(backcount)
    
    for result in msgs:
      review = {}
      #review['key'] = str(result.key())
      review['bike_calories'] = int(result.bike_calories)
      review['bike_distance'] = float(result.bike_distance)
      review['bike_heartbeat'] = int(result.bike_heartbeat)
      review['bike_totaltime'] = float(result.bike_totaltime)
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)

"""
  json bigtable show
"""
class JsonDbRU(webapp.RequestHandler):
  def get(self , param):
    backcount = int(param)
    query = model.BigModel.all()
    query.filter("senser = ", 12) 
    query.order('-created')
    
    count = query.count()
 
    json_obj = {}

    json_obj['titel'] = {}
    json_obj['data'] = []
    json_obj['titel']['run_calories'] = "run_calories"
    json_obj['titel']['run_avg_step'] = "run_avg_step"
    json_obj['titel']['run_heartbeat'] = "run_heartbeat"
    json_obj['titel']['run_totaltime'] = "run_totaltime"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(backcount)
    
    for result in msgs:
      review = {}
      #review['key'] = str(result.key())
      review['run_calories'] = int(result.run_calories)
      review['run_avg_step'] = float(result.run_avg_step)
      review['run_heartbeat'] = int(result.run_heartbeat)
      review['run_totaltime'] = float(result.run_totaltime)
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M:%S"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)

"""
  json bigtable chart show
"""
class JsonChart(webapp.RequestHandler):
  def get(self):
    query = model.Bsmgdl.all()
    query.order('-created')
    
    count = query.count()
    
    json_obj = {}

    json_obj['titel'] = {} 
    json_obj['data'] = []
    
    json_obj['titel']['mgdl'] = "mgdl"
    json_obj['titel']['created'] = "created"
    
    msgs = query.fetch(10)
    
    for result in msgs:
      review = {}
      review['mgdl'] = int(result.mgdl)
      review['created'] = str(result.created.strftime("%Y/%m/%d %H:%M"))
      json_obj['data'].append(review)

    self.response.headers['Content-Type'] = 'application/json'
    
    json_str = simplejson.dumps(json_obj)
    
    self.response.out.write(json_str)



"""
  httpsocket bigtable input
"""
class BloodSuger(webapp.RequestHandler):
  def get(self ,  paramValue1):
    #self.response.out.write(str(paramValue1))
    
    try :
      dd = model.BigModel(senser = 2 ,bs_mgdl = int(paramValue1))
      dd.put()
      
      counter = model.Counter.get_by_key_name('dd')
      
      if counter is None :
        counter = model.Counter(key_name='dd')
      counter.value = counter.value + 1
      counter.put()
      
      self.response.out.write('sucesses')
      
    except BadValueError:
      self.response.out.write('error')
     

"""
  httpsocket bigtable input
"""
class Asthma(webapp.RequestHandler):
  def get(self ,  paramValue1,  paramValue2,paramValue3):
    #self.response.out.write(int(paramValue1))
    #self.response.out.write(float(paramValue2 + '.' + paramValue3))
    pef = int(paramValue1)
    fevl = float(paramValue2 + '.' + paramValue3)
    
    try :
      dd = model.BigModel(senser = 3 , pf_pef = pef , pf_fevl = fevl)
      dd.put()
      
      counter = model.Counter.get_by_key_name('dd')
      
      if counter is None :
        counter = model.Counter(key_name='dd')
      counter.value = counter.value + 1
      counter.put()
      
      self.response.out.write('sucesses')
      
    except BadValueError:
      self.response.out.write('error')
     
     

"""
  httpsocket bigtable input
"""
class BloodPressure(webapp.RequestHandler):
  def get(self ,  paramValue1,  paramValue2 , paramValue3):
    try :
      dd = model.BigModel(senser = 1 , bp_sys = int(paramValue1) , bp_dia = int(paramValue2) , bp_pul = int(paramValue3))
      dd.put()
      
      counter = model.Counter.get_by_key_name('dd')
      
      if counter is None :
        counter = model.Counter(key_name='dd')
      counter.value = counter.value + 1
      counter.put()
      
      self.response.out.write('sucesses')
      
    except BadValueError:
      self.response.out.write('error')
     
     
     

"""
  httpsocket bigtable input
"""
class Fometer(webapp.RequestHandler):
  def get(self ,  paramValue1,  paramValue2):
    #self.response.out.write(paramValue1)
    fo = float(paramValue1 + '.' + paramValue2)
    try :
      dd = model.BigModel(senser = 4 ,fo_meter = fo)
      dd.put()
      
      counter = model.Counter.get_by_key_name('dd')
      
      if counter is None :
        counter = model.Counter(key_name='dd')
      counter.value = counter.value + 1
      counter.put()
      
      self.response.out.write('sucesses')
      
    except BadValueError:
      self.response.out.write('error')
    

"""
  httpsocket bigtable input
"""
class Bike(webapp.RequestHandler):
  def get(self ,  paramValue1,  paramValue2, paramValue3, paramValue4, paramValue5, paramValue6):
    calories = int(paramValue1)
    heartbeat = int(paramValue2)
    distance = float(paramValue3 + '.' + paramValue4)
    totaltime = float(paramValue5 + '.' + paramValue6)
    try :
      dd = model.BigModel(senser = 11 , bike_calories = calories , bike_distance = distance , bike_heartbeat = heartbeat , bike_totaltime = totaltime)
      dd.put()
      
      counter = model.Counter.get_by_key_name('dd')
      
      if counter is None :
        counter = model.Counter(key_name='dd')
      counter.value = counter.value + 1
      counter.put()
      
      self.response.out.write('sucesses')
      
    except BadValueError:
      self.response.out.write('error')
      

"""
  httpsocket bigtable input
"""
class Run(webapp.RequestHandler):
  def get(self ,  paramValue1,  paramValue2, paramValue3, paramValue4, paramValue5, paramValue6):
    calories = int(paramValue1)
    heartbeat = int(paramValue2)
    avgstep = float(paramValue3 + '.' + paramValue4)
    totaltime = float(paramValue5 + '.' + paramValue6)
    
    try :
      dd = model.BigModel(senser = 12 , run_calories = calories , run_avg_step = avgstep , run_heartbeat = heartbeat , run_totaltime = totaltime)
      dd.put()
      
      counter = model.Counter.get_by_key_name('dd')
      
      if counter is None :
        counter = model.Counter(key_name='dd')
      counter.value = counter.value + 1
      counter.put()
      
      self.response.out.write('sucesses')
      
    except BadValueError:
      self.response.out.write('error')


apps_binding = []

apps_binding.append(('/json/db', JsonDb))
apps_binding.append(('/json/db/bp/(\d*)', JsonDbBP))
apps_binding.append(('/json/db/pf/(\d*)', JsonDbPF))
apps_binding.append(('/json/db/fo/(\d*)', JsonDbFO))
apps_binding.append(('/json/db/bs/(\d*)', JsonDbBS))
apps_binding.append(('/json/db/bk/(\d*)', JsonDbBK))
apps_binding.append(('/json/db/ru/(\d*)', JsonDbRU))
apps_binding.append(('/json/chart', JsonChart))
apps_binding.append(('/model/bs/(\d*)', BloodSuger))
apps_binding.append(('/model/pf/(\d*)/(\d*).(\d*)', Asthma))
apps_binding.append(('/model/bp/(\d*)/(\d*)/(\d*)', BloodPressure))
apps_binding.append(('/model/fo/(\d*).(\d*)', Fometer))
apps_binding.append(('/model/bk/(\d*)/(\d*)/(\d*).(\d*)/(\d*).(\d*)', Bike))
apps_binding.append(('/model/ru/(\d*)/(\d*)/(\d*).(\d*)/(\d*).(\d*)', Run))

application = webapp.WSGIApplication(apps_binding, debug=True)


def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()