var attacks = false;
var xp = 0;
var lvl = 0;
var reqxp = 3;
var enemyhp = document.getElementById('enemyHealth').innerHTML;
var hp = document.getElementById('health').innerHTML;
var maxhp = document.getElementById('maxhealth').innerHTML;
var enmymaxhp = 10;
var gold = 0;
var damMod = 0;
var drunk = 0;
var drunkdam = 0;
var sword = false;
var vialitem = false;
var shielditem = false;
var medkititem = false;
var enemyCount = 0;
var poison = 0;
var shield = 0;
var heal = 0;
var outside = true;
var nmypoison = 0;
var nmyshield = 0;
var choice = 0;
var boss1 = false;
var black = true;
var boss2 = false;
var amal = true;
var overkill1 = 0;
var overkill2 = 0;
var overkill3 = 0;
var overkill1up = false;
var overkill2up = false;
var overkill3up = false;
var poisonmod = 0;
var medmod = 0;
var shieldmod = 0;
// -----------------------------------------------------------------------------------------------------------------
function roll() {
    document.getElementById('result').innerHTML = Math.floor(Math.random() * 6) + 1;
    dispdice();
    if (attacks == true) {

        enemyhp = enemyhp - poison;
        document.getElementById('enemyHealth').innerHTML = enemyhp;
    }
    choicesAttack();
    choices();
    var attacka = document.getElementById('attack');
    var roll = document.getElementById('roll');
    attacka.style.display = "inline-block";
    roll.style.display = "none";
    if (vialitem == true) {
    var poisona = document.getElementById('poison');
    poisona.style.display = "inline-block";
    }
    if (shielditem == true) {
    var shielda = document.getElementById('shield');
    shielda.style.display = "inline-block";
    }
    if (medkititem == true) {
    var medkita = document.getElementById('medkit');
    medkita.style.display = "inline-block";
    }
    if (enemyhp < 1) {
        document.getElementById('flavorText').innerHTML = 'the ' + document.getElementById('name').innerHTML + ' dies an acidic death';
        xp = xp + 1;
        document.getElementById('xp').innerHTML = xp;
        gold = gold + lvl + Math.floor(Math.random() * 6)+1;
        document.getElementById('gold').innerHTML = gold;
        enemyCount = enemyCount + 1;
        nmyshield = 0
        document.getElementById('shielddisp').innerHTML = nmyshield;
        if (overkill1up == true) {
        overkill1 = enemyhp;
        }
        if (overkill2up == true) {
        overkill2 = poison;
        }
        if (overkill3up == true) {
        overkill3 = shield;
        }
        shield = 0;
        document.getElementById('plshielddisp').innerHTML = shield;
        attacks = true;
        flavor();
        if (boss1 == true) {
            boss1 = false;
            black = false;
            xp = reqxp;
            document.getElementById('flavorText').innerHTML = 'as you defeat the blacksmith everything fades to black, you wake up in a clearing next to two strange looking merchants';
        }
        if (boss2 == true) {
            boss2 = false;
            amal = false;
            xp = reqxp;
            document.getElementById('flavorText').innerHTML = 'the amalgam is vanquished, and you fall into a deep sleep';
        }
        if (xp === reqxp) {
            levelup();
        }
        var elem = document.getElementById("buttons");
        elem.style.display = "none";
        var y = document.getElementById("between");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
        attacks = false;
    }
    if (hp < 1) {
        location.reload()
    }
}
// -----------------------------------------------------------------------------------------------------------------          
function attack() {
    attacks = true
    document.getElementById('enemyResult').innerHTML = Math.floor(Math.random() * 6) + 1;
    enmydispdice();
    hp = hp - nmypoison;
    document.getElementById('health').innerHTML = hp;
    var attacka = document.getElementById('attack');
    var roll = document.getElementById('roll');
    attacka.style.display = "none";
    roll.style.display = "inline-block";
    if (vialitem == true) {
    var poisona = document.getElementById('poison');
    poisona.style.display = "none";
    }
    if (shielditem == true) {
    var shielda = document.getElementById('shield');
    shielda.style.display = "none";
    }
    if (medkititem == true) {
    var medkita = document.getElementById('medkit');
    medkita.style.display = "none";
    }
    if (enemyhp < 1) {
        var verb = ["annihilate", "destroy", "obliterate", "decimate", "eradicate", "neutralise", "expunge"]
        verb = verb[Math.floor(Math.random() * verb.length)];
        document.getElementById('flavorText').innerHTML = 'you ' + verb + ' the ' + document.getElementById('name').innerHTML;
        xp = xp + 1;
        document.getElementById('xp').innerHTML = xp;
        gold = gold + lvl*3 + Math.floor(Math.random() * 6)+1;
        document.getElementById('gold').innerHTML = gold;
        enemyCount = enemyCount + 1;
        nmyshield = 0;
        document.getElementById('shielddisp').innerHTML = nmyshield;
        if (overkill1up == true) {
        overkill1 = enemyhp;
        }
        if (overkill2up == true) {
        overkill2 = poison;
        }
        if (overkill3up == true) {
        overkill3 = shield;
        }
        if (drunk > -1) {
        drunk = drunk - 1;
        }
        shield = 0;
        document.getElementById('plshielddisp').innerHTML = shield;
        attacks = false;
        flavor();
        if (boss1 == true) {
            boss1 = false;
            black = false;;
            xp = reqxp;
            document.getElementById('flavorText').innerHTML = 'as you defeat the merchant everything fades to black, you wake up in a clearing next to two strange looking merchants';
        }
        if (boss2 == true) {
            boss2 = false;
            amal = false;
            xp = reqxp;
            document.getElementById('flavorText').innerHTML = 'the amalgam is vanquished, and you fall into a deep sleep';
        }
        if (xp === reqxp) {
            levelup();
        }
        var elem = document.getElementById("button");
        elem.style.display = "none";
        var y = document.getElementById("between");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
    }
}
// -----------------------------------------------------------------------------------------------------------------  
function enmyAttack() {
    var playerHit = document.getElementById('enemyResult').innerHTML;
        if (shield < playerHit) {
            playerHit = playerHit - shield;
            hp = hp - playerHit;
            document.getElementById('plshielddisp').innerHTML = 0;
        }
        else if (shield > playerHit) {
            shield = shield - playerHit;
            document.getElementById('plshielddisp').innerHTML = shield;
        }
        document.getElementById('health').innerHTML = hp;
    console.log('attack')
    var element = document.getElementById("player");
        element.classList.add("classname");
        element.classList.remove("heal", "shield", "poison");
    var element = document.getElementById("enemy");
        element.classList.remove("heal", "shield", "poison", "classname");
}
// -----------------------------------------------------------------------------------------------------------------  
function enmyPoison() {
    nmypoison = nmypoison + 1;
    console.log('poison')
    var element = document.getElementById("player");
        element.classList.add("poison");
        element.classList.remove("heal", "shield", "classname");
    var element = document.getElementById("enemy");
        element.classList.remove("heal", "shield", "poison", "classname");
}
// -----------------------------------------------------------------------------------------------------------------  
function enmyShield() {
    var shieldposnmy = document.getElementById('enemyResult').innerHTML;
    nmyshield = nmyshield - -shieldposnmy;
    document.getElementById('shielddisp').innerHTML = nmyshield;
    var element = document.getElementById("enemy");
        element.classList.add("shield");
        element.classList.remove("heal", "poison", "classname");
    var element = document.getElementById("player");
        element.classList.remove("heal", "shield", "poison", "classname");
}
// -----------------------------------------------------------------------------------------------------------------  
function enmyHeal() {
    var heal = document.getElementById('enemyResult').innerHTML;
    enemyhp = enemyhp - -heal;
    if (enemyhp > enmymaxhp) {
        enemyhp = enmymaxhp;
    }
    document.getElementById("enemyHealth").innerHTML = enemyhp;
    console.log('heal')
    var element = document.getElementById("enemy");
        element.classList.add("heal");
        element.classList.remove("shield", "poison", "classname");
    var element = document.getElementById("player");
        element.classList.remove("heal", "shield", "poison", "classname");
}
// -----------------------------------------------------------------------------------------------------------------  
function swordAttack() {
    if (drunk > 0) {
        drunkdam = 6;
        console.log(drunkdam)
        console.log(drunk)
    }
    else if (drunk < 1) {
        drunkdam = 0;
    }
    var enemyhit = document.getElementById('result').innerHTML;
    var dam = enemyhit - -damMod - -drunkdam;
    if (nmyshield < dam) {
            dam = dam - nmyshield;
            enemyhp = enemyhp - dam;
            document.getElementById('shielddisp').innerHTML = '0';
        }
        else if (nmyshield > dam) {
            nmyshield = nmyshield - dam;
            document.getElementById('shielddisp').innerHTML = nmyshield;
        }
    document.getElementById('enemyHealth').innerHTML = enemyhp;
    var element = document.getElementById("enemy");
        element.classList.add("classname");
        element.classList.remove("heal", "shield", "poison");
    var element = document.getElementById("player");
        element.classList.remove("heal", "shield", "poison", "classname");
    attack();
}
// -----------------------------------------------------------------------------------------------------------------
function poisonAttack() {
    poison = poison + 1 - -poisonmod;
    var element = document.getElementById("enemy");
        element.classList.add("poison");
        element.classList.remove("heal", "shield", "classname");
    var element = document.getElementById("player");
        element.classList.remove("heal", "shield", "poison", "classname");
    attack()
}
// -----------------------------------------------------------------------------------------------------------------
function shieldAttack() {
    var shieldpos = document.getElementById('result').innerHTML;
    shield = shield - -shieldpos;
    shield = shield - -shieldmod;
    document.getElementById('plshielddisp').innerHTML = shield;
    var element = document.getElementById("player");
        element.classList.add("shield");
        element.classList.remove("heal", "poison", "classname");
    var element = document.getElementById("enemy");
        element.classList.remove("heal", "shield", "poison", "classname");
    attack()
}
// -----------------------------------------------------------------------------------------------------------------
function medkitAttack() {
    var heal = document.getElementById('result').innerHTML;
    hp = hp - -heal + medmod;
    maxhp = document.getElementById('maxhealth').innerHTML
    if (hp > maxhp) {
        hp = maxhp;
    }
    var element = document.getElementById("player");
        element.classList.add("heal");
        element.classList.remove("shield", "poison", "classname");
    var element = document.getElementById("enemy");
        element.classList.remove("heal", "shield", "poison", "classname");
    attack()
    document.getElementById("health").innerHTML = hp;
}
// -----------------------------------------------------------------------------------------------------------------
function next() {
    back();
    if (outside == true) {
    poison = 0;
    shield = 0;
    var elem = document.getElementById("between");
    elem.style.display = "none";
    var y = document.getElementById("buttons");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    var y = document.getElementById("button");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    enmymaxhp = Math.floor(enmymaxhp * 1.1);
    document.getElementById("enemymaxhealth").innerHTML = enmymaxhp;
    enemyhp = enmymaxhp;
    document.getElementById("enemyHealth").innerHTML = enemyhp;
    enemyhp = enemyhp - -overkill1;
    document.getElementById('enemyHealth').innerHTML = enemyhp;
    enemyhp = enemyhp - overkill2;
    document.getElementById('enemyHealth').innerHTML = enemyhp;
    enemyhp = enemyhp - overkill3;
    document.getElementById('enemyHealth').innerHTML = enemyhp;
    overkill1 = 0;
    overkill2 = 0;
    overkill3 = 0;
        if (hp < maxhp/2) {
    hp = Math.floor(maxhp * 0.8);
    document.getElementById("health").innerHTML = hp;
        }
        if (black == true) {
    var elem = document.getElementById("townBloc");
    elem.style.display = "none";
    var elem = document.getElementById("town");
    elem.style.display = "none";
    var y = document.getElementById("enemy");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    }
        if (black == false) {
    var elem = document.getElementById("merchants");
    elem.style.display = "none";
    var elem = document.getElementById("town");
    elem.style.display = "none";
    var y = document.getElementById("enemy");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    }

    var names = ["amarok", "aligator", "bunyip", "ogre", "devious pineapple", "skinless wallaby", "chupacabra", "gremlin", "kludde", "clive", "morgawr", "gollem", "faerie", "aqrabuamelu", "camazotz", "gogmagog", " a rabbit", "hecatoncheires", "ogopogo", "clurichaun", "cockatrice", "akaname", "gargoyle", "buraq", "bugil noz", "bukavac", "elepaio"];
    document.getElementById('name').innerHTML = names[Math.floor(Math.random() * names.length)];
        if (boss1 == false) {
        document.getElementById('flavorText').innerHTML = 'you face the ' + document.getElementById('name').innerHTML;
        }
        else if (boss1 == true) {
        document.getElementById('flavorText').innerHTML = '"FOOLISH MORTAL, YOU SHALL DRAW YOUR LAST BREATH"';
        }
    }
    outside = true;
}
// -----------------------------------------------------------------------------------------------------------------        
function levelup() {
    lvl = lvl + 1;
    reqxp = reqxp + 1;
    maxhp = Math.floor(maxhp * 1.6);
    hp = maxhp;
    enmymaxhp = Math.floor(enmymaxhp * 1.6);
    document.getElementById('maxhealth').innerHTML = maxhp;
    document.getElementById('health').innerHTML = hp;
    document.getElementById('lvl').innerHTML = lvl;
    xp = 0;
    document.getElementById('xp').innerHTML = xp;
    if (black === true) {
    var elem = document.getElementById("enemy");
    elem.style.display = "none";
    var elem2 = document.getElementById("buttons");
    elem2.style.display = "none";
    var y = document.getElementById("town");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    var y = document.getElementById("townBloc");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
        document.getElementById('flavorText').innerHTML = 'you return to the town';
    }
    if (black === false && lvl == 4) {
    var elem = document.getElementById("enemy");
    elem.style.display = "none";
    var elem2 = document.getElementById("buttons");
    elem2.style.display = "none";
    var y = document.getElementById("merchants");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    var y = document.getElementById("town");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
}
    if (black === false && lvl > 4) {
    var elem = document.getElementById("enemy");
    elem.style.display = "none";
    var elem2 = document.getElementById("buttons");
    elem2.style.display = "none";
    var y = document.getElementById("merchants");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    var y = document.getElementById("town");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    document.getElementById('flavorText').innerHTML = 'you make your way back to the clearing';
}
    if (black === false && lvl == 6) {
    document.getElementById('flavorText').innerHTML = 'the merchants look particularly strange...';
        var elem = document.getElementById("enemy");
    elem.style.display = "none";
    var elem2 = document.getElementById("buttons");
    elem2.style.display = "none";
    var y = document.getElementById("merchants");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
    var y = document.getElementById("town");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
}
}
// -----------------------------------------------------------------------------------------------------------------
function openBlack() {
    console.log('epic')
    document.getElementById('flavorText').innerHTML = 'a large blacksmith greets you, saying "if ya got a weapon i can make it darn better!"';
    var elem = document.getElementById("outside");
    elem.style.display = "none";
    var y = document.getElementById("blacksmith");
    if (y.style.display === "none") {
        y.style.display = "block";
        }
    outside = false;
    }

