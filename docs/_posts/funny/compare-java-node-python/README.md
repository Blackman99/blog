---
title: Java，Node，Python运行速度比较
description: Java，Node，Python运行速度比较
categories: 
  - Server-side
tags: 
  - Java
  - Javascript
  - Python
author: Zion Dotson
date: 2019-05-12
location: Beijing
---

> 首先声明我并不是想证明某一个语言比另外一个好，因为每一个语言都是图灵完备的

<!-- more -->

撰写该博客的起因是看到朋友转发了一条这样的微博：

![reason.png](/images/reason-82c06298.png)

为了保证公平，三种语言的代码逻辑都是一致的，并且都是在同一个电脑上运行的

话不多说，直接上代码，语言版本信息如下：
* Python代码（3.6.5）
* Node(JavaScript)代码（10.15.3）
* Java代码（1.8.0_201）

<Util-CodeTab
    key-prefix="solution1"
    :code-types="['python', 'node', 'java']"
    default-active-code-type="python"
/>
::: slot solution1-python
```python
import time

# 判断是否为质数
def isPrime(num):
    for i in range(2, (int)(num / 2)):
        if num % i == 0:
            return False
    return True

# 获取3出现的次数
def getThreeNumbers(num):
    res = 0
    for i in range(3, num, 2):
        n = i
        while(n > 0):
            if n % 10 == 3:
                res = res + 1
            n = int(n / 10)
    print ('3出现的次数：' + str(res))

# 获取微信ID
def getWechatID(num):
    for i in range(2, int(num / 2)):
        if num % i != 0:
            continue
        div = int(num / i)
	if !isPrime(i) or !isPrime(div):
	    continue
        res = ''
        if div > i:
            res = res + str(div) + str(i)
        else:
            res = res + str(i) + str(div)
        getThreeNumbers(int(res))
        print('微信ID：NY' + res)
        return
start = time.time()
getWechatID(707829217)
end = time.time()
print ('Time cost:' + str((end - start)))
```
:::

::: slot solution1-node
```js
console.time('Time cost')
//判断一个数是否为质数
const isPrime = num => {
  for(let i = 2; i < Math.floor(num / 2); i++){
    if(num % i == 0) return false
  }
  return true
};
//得到3出现的次数
const getThreeNumbers = num => {
  let  res = 0
  for(let i = 3; i <= num; i+=2){
    let n = i
    while(n > 0){
      if(n % 10 == 3) res++
      n = Math.floor(n / 10)
    }
  }
  return res
};
//得到微信ID
const getWechatID = num => {
  for(let i = 2; i < Math.floor(num / 2); i++){
    if(num % i != 0) continue
    let div = num / i
    if(isPrime(i) && isPrime(div)){
      let res = div > i ? `${div}${i}` : `${i}${div}`
      console.log(`3的次数：${getThreeNumbers(res)}`);
      return res
    }
  }
}
console.log(`微信ID：NY${getWechatID(707829217)}`);
console.timeEnd('Time cost')
```
:::

::: slot solution1-java
```java
public class Test {

    public static void main(String[] args) {
        long startTime=System.currentTimeMillis();
        getWechatID(707829217);
        long endTime=System.currentTimeMillis();
        System.out.println("Time cost： " + (endTime - startTime) + "ms");
    }

    //判断是否是质数
    public static boolean isPrime(int num){
        for(int i = 2; i < num / 2; i++){
            if(num % 2 == 0) return false;
        }
        return true;
    }

     //获取微信ID
    public static void getWechatID(int num){
        for(int i = 2; i < num / 2; i++){
            if(num % i != 0) continue;
            int div = num / i;
	    if(!isPrime(div) || !isPrime(i)) continue;
            String res = "";
            if(div > i){
                res = res + div + i;
            }else{
                res = res + i + div;
            }
            getThreeNumbers(Integer.parseInt(res));
            System.out.println("微信ID：NY" + res);
            return;
        }
    }

    //获取3出现的次数
    public static void getThreeNumbers(int num){
        int res = 0;
        for(int i = 3; i <= num; i += 2){
            int n = i;
            while(n > 0){
                if(n % 10 == 3){
                    res ++;
                }
                n = n / 10;
            }
        }
        System.out.println("3出现的次数：" + res);
    }
}
```
:::

### 运行结果

* Python

![image.png](/images/image-190370c0.png)

**注意一下，这里的单位是秒不是毫秒（ms），转化成毫秒就是1926298ms**

