# -*- coding: utf-8 -*-
import sys
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import re
def rePlaceData(value) :
    numbers = re.findall("\d+", value)
    result = ""
    for i in numbers:
        decodedNumber = i.decode('utf-8');
        result += decodedNumber
    return result

def getAIAData(name, birth, gender): #유관우 , 890119 , 0 남자 1 여자
    driver = webdriver.Chrome('./chromedriver')
    driver.get('https://www.aia.co.kr/ko/our-products/medical-protection/non-par-denteal-health-plan.html#')