// -----------------------------------------------------------------------------------------------------------------
function openShop() {
    document.getElementById('flavorText').innerHTML = 'you see a handful of items in the store that seem rather useful';
    var elem = document.getElementById("outside");
    elem.style.display = "none";
    var y = document.getElementById("shop");
    if (y.style.display === "none") {
        y.style.display = "block";
        }
    outside = false;
    }

// -----------------------------------------------------------------------------------------------------------------
function openInn() {
    document.getElementById('flavorText').innerHTML = 'you walk into a homely inn and decide you really need to have a nap';
    var elem = document.getElementById("outside");
    elem.style.display = "none";
    var y = document.getElementById("inn");
    if (y.style.display === "none") {
        y.style.display = "block";
        }
    outside = false;
    }

// -----------------------------------------------------------------------------------------------------------------
function openTavern() {
    document.getElementById('flavorText').innerHTML = 'you open the door to a rowdy tavern, might as well get hammered i suppose';
    var elem = document.getElementById("outside");
    elem.style.display = "none";
    var y = document.getElementById("tavern");
    if (y.style.display === "none") {
        y.style.display = "block";
        }
    outside = false;
    }
// -----------------------------------------------------------------------------------------------------------------
function openTink() {
    if (lvl < 6) {
    document.getElementById('flavorText').innerHTML = 'you walk up to the strange looking tinkerer, his skin seems to pulsate';
    var elem = document.getElementById("outside");
    elem.style.display = "none";
    var y = document.getElementById("tinkerer");
    if (y.style.display === "none") {
        y.style.display = "block";
        }
}
    if (lvl > 5) {
    var elem = document.getElementById("town");
            elem.style.display = "none";
        var y = document.getElementById("enemy");
        if (y.style.display === "none") {
            y.style.display = "block";
    }
    enmymaxhp = Math.floor(enmymaxhp * 1.5);
    document.getElementById("enemymaxhealth").innerHTML = enmymaxhp;
    enemyhp = enmymaxhp;
    document.getElementById("enemyHealth").innerHTML = enemyhp;
    enemyhp = enemyhp - poison;
    document.getElementById('enemyHealth').innerHTML = enemyhp;
    hp = maxhp;
    document.getElementById("health").innerHTML = hp;
    document.getElementById('name').innerHTML = 'twisted amalgam'
    document.getElementById('flavorText').innerHTML = 'the twin merchants twist and form together in a horrific pulsating glob';
    boss2 = true;
        var elem = document.getElementById("between");
        elem.style.display = "none";
        var y = document.getElementById("buttons");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
        var y = document.getElementById("button");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
}
    outside = false;
    }
