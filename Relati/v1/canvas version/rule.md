# relati 連結規範

use-relati-normal 使用一般連結
use-relati-remote 使用遠程連結
use-relati-remote-stable 使用遠程穩定連結
use-relati-forbid 使用連結阻斷

route 連結經過的格子為

空格 space
實質空格 space-real
視為空格 space-fake
無空格 space-none
我方符號 owner
對方符號 other

source 連結來源

一般 normal
來源 source
防盾 shield
阻斷 forbid
死亡 broken

# escape 逃脫規範

use-escape 使用逃脫

route 逃脫經過的格子為

空格 space
實質空格 space-real
視為空格 space-fake
無空格 space-none
我方符號 owner
對方符號 other

source 逃脫來源

一般 normal
來源 source
防盾 shield
阻斷 forbid
死亡 broken

# attack 攻擊行動

use-attack 使用攻擊

route 攻擊經過的格子為

空格 space
實質空格 space-real
視為空格 space-fake
無空格 space-none
我方符號 owner
對方符號 other

medium 攻擊媒介

一般 normal
來源 source
防盾 shield
阻斷 forbid
死亡 broken

bullet 攻擊耗材

一般 normal
來源 source
防盾 shield
阻斷 forbid

target 攻擊對象

一般 normal
來源 source
防盾 shield
阻斷 forbid

# defend 防禦行動

use-defend 使用防禦

source 防禦來源

一般 normal
阻斷 forbid

# bomber 轟炸行動

use-bomber 使用轟炸

source 轟炸來源

一般 normal
阻斷 forbid
防盾 shield

target 轟炸對象

一般 normal
來源 source
防盾 shield
阻斷 forbid

# pincer 夾擊機能

use-pincer 使用夾擊

source 夾擊來源

一般 normal
來源 source
防盾 shield
阻斷 forbid
死亡 broken

target 夾擊對象

一般 normal
來源 source
防盾 shield
阻斷 forbid

direction 夾擊方向

正四方 T
斜四方 X

# region 區域機能

use-region 使用區域
use-region-forbid 區域封閉
use-region-forbid-attack 區域攻擊封閉

source 區域來源

一般 normal
來源 source
防盾 shield
阻斷 forbid
死亡 broken

rule 區域規則

優先 first
佔有 final
共有 share
分隔 split