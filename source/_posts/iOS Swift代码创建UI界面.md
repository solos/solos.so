---
title: iOS Swift使用代码创建UI界面
date: 2016-07-03 17:21:40
comments: true
tag: 
  - iOS
  - Swift
categories:
    - iOS
---

## Views

- UILabel

``` Swift
    let labelColor = UIColor.init(red:0.33, green:0.33, blue:0.33, alpha:1.00)
    let labelFont = UIFont.systemFontOfSize(15)
    self.loginTipsLabel.textAlignment = .Left
    self.loginTipsLabel.text = "Tips")
    self.loginTipsLabel.textColor = labelColor
    self.loginTipsLabel.font = labelFont
    self.loginTipsLabel.translatesAutoresizingMaskIntoConstraints = false

    self.addSubview(self.loginTipsLabel)
```

- UIButton

``` Swift

    let buttonColor = UIColor.init(red: 0.0, green: 0.478, blue: 1.0, alpha: 1.0)
    let buttonFont = UIFont.systemFontOfSize(18)
    let title = "Login"
    self.loginButton.setTitle(title, forState: .Normal)
    self.loginButton.titleLabel?.font = buttonFont
    self.loginButton.backgroundColor = buttonColor
    self.loginButton.addTarget(self, action:#selector(self.login),
                               forControlEvents: .TouchUpInside)
    self.loginButton.layer.cornerRadius = cornerRadius
    self.loginButton.translatesAutoresizingMaskIntoConstraints = false

    self.addSubview(self.loginButton)
```

- ImageButton

``` Swift
    let logo: UIImage = UIImage(named: util.getImage("logo"))!
    self.logoButton.backgroundColor = UIColor.whiteColor()
    let imageEdgeInsets = UIEdgeInsetsMake(5, 5, 5, 5)
    self.logoButton.imageEdgeInsets = imageEdgeInsets
    self.logoButton.setImage(logo, forState: .Normal)
    self.logoButton.setImage(logo, forState: .Highlighted)
    self.logoButton.setImage(logo, forState: .Selected)
    self.logoButton.translatesAutoresizingMaskIntoConstraints = false // Autolayout

    self.addSubview(self.logoButton)
```

- activityIndicator

``` Swift
    self.activityIndicator.frame = CGRectMake(0.0, 0.0, 40.0, 40.0);
    self.activityIndicator.center = self.view.center
    self.activityIndicator.hidesWhenStopped = true
    self.activityIndicator.activityIndicatorViewStyle = .Gray
    self.view.addSubview(self.activityIndicator)
    self.activityIndicator.startAnimating()
    //self.activityIndicator.stopAnimating()
```
