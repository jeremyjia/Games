package com.pbz.demo.hello.model;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import com.pbz.demo.hello.util.engine.JSGraphEngine;

public class ScriptEngineWrapper {    
    private  ScriptEngineManager mgr = new ScriptEngineManager();
    private  ScriptEngine engine = mgr.getEngineByName("JavaScript");
    private  JSGraphEngine graphEngine = new JSGraphEngine();
    
    public ScriptEngine getEngine() {
        return engine;
    }
    public void setEngine(ScriptEngine engine) {
        this.engine = engine;
    }
    public JSGraphEngine getGraphEngine() {
        return graphEngine;
    }
    public void setGraphEngine(JSGraphEngine graphEngine) {
        this.graphEngine = graphEngine;
    }

}
