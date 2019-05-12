# 遊戲規則介紹

遊戲開始時，所有玩家輪流選擇空的格子放置符號，該符號將作為來源符號，之後的每個回合可依連結符號設置規則設置一般符號

## 勝利條件

當只剩下最後一位玩家可以設置符號時，該玩家獲得勝利

## 符號介紹

* 來源符號(Source Symbol)
    * 擁有連結發射器(launcher)的狀態
* 一般符號(Normal Symbol)
    * 擁有連結接收器(receptor)的狀態
    * 擁有連結中繼器(repeater)的狀態
* 凍結符號(Frozen Symbol)
    * 擁有連結接收器(receptor)的狀態
* 死亡符號(Broken Symbol)
    * 無任何狀態，視為空格

## 連結符號設置規則

### 一般連結符號設置規則(Relati Normal Symbol Placement Rule)

```
[S]: Source, [T]: Target, [-]: Any

relati-normal-receptor-typeF:
|-|-|-|-|-|
|-|-|S|-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-receptor-typeB:
|-|-|-|-|-|
|-|-|S|-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-receptor-typeR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|S|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-receptor-typeL:
|-|-|-|-|-|
|-|-|-|-|-|
|-|S|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-receptor-typeFR:
|-|-|-|-|-|
|-|-|-|S|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-receptor-typeFL:
|-|-|-|-|-|
|-|S|-|-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-receptor-typeBR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-|-|S|-|
|-|-|-|-|-|

relati-normal-receptor-typeBL:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|S|-|-|-|
|-|-|-|-|-|
```

以上T處必須為空格，S處必須為連結發射器或連結中繼器，符合時可放置一般符號

### 遠程一般連結符號設置規則(Relati Remote Normal Symbol Placement Rule)

```
[S]: Source, [T]: Target, [-]: Any

relati-remote-normal-receptor-typeF:
|-|-|S|-|-|
|-|-| |-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-receptor-typeB:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-| |-|-|
|-|-|S|-|-|

relati-remote-normal-receptor-typeR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T| |S|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-receptor-typeL:
|-|-|-|-|-|
|-|-|-|-|-|
|S| |T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-receptor-typeFR:
|-|-|-|-|S|
|-|-|-| |-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-receptor-typeFL:
|S|-|-|-|-|
|-| |-|-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-receptor-typeBR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-|-| |-|
|-|-|-|-|S|

relati-remote-normal-receptor-typeBL:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-| |-|-|-|
|S|-|-|-|-|
```

以上T處與空白必須為空格，S處必須為連結發射器或連結中繼器，符合時可放置一般符號

### 遠程穩定連結符號設置規則(Relati Remote Stable Symbol Placement Rule)

```
[S]: Source, [T]: Target, [-]: Any

relati-remote-stable-receptor-typeFFR-IH:
|-|-|-|S|-|
|-|-| | |-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFFR-HI:
|-|-|-|S|-|
|-|-|-| |-|
|-|-|T| |-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFFR-2T:
|-|-| |S|-|
|-|-| |-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFFL-IH:
|-|S|-|-|-|
|-| | |-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFFL-HI:
|-|S|-|-|-|
|-| |-|-|-|
|-| |T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFFL-2T:
|-|S| |-|-|
|-|-| |-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBBR-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-| | |-|
|-|-|-|S|-|

relati-remote-stable-receptor-typeBBR-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T| |-|
|-|-|-| |-|
|-|-|-|S|-|

relati-remote-stable-receptor-typeBBR-2T:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-| |-|-|
|-|-| |S|-|

relati-remote-stable-receptor-typeBBL-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-| | |-|-|
|-|S|-|-|-|

relati-remote-stable-receptor-typeBBL-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-| |T|-|-|
|-| |-|-|-|
|-|S|-|-|-|

relati-remote-stable-receptor-typeBBL-2T:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-| |-|-|
|-|S| |-|-|

relati-remote-stable-receptor-typeFRR-IH:
|-|-|-|-|-|
|-|-| | |S|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFRR-HI:
|-|-|-|-|-|
|-|-|-| |S|
|-|-|T| |-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFRR-2T:
|-|-|-|-|-|
|-|-|-|-|S|
|-|-|T| | |
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFLL-IH:
|-|-|-|-|-|
|S| | |-|-|
|-|-|T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFLL-HI:
|-|-|-|-|-|
|S| |-|-|-|
|-| |T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeFLL-2T:
|-|-|-|-|-|
|S|-|-|-|-|
| | |T|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBRR-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|-|-| | |S|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBRR-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T| |-|
|-|-|-| |S|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBRR-2T:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T| | |
|-|-|-|-|S|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBLL-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|T|-|-|
|S| | |-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBLL-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-| |T|-|-|
|S| |-|-|-|
|-|-|-|-|-|

relati-remote-stable-receptor-typeBLL-2T:
|-|-|-|-|-|
|-|-|-|-|-|
| | |T|-|-|
|S|-|-|-|-|
|-|-|-|-|-|
```

以上T處與空白必須為空格，S處必須為連結發射器或連結中繼器，符合時可放置一般符號

## 連結重置與恢復

當玩家放置一般符號後，將會把全場的一般符號的連結中繼器移除，轉為凍結符號，之後由連結發射器開始逐一將連結接收器轉為連結中繼器，恢復為一般符號

### 一般連結符號恢復規則(Relati Normal Symbol Recovery Rule)

