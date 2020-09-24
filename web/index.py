#!/user/bin/python3
import datetime
import json, os
import time

from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.oled.device import sh1106
from PIL import ImageFont

import Adafruit_DHT
import RPi.GPIO as GPIO

# OLED settings
serial = i2c(port=1, address=0x3C)
OLED = sh1106(serial)
font = ImageFont.truetype('simyou.ttf', 15)

# DHT11 settings
sensor = Adafruit_DHT.DHT11
DHT11pin = 4

# update time
os.system("sudo ntpdate cn.pool.ntp.org")

# GPIO settings
GPIO.setmode(GPIO.BOARD)
TouchPin = 16
GPIO.setup(TouchPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

timecount = 0
humidity, temperature = Adafruit_DHT.read_retry(sensor, DHT11pin)


def Led(x, hmt, tmp):
    while x == 1:
        OLED.show()
        if hmt is not None and tmp is not None:
            Temperature = "温度: {0:0.1f}°C".format(tmp)
            Humidity = "湿度: {0:0.1f}%".format(hmt)
            print(Temperature, Humidity)
            for i in range(0, 10):
                now = datetime.datetime.now()
                today_time = now.strftime("%H:%M:%S")
                with canvas(OLED) as draw:
                    draw.text((30, 4), today_time, font=font, fill="white")
                    draw.text((10, 23), Temperature, font=font, fill="white")
                    draw.text((10, 42), Humidity, font=font, fill="white")
                time.sleep(0.2)
            if GPIO.input(TouchPin) == 0:
                OLED.hide()
                break

        else:
            print('失败')


def dataJsonWrite(dataset):
    file = open("./data/data.json", "w")
    file.write("[")
    json.dump(dataset, file)
    file.write("]")
    file.close()


def rangeJsonWrite(dataset, range):
    if range:
        file = open("./data/halfDay.json", "r+")
    else:
        file = open("./data/hour.json", "r+")
    DataList = json.load(file)
    del DataList[0]
    DataList.append(dataset)
    file.seek(0, 0)
    file.truncate()
    json.dump(DataList, file)
    file.close()


if __name__ == "__main__":
    try:
        now = datetime.datetime.now()
        min_p = now.minute
        while True:
            if timecount >= 10:
                now = datetime.datetime.now()
                min_l = now.minute
                humidity, temperature = Adafruit_DHT.read_retry(sensor, DHT11pin)
                data = {"tmp": temperature, "hmt": humidity}
                dataJsonWrite(data)
                if min_l - min_p >= 5:
                    rangeJsonWrite(data, 0)
                    min_p = min_l
                if min_l < 5:
                    rangeJsonWrite(data, 1)
                    min_p = 0
                timecount = 0
            Led(GPIO.input(TouchPin), humidity, temperature)
            time.sleep(1)
            timecount = timecount + 1
    except KeyboardInterrupt:
        OLED.cleanup()
        GPIO.cleanup()
        pass