* Node

![image.png](/images/image-8c7bfab8.png)

* Java

![image.png](/images/image-ed8d3078.png)

### 分析

且不谈优化，我知道我的解法肯定有待优化，至少这里三种代码的逻辑是一致的

从结果数字来看，python的确是慢了很多，Java的确是快很多

Java：15277ms

Node：70327ms

Python：1926298ms

下面分析原因：

#### 算法复杂度

由于用到了双层循环，所以算法的时间复杂度是  


$$O(n^2)$$

其实准确的说，这里的时间复杂度是

$$O(\frac{1}{2} * \frac{1}{2} * n^2 + \frac{1}{2} * n * log_{10}n)$$  

只保留最高次项，同时忽略最高项的系数得到

$$O(n^2)$$

#### 代码编写时间

在这里具体的编写代码时间不好测量，因为我对每个语言的熟练程度不一样
但是java代码的行数最多，至少能说明键盘敲得次数更多

#### 语言特性

* 强弱类型（动静态类型）
Java是强类型语言（静态类型）
而Python，Node（JavaScript）是弱类型语言（动态类型）
这意味着Python跟Node需要在运行时作类型检查以及转换，所以速度自然会受影响

* 语言类型
Java是编译型语言
Node（JavaScript）是混合型语言（为啥是混合型，我也是Google了一下，感兴趣的自己Google）
Python是解释型语言
Python需要对代码进行读取，词法分析，解析，编译，解释和运行
Node第一次也需要如上步骤，但是执行相同的逻辑时，将会跳过读取，词法分析，解析，编译，解释，直接运行
Java则是先编译，然后直接运行

### 结论

* 语言本身并无优劣之分
* 当需要重复计算时，Python的速度的确慢很多，Java的确有优势
* 选择哪一种语言取决于你想用它做什么以及你的成本是多少，包括硬件成本，时间成本，只有根据你的具体需求才能选择对的语言去开发，不能空谈效率

---

## 算法优化

想了想还是继续优化一下算法吧，之前给出的复杂度计算有误，已经改正

### 循环边界判断优化