// -----------------------------------------------------------------------------------------------------------------
function openEnch() {
    if (lvl < 6) {
    document.getElementById('flavorText').innerHTML = 'you walk up to the manic enchanter, his left leg seems like it has a mind of its own';
    var elem = document.getElementById("outside");
    elem.style.display = "none";
    var y = document.getElementById("enchanter");
    if (y.style.display === "none") {
        y.style.display = "block";
        }
    }
    
    if (lvl > 5) {
    var elem = document.getElementById("town");
            elem.style.display = "none";
        var y = document.getElementById("enemy");
        if (y.style.display === "none") {
            y.style.display = "block";
    }
    enmymaxhp = Math.floor(enmymaxhp * 1.5);
    document.getElementById("enemymaxhealth").innerHTML = enmymaxhp;
    enemyhp = enmymaxhp;
    document.getElementById("enemyHealth").innerHTML = enemyhp;
    enemyhp = enemyhp - poison;
    document.getElementById('enemyHealth').innerHTML = enemyhp;
    hp = maxhp;
    document.getElementById("health").innerHTML = hp;
    document.getElementById('name').innerHTML = 'twisted amalgam'
    document.getElementById('flavorText').innerHTML = 'the twin merchants twist and form together in a horrific pulsating glob';
    boss2 = true;
        var elem = document.getElementById("between");
        elem.style.display = "none";
        var y = document.getElementById("buttons");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
        var y = document.getElementById("button");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
}
    outside = false;
    }
