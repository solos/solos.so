---
title: iOS Appium自动化测试
date: 2016-06-20 19:27:00
comments: true
tag: 
  - Appium
  - 自动化测试
categories:
    - iOS
---


## 安装

- CLI

``` bash
brew install node      # get node.js
npm install -g appium  # get appium
appium &
```

- Desktop

``` bash
wget https://bitbucket.org/appium/appium.app/downloads/appium-1.5.3.dmg
桌面版可以使用inspector查看元素的xpath
```

## 配置Appium


- Desktop

    ![appium 配置](/img/appium-config.png)

- CLI
    desired_capabilities.py

    ``` python
    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    import os

    # Returns abs path relative to this file and not cwd
    PATH = lambda p: os.path.abspath(
        os.path.join(os.path.dirname(__file__), p)
    )

    # debug app path
    path = ('/Users/solos/Library/Developer/Xcode/DerivedData/'
            'Project-hksebxstjewxaneyjamjcwfbgfnc/Build/Products/'
            'Debug-iphonesimulator/Demo.app')


    def get_desired_capabilities():
        desired_caps = {
            'deviceName': 'iPhone 6s Plus',
            'platformName': 'iOS',
            'platformVersion': '9.3',
            'app': PATH(path),
        }

        return desired_caps
    ```


## 使用Appium Inspector确定Element的xpath

- 启动appium
- 启动inspector
    ![appium inspector](/img/appium-inspector.png)
- 点击元素查看xpath

## 写测试程序


``` python
import unittest
from time import sleep
from appium import webdriver
import desired_capabilities


class AppiumTests(unittest.TestCase):
    def setUp(self):
        desired_caps = desired_capabilities.get_desired_capabilities()
        self.driver = webdriver.Remote(
            'http://127.0.0.1:4723/wd/hub', desired_caps)

    def tearDown(self):
        self.driver.quit()

    def xpath(self, path):
        return "/".join(["//UIAApplication[1]/UIAWindow[1]", path])

    def find(self, path):
        xpath = self.xpath(path)
        return self.driver.find_element_by_xpath(xpath)

    def check_return_to_demo(self):
        self.show_login_dlg()
        sleep(3)

    def show_login_dlg(self):
        showLoginDlgButton = self.find("UIAButton[@name='Show Login Dlg']")
        self.assertIsNotNone(showLoginDlgButton)
        showLoginDlgButton.click()
        return showLoginDlgButton

    def expressLogin(self):
        self.show_login_dlg()
        sleep(3)
        expressLoginButton = self.find("UIAButton[@name='Quick Play']")
        self.assertIsNotNone(expressLoginButton)
        expressLoginButton.click()
        return expressLoginButton

    def test_showLoginDlg(self):
        showLoginDlgButton = self.find("UIAButton[2]")
        self.assertIsNotNone(showLoginDlgButton)
        showLoginDlgButton.click()
        sleep(3)

        expressLoginButton = self.find("UIAButton[@name='Quick Play']")
        self.assertIsNotNone(expressLoginButton)
        sleep(3)

    def test_express_login(self):
        self.expressLogin()
        sleep(3)
        self.check_return_to_demo()

if __name__ == "__main__":
    suite = unittest.TestLoader().loadTestsFromTestCase(AppiumTests)
    unittest.TextTestRunner(verbosity=2).run(suite)
```

## 测试

``` bash
python demo_test.py
```


