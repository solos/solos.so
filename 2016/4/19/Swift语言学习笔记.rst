public: yes
tags: [swift, 学习笔记]
summary: 

Swift语言学习笔记
==============================


- 如何声明常量、变量

    .. code-block:: swift

        let count = 0   // let声明常量
        var summary = 0 // var声明变量
        var foo = 10, bar = 20 // 单行中声明多个变量或者常量使用逗号分隔
        var message: String // 类型在变量或者常量名称后面标注，中间用冒号分隔


- 如何打印变量或者常量的值

    .. code-block:: swift

        let msg = "hello, world!"
        print(msg)


- 注释

    - 单行注释使用//，多行注释使用 ... , 可以嵌套。

- 数据类型
    - 整型

        - Int8    有符号整型
        - UInt8   无符号整型
        - Int     有符号整型
        - UInt    无符号整型
        - 0b10001 二进制
        - 0x20    八进制
        - 0x11    十六进制

    - 浮点数

        - Double  64位浮点数
        - Float   32位浮点数

    - 字符串


    - 布尔值

        - true
        - false


    - 元组
        let http404Error = (404, "Not Found")

    - 可选类型 ?
        有值或者没有值

    - nil
        nil表示没有值

    - 隐式解析可选类型 !
        String!
        
    - 类型别名
        typealias Number = UInt

- 可选绑定

    .. code-block:: swift

        if let constantName = someOptional {
            statements
        }
        

- 数组

    .. code-block:: swift

        var arr = [Int]() //创建数组
        arr.append(10)  // 向数组中添加元素
        print("arr is of type [Int] with \(arr.count) items.")
        // arr is of type [Int] with 1 items.
        var items = [Int](count: 10, repeatedValue:1)  // 创建一个大小为10的数组，默认都是1
        var shoppingList: [String] = ["Eggs", "Milk"] // shoppingList 已经被构造并且拥有两个初始项。
        print(shoppingList[0])
        shoppingList.append("Flour")
        shoppingList += ["Baking Powder"]
        shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
        shoppingList[4...6] = ["Bananas", "Apples"]
        shoppingList.insert("Maple Syrup", atIndex: 0)
        shoppingList.removeAtIndex(0)
        shoppingList.removeLast(0)
        
        for item in shoppingList {
            print item
        }
        for (index, value) in shoppingList.enumerate() {
            print("Item \(String(index + 1)): \(value)")
        }


- 集合

    .. code-block:: swift
        
        var letters = Set<Character>()  // 声明一个集合
        letters.insert("a")  // 往集合中添加值
        letters = []  // 集合置空
        var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
        favoriteGenres.remove("Rock")
        if favoriteGenres.contains("Funk"){
            print("Funk in favoriteGenres")
        }

        for genre in favoriteGenres {
            print("\(genre)")
        }

    - 其它方法

        - 使用intersect(_:)方法根据两个集合中都包含的值创建的一个新的集合。
        - 使用exclusiveOr(_:)方法根据在一个集合中但不在两个集合中的值创建一个新的集合。
        - 使用union(_:)方法根据两个集合的值创建一个新的集合。
        - 使用subtract(_:)方法根据不在该集合中的值创建一个新的集合。
        - 使用“是否相等”运算符(==)来判断两个集合是否包含全部相同的值。
        - 使用isSubsetOf(_:)方法来判断一个集合中的值是否也被包含在另外一个集合中。
        - 使用isSupersetOf(_:)方法来判断一个集合中包含另一个集合中所有的值。
        - 使用isStrictSubsetOf(_:)或者isStrictSupersetOf(_:)方法来判断一个集合是否是另外一个集合的子集合或者父集合并且两个集合并不相等。
        - 使用isDisjointWith(_:)方法来判断两个集合是否不含有相同的值(是否没有交集)。