// -----------------------------------------------------------------------------------------------------------------
function upgradeWeapon() {
    if (sword == true) {
        if (gold > 9) {
            damMod = damMod + 1;
            document.getElementById('swordinv').innerHTML = '- a wooden sword +' + damMod;
            gold = gold - 10;
            document.getElementById('gold').innerHTML = gold;
            document.getElementById('flavorText').innerHTML = 'h-thath-sha-loch says "ah! another one of my perfect fixins! heheheh"';
        }
    }
    if (lvl > 2) {
        var elem = document.getElementById("town");
            elem.style.display = "none";
        var y = document.getElementById("enemy");
        if (y.style.display === "none") {
            y.style.display = "block";
    }
        document.getElementById('flavorText').innerHTML = '"FOOLISH MORTAL, YOU SHALL DRAW YOUR LAST BREATH"';
        outside = true;
        boss1 = true;
        next();
        eenmymaxhp = Math.floor(enmymaxhp * 1.5);
        document.getElementById("enemymaxhealth").innerHTML = enmymaxhp;
        enemyhp = enmymaxhp;
        document.getElementById("enemyHealth").innerHTML = enemyhp;
        document.getElementById('name').innerHTML = 'h-thath-sha-loch';
        var elem = document.getElementById("between");
        elem.style.display = "none";
        var y = document.getElementById("buttons");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
        var y = document.getElementById("button");
        if (y.style.display === "none") {
            y.style.display = "block";
        }
    }
}
// -----------------------------------------------------------------------------------------------------------------
function rest() {
    if (gold > 4) {
        gold = gold - 5;
        document.getElementById('gold').innerHTML = gold;
        hp = maxhp;
        document.getElementById('health').innerHTML = hp;
        document.getElementById('flavorText').innerHTML = 'you take a nice long nap';
    }
}
// -----------------------------------------------------------------------------------------------------------------
function drink() {
    if (gold > 7) {
        gold = gold - 8;
        document.getElementById('gold').innerHTML = gold;
        drunk = 4;
        document.getElementById('flavorText').innerHTML = 'you get bloody plastered, feeling like you could destroy a small army';
    }
}
// -----------------------------------------------------------------------------------------------------------------  
function buy1() {
    if (gold > 9 && sword == false) {
        gold = gold - 10;
        document.getElementById('gold').innerHTML = gold;
        sword = true;
        document.getElementById('flavorText').innerHTML = 'the shopkeeper says to you "if ya pop over to h-thath-sha-lochs blacksmithery he just might fix that up for ya"';
        document.getElementById('swordinv').innerHTML = '- a wooden sword';
    }
}
// -----------------------------------------------------------------------------------------------------------------
function buy2() {
    if (gold > 14 && vialitem == false && sword == true) {
        gold = gold - 15;
        document.getElementById('gold').innerHTML = gold;
        vialitem = true;
        document.getElementById('flavorText').innerHTML = 'the shopkeeper says to you "you could do some dang serious damage with that stuff! over time that is"';
        document.getElementById('vialinv').innerHTML = '- an acid vial';
        document.getElementById("buttons").className = "buttonbois2";
    }
}
// -----------------------------------------------------------------------------------------------------------------
function buy3() {
    if (gold > 19 && medkititem == false && sword == true && vialitem == true) {
        gold = gold - 20;
        document.getElementById('gold').innerHTML = gold;
        medkititem = true
        document.getElementById('flavorText').innerHTML = 'the shopkeeper says to you "yeh mate this stuffll fix ya up good and strong"';
        document.getElementById('medinv').innerHTML = '- a medkit';
        document.getElementById("buttons").className = "buttonbois3";
    }
}
// -----------------------------------------------------------------------------------------------------------------
function buy4() {
    if (gold > 24 && shielditem == false && medkititem == true && sword == true && vialitem == true) {
        gold = gold - 25;
        document.getElementById('gold').innerHTML = gold;
        shielditem = true;
        document.getElementById('flavorText').innerHTML = 'the shopkeeper says to you "yeh mate this should take the brunt of a good bit of damage"';
        document.getElementById('shieldinv').innerHTML = '- a shield';
        var y = document.getElementById("enshieldd");
        y.style.display = "block";
        var y = document.getElementById("plshieldd");
        y.style.display = "block";
        document.getElementById("buttons").className = "buttonbois4";
        }
}
// -----------------------------------------------------------------------------------------------------------------
function upgradeEquipment() {
    if (gold > 14) {
        gold = gold - 15;
        document.getElementById('gold').innerHTML = gold;
        document.getElementById('flavorText').innerHTML = 'the tinker takes one of your items and does something to it in a blur"';
        var ran = Math.floor(Math.random() * 6)+1;
        if (ran == 6) {
            poisonmod = poisonmod + 1;
            document.getElementById('vialinv').innerHTML = '- an acid vial +' + poisonmod;
        }
        if (ran == 3 || ran == 4 || ran == 5) {
            medmod = medmod + 1;
            document.getElementById('medinv').innerHTML = '- a medkit +' + medmod;
        }
        if (ran == 1 || ran == 2) {
            shieldmod = shieldmod + 1;
            document.getElementById('shieldinv').innerHTML = '- a shield +' + shieldmod;
        }
    }
}
// -----------------------------------------------------------------------------------------------------------------
function upgradeOverkill() {
    if (gold > 24 && overkill1up == false) {
        gold = gold - 25;
        document.getElementById('gold').innerHTML = gold;
        overkill1up = true;
        document.getElementById('flavorText').innerHTML = 'the enchanter informs you that you should always be sure to leave your enemies mutilated and utterly vanquished';
        }
        else if (gold > 24 && overkill1up == true && overkill2up == false) {
        gold = gold - 25;
        document.getElementById('gold').innerHTML = gold;
        overkill2up = true;
        document.getElementById('flavorText').innerHTML = 'the enchanter informs you that you should always be sure to leave your enemies sickly and infected';
        }
        else if (gold > 24 && overkill1up == true && overkill2up == true && overkill3up == false) {
        gold = gold - 25;
        document.getElementById('gold').innerHTML = gold;
        overkill3up = true;
        document.getElementById('flavorText').innerHTML = 'the enchanter informs you that you should always be sure to leave your enemies with your guard up';
        }
    }
