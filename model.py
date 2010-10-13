#!/usr/bin/env python
# -*- coding: utf-8 -*-

from google.appengine.ext import db

class Message(db.Model):
    name = db.StringProperty(required=True)
    comment = db.StringProperty(required=True , multiline=True)
    created = db.DateTimeProperty(auto_now_add=True)

class Bsmgdl(db.Model):
    mgdl = db.StringProperty(required=False)
    created = db.DateTimeProperty(auto_now_add=True)
    
class Counter(db.Model):
    value = db.IntegerProperty(required=True , default=0)
    

class BigModel(db.Model):
    name = db.StringProperty(required=False) #姓名
    sex = db.StringProperty(required=False)  #性別
    age = db.IntegerProperty(required=False)  #年齡
    phone = db.StringProperty(required=False)  #電話
    account = db.StringProperty(required=False)  #帳號
    password = db.StringProperty(required=False)  #密碼
    senser = db.IntegerProperty(required=False)  #感測器編號
    created = db.DateTimeProperty(auto_now_add=True) # 時間
    #medical senser
    bs_mgdl = db.IntegerProperty(required=False)  #血糖值
    bp_sys = db.IntegerProperty(required=False)  #血壓收縮壓
    bp_dia = db.IntegerProperty(required=False)  #血壓舒張壓
    bp_pul = db.IntegerProperty(required=False)  #脈搏
    pf_pef = db.IntegerProperty(required=False)  #呼氣流量整數
    pf_fevl = db.FloatProperty(required=False)  #呼氣流量小數
    fo_meter = db.FloatProperty(required=False)  #額溫
    weight = db.IntegerProperty(required=False)  #體重
    #bike
    bike_calories = db.IntegerProperty(required=False)  #卡洛里
    bike_distance = db.FloatProperty(required=False)  #距離
    bike_heartbeat = db.IntegerProperty(required=False) #心跳
    bike_totaltime = db.FloatProperty(required=False) #總時數
    #run
    run_calories = db.IntegerProperty(required=False)   #卡洛里
    run_avg_step = db.FloatProperty(required=False)   #平均步幅
    run_heartbeat = db.IntegerProperty(required=False)  #心跳
    run_totaltime = db.FloatProperty(required=False)  #總時數
    #inbody
    bio_num = db.StringProperty(required=False) #編號
    bio_intra_flu = db.FloatProperty(required=False) #細胞內液
    bio_extra_flu = db.FloatProperty(required=False) #細胞外液
    bio_wei_ptn = db.FloatProperty(required=False)  #蛋白質重
    bio_bon_wei = db.FloatProperty(required=False)  #骨質重
    bio_fat_mass = db.FloatProperty(required=False)  #脂肪重
    bio_cm = db.IntegerProperty(required=False)  #身高
    bio_kg_pei = db.FloatProperty(required=False)  #體脂肪率
    bio_dat_dis = db.FloatProperty(required=False)  #脂肪分布
    bio_rt_han = db.FloatProperty(required=False)  #右臂
    bio_lf_han = db.FloatProperty(required=False)  #左臂
    bio_cen = db.FloatProperty(required=False)  #軀幹
    bio_rt_leg = db.FloatProperty(required=False)  #右腿
    bio_lf_leg = db.FloatProperty(required=False)  #左腿
    bio_ede = db.IntegerProperty(required=False)  #Obesity Degree
    bio_bmi = db.IntegerProperty(required=False)  #BMI
    bio_bmr = db.FloatProperty(required=False)  #BMR
    bio_amc = db.FloatProperty(required=False)  #AMC
    bio_ac = db.FloatProperty(required=False)  #AC
    bio_bcm = db.FloatProperty(required=False)  #BCM
    bio_score = db.IntegerProperty(required=False)  #SCORE
    