- 字典

    .. code-block:: swift
        
        var namesOfIntegers = [Int: String]() // 创建一个空字典
        namesOfIntegers[16] = "sixteen"
        namesOfIntegers = [:]
        var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"] // 使用字典字面量创建字典
        var d = ["foo": "bar"]
        d["foo"] = nil

        if let removedValue = airports.removeValueForKey("DUB") {
            print("The removed airport's name is \(removedValue).")
        } else {
            print("The airports dictionary does not contain a value for DUB.")
        }
        for (airportCode, airportName) in airports {
            print("\(airportCode): \(airportName)")
        }
        for airportCode in airports.keys {
            print("Airport code: \(airportCode)")
        }
        for airportName in airports.values {
            print("Airport name: \(airportName)")
        }
        let airportCodes = [String](airports.keys)
        let airportNames = [String](airports.values)


- 控制流

    - for

        .. code-block:: swift

            for index in 1...5 {
                print("\(index) times 5 is \(index * 5)")
            }

            let names = ["Anna", "Alex", "Brian", "Jack"]
            for name in names {
                print("Hello, \(name)!")
            }

            let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
            for (animalName, legCount) in numberOfLegs {
                print("\(animalName)s have \(legCount) legs")
            }


    - while

        .. code-block:: swift

            var i = 0
            var length = 10
            while i < length {
                print (i)
                i++
            } 

    - repeat-while (do-while)

        .. code-block:: swift

            var i = 0
            var length = 10
            repeat {
                print(i)
                i++
            } while i < 10;

    - if

        .. code-block:: swift

            var i = 0
            if i == 0 {
                print("i = 0")
            } else if i > 0 {
                print("i > 0")
            } else {
                print("i < 0")
            }


    - switch

        .. code-block:: swift

            let someCharacter: Character = "e"

            switch someCharacter {
                case "a", "e", "i", "o", "u":
                    print("\(someCharacter) is a vowel")
                case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
                "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
                    print("\(someCharacter) is a consonant")
                default:
                    print("\(someCharacter) is not a vowel or a consonant")
            }

            let approximateCount = 62
            let countedThings = "moons orbiting Saturn"
            var naturalCount: String
            switch approximateCount {
                case 0:
                    naturalCount = "no"
                case 1..<5:
                    naturalCount = "a few"
                case 5..<12:
                    naturalCount = "several"
                case 12..<100:
                    naturalCount = "dozens of"
                case 100..<1000:
                    naturalCount = "hundreds of"
                default:
                    naturalCount = "many"
            }
            print("There are \(naturalCount) \(countedThings).")

            let somePoint = (1, 1)
            switch somePoint {
                case (0, 0):
                    print("(0, 0) is at the origin")
                case (_, 0):
                    print("(\(somePoint.0), 0) is on the x-axis")
                case (0, _):
                    print("(0, \(somePoint.1)) is on the y-axis")
                case (-2...2, -2...2):
                    print("(\(somePoint.0), \(somePoint.1)) is inside the box")
                default:
                    print("(\(somePoint.0), \(somePoint.1)) is outside of the box")
            }

            let anotherPoint = (2, 0)
            switch anotherPoint {
                case (let x, 0):
                    print("on the x-axis with an x value of \(x)")
                case (0, let y):
                    print("on the y-axis with a y value of \(y)")
                case let (x, y):
                    print("somewhere else at (\(x), \(y))")
            }

            let yetAnotherPoint = (1, -1)
            switch yetAnotherPoint {
                case let (x, y) where x == y:
                    print("(\(x), \(y)) is on the line x == y")
                case let (x, y) where x == -y:
                    print("(\(x), \(y)) is on the line x == -y")
                case let (x, y):
                    print("(\(x), \(y)) is just some arbitrary point")
            }

    - break


        .. code-block:: swift

            let numberSymbol: Character = "三"  // 简体中文里的数字 3
            var possibleIntegerValue: Int?
            switch numberSymbol {
                case "1", "١", "一", "๑":
                    possibleIntegerValue = 1
                case "2", "٢", "二", "๒":
                    possibleIntegerValue = 2
                case "3", "٣", "三", "๓":
                    possibleIntegerValue = 3
                case "4", "٤", "四", "๔":
                    possibleIntegerValue = 4
                default:
                    break
            }
            if let integerValue = possibleIntegerValue {
                print("The integer value of \(numberSymbol) is \(integerValue).")
            } else {
                print("An integer value could not be found for \(numberSymbol).")
            }

        
    - fallthrough

        .. code-block:: swift

            let integerToDescribe = 5
            var description = "The number \(integerToDescribe) is"
            switch integerToDescribe {
                case 2, 3, 5, 7, 11, 13, 17, 19:
                    description += " a prime number, and also"
                    fallthrough
                default:
                    description += " an integer."
            }
            print(description)

    - guard

        .. code-block:: swift

            func greet(person: [String: String]) {
                guard let name = person["name"] else {
                    return
                }
                print("Hello \(name)")

                guard let location = person["location"] else {
                    print("I hope the weather is nice near you.")
                    return
                }
                print("I hope the weather is nice in \(location).")
            }
            greet(["name": "John"])


