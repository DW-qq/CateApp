import {request} from "./request";

export function getFindById(id) {
    return request({
        url:'/goodController/findById/'+id,
        params:{
            id:id,
        }
    })
}

export class Goods {
    constructor(itemInfo,sells){
        this.id=itemInfo.goodsId
        this.title = itemInfo.goodsName
        this.img = itemInfo.goodsPhoto
        this.price = itemInfo.goodsPrice
        this.sellNum = sells.sells
        this.count=0
        this.isShowsubtractBtn=false
        this.check=false
    }
}

/*
export class grangGoods {
    constructor(granItemInfo,grangSells) {
        this.id=granItemInfo.grangId
        this.title=granItemInfo.grangName
        this.img = granItemInfo.grangPhoto
        this.price = granItemInfo.grangPrice
        this.sellNum = grangSells.gsellNum
        this.count=0
        this.isShowsubtractBtn=false
    }
}
export class wineGoods {
    constructor(wineItemInfo,wineSells) {
        this.id=wineItemInfo.wineId
        this.title=wineItemInfo.wineName
        this.img = wineItemInfo.winePhoto
        this.price = wineItemInfo.winePrice
        this.sellNum = wineSells.wsellNum
        this.count=0
        this.isShowsubtractBtn=false
    }
}*/
