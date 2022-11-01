// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2021 Jean-Francois Moine - LGPL3+
//diag.js-module to insert guitar chord diagrams
abc2svg.diag = {
    cd: {
        C: "032010 ,0 x32010",
        Cm: "003320 fr3 003420 barre=6-1",
        "#Cm": "003320 fr4 x03420 barre=5-1",
        C7: "032310 ,0 032410",
        Cm7: "003020 fr3 x03020 barre=6-1",
        CM7: "032000 ,0 x21000",
        Csus4: "000340 fr3 x00340 barre=6-1",
        D: "000232 ,0 xx0132",
        Dm: "000231 ,0 xx0231",
        "#Dm": "003320 fr6 x03420 barre=5-1",
        D7: "000212 ,0 xx0213",
        Dm7: "000211 ,0 xx0211",
        DM7: "000222 ,0 xx0123",
        Dsus4: "000233 ,0 xx0123",
        E: "022100 ,0 023100",
        Em: "022000 ,0 023000",
        E7: "022130 ,0 023140",
        Em7: "020000 ,0 010000",
        EM7: "021100 ,0 031200",
        Esus4: "002200 ,0 001200",
        F: "033200 fr1 034200 barre=6-1",
        "#F": "033200 fr2 034200 barre=6-1",
        Fm: "033000 fr1 034000 barre=6-1",
        "#Fm": "033000 fr2 034000 barre=6-1",
        F7: "030200 fr1 030200 barre=6-1",
        "#F7": "030200 fr2 030200 barre=6-1",
        Fm7: "030000 fr1 030000 barre=6-1",
        FM7: "032200 fr1 042300 barre=6-1",
        Fsus4: "003300 fr1 003400 barre=6-1",
        G: "320003 ,0 210003",
        Gm: "033000 fr3 034000 barre=6-1",
        "#Gm": "033000 fr4 034000 barre=6-1",
        G7: "320001 ,0 320001",
        Gm7: "030000 fr3 030000 barre=6-1",
        GM7: "320002 ,0 310002",
        Gsus4: "003300 fr3 003400 barre=6-1",
        A: "002220 ,0 x01230",
        Am: "002210 ,0 x02310",
        A7: "002020 ,0 002030",
        Am7: "002010 ,0 002010",
        AM7: "002120 ,0 x02130",
        Asus4: "000230 ,0 x00120",
        B: "003330 fr2 x02340 barre=5-1",
        "bB": "003330 fr1 x02340 barre=6-1",
        Bm: "003320 fr2 x03420 barre=5-1",
        B7: "021202 ,0 x21304",
        Bm7: "003020 fr2 x03020 barre=6-1",
        BM7: "003230 fr2 x03240 barre=6-1",
        Bsus4: "000230 fr2 x00340 barre=6-1",
    },
    do_diag: function() {
        var glyphs = this.get_glyphs(),
            voice_tb = this.get_voice_tb(),
            decos = this.get_decos()
        if (!glyphs['fb']) {
            this.add_style("\
\n.fng {font:6px sans-serif}\
\n.frn {font:italic 7px sans-serif}")
            glyphs['fb'] = '<g id="fb">\n\
<path class="stroke" stroke-width="0.4" d="\
M-10 -34h20m0 6h-20\
m0 6h20m0 6h-20\
m0 6h20"/>\n\
<path class="stroke" stroke-width="0.5" d="\
M-10 -34v24m4 0v-24\
m4 0v24m4 0v-24\
m4 0v24m4 0v-24"/>\n\
</g>';
            glyphs['nut'] = '<path id="nut" class="stroke" stroke-width="1.6" d="\
M-10.2 -34.5h20.4"/>';
            glyphs['ddot'] = '<circle id="ddot" class="fill" r="1.5"/>'
        }

        function ch_cnv(t) {
            var a = t.match(/[A-G][#♯b♭]?([^/]*)\/?/)
            if (a && a[1]) {
                a[2] = abc2svg.ch_alias[a[1]]
                if (a[2] != undefined)
                    t = t.replace(a[1], a[2])
            }
            return t.replace('/', '.')
        }

        function diag_add(nm) {
            var dc, i, l, d = abc2svg.diag.cd[nm]
            if (!d)
                return
            d = d.split(' ')
            dc = '<g id="' + nm + '">\n\
<use xlink:href="#fb"/>\n'
            l = d[1].split(',')
            if (!l[0] || l[0].slice(-1) == l[1])
                dc += '<use xlink:href="#nut"/>\n'
            if (l[0])
                dc += '<text x="-20" y="' + ((l[1] || 1) * 6 - 35) +
                '" class="frn">' + l[0].replace("fr","") + '</text>\n';//不显示fr字符
            decos[nm] = "3 " + nm + " 40 " + (l[0] ? "30" : "10") + " 0"
            dc += '<text x="-12,-8,-4,0,4,8" y="-36" class="fng">' +
                d[2].replace(/[y0]/g, '&nbsp;') +
                '</text>\n'
            for (i = 0; i < d[0].length; i++) {
                l = d[0][i]
                if (l && l != 'x' && l != '0')
                    dc += '<use x="' + (i * 4 - 10) +
                    '" y="' + (l * 6 - 37) +
                    '" xlink:href="#ddot"/>\n'
            }
            if (d[3]) {
                l = d[3].match(/barre=(\d)-(\d)/)
                if (l)
                    dc += '<path id="barre" class="stroke"\
 stroke-width="1.9" d="M' + ((6 - l[1]) * 4 - 12) +
                    '-31h' + ((l[1] - l[2]) * 4+4) + '"/>'//这里有做了一些修改，线画长一些
            }
            dc += '</g>'
            glyphs[nm] = dc
        }
        var s, i, gch, nm
        for (s = voice_tb[0].sym; s; s = s.next) {
            if (!s.a_gch)
                continue
            for (i = 0; i < s.a_gch.length; i++) {
                gch = s.a_gch[i]
                if (!gch || gch.type != 'g' || gch.capo)
                    continue
                nm = ch_cnv(gch.text);
                if(!abc2svg.diag["cd"][nm]){//增加的判断，否则所有的注释都会执行
                	continue;
                }
                if (!decos[nm])
                    diag_add(nm)
                this.deco_put(nm, s)
            }
        }
    },
    output_music:function(of){if(this.cfmt().diag)
    	abc2svg.diag.do_diag.call(this)
    	of()},
    set_fmt: function( of , cmd, param) {
        var a, cfmt = this.cfmt()
        switch (cmd) {
            case "diagram":
                cfmt.diag = param
                return
            case "setdiag":
                a = param.match(/(\S*)\s+(.*)/)
                abc2svg.diag.cd[a[1].replace('/', '.')] = a[2]
                return
        } of (cmd, param)
    },
    set_hooks: function(abc) {
        abc.output_music = abc2svg.diag.output_music.bind(abc, abc.output_music);
        abc.set_format = abc2svg.diag.set_fmt.bind(abc, abc.set_format)
    }
}
//abc2svg.modules.hooks.push(abc2svg.diag.set_hooks);
abc2svg.modules.hooks.push(
		[ "set_format", "abc2svg.diag.set_fmt" ],
		[ "output_music", "abc2svg.diag.output_music" ]
	);
abc2svg.modules.diagram.loaded = true