- 函数

    .. code-block:: swift

        func sayHello(personName: String, alreadyGreeted: Bool) -> String {
            if alreadyGreeted {
                return sayHelloAgain(personName)
            } else {
                return sayHello(personName)
            }
        }
        print(sayHello("Tim", alreadyGreeted: true))
        // prints "Hello again, Tim!" 

        func minMax(array: [Int]) -> (min: Int, max: Int) {
            var currentMin = array[0]
            var currentMax = array[0]
            for value in array[1..<array.count] {
                if value < currentMin {
                    currentMin = value
                } else if value > currentMax {
                    currentMax = value
                }
            }
            return (currentMin, currentMax)
        }
        let bounds = minMax([8, -6, 2, 109, 3, 71])
        print("min is \(bounds.min) and max is \(bounds.max)")
        // prints "min is -6 and max is 109"

        func sayHello(to person: String, and anotherPerson: String) -> String {
            return "Hello \(person) and \(anotherPerson)!"
        }
        print(sayHello(to: "Bill", and: "Ted"))
        // prints "Hello Bill and Ted!"


        func someFunction(parameterWithDefault: Int = 12) {
            // function body goes here
            // if no arguments are passed to the function call,
            // value of parameterWithDefault is 12
        }
        someFunction(6) // parameterWithDefault is 6

        func arithmeticMean(numbers: Double...) -> Double {
            var total: Double = 0
            for number in numbers {
                total += number
            }
            return total / Double(numbers.count)
        }
        arithmeticMean(1, 2, 3, 4, 5)


- 枚举类型

    .. code-block:: swift

        enum CompassPoint {
            case North
            case South
            case East
            case West
        }

        enum Planet {
            case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
        }

        var directionToHead = CompassPoint.West
        directionToHead = .East


- 类和结构体

    - 结构体和枚举是值类型
        值类型被赋予给一个变量、常量或者被传递给一个函数的时候，其值会被拷贝。
        let vga = Resolution(width:640, height: 480)

    - 类是引用类型
        与值类型不同，引用类型在被赋予到一个变量、常量或者被传递到一个函数时，其值不会被拷贝。因此，引用的是已存在的实例本身而不是其拷贝。


