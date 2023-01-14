console.log("Load JS 1 (Custom Javascript -> js/fc.js) OK!");

window.onload = function ReadCookieUIDonload() {
    var name = "uid=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            document.getElementById('UID').value = c.substring(name.length, c.length);
        }
    }
    //从 Cookie 读 UID，然后丟到 UID 输入框里面
}

function sendcommand() {
    var command = document.getElementById('OutputCommand').value;
    var uid = document.getElementById('UID').value;
    document.getElementById("loading").style.display = "";
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 适配
        xmlhttp = new XMLHttpRequest();
    } else {
        //IE6, IE5 适配
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.timeout = 11000;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            response = JSON.parse(xmlhttp.responseText);

            if (responsemsg == "succ") {
                var status = "执行成功";
            } else {
                if (response.msg.retcode == "4") {
                    var status = "玩家不在游戏内";
                } else {
                    var status = "执行失败";
                }
             }

            document.getElementById("loading").style.display = "none";
            document.getElementById('rsp').innerHTML = `执行UID => ${uid} | 执行指令 => ${command}</br>执行状态 => ${response.retcode} |【详细信息】 ${response.msg} | 原返回： ${xmlhttp.responseText}`;

            //存储当前 UID 到 Cookie
            //Cookie! Yummy yummy~
            document.cookie = "uid=" + uid;
        } else {
            document.getElementById('rsp').innerHTML = '发送请求中';
        }
        xmlhttp.ontimeout = function(e) {
            document.getElementById('rsp').innerHTML = '连接超时/玩家不在游戏内';
        };
    }
    xmlhttp.open("GET", "https://gs-console.moeyy.cn/api?uid=" + uid + "&cmd=1116&region=dev_gio&msg=" + command + "&ticket=YSGM@" + Math.round(new Date().getTime()/1000));
    xmlhttp.send();
};

function getinternaldata(){
    document.getElementById("loading").style.display = "";
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 适配
        xmlhttp = new XMLHttpRequest();
    } else {
        //IE6, IE5 适配
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.timeout = 3000;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            response = JSON.parse(xmlhttp.responseText);


            document.getElementById("loading").style.display = "none";
          document.getElementById('rsp').innerHTML = `人数 => ${response.data.internal_data}</br>执行状态 => ${response.retcode} |【详细信息】 ${response.msg} | 原返回： ${xmlhttp.responseText}`;
        } else {
            document.getElementById('rsp').innerHTML = '发送请求中';
        }
        xmlhttp.ontimeout = function(e) {
            document.getElementById('rsp').innerHTML = '连接超时';
        };
    }
    xmlhttp.open("GET", "https://gs-console.moeyy.cn/api?cmd=1101&region=dev_gio&ticket=YSGM@" + Math.round(new Date().getTime()/1000));
    xmlhttp.send();
};

// 武器生成
function weaponspawn() {
    var weaponid = document.getElementById('WeaponID').value;
    var weaponlevel1 = document.getElementById('WeaponLevel1').value;
    var weaponlevel2 = document.getElementById('WeaponLevel2').value;

    document.getElementById('WeaponID').value = "";
    document.getElementById('WeaponLevel1').value = "";
    document.getElementById('WeaponLevel2').value = "";

    document.getElementById('OutputCommand').value = `equip add ${weaponid} ${weaponlevel1} ${weaponlevel2}`;
}

// 物品生成
function itemspawn() {
    var itemid = document.getElementById('ItemID').value;
    var itemcount = document.getElementById('ItemCount').value;

    document.getElementById('ItemID').value = "";
    document.getElementById('ItemCount').value = "";

    if (itemid == 203) {
        document.getElementById('rsp').innerHTML = 'WebGM 不能加创世结晶啊喂！！！要皮肤什么的你可以直接在获取物品的地方搜名字获取啊，不用走这个中间商的！';
        return;
    }

    document.getElementById('OutputCommand').value = `item add ${itemid} ${itemcount}`;
}