```
[S]: Source, [T]: Target, [-]: Any

relati-normal-repeater-typeF:
|-|-|-|-|-|
|-|-|T|-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-repeater-typeB:
|-|-|-|-|-|
|-|-|T|-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-repeater-typeR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|T|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-repeater-typeL:
|-|-|-|-|-|
|-|-|-|-|-|
|-|T|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-repeater-typeFR:
|-|-|-|-|-|
|-|-|-|T|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-repeater-typeFL:
|-|-|-|-|-|
|-|T|-|-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-normal-repeater-typeBR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-|-|T|-|
|-|-|-|-|-|

relati-normal-repeater-typeBL:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|T|-|-|-|
|-|-|-|-|-|
```

以上T處必須為連結接收器，S處必須為連結發射器或連結中繼器，符合時T處獲得連結中繼器


### 遠程一般連結符號恢復規則(Relati Remote Normal Symbol Recovery Rule)

```
[S]: Source, [T]: Target, [-]: Any

relati-remote-normal-repeater-typeF:
|-|-|T|-|-|
|-|-| |-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-repeater-typeB:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-| |-|-|
|-|-|T|-|-|

relati-remote-normal-repeater-typeR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S| |T|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-repeater-typeL:
|-|-|-|-|-|
|-|-|-|-|-|
|T| |S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-repeater-typeFR:
|-|-|-|-|T|
|-|-|-| |-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-repeater-typeFL:
|T|-|-|-|-|
|-| |-|-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-normal-repeater-typeBR:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-|-| |-|
|-|-|-|-|T|

relati-remote-normal-repeater-typeBL:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-| |-|-|-|
|T|-|-|-|-|
```

以上T處必須為連結接收器，空白必須為空格，S處必須為連結發射器或連結中繼器，符合時T處獲得連結中繼器

### 遠程穩定連結符號恢復規則(Relati Remote Stable Symbol Recovery Rule)

```
[S]: Source, [T]: Target, [-]: Any

relati-remote-stable-repeater-typeFFR-IH:
|-|-|-|T|-|
|-|-| | |-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFFR-HI:
|-|-|-|T|-|
|-|-|-| |-|
|-|-|S| |-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFFR-2T:
|-|-| |T|-|
|-|-| |-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFFL-IH:
|-|T|-|-|-|
|-| | |-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFFL-HI:
|-|T|-|-|-|
|-| |-|-|-|
|-| |S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFFL-2T:
|-|T| |-|-|
|-|-| |-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBBR-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-| | |-|
|-|-|-|T|-|

relati-remote-stable-repeater-typeBBR-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S| |-|
|-|-|-| |-|
|-|-|-|T|-|

relati-remote-stable-repeater-typeBBR-2T:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-| |-|-|
|-|-| |T|-|

relati-remote-stable-repeater-typeBBL-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-| | |-|-|
|-|T|-|-|-|

relati-remote-stable-repeater-typeBBL-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-| |S|-|-|
|-| |-|-|-|
|-|T|-|-|-|

relati-remote-stable-repeater-typeBBL-2T:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-| |-|-|
|-|T| |-|-|

relati-remote-stable-repeater-typeFRR-IH:
|-|-|-|-|-|
|-|-| | |T|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFRR-HI:
|-|-|-|-|-|
|-|-|-| |T|
|-|-|S| |-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFRR-2T:
|-|-|-|-|-|
|-|-|-|-|T|
|-|-|S| | |
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFLL-IH:
|-|-|-|-|-|
|T| | |-|-|
|-|-|S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFLL-HI:
|-|-|-|-|-|
|T| |-|-|-|
|-| |S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeFLL-2T:
|-|-|-|-|-|
|T|-|-|-|-|
| | |S|-|-|
|-|-|-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBRR-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|-|-| | |T|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBRR-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S| |-|
|-|-|-| |T|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBRR-2T:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S| | |
|-|-|-|-|T|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBLL-IH:
|-|-|-|-|-|
|-|-|-|-|-|
|-|-|S|-|-|
|T| | |-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBLL-HI:
|-|-|-|-|-|
|-|-|-|-|-|
|-| |S|-|-|
|T| |-|-|-|
|-|-|-|-|-|

relati-remote-stable-repeater-typeBLL-2T:
|-|-|-|-|-|
|-|-|-|-|-|
| | |S|-|-|
|T|-|-|-|-|
|-|-|-|-|-|
```

以上T處必須為連結接收器，空白必須為空格，S處必須為連結發射器或連結中繼器，符合時T處獲得連結中繼器

## 凍結遠程連結符號的技巧

由於在放置一般符號後，全場的一般符號將暫時轉為凍結符號，再逐一恢復為一般符號，只要讓恢復失效，那麼該凍結符號將無法轉回一般符號，對方在下一回合便無法利用符號設置規則在該符號的範圍設置符號了

```
[O]: 我方, [X]: 對方, [x]: 凍結的對方, [-]: Any

|-|-|-|-|-|
|-|-|-|-|-|
|-|-|X|O|x|
|-|-|-|-|-|
|-|-|-|-|-|

|-|-|-|-|-|
|-|-|-|O|x|
|-|-|X|O|-|
|-|-|-|-|-|
|-|-|-|-|-|

|-|-|-|-|-|
|-|-|-|O|x|
|-|-|X|-|O|
|-|-|-|-|-|
|-|-|-|-|-|

|-|-|-|-|-|
|-|-|O|-|x|
|-|-|X|O|-|
|-|-|-|-|-|
|-|-|-|-|-|

|-|-|-|-|x|
|-|-|-|O|-|
|-|-|X|-|-|
|-|-|-|-|-|
|-|-|-|-|-|
```