- 属性

    - 存储属性

        
        .. code-block:: swift

            struct FixedLengthRange {
                var firstValue: Int
                let length: Int
            }
            var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
            // 该区间表示整数0，1，2
            rangeOfThreeItems.firstValue = 6
            // 该区间现在表示整数6，7，8

    
        常量结构体的存储属性不可以修改

    - 延迟存储属性

        .. code-block:: swift

            class DataImporter {
                var fileName = "data.txt"
                // 这里会提供数据导入功能
            }

            class DataManager {
                lazy var importer = DataImporter()
                var data = [String]()
                // 这里会提供数据管理功能
            }

            let manager = DataManager()
            manager.data.append("Some data")
            manager.data.append("Some more data")
            // DataImporter 实例的 importer 属性还没有被创建
            print(manager.importer.fileName)
            // DataImporter 实例的 importer 属性现在被创建了
            // 输出 "data.txt”

            注意:
            如果一个被标记为 lazy 的属性在没有初始化时就同时被多个线程访问，则无法保证该属性只会被初始化一次。

    - 计算属性

        .. code-block:: swift
        
            struct Point {
                var x = 0.0, y = 0.0
            }
            struct Size {
                var width = 0.0, height = 0.0
            }
            struct Rect {
                var origin = Point()
                var size = Size()
                var center: Point {
                    get {
                        let centerX = origin.x + (size.width / 2)
                        let centerY = origin.y + (size.height / 2)
                        return Point(x: centerX, y: centerY)
                    }
                    set(newCenter) {
                        origin.x = newCenter.x - (size.width / 2)
                        origin.y = newCenter.y - (size.height / 2)
                    }
                }
            }
            var square = Rect(origin: Point(x: 0.0, y: 0.0),
                size: Size(width: 10.0, height: 10.0))
            let initialSquareCenter = square.center
            square.center = Point(x: 15.0, y: 15.0)
            print("square.origin is now at (\(square.origin.x), \(square.origin.y))")
            // 输出 "square.origin is now at (10.0, 10.0)”


    - 只读计算属性

        .. code-block:: swift

            struct Cuboid {
                var width = 0.0, height = 0.0, depth = 0.0
                var volume: Double {
                    return width * height * depth
                }
            }
            let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
            print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
            // 输出 "the volume of fourByFiveByTwo is 40.0"

    - 属性观察器

        属性观察器监控和响应属性值的变化，每次属性被设置值的时候都会调用属性观察器，即使新值和当前值相同的时候也不例外。
        可以为除了延迟存储属性之外的其他存储属性添加属性观察器，也可以通过重写属性的方式为继承的属性（包括存储属性和计算属性）添加属性观察器。
        你不必为非重写的计算属性添加属性观察器，因为可以通过它的 setter 直接监控和响应值的变化。
        可以为属性添加如下的一个或全部观察器：
        
            - willSet 在新的值被设置之前调用
            - didSet 在新的值被设置之后立即调用

        .. code-block:: swift

            class StepCounter {
                var totalSteps: Int = 0 {
                    willSet(newTotalSteps) {
                        print("About to set totalSteps to \(newTotalSteps)")
                    }
                    didSet {
                        if totalSteps > oldValue  {
                            print("Added \(totalSteps - oldValue) steps")
                        }
                    }
                }
            }
            let stepCounter = StepCounter()
            stepCounter.totalSteps = 200
            // About to set totalSteps to 200
            // Added 200 steps
            stepCounter.totalSteps = 360
            // About to set totalSteps to 360
            // Added 160 steps
            stepCounter.totalSteps = 896
            // About to set totalSteps to 896
            // Added 536 steps

    - 全局变量和局部变量

        计算属性和属性观察器所描述的功能也可以用于全局变量和局部变量。全局变量是在函数、方法、闭包或任何类型之外定义的变量。局部变量是在函数、方法或闭包内部定义的变量。

        注意:
            - 全局的常量或变量都是延迟计算的，跟延迟存储属性相似，不同的地方在于，全局的常量或变量不需要标记lazy修饰符。
            - 局部范围的常量或变量从不延迟计算。

    - 类型属性

        实例属性属于一个特定类型的实例，每创建一个实例，实例都拥有属于自己的一套属性值，实例之间的属性相互独立。也可以为类型本身定义属性，无论创建了多少个该类型的实例，这些属性都只有唯一一份。这种属性就是类型属性。

        .. code-block:: swift

            struct SomeStructure {
                static var storedTypeProperty = "Some value."
                static var computedTypeProperty: Int {
                    return 1
                }
            }

            enum SomeEnumeration {
                static var storedTypeProperty = "Some value."
                static var computedTypeProperty: Int {
                    return 6
                }
            }

            class SomeClass {
                static var storedTypeProperty = "Some value."
                static var computedTypeProperty: Int {
                    return 27
                }
                class var overrideableComputedTypeProperty: Int {
                    return 107
                }
            }

            print(SomeStructure.storedTypeProperty)
            // 输出 "Some value."
            SomeStructure.storedTypeProperty = "Another value."
            print(SomeStructure.storedTypeProperty)
            // 输出 "Another value.”
            print(SomeEnumeration.computedTypeProperty)
            // 输出 "6"
            print(SomeClass.computedTypeProperty)
            // 输出 "27"

    - 方法

        - 实例方法

            .. code-block:: swift

                class Counter {
                    var count = 0
                    func increment() {
                        ++count
                    }
                    func incrementBy(amount: Int) {
                        count += amount
                    }
                    func reset() {
                        count = 0
                    }
                }


            结构体和枚举是值类型。默认情况下，值类型的属性不能在它的实例方法中被修改。

            - 在实例方法中修改值类型

                .. code-block:: swift

                    struct Point {
                        var x = 0.0, y = 0.0
                        mutating func moveByX(deltaX: Double, y deltaY: Double) {
                            x += deltaX
                            y += deltaY
                        }
                    }
                    var somePoint = Point(x: 1.0, y: 1.0)
                    somePoint.moveByX(2.0, y: 3.0)
                    print("The point is now at (\(somePoint.x), \(somePoint.y))")
                    // 打印输出: "The point is now at (3.0, 4.0)"

        - 类型方法

            .. code-block:: swift

                class Player {
                    var tracker = LevelTracker()
                    let playerName: String
                    func completedLevel(level: Int) {
                        LevelTracker.unlockLevel(level + 1)
                        tracker.advanceToLevel(level + 1)
                    }
                    init(name: String) {
                        playerName = name
                    }
                }

                var player = Player(name: "Argyrios")
                player.completedLevel(1)
                print("highest unlocked level is now \(LevelTracker.highestUnlockedLevel)")
                // 打印输出：highest unlocked level is now 2

            如果你创建了第二个玩家，并尝试让他开始一个没有被任何玩家解锁的等级，那么试图设置玩家当前等级将会失败：

            .. code-block:: swift

                player = Player(name: "Beto")
                if player.tracker.advanceToLevel(6) {
                    print("player is now on level 6")
                } else {
                    print("level 6 has not yet been unlocked")
                }
                // 打印输出：level 6 has not yet been unlocked

