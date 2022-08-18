// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2021 Jean-Francois Moine - LGPL3+
//equalbars.js-module to set equal spaced measure bars
abc2svg.equalbars = {
    output_music: function( of ) {
        this.equalbars_d = 0; of ()
    },
    set_fmt: function( of , cmd, param) {
        if (cmd == "equalbars")
            this.cfmt().equalbars = this.get_bool(param)
        else
            of(cmd, param)
    },
    set_sym_glue: function( of , width) {
        var C = abc2svg.C,
            s, s2, w, i, n, x, g, t, t0, bars = [],
            tsfirst = this.get_tsfirst(); of (width)
        if (!this.cfmt().equalbars)
            return
        for (s2 = tsfirst; s2; s2 = s2.ts_next) {
            switch (s2.type) {
                default: continue
                case C.GRACE:
                        case C.MREST:
                        case C.NOTE:
                        case C.REST:
                        case C.SPACE:
                        break
            }
            break
        }
        if (!s2)
            return
        t0 = t = s2.time
        for (s = s2; s.ts_next; s = s.ts_next) {
            if (s.type == C.BAR && s.seqst) {
                bars.push([s, s.time - t]);
                t = s.time
            }
        }
        if (!s.invis || s.prev.type != C.KEY)
            bars.push([s, s.time - t])
        else
            bars[bars.length - 1][0] = s
        width = s.x;//单行总宽度
        t = s.time;//单行总时长dur
        if (s.dur)
            t += s.dur;
        n = bars.length
        if (n <= 1)
            return
        x = s2.type == C.GRACE ? s2.extra.x : s2.x;
        if (this.equalbars_d < x)
            this.equalbars_d = x
        d = this.equalbars_d
        w = (width - d) / (t - t0)
        var totalDur = 0;
        for (i = 0; i < n; i++) {
            s = bars[i][0];
            f = w * bars[i][1] / (s.x - x);
            totalDur = 0;
            var notFirstBarDistance = 0;
            if(i>0){
            	notFirstBarDistance = 20/scale;
            }
            for (; s2 != s; s2 = s2.ts_next) {
                if (s2.type == C.GRACE) {
                    for (g = s2.extra; g; g = g.next)
                        g.x = d + (g.x - x) * f
                } else if (s2.x) {
                    s2.x = d + (s2.x - x) * f;//原来的
//                	s2.x = d + notFirstBarDistance + totalDur*w;
                	s2.x = parseFloat(s2.x.toFixed(2));
                	totalDur += s2.dur;
                }
            }
            d += w * bars[i][1];//原来的
            x = s2.x
            while (1) {
                s2.x = d;
                s2 = s2.ts_next
                if (!s2 || s2.seqst)
                    break
            }
            if (!s2)
                break
        }
    },
    set_hooks: function(abc) {
        abc.output_music = abc2svg.equalbars.output_music.bind(abc, abc.output_music);
        abc.set_format = abc2svg.equalbars.set_fmt.bind(abc, abc.set_format);
        abc.set_sym_glue = abc2svg.equalbars.set_sym_glue.bind(abc, abc.set_sym_glue)
    }
}
//abc2svg.modules.hooks.push(abc2svg.equalbars.set_hooks);
abc2svg.modules.hooks.push(
		[ "output_music", "abc2svg.equalbars.output_music" ],
		[ "set_format", "abc2svg.equalbars.set_fmt" ],
		[ "set_sym_glue", "abc2svg.equalbars.set_sym_glue" ]
	);
abc2svg.modules.equalbars.loaded = true