感谢（@[kafuly](https://hacpai.com/member/kafuly)）给出的建议
将`isPrime()`以及`getWechatID()`函数中的循环边界都改成`i <= num / 3`，这里三种语言代码稍稍有点区别：
* Java直接修改即可
`i <= num / 3`
* Node 需要调用Math.floor()
`i <= Math.floor(num / 3)`
* Python 需要调用int()函数
`i <= int(num / 3)`
优化完毕后，复杂度是：
$$O(\frac{1}{3} * \frac{1}{3} * n^2 + n*log_{10}n)$$

### 进一步思考

这里我们先计算一下复杂度里第一项与第二项的大小：

* 第一项:

$$\frac{1}{3} * \frac{1}{3} * n^2 $$

这里n的最大值是8171
所以计算次数是

$$8171 * 8171 * 1/9 \approx 7418360$$

* 第二项：

$$n * log_{10}n$$

这里的n最大值是866278171，所以计算次数为：

$$866278171 * log_{10}866278171 \approx 7742497480$$

这里可以看到第二项的计算次数占了很大的比重

### 继续优化，下面分情形探讨一下n以内的奇数序列中3出现的个数

#### n为10的整数次幂数时

* n=10

$$f(10) = 1$$

*  n = 100
3, 13, 23, 33, 43, 53, 63, 73, 83, 93 总共10次
30, 31, 32, 33, 34, 35, 36, 37, 38, 39出现10次
只保留奇数序列，且33重复计算一次，所以结果为：  

$$f(100) = 10*1+\frac{10}{2}=15$$

* n = 1000

$$10 * 15 + \frac{100}{2} = 200$$

* 可以推出：

<p style="text-align:center;font-size:20px;">f(n) = f(10<sup>n-1</sup>) * 10 + 10<sup>n-1</sup>/2</p>

#### n = 10的整数次幂的整数倍数时

* n = 300

$$3 * f(100) = 3 * 15 = 45$$

* n = 700

$$ 7 * f(100) + 100 / 2 = 7 * 15 + 50 = 155 $$

* 推出：

当系数<=3时

<p style="text-align:center;font-size:20px;">f(a*10<sup>b</sup>) = a*f(10<sup>b</sup>)</p>

当系数>3时

<p style="text-align:center;font-size:20px;">f(a*10<sup>b</sup>) = a*f(10<sup>b</sup>) + 10<sup>n-1</sup>/2</p>

#### n为一般情况时

* n = 1764

<p style="font-size:20px;padding-left:8em;">
f(1764) = f(1000) + 7*f(100) + 10*f(10)/2 + 6*f(10) + 10/2 + f(4) </br>
f(1000) = 10*f(100) + 100/2 </br>
f(100) = 10*f(10) + 10 / 2 </br>
f(10) = 1 </br>
f(4) = 1 </br>
 => f(100) = 15 </br>
 => f(1000) = 200 </br>
 => f(1764) = 200 + 7*15 + 100/2 + 6 * 1 + 5 + 1 = 367
</p>

#### 优化之后的代码

优化之后，我们的`getThreeNumbers()`方法看上去就是这样的:

<Util-CodeTab
    key-prefix="solution2"
    :code-types="['java', 'node', 'python']"
    default-active-code-type="java"
/>
::: slot solution2-java
```java
    //获取3出现的次数
    public static int getThreeNumbers(int num){
        if(num < 3){
            return 0;
        }
        if(num >= 3 && num <= 10){
            return 1;
        }
        //得到num比10的多少次方大（或相等）
        int pow = (int)Math.log10(num);
        int afterPow = (int)Math.pow(10, pow);
        //得到系数
        int times = num / afterPow;
        //得到剩余部分
        int remindPart = num % (times * afterPow);
        if(times > 3){
            return times*f(pow) + afterPow/2 + getThreeNumbers(remindPart);
        }
        return times*f(pow) + getThreeNumbers(remindPart);
    }

    //获得10的整数次幂的结果
    public static  int f(int pow){
        if(pow == 1){
            return 1;
        }
        return 10*f(pow-1) + (int)Math.pow(10, pow - 1)/2;
    }
```
:::

::: slot solution2-node
```js
//得到3出现的次数
const getThreeNumbers = num => {
  if(num < 3){
    return 0;
  }
  if(num >= 3 && num <= 10){
    return 1;
  }
  let pow = Math.floor(Math.log10(num))
  let afterPow = Math.pow(10, pow)
  let times = Math.floor(num / afterPow)
  let remindPart = num % (times * afterPow)
  if(times > 3){
    return times*f(pow) + afterPow/2 + getThreeNumbers(remindPart)
  }
  return times*f(pow) + getThreeNumbers(remindPart)
};
//获得10的整数次幂的结果
const f = pow => {
  if(pow == 1){
    return 1
  }
  return 10 * f(pow - 1) + Math.pow(10, pow-1)/2
};
```
:::

::: slot solution2-python
```python
# 获取3出现的次数
def getThreeNumbers(num):
    if num < 3:
        return 0
    if num >=3 and num <= 10:
        return 1
    pow = int(math.log10(num))
    afterPow = int(math.pow(10, pow))
    times = int(num / afterPow)
    remindPart = num % afterPow
    if times > 3:
        return times*f(pow) + afterPow/2 + getThreeNumbers(remindPart)
    return times*f(pow) + getThreeNumbers(remindPart)

# 获得10的整数次幂的结果
def f(pow):

    if pow == 1:
        return 1
    return 10*f(pow - 1) + math.pow(10, pow-1)/2
```
:::

### 优化结果

#### Java

![image.png](/images/image-3e778eb8.png)

1ms

#### Node

![image.png](/images/image-0ff98022.png)

11.6ms

#### Python

![image.png](/images/image-ba0c0889.png)

11.9ms

### 再次分析

可以看到，Java的速度优势已经体现不出来多少了，10ms的差距是感受不到的
反而这个时候java的编译速度+代码撰写速度比较长了

#### 再看复杂度

现在的总复杂度其实还是：

$$O(n^2)$$

* 第一项的计算次数还是

$$8171 * 8171 * 1/9 \approx 7418360$$

* 第二项的计算次数
因为用了递归，其实这里还可以优化，可以将递归改成非递归，这里就不继续写了

$$f(n)=log_{10}n + log_{10}(n-1) + ... + log_{10}1$$

将n = 866278171代入得：
$$f(n)\approx36$$

到这里，解题+优化的过程全部结束

### 总结
针对某一个特定的问题，总有能够优化解决这个特定问题的方法，在这种情况下选择什么语言都不是很重要了，只是用不同的工具完成相同的事情而已