function itemdelete() {
    var itemid = document.getElementById('ItemID').value;
    var itemcount = document.getElementById('ItemCount').value;

    document.getElementById('ItemID').value = "";
    document.getElementById('ItemCount').value = "";

    document.getElementById('OutputCommand').value = `item sub ${itemid} ${itemcount}`;
}

// 添加角色
function addavatar() {
    var avatarid = document.getElementById('AvatarID').value;

    document.getElementById('AvatarID').value = "";

    document.getElementById('OutputCommand').value = `avatar add ${avatarid}`;
}

// 任务操作那些事
function addquest() {
    var questid = document.getElementById('QuestID').value;

    document.getElementById('QuestID').value = "";

    document.getElementById('OutputCommand').value = `quest add ${questid}`;
}

function accquest() {
    var questid = document.getElementById('QuestID').value;

    document.getElementById('QuestID').value = "";

    document.getElementById('OutputCommand').value = `quest accept ${questid}`;
}

function finishquest() {
    var questid = document.getElementById('QuestID').value;

    document.getElementById('QuestID').value = "";

    document.getElementById('OutputCommand').value = `quest finish ${questid}`;
}

// 设置冒险等级
function levelup() {
    var levelupcount = document.getElementById('LevelupCount').value;

    document.getElementById('LevelupCount').value = "";

    document.getElementById('OutputCommand').value = `player level ${levelupcount}`;
}

// 天赋等级
function talentlevelup() {
    var talentlevelup = document.getElementById('TalentLevelupCount').value;
    var talentslot = document.getElementById('TalentSlot').value

    document.getElementById('TalentLevelupCount').value = "";

    document.getElementById('OutputCommand').value = `skill ${talentslot} ${talentlevelup}`;
}

// 突破等级
function breaklevelup() {
    var breaklevelupcount = document.getElementById('BreakLevelupCount').value;

    document.getElementById('BreakLevelupCount').value = "";

    document.getElementById('OutputCommand').value = `break ${breaklevelupcount}`;
}

// 角色等级
function avatarlevelup() {
    var avatarlevelupcount = document.getElementById('AvatarLevelupCount').value;

    document.getElementById('AvatarLevelupCount').value = "";

    document.getElementById('OutputCommand').value = `level ${avatarlevelupcount}`;
}

// 无参数指令
function killself() {
    document.getElementById('OutputCommand').value = `kill self`;
}

function killallmonster() {
    document.getElementById('OutputCommand').value = `kill monster all`;
}

function playergodmodeon() {
    document.getElementById('OutputCommand').value = `wudi global avatar on`;
}

function unlocktalent() {
    document.getElementById('OutputCommand').value = `talent unlock all`;
}

function locktalent() {
    document.getElementById('OutputCommand').value = `talent lock all`;
}

function unlocks3allpoint() {
    document.getElementById('OutputCommand').value = `point 3 all`;
}

function unlocks5allpoint() {
    document.getElementById('OutputCommand').value = `point 5 all`;
}

function unlocks6allpoint() {
    document.getElementById('OutputCommand').value = `point 6 all`;
}


function unlockmutigame() {
    document.getElementById('OutputCommand').value = `quest accept 30904`;
}

function unlockwish() {
    document.getElementById('OutputCommand').value = `quest accept 35801`;
}

function unlockfly() {
    document.getElementById('OutputCommand').value = `quest accept 35603`;
}

function cleanaccountdata() {
    document.getElementById('OutputCommand').value = `clear all`;
}

function getskin1() {
    document.getElementById('OutputCommand').value = `item add 340004 1`;
}

function getskin2() {
    document.getElementById('OutputCommand').value = `item add 340005 1`;
}

function getskin3() {
    document.getElementById('OutputCommand').value = `item add 340001 1`;
}

function getskin4() {
    document.getElementById('OutputCommand').value = `item add 340000 1`;
}

function getskin5() {
    document.getElementById('OutputCommand').value = `item add 340002 1`;
}

function getskin6() {
    document.getElementById('OutputCommand').value = `item add 340003 1`;
}