# GridBoard

* GridBoard類別
    * 屬性(property)
        * grids    以Grid類別組成的二維矩陣
        * gridOf   以Grid類別組成的關聯陣列

    * 方法(method)
        * grid(crd) 回傳指定座標的Grid物件

    * 建構(constructor)
        * (width, heigth)
            * width  棋盤格數寬度
            * height 棋盤格數高度

    * 內部類別(inner class)
        * Grid
            * 屬性(property)
                * x     橫軸座標，為整數
                * y     縱軸座標，為整數
                * crd   文字座標(例: D4)，為字串
                * board 所屬棋盤，為GridBoard物件

            * 方法(method)
                * query(dir) 回傳相對座標的Grid物件