- 继承

    - 基类和子类

        .. code-block:: swift

            class Vehicle {
                var currentSpeed = 0.0
                var description: String {
                    return "traveling at \(currentSpeed) miles per hour"
                }
                func makeNoise() {
                    // 什么也不做-因为车辆不一定会有噪音
                }
            }

            class Bicycle: Vehicle {
                var hasBasket = false
            }

            class Train: Vehicle {
                override func makeNoise() {
                    print("Choo Choo")
                }
            }

            class Car: Vehicle {
                var gear = 1
                override var description: String {
                    return super.description + " in gear \(gear)"
                }
            }

            let car = Car()
            car.currentSpeed = 25.0
            car.gear = 3
            print("Car: \(car.description)")
            // Car: traveling at 25.0 miles per hour in gear 3

            class AutomaticCar: Car {
                override var currentSpeed: Double {
                    didSet {
                        gear = Int(currentSpeed / 10.0) + 1
                    }
                }
            }

            let automatic = AutomaticCar()
            automatic.currentSpeed = 35.0
            print("AutomaticCar: \(automatic.description)")
            // AutomaticCar: traveling at 35.0 miles per hour in gear 4

    - 防止重写

        你可以通过把方法，属性或下标标记为final来防止它们被重写，只需要在声明关键字前加上final修饰符即可（例如：final var，final func，final class func，以及final subscript）。  
        如果你重写了final方法，属性或下标，在编译时会报错。在类扩展中的方法，属性或下标也可以在扩展的定义里标记为 final 的。  
        你可以通过在关键字class前添加final修饰符（final class）来将整个类标记为 final 的。这样的类是不可被继承的，试图继承这样的类会导致编译报错。