// -----------------------------------------------------------------------------------------------------------------
function back() {
    var elem = document.getElementById("outside");
    elem.style.display = "block";
    var y = document.getElementById("tavern");
    y.style.display = "none";
    var y = document.getElementById("blacksmith");
    y.style.display = "none";
    var y = document.getElementById("inn");
    y.style.display = "none";
    var y = document.getElementById("shop");
    y.style.display = "none";
    var y = document.getElementById("tinkerer");
    y.style.display = "none";
    var y = document.getElementById("enchanter");
    y.style.display = "none";
    var elem = document.getElementById("goback");
    elem.style.display = "none";
    var y = document.getElementById("moveon");
    if (y.style.display === "none") {
        y.style.display = "block";
    }
}
// -----------------------------------------------------------------------------------------------------------------        
function flavor() {
    if (enemyCount === 1) {
        document.getElementById('flavorText').innerHTML = 'after beating a dummy to death, you decide you wish to kill as many things as possible';
    }
    if (enemyCount === 3) {
        document.getElementById('flavorText').innerHTML = 'you come across a small town. there might be some people that can help you here';
    }
}
// -----------------------------------------------------------------------------------------------------------------        
function reset() {
    location.reload();
}
// -----------------------------------------------------------------------------------------------------------------
function choices() {
    var name = document.getElementById('name').innerHTML
    if (vialitem == true && shielditem == true && medkititem == true) {
        choice = Math.floor(Math.random() * 6) + 1;
    if (choice < 4) {
        document.getElementById('flavorText').innerHTML = name + ' is going to attack you!';
        }
    if (choice == 4) {
        document.getElementById('flavorText').innerHTML = name + ' is going to poison you!';
        }
    if (choice == 5) {
        document.getElementById('flavorText').innerHTML = name + ' is going to shield!';
        }
    if (choice == 6) {
        document.getElementById('flavorText').innerHTML = name + ' is going to heal!';
        }
    }
    if (vialitem == true && shielditem == false && medkititem == true) {
        choice = Math.floor(Math.random() * 6) + 1;
    if (choice < 5) {
        document.getElementById('flavorText').innerHTML = name + ' is going to attack you!';
        }
    if (choice == 5) {
        document.getElementById('flavorText').innerHTML = name + ' is going to poison you!';
        }
    if (choice == 6) {
        document.getElementById('flavorText').innerHTML = name + ' is going to heal!';
        }
    }
    if (vialitem == true && shielditem == false && medkititem == false) {
        choice = Math.floor(Math.random() * 6) + 1;
    if (choice < 6) {
        document.getElementById('flavorText').innerHTML = name + ' is going to attack you!';
        }
    if (choice == 6) {
        document.getElementById('flavorText').innerHTML = name + ' is going to poison you!';
        }
    }
    if (vialitem == false && shielditem == false && medkititem == false) {
        document.getElementById('flavorText').innerHTML = name + ' is going to attack you!';
    }
}
// -----------------------------------------------------------------------------------------------------------------
function choicesAttack() {
    if (vialitem == true && shielditem == true && medkititem == true) {
        if (choice < 4) {
            enmyAttack();
        }
        if (choice == 4) {
            enmyPoison();
        }
        if (choice == 5) {
            enmyShield();
        }
        if (choice == 6) {
            enmyHeal();
        }
    }
    if (vialitem == true && shielditem == false && medkititem == true) {
        if (choice < 5) {
            enmyAttack();
        }
        if (choice == 5) {
            enmyPoison();
        }
        if (choice == 6) {
            enmyHeal();
        }
    }
    if (vialitem == true && shielditem == false && medkititem == false) {
        if (choice < 6) {
            enmyAttack();
        }
        if (choice == 6) {
            enmyPoison();
        }
    }
    if (vialitem == false && shielditem == false && medkititem == false) {
        enmyAttack();
    }
}
// -----------------------------------------------------------------------------------------------------------------
function inven() {
    var x = document.getElementById("inven");
if (x.style.display === "none") {
    x.style.display = "block";
} 
    else {
        x.style.display = "none";
    }
}
// -----------------------------------------------------------------------------------------------------------------
function dispdice() {
    var x = document.getElementById("d1");
        if (x.style.display === "block") {
            x.style.display = "none";
    }

    var x = document.getElementById("d2");
        if (x.style.display === "block") {
            x.style.display = "none";
    }

    var x = document.getElementById("d3");
        if (x.style.display === "block") {
            x.style.display = "none";
    }

    var x = document.getElementById("d4");
        if (x.style.display === "block") {
            x.style.display = "none";
    }

    var x = document.getElementById("d5");
        if (x.style.display === "block") {
            x.style.display = "none";
    }

    var x = document.getElementById("d6");
        if (x.style.display === "block") {
            x.style.display = "none";
    }
    var result = document.getElementById('result').innerHTML
    if (result == 1){
        var x = document.getElementById("d1");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (result == 2){
    var x = document.getElementById("d2");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (result == 3){
    var x = document.getElementById("d3");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (result == 4){
    var x = document.getElementById("d4");
    if (x.style.display === "none") {
    x.style.display = "block";
    }
}
    if (result == 5){
    var x = document.getElementById("d5");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (result == 6){
    var x = document.getElementById("d6");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
}
// -----------------------------------------------------------------------------------------------------------------
function enmydispdice() {
    var x = document.getElementById("enmyd1");
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById("enmyd2");
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById("enmyd3");
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById("enmyd4");
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById("enmyd5");
    if (x.style.display === "block") {
        x.style.display = "none";
    }

    var x = document.getElementById("enmyd6");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    var enmyresult = document.getElementById('enemyResult').innerHTML;
    if (enmyresult == 1){
    var x = document.getElementById("enmyd1");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (enmyresult == 2){
    var x = document.getElementById("enmyd2");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (enmyresult == 3){
    var x = document.getElementById("enmyd3");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (enmyresult == 4){
    var x = document.getElementById("enmyd4");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (enmyresult == 5){
    var x = document.getElementById("enmyd5");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
    if (enmyresult == 6){
    var x = document.getElementById("enmyd6");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
}