const htmlEl = document.documentElement;
const Caches = {};
const get = async (url)=>{
    if(Caches[url]) return Caches[url];
    htmlEl.setAttribute('data-no-touch',true);
    const f = await fetch(url);
    const data = await f.json();
    Caches[url] = data;
    htmlEl.setAttribute('data-no-touch',false);
    return data;
}

const Images = {};
const loadImage = (src,onOver)=>{
    if(Images[src]) return onOver(Images[src]);
    const el = new Image();
    el.crossOrigin = 'Anonymous';
    el.src = src;
    el.onload = ()=>{
        onOver(el)
        Images[src] = el;
    }
};


const APIURL = `https://lab.magiconch.com/api/bangumi/`;
const ImageURL = `https://api.anitabi.cn/bgm/`;

const getCoverURLById = id => `${ImageURL}anime/${id}/cover.jpg`;

class AnimeGrid {
    constructor({el,title,key,typeTexts,col,row,urlExt = ''}){
        this.el = el;

        this.key = key;
        const types = typeTexts.trim().split(/\n+/g)
        this.types = types;
        this.bangumis = [];
        this.urlExt = urlExt;

        this.title = title;

        this.row = row;
        this.col = col;

        this.getBangumisFormLocalStorage();


        el.innerHTML = this.generatorHTML({
            title,
            urlExt,
        });

        this.currentBangumiIndex = null;
        this.searchBoxEl = el.querySelector('.search-bangumis-box');
        this.formEl = el.querySelector('form');
        this.searchInputEl = this.formEl[0];
        this.animeListEl = el.querySelector('.anime-list');


        this.animeListEl.onclick = e=>{
            const id = +e.target.getAttribute('data-id');
            if(this.currentBangumiIndex === null) return;
            this.setCurrentBangumi(id);
        };
        this.formEl.onsubmit = async e=>{
            if(e) e.preventDefault();
        
            const keyword = this.searchInputEl.value.trim();
        
            this.searchFromAPI(keyword);
        }

        const canvas = el.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        this.canvas = canvas;
        this.ctx = ctx;

        const bodyMargin = 20;



        const contentWidth = col * 120;
        const contentHeight = row * 187;

        const colWidth = Math.ceil(contentWidth / col);
        const rowHeight = Math.ceil(contentHeight / row);
        const titleHeight = 40;
        const fontHeight = 24;

        this.fontHeight = fontHeight;

        const width = contentWidth + bodyMargin * 2;
        const height = contentHeight + bodyMargin * 2 + titleHeight;
        const scale = 2;


        canvas.width = width * scale;
        canvas.height = height * scale;

        ctx.fillStyle = '#FFF';
        ctx.fillRect(
            0,0, 
            width * scale,height * scale
        );

        // const copyRightText = [
        //     '源码来自@卜卜口',
        //     '动画信息来自番组计划',
        //     '禁止商业、盈利用途'
        // ].join(' · ');

        const copyRightText = [
        ].join('');


        ctx.textAlign = 'left';
        ctx.font = `${9 * scale}px sans-serif`;
        ctx.fillStyle = '#AAA';
        ctx.textBaseline = 'middle';
        ctx.lineCap  = 'round';
        ctx.lineJoin = 'round';
        ctx.fillText(
            copyRightText,
            19 * scale,
            (height - 10) * scale
        );

        ctx.scale(scale,scale);
        ctx.translate(
            bodyMargin,
            bodyMargin + titleHeight
        );

        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#222';
        ctx.textAlign = 'center';


        ctx.save();


        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(title,contentWidth / 2, -26 );




        ctx.lineWidth = 2;
        ctx.strokeStyle = '#222';

        for(let y = 0;y <= row;y++){

            ctx.beginPath();
            ctx.moveTo(0,y * rowHeight);
            ctx.lineTo(contentWidth,y * rowHeight);
            ctx.globalAlpha = 1;
            ctx.stroke();

            if( y === row) break;
            ctx.beginPath();
            ctx.moveTo(0,y * rowHeight + rowHeight - fontHeight);
            ctx.lineTo(contentWidth,y * rowHeight + rowHeight - fontHeight);
            ctx.globalAlpha = .2;
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        for(let x = 0;x <= col;x++){
            ctx.beginPath();
            ctx.moveTo(x * colWidth,0);
            ctx.lineTo(x * colWidth,contentHeight);
            ctx.stroke();
        }
        ctx.restore();


        for(let y = 0;y < row;y++){

            for(let x = 0;x < col;x++){
                const top = y * rowHeight;
                const left = x * colWidth;
                const type = types[y * col + x];
                ctx.fillText(
                    type,
                    left + colWidth / 2,
                    top + rowHeight - fontHeight / 2,
                );
            }
        }


        const imageWidth = colWidth - 2;
        const imageHeight = rowHeight - fontHeight;
        const canvasRatio = imageWidth / imageHeight;


        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.colWidth = colWidth;
        this.rowHeight = rowHeight;
        this.canvasRatio = canvasRatio;
        
        ctx.font = 'bold 32px sans-serif';
        
        this.outputEl = el.querySelector('.output-box');
        this.outputImageEl = this.outputEl.querySelector('img');


        
        canvas.onclick = e=>{
            const rect = canvas.getBoundingClientRect();
            const { clientX, clientY } = e;
            const x = Math.floor(((clientX - rect.left) / rect.width * width - bodyMargin) / colWidth);
            const y = Math.floor(((clientY - rect.top) / rect.height * height  - bodyMargin - titleHeight) / rowHeight);
        
            if(x < 0) return;
            if(x >= col) return;
            if(y < 0) return;
            if(y > row) return;
        
            const index = y * col + x;
        
            if(index >= col * row) return;
        
            this.openSearchBox(index);
        }
        
        el.onclick = e=>{
            const { target } = e;
            const action = target.getAttribute('action');
            if(!action) return;
            
            const actionFunc = this[action];
            if(!actionFunc) return;

            actionFunc.call(this);
        }
        
        this.drawBangumis();

    }
    generatorHTML({title}){
        return `<canvas></canvas>
<div class="ctrl-box">
    <a class="generator-btn ui-btn" action="downloadImage">生成${title}</a>
</div>
<div class="search-bangumis-box ui-shadow" data-show="false">
    <div class="content-box">
        <form>
            <input type="text" placeholder="输入关键词、回车查找动画">
        </form>
        <div class="anime-list"></div>
        <div class="foot">
            <a class="close ui-btn" action="searchFromBangumi">在番组计划搜索</a>
            <a class="close ui-btn" action="setInputText">没找到，就用搜索框里的文字了</a>
            <a class="close ui-btn" action="setNull">重设为空</a>
            <a class="close ui-btn current" action="closeSearchBox">关闭选框</a>
        </div>
    </div>
</div>
<div class="output-box ui-shadow" data-show="false">
    <div class="content-box">
        <h3>生成好啦~</h3>
        <img>
        <div class="body">
            <p>在 微博、微信、企鹅 应用中，请长按图片进行保存</p>
        </div>
        <div class="foot">
            <a class="close ui-btn current" action="closeOutput">关闭</a>
        </div>
    </div>
</div>`;
    }
    generatorDefaultBangumis(){
        this.bangumis = new Array(this.types.length).fill(null);
    }
    getBangumiIdsText(){
        return this.bangumis.map(i=>String( i || 0 )).join(',')
    }

    getBangumisFormLocalStorage(){
        
        if(!window.localStorage) return this.generatorDefaultBangumis();

        const bangumisText = localStorage.getItem(this.key);

        if(!bangumisText) return this.generatorDefaultBangumis();

        this.bangumis = bangumisText.split(/,/g).map(i=>/^\d+$/.test(i) ? +i : i);
    }
    saveBangumisToLocalStorage(){
        localStorage.setItem(this.key,this.getBangumiIdsText());
    }



    openSearchBox(index){
        this.currentBangumiIndex = index;
        htmlEl.setAttribute('data-no-scroll',true);
        this.searchBoxEl.setAttribute('data-show',true);
        
        this.searchInputEl.focus();

        const value = this.bangumis[index] || '';

        if(!/^\d+$/.test(value)){
            this.searchInputEl.value = value;
        }
        this.searchFromAPI();
    }
    closeSearchBox(){
        htmlEl.setAttribute('data-no-scroll',false);
        this.searchBoxEl.setAttribute('data-show',false);
        this.searchInputEl.value = '';
    }
    
    setInputText(){
        const text = this.searchInputEl.value.trim().replace(/,/g,'');
        if(!text) return this.searchInputEl.focus();
        this.setCurrentBangumi(text);
    }
    setNull(){
        this.setCurrentBangumi(null);
    }

    setCurrentBangumi(value){
        if(this.currentBangumiIndex === null) return;

        this.bangumis[this.currentBangumiIndex] = value;
        this.saveBangumisToLocalStorage();
        this.drawBangumis();

        this.closeSearchBox();
    }


    async searchFromBangumiByKeyword(keyword){
        let url = `${APIURL}anime/onlines`;
        if(keyword) url = url + `?keyword=${encodeURIComponent(keyword)}`;

        const animes = await get(url);
        this.resetAnimeList(animes);
    }

    searchFromBangumi(){
        const keyword = this.searchInputEl.value.trim();
        if(!keyword) return this.searchInputEl.focus();

        this.searchFromBangumiByKeyword(keyword);
    }


    async searchFromAPI(keyword){
        let url = `${APIURL}animes`;
        if(keyword) url = url + `?keyword=${encodeURIComponent(keyword)}`;

        const animes = await get(url);
        this.resetAnimeList(animes);
    }

    resetAnimeList(animes){
        this.animeListEl.innerHTML = animes.map(anime=>{
            return `<div class="anime-item" data-id="${anime.id}"><img src="${getCoverURLById(anime.id)}" crossOrigin="Anonymous"><h3>${anime.title}</h3></div>`;
        }).join('');
    }

    drawBangumis(){
        const { 
            col,row, 
            colWidth,rowHeight, 
            imageWidth,imageHeight,
            bangumis,
            canvasRatio,
            ctx,
        } = this;

        for(let index in bangumis){
            const id = bangumis[index];
            const x = index % col;
            const y = Math.floor(index / col);

            if(!id){
                ctx.save();
                ctx.fillStyle = '#FFF';
                ctx.fillRect(
                    x * colWidth + 1,
                    y * rowHeight + 1, 
                    imageWidth,
                    imageHeight,
                )
                ctx.fillStyle = '#d3d3d3';
                ctx.fillRect(
                    x * colWidth + 1,
                    y * rowHeight + imageHeight - 1, 
                    imageWidth,
                    2,
                )
                ctx.restore();
                continue;
            }
    
            if(!/^\d+$/.test(id)){ // 非数字
    
                ctx.save();
                ctx.fillStyle = '#FFF';
                ctx.fillRect(
                    x * colWidth + 1,
                    y * rowHeight + 1, 
                    imageWidth,
                    imageHeight,
                )
                ctx.restore();
                ctx.fillText(
                    id,
                    (x + 0.5) * colWidth,
                    (y + 0.5) * rowHeight - 4, 
                    imageWidth - 10,
                );
                continue;
            }
            
            loadImage(getCoverURLById(id),el=>{
                const { naturalWidth, naturalHeight } = el;
                const originRatio = el.naturalWidth / el.naturalHeight;
    
                let sw, sh, sx, sy;
                if(originRatio < canvasRatio){
                    sw = naturalWidth
                    sh = naturalWidth / imageWidth * imageHeight;
                    sx = 0
                    sy = (naturalHeight - sh)
                }else{
                    sh = naturalHeight
                    sw = naturalHeight / imageHeight * imageWidth;
                    sx = (naturalWidth - sw)
                    sy = 0
                }
    
                ctx.drawImage(
                    el,
                    
                    sx, sy,
                    sw, sh, 
    
                    x * colWidth + 1,
                    y * rowHeight + 1, 
                    imageWidth,
                    imageHeight,
                );
            })
        }
    }
    
    
    showOutput(imgURL){
        this.outputImageEl.src = imgURL;
        this.outputEl.setAttribute('data-show',true);
        htmlEl.setAttribute('data-no-scroll',true);
    }
    closeOutput(){
        this.outputEl.setAttribute('data-show',false);
        htmlEl.setAttribute('data-no-scroll',false);
    }
    
    downloadImage(){
        const fileName = `${this.title}.jpg`;
        const mime = 'image/jpeg';
        const imgURL = this.canvas.toDataURL(mime,0.8);
        const linkEl = document.createElement('a');
        linkEl.download = fileName;
        linkEl.href = imgURL;
        linkEl.dataset.downloadurl = [ mime, fileName, imgURL ].join(':');
        document.body.appendChild(linkEl);
        linkEl.click();
        document.body.removeChild(linkEl);
        new Image().src = `${APIURL}grid?ids=${this.getBangumiIdsText()}`;
    
       this.showOutput(imgURL);
    }

}


// 提前准备一份缓存
Caches[`${APIURL}animes`] = [
	{
		"id": 10380,
		"title": "命运石之门"
	},
    {
        "id": 265,
        "title": "新世纪福音战士"
    },
    {
        "id": 326,
        "title": "攻壳机动队 S.A.C. 2nd GIG"
    },
    {
        "id": 311,
        "title": "千与千寻"
    },
    {
        "id": 1773,
        "title": "死亡笔记"
    },
    {
        "id": 3822,
        "title": "虫师"
    },
    {
        "id": 253,
        "title": "星际牛仔"
    },
    {
        "id": 325285,
        "title": "奇巧计程车"
    },
    {
        "id": 3425,
        "title": "火影忍者"
    },
    {
        "id": 975,
        "title": "海贼王"
    },
    {
        "id": 899,
        "title": "名侦探柯南"
    },
    {
        "id": 11834,
        "title": "银魂'"
    },
    {
        "id": 1600,
        "title": "死神"
    },
    {
        "id": 1428,
        "title": "钢之炼金术师 FULLMETAL ALCHEMIST"
    },
    {
        "id": 364450,
        "title": "莉可丽丝"
    },
    {
        "id": 309311,
        "title": "Cyberpunk: Edgerunners"
    },
    {
        "id": 326895,
        "title": "夏日重现"
    },
    {
        "id": 140001,
        "title": "Re：从零开始的异世界生活"
    },
    {
        "id": 277554,
        "title": "无职转生～到了异世界就拿出真本事～"
    },
    {
        "id": 10639,
        "title": "Fate/Zero"
    },
    {
        "id": 55770,
        "title": "进击的巨人"
    },
    {
        "id": 335036,
        "title": "英雄联盟：双城之战"
    },
    {
        "id": 160209,
        "title": "你的名字。"
    },
	{
		"id": 27364,
		"title": "冰菓"
	},
    {
        "id": 317613,
        "title": "辉夜大小姐想让我告白-超级浪漫-"
    },
	{
		"id": 297254,
		"title": "剃须。然后捡到女高中生。"
	},
	{
		"id": 10440,
		"title": "我们仍未知道那天所看见的花的名字。"
	},
    {
        "id": 117777,
        "title": "声之形"
    },
    {
        "id": 218971,
        "title": "朝花夕誓——于离别之朝束起约定之花"
    },
    {
        "id": 328609,
        "title": "孤独摇滚！"
    },
    {
        "id": 1424,
        "title": "轻音少女"
    },
    {
        "id": 110467,
        "title": "白箱"
    },
    {
        "id": 211567,
        "title": "3月的狮子"
    },
    {
        "id": 100444,
        "title": "四月是你的谎言"
    },
    {
        "id": 876,
        "title": "CLANNAD ～AFTER STORY～"
    },
    {
        "id": 221736,
        "title": "我想吃掉你的胰脏"
    },
    {
        "id": 909,
        "title": "龙与虎"
    },
    {
        "id": 41488,
        "title": "樱花庄的宠物女孩"
    },
    {
        "id": 54433,
        "title": "我的青春恋爱物语果然有问题"
    },
    {
        "id": 100403,
        "title": "路人女主的养成方法"
    },
    {
        "id": 183878,
        "title": "紫罗兰永恒花园"
    },
    {
        "id": 269235,
        "title": "天气之子"
    },
    {
        "id": 302189,
        "title": "86 -不存在的战区-"
    },
    {
        "id": 368116,
        "title": "尼尔：自动人形 Ver1.1a"
    },
    {
        "id": 192247,
        "title": "凸变英雄"
    },
    {
        "id": 244008,
        "title": "刺客伍六七"
    },
    {
        "id": 793,
        "title": "Code Geass 反叛的鲁路修"
    },
    {
        "id": 605,
        "title": "棋魂"
    },
    {
        "id": 1608,
        "title": "灌篮高手"
    },
    {
        "id": 1939,
        "title": "网球王子"
    },
    {
        "id": 220566,
        "title": "杀戮天使"
    },
    {
        "id": 214272,
        "title": "欢迎来到实力至上主义教室"
    },
    {
        "id": 269090,
        "title": "你好 世界"
    },
    {
        "id": 18635,
        "title": "罪恶王冠"
    },
    {
        "id": 118781,
        "title": "甲铁城的卡巴内利"
    },
    {
        "id": 23686,
        "title": "刀剑神域"
    },
    {
        "id": 116461,
        "title": "食戟之灵"
    },
    {
        "id": 238986,
        "title": "肆式青春"
    },
    {
        "id": 200704,
        "title": "烟花"
    },
    {
        "id": 172498,
        "title": "埃罗芒阿老师"
    },
    {
        "id": 329906,
        "title": "间谍过家家"
    },
    {
        "id": 333158,
        "title": "更衣人偶坠入爱河"
    },
    {
        "id": 218711,
        "title": "DARLING in the FRANXX"
    },
    {
        "id": 245665,
        "title": "鬼灭之刃"
    },
    {
        "id": 49131,
        "title": "约会大作战"
    },
    {
        "id": 30582,
        "title": "斩·赤红之瞳！"
    },
    {
        "id": 326895,
        "title": "夏日重现"
    },
    {
        "id": 358660,
        "title": "中国奇谭"
    },
    {
        "id": 285437,
        "title": "三体"
    